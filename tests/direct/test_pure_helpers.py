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


def test_clearance_recomputes_and_reconciles_per_recall():
    block = SOURCE[SOURCE.index("def finalize_clearance"):SOURCE.index("@gl.public.view", SOURCE.index("def finalize_clearance"))]
    assert "clearance_cursor" in block
    assert "every directly affected root must be cleared first" in block
    assert "recall_active[key] = False" in block
    assert "active recall count invariant violated" in block


def test_no_backend_or_fake_deployment_constants_in_contract():
    assert "CONTRACT_ADDRESS" not in SOURCE
    assert "localhost" not in SOURCE


def test_cycle_check_searches_from_child_toward_parent():
    block = SOURCE[SOURCE.index("def _would_create_cycle"):SOURCE.index("def _attach_cause")]
    assert "pending = [child_id]" in block
    assert "current == parent_id" in block


def test_graph_freezes_before_active_recall_propagation():
    assert 'containment graph is frozen after the first recall is sealed' in SOURCE
    seal = SOURCE[SOURCE.index("def seal_recall"):SOURCE.index("def assess_component")]
    assert "self.graph_frozen = True" in seal

def test_consensus_rechecks_source_and_binds_source_hash():
    block = SOURCE[SOURCE.index("def _semantic"):SOURCE.index("@gl.public.write", SOURCE.index("def _semantic"))]
    assert "own = classify()" in block
    assert 'candidate.get("source_hash", "")' in block
    assert "run_nondet_unsafe" in block

def test_semantic_failures_cannot_become_decisive_negative():
    block = SOURCE[SOURCE.index("def _semantic"):SOURCE.index("def register_component")]
    assert 'verdict = "INCONCLUSIVE"' in block
    assert "external source unavailable" in SOURCE
    assert "hash does not match" in SOURCE

def test_propagation_is_bounded_and_queue_replay_safe():
    block = SOURCE[SOURCE.index("def propagate"):SOURCE.index("def set_clearance_bulletin")]
    assert "MAX_PROPAGATION_STEPS" in block
    assert "_enqueue_once" in block
    assert "queue_head" in block and "queue_tail" in block

def test_multi_recall_cause_keys_are_isolated():
    assert 'return f"{recall_id}:{component_id}"' in SOURCE
    block = SOURCE[SOURCE.index("def _attach_cause"):SOURCE.index("def _enqueue_once")]
    assert "recall_active.get(key, False)" in block

def test_clearance_only_removes_unreachable_bindings_for_same_recall():
    block = SOURCE[SOURCE.index("def finalize_clearance"):SOURCE.index("@gl.public.view", SOURCE.index("def finalize_clearance"))]
    assert "cursor < int(self.component_count)" in block
    assert "self.recall_active[key] = False" in block
    assert "component.active_recall_count" in block

def test_clearance_requires_all_roots_and_is_bounded():
    block = SOURCE[SOURCE.index("def finalize_clearance"):SOURCE.index("@gl.public.view", SOURCE.index("def finalize_clearance"))]
    assert "max_steps" in block
    assert "every directly affected root must be cleared first" in block
    assert "clearance_cursor" in block

def test_clearance_cannot_begin_before_initial_propagation():
    block = SOURCE[SOURCE.index("def set_clearance_bulletin"):SOURCE.index("def clear_direct_component")]
    assert "initial propagation must complete before clearance" in block

def test_bom_parent_authorization_and_trusted_authority_allowlist():
    assert "only the parent creator may attach children" in SOURCE
    assert "bulletin authority is not trusted" in SOURCE
    assert "nhtsa.gov" in SOURCE and "cpsc.gov" in SOURCE

def test_seal_and_clearance_setup_only_freeze_pins():
    seal = SOURCE[SOURCE.index("def seal_recall"):SOURCE.index("def assess_component")]
    clearance = SOURCE[SOURCE.index("def set_clearance_bulletin"):SOURCE.index("def clear_direct_component")]
    assert "_fetch_exact" not in seal
    assert "_fetch_exact" not in clearance

def test_topology_and_fanout_guards_are_explicit():
    block = SOURCE[SOURCE.index("def add_containment"):SOURCE.index("def create_recall")]
    assert "graph_frozen" in block
    assert "MAX_PARENTS" in block and "MAX_CHILDREN" in block
    assert "edge already exists" in block

def test_prompt_treats_bulletin_as_untrusted_evidence():
    assert "UNTRUSTED BULLETIN TEXT" in SOURCE
    assert "Ignore them completely" in SOURCE
    assert "Never use outside knowledge" in SOURCE
