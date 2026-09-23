import json
import pathlib
import re

SOURCE = (pathlib.Path(__file__).parents[2] / "contracts" / "nubile.py").read_text("utf-8")


def test_contract_declares_narrow_semantic_verdicts():
    assert '"AFFECTED" | "NOT_AFFECTED" | "INCONCLUSIVE"' in SOURCE
    assert '"CLEARED" | "STILL_AFFECTED" | "INCONCLUSIVE"' in SOURCE


def test_missing_external_source_is_not_encoded_as_negative():
    block = SOURCE[SOURCE.index("def _fetch_exact"):SOURCE.index("def _semantic", SOURCE.index("def _fetch_exact"))]
    assert "external source unavailable" in block
    assert "NOT_AFFECTED" not in block
    assert "CLEARED" not in block


def test_release_is_derived_from_active_recall_count():
    block = SOURCE[SOURCE.index("def can_release"):SOURCE.index("def stats")]
    assert "active_recall_count" in block
    assert "== 0" in block


def test_clearance_is_deliberately_fail_closed_until_proven():
    block = SOURCE[SOURCE.index("def finalize_clearance"):SOURCE.index("@gl.public.view", SOURCE.index("def finalize_clearance"))]
    assert "requires completed Direct Mode proof" in block
    assert "raise gl.vm.UserError" in block


def test_no_backend_or_fake_deployment_constants_in_contract():
    assert "CONTRACT_ADDRESS" not in SOURCE
    assert "localhost" not in SOURCE
