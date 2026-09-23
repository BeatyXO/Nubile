# Submission evidence

| Requirement | Evidence | Classification |
|---|---|---|
| Narrow consensus semantic boundary | `contracts/nubile.py` prompts and validator | PROVEN STATIC |
| Frozen source URL and SHA-256 | `_fetch_exact`, consensus semantic re-fetch, hash check | PROVEN STATIC |
| DAG cycle and fanout safety | `_would_create_cycle`, bounded adjacency | PROVEN STATIC |
| Multi-cause quarantine | `recall_active`, `active_recall_count`, `can_release` | PROVEN STATIC |
| Clearance root gating and bounded reconciliation | `clear_direct_component`, `finalize_clearance(max_steps)` | PROVEN STATIC |
| Frontend no-fake empty state | `NubileApp.tsx`, source-integrity tests | PROVEN STATIC |
| Transaction finality reconciliation | `submitAndReconcile`, frontend tests | PROVEN STATIC |
| Real recall corpus | `fixtures/recalls/MANIFEST.md`, checked-in NHTSA capture | PROVEN STATIC (fixture capture; not live adjudication) |
| Direct Mode contract behavior | `tests/direct/test_direct_mode.py` | PROVEN DIRECT (3 passed) |
| Static source inspection suite | `tests/direct/test_pure_helpers.py` | PROVEN STATIC (18 passed) |
| StudioNet deployment | `DEPLOYMENT.json`, `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Callable schema and source parity | `genlayer code/schema`, SHA-256 `d93cd0089abf2e359c1c4a125db9378c224658b270d24055f57dd5c05365caa8` | PROVEN LIVE |
| Deterministic live registration/BOM/recall/seal lifecycle | Fresh hashes in `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Live semantic applicability, propagation, and release lifecycle | Validator-accessible source requirement | BLOCKED EXTERNALLY |

No contract address, transaction hash, validator count, finality, source hash,
or live result is asserted until independently observed.
