import hashlib
import os

import pytest


@pytest.fixture(autouse=True)
def windows_direct_loader_compat(monkeypatch):
    """genlayer-test 0.29.2 unlinks an fd-0 temp file too early on Windows."""
    original_unlink = os.unlink

    def unlink(path, *args, **kwargs):
        try:
            return original_unlink(path, *args, **kwargs)
        except PermissionError as error:
            if getattr(error, "winerror", None) == 32 and "tmp" in str(path).lower():
                return None
            raise

    monkeypatch.setattr(os, "unlink", unlink)


def test_direct_registration_bom_and_recall_seal(direct_vm, direct_deploy, direct_alice, direct_bob):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    leaf = contract.register_component("leaf-direct", "Leaf", "module", "model=CAMRY;year=2020")
    parent = contract.register_component("parent-direct", "Parent", "product", "model=PRODUCT-1")
    direct_vm.sender = direct_bob
    with direct_vm.expect_revert("only the parent creator"):
        contract.add_containment(parent, leaf)
    direct_vm.sender = direct_alice
    contract.add_containment(parent, leaf)
    body = b'{"campaign":"direct"}'
    digest = hashlib.sha256(body).hexdigest()
    recall = contract.create_recall("Direct recall", "https://api.nhtsa.gov/direct", digest, "model=CAMRY")
    contract.seal_recall(recall)
    assert contract.stats()["components"] == 2
    assert contract.get_recall(recall)["status"] == 2
    assert contract.get_parents(leaf) == [parent]


def test_direct_rejects_trusted_authority_and_graph_errors(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    one = contract.register_component("one", "One", "part", "id=1")
    two = contract.register_component("two", "Two", "part", "id=2")
    with direct_vm.expect_revert("cycle"):
        contract.add_containment(one, one)
    contract.add_containment(one, two)
    with direct_vm.expect_revert("edge already exists"):
        contract.add_containment(one, two)
    with direct_vm.expect_revert("containment edge would create a cycle"):
        contract.add_containment(two, one)
    with direct_vm.expect_revert("bulletin authority"):
        contract.create_recall("Bad", "https://example.com/notice", "0" * 64, "any")


def test_direct_semantic_assessment_and_bounded_propagation(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    leaf = contract.register_component("semantic-leaf", "Leaf", "module", "model=CAMRY;year=2020")
    parent = contract.register_component("semantic-parent", "Parent", "product", "model=PRODUCT-2")
    contract.add_containment(parent, leaf)
    body = b"affected bulletin"
    digest = hashlib.sha256(body).hexdigest()
    direct_vm.mock_web("api.nhtsa.gov/direct", {"status": 200, "body": body})
    direct_vm.mock_llm("AFFECT", '{"verdict":"AFFECTED","reason":"exact model"}')
    recall = contract.create_recall("Semantic", "https://api.nhtsa.gov/direct", digest, "exact model")
    contract.seal_recall(recall)
    assert contract.assess_component(recall, leaf) == "AFFECTED"
    first = contract.propagate(recall, 1)
    assert first["complete"] is False
    contract.propagate(recall, 8)
    assert contract.get_component(parent)["active_recall_count"] == 1
    assert contract.can_release(parent) is False
