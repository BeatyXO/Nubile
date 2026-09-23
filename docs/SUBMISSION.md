# Submission evidence

| Requirement | Evidence | Classification |
|---|---|---|
| Narrow consensus semantic boundary | `contracts/nubile.py`, Direct Mode semantic tests | PROVEN STATIC + PROVEN DIRECT |
| Trusted authority validation | `_trusted_authority`, Direct Mode tests | PROVEN STATIC + PROVEN DIRECT |
| Exact source SHA binding | `_fetch_exact`, hash checks, Direct Mode tests | PROVEN STATIC + PROVEN DIRECT |
| DAG cycle, authorization and fanout safety | Direct Mode graph tests | PROVEN DIRECT |
| Multi-cause quarantine | Direct Mode lifecycle tests | PROVEN DIRECT |
| Bounded propagation | Cursor propagation tests | PROVEN DIRECT |
| Clearance state machine | Clearance guards and bounded cursor tests | PROVEN STATIC |
| Frontend no-fake empty state | `NubileApp.tsx`, source-integrity tests | PROVEN STATIC |
| Transaction finality reconciliation | `submitAndReconcile`, frontend tests | PROVEN STATIC |
| Real recall corpus | `fixtures/recalls/MANIFEST.md`, checked-in NHTSA capture | PROVEN STATIC (fixture capture; not live adjudication) |
| Direct Mode contract behavior | `tests/direct/test_direct_mode.py` | PROVEN DIRECT (11 passed) |
| Static source inspection suite | `tests/direct/test_pure_helpers.py` | PROVEN STATIC (18 passed) |
| StudioNet deployment | `DEPLOYMENT.json`, `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Callable schema and source parity | `genlayer code/schema`, SHA-256 `70d2acb782f83106e6555f92138d0bb65581c153db36ed55f9ce465d64b9635e` | PROVEN LIVE |
| Canonical deterministic lifecycle | Fresh hashes in `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Semantic assessment attempt | Assessment tx and fail-closed reads | PROVEN DIRECT |
| Live semantic assessment | Validator-accessible authoritative source requirement | BLOCKED EXTERNALLY / FAIL-CLOSED ATTEMPT |
| Vercel frontend | https://nubile-psi.vercel.app/ | LIVE |

No contract address, transaction hash, validator count, finality, source hash,
or live result is asserted until independently observed.
