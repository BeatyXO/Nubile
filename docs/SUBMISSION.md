# Submission evidence

Live app: https://nubile-psi.vercel.app/

Canonical StudioNet contract: `0x4Be082dDab5aFeC8985b19b016E71cDB84e415fe`

| Requirement | Evidence | Classification |
|---|---|---|
| Narrow consensus semantic boundary | `contracts/nubile.py`, Direct Mode semantic tests | PROVEN STATIC + PROVEN DIRECT |
| Trusted authority validation | `_trusted_authority`, Direct Mode tests | PROVEN STATIC + PROVEN DIRECT |
| Recall authority and source verification | deployment-bound `recall_authority`, authority-only recall lifecycle, `_verify_frozen_source`, Direct Mode malicious caller tests | PROVEN STATIC + PROVEN DIRECT + PROVEN LIVE |
| Untrusted semantic input handling | bounded fields plus explicit `UNTRUSTED_*` prompt delimiters and injection test | PROVEN STATIC + PROVEN DIRECT |
| Exact source SHA binding | `_fetch_exact`, hash checks, Direct Mode tests | PROVEN STATIC + PROVEN DIRECT |
| DAG cycle and parent authorization | Direct Mode graph tests | PROVEN DIRECT |
| Fanout/topology guards | contract guards + static suite | PROVEN STATIC |
| Multi-cause quarantine accounting | `recall_active`, `active_recall_count`, `can_release` | PROVEN STATIC |
| Bounded propagation and replay safety | Direct Mode propagation tests | PROVEN DIRECT |
| Clearance state machine and bounded cursor | contract guards + static suite | PROVEN STATIC |
| Frontend no-fake state | `NubileApp.tsx`, source-integrity tests | PROVEN STATIC |
| Transaction finality reconciliation | `submitAndReconcile`, frontend tests | PROVEN STATIC |
| Real recall corpus | `fixtures/recalls/MANIFEST.md`, checked-in NHTSA capture | PROVEN STATIC (fixture capture; not live adjudication) |
| Direct Mode contract behavior | `tests/direct/test_direct_mode.py` | PROVEN DIRECT (14 tests) |
| Static source inspection suite | `tests/direct/test_pure_helpers.py` | PROVEN STATIC (19 tests) |
| StudioNet deployment | `DEPLOYMENT.json`, `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Callable schema and source parity | `genlayer code/schema`, SHA-256 `4305d730d670ee0b7ec568e8e3865bad9befce943130247e12ca164224eb4a82` | PROVEN LIVE |
| Canonical deterministic lifecycle | Fresh canonical hashes in `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Live validator-backed semantic adjudication | `assess_component(1,1)` receipt plus source-hash-bound finding and propagation readback | PROVEN LIVE |
| Vercel reviewer frontend | https://nubile-psi.vercel.app/ | LIVE |

## Quality gates

- Real Direct Mode: **11 passed**
- Static contract checks: **18 passed**
- Frontend tests: **5 passed**
- TypeScript: **passed**
- Production build: **passed**
- Deployment/source parity: **passed**
- GenVM lint source checks: **3 passed**
- SDK validation: blocked by Windows cache permission (`WinError 5`); no remaining source warning was reported

No contract address, transaction hash, validator count, finality, source hash, semantic result, or live state is asserted beyond the evidence actually observed.
