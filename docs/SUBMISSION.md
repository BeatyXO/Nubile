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
| Full 30-case Direct Mode matrix | `tests/direct/` | NOT PROVEN |
| StudioNet deployment | `DEPLOYMENT.json`, `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Callable schema and source parity | `genlayer code/schema`, SHA-256 `599cf6f9c3c0c576fce638d2be73fa3ddcdb2e94a9407af79642ebd043b80e95` | PROVEN LIVE |
| Deterministic live registration/BOM/recall writes | `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Live seal, applicability, propagation, and release lifecycle | Seal failed closed at validator web boundary | NOT PROVEN |

No contract address, transaction hash, validator count, finality, source hash,
or live result is asserted until independently observed.
