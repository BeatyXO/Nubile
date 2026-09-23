# Submission evidence

| Requirement | Evidence | Classification |
|---|---|---|
| Narrow consensus semantic boundary | `contracts/nubile.py` prompts and validator | PROVEN STATIC |
| Frozen source URL and SHA-256 | `_fetch_exact`, seal-time fetch, validator re-fetch | PROVEN STATIC |
| DAG cycle and fanout safety | `_would_create_cycle`, bounded adjacency | PROVEN STATIC |
| Multi-cause quarantine | `recall_active`, `active_recall_count`, `can_release` | PROVEN STATIC |
| Clearance recomputation | `_recompute_reached`, `finalize_clearance` | PROVEN DIRECT (static Direct Mode suite currently limited) |
| Frontend no-fake empty state | `NubileApp.tsx`, source-integrity tests | PROVEN DIRECT |
| Transaction finality reconciliation | `submitAndReconcile`, frontend tests | PROVEN DIRECT |
| Real recall corpus | `fixtures/recalls/MANIFEST.md` | NOT PROVEN (exact bytes not yet checked in) |
| Full 30-case Direct Mode matrix | `tests/direct/` | NOT PROVEN |
| StudioNet deployment | `DEPLOYMENT.json` | NOT PROVEN |
| Live lifecycle | No canonical transaction records yet | NOT PROVEN |

No contract address, transaction hash, validator count, finality, source hash,
or live result is asserted until independently observed.
