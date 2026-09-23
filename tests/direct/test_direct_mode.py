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


def test_direct_duplicate_external_key_reverts(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    contract.register_component("duplicate-key", "One", "part", "id=1")
    with direct_vm.expect_revert("external_key already exists"):
        contract.register_component("duplicate-key", "Two", "part", "id=2")


def test_direct_transitive_dag_edge_is_allowed(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    root = contract.register_component("root", "Root", "product", "r")
    middle = contract.register_component("middle", "Middle", "assembly", "m")
    leaf = contract.register_component("leaf", "Leaf", "part", "l")
    contract.add_containment(root, middle)
    contract.add_containment(middle, leaf)
    contract.add_containment(root, leaf)
    assert contract.get_children(root) == [middle, leaf]


def test_direct_unavailable_source_fails_closed(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    component = contract.register_component("unavailable", "Unit", "part", "u")
    digest = hashlib.sha256(b"source").hexdigest()
    recall = contract.create_recall("Unavailable", "https://api.nhtsa.gov/unavailable", digest, "u")
    contract.seal_recall(recall)
    direct_vm.mock_web("api.nhtsa.gov/unavailable", {"status": 503, "body": ""})
    with direct_vm.expect_revert():
        contract.assess_component(recall, component)
    assert contract.get_finding(recall, component)["verdict"] == 0


def test_direct_digest_mismatch_fails_closed(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    component = contract.register_component("mismatch", "Unit", "part", "m")
    recall = contract.create_recall("Mismatch", "https://api.nhtsa.gov/mismatch", "0" * 64, "m")
    contract.seal_recall(recall)
    direct_vm.mock_web("api.nhtsa.gov/mismatch", {"status": 200, "body": "wrong bytes"})
    with direct_vm.expect_revert():
        contract.assess_component(recall, component)
    assert contract.can_release(component) is True


def test_direct_not_affected_is_not_a_cause(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    component = contract.register_component("outside", "Unit", "part", "outside")
    body = b"outside"
    digest = hashlib.sha256(body).hexdigest()
    recall = contract.create_recall("Outside", "https://api.nhtsa.gov/outside", digest, "outside")
    contract.seal_recall(recall)
    direct_vm.mock_web("api.nhtsa.gov/outside", {"status": 200, "body": body})
    direct_vm.mock_llm("Return strict JSON", '{"verdict":"NOT_AFFECTED","reason":"outside"}')
    assert contract.assess_component(recall, component) == "NOT_AFFECTED"
    assert contract.can_release(component) is True


def test_direct_inconclusive_is_not_a_cause(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    component = contract.register_component("ambiguous", "Unit", "part", "ambiguous")
    body = b"ambiguous"
    recall = contract.create_recall("Ambiguous", "https://api.nhtsa.gov/ambiguous", hashlib.sha256(body).hexdigest(), "ambiguous")
    contract.seal_recall(recall)
    direct_vm.mock_web("api.nhtsa.gov/ambiguous", {"status": 200, "body": body})
    direct_vm.mock_llm("Return strict JSON", '{"verdict":"INCONCLUSIVE","reason":"ambiguous"}')
    assert contract.assess_component(recall, component) == "INCONCLUSIVE"
    assert contract.can_release(component) is True


def test_direct_clearance_requires_completed_propagation(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    component = contract.register_component("clear-gate", "Unit", "part", "c")
    digest = hashlib.sha256(b"clear").hexdigest()
    recall = contract.create_recall("Clear gate", "https://api.nhtsa.gov/clear", digest, "c")
    contract.seal_recall(recall)
    direct_vm.mock_web("api.nhtsa.gov/clear", {"status": 200, "body": b"clear"})
    direct_vm.mock_llm("Return strict JSON", '{"verdict":"AFFECTED","reason":"exact"}')
    contract.assess_component(recall, component)
    with direct_vm.expect_revert("initial propagation must complete"):
        contract.set_clearance_bulletin(recall, "https://api.nhtsa.gov/clear-later", digest)
    assert component == 1


def test_direct_repeated_propagation_is_idempotent(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/nubile.py")
    direct_vm.sender = direct_alice
    component = contract.register_component("repeat", "Unit", "part", "r")
    body = b"repeat"
    recall = contract.create_recall("Repeat", "https://api.nhtsa.gov/repeat", hashlib.sha256(body).hexdigest(), "r")
    contract.seal_recall(recall)
    direct_vm.mock_web("api.nhtsa.gov/repeat", {"status": 200, "body": body})
    direct_vm.mock_llm("Return strict JSON", '{"verdict":"AFFECTED","reason":"exact"}')
    contract.assess_component(recall, component)
    first = contract.propagate(recall, 64)
    second = contract.propagate(recall, 64)
    assert first["complete"] is True and second["complete"] is True
    assert contract.get_component(component)["active_recall_count"] == 1
