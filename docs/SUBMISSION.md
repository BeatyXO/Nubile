# Submission evidence

Live app: https://nubile-psi.vercel.app/

Canonical StudioNet contract: `0xc53ea93EC011C4f8a54495bF6825e330f8475e00`

| Requirement | Evidence | Classification |
|---|---|---|
| Narrow consensus semantic boundary | `contracts/nubile.py`, Direct Mode semantic tests | PROVEN STATIC + PROVEN DIRECT |
| Trusted authority validation | `_trusted_authority`, Direct Mode tests | PROVEN STATIC + PROVEN DIRECT |
| Exact source SHA binding | `_fetch_exact`, hash checks, Direct Mode tests | PROVEN STATIC + PROVEN DIRECT |
| DAG cycle and parent authorization | Direct Mode graph tests | PROVEN DIRECT |
| Fanout/topology guards | contract guards + static suite | PROVEN STATIC |
| Multi-cause quarantine accounting | `recall_active`, `active_recall_count`, `can_release` | PROVEN STATIC |
| Bounded propagation and replay safety | Direct Mode propagation tests | PROVEN DIRECT |
| Clearance state machine and bounded cursor | contract guards + static suite | PROVEN STATIC |
| Frontend no-fake state | `NubileApp.tsx`, source-integrity tests | PROVEN STATIC |
| Transaction finality reconciliation | `submitAndReconcile`, frontend tests | PROVEN STATIC |
| Real recall corpus | `fixtures/recalls/MANIFEST.md`, checked-in NHTSA capture | PROVEN STATIC (fixture capture; not live adjudication) |
| Direct Mode contract behavior | `tests/direct/test_direct_mode.py` | PROVEN DIRECT (11 passed) |
| Static source inspection suite | `tests/direct/test_pure_helpers.py` | PROVEN STATIC (18 passed) |
| StudioNet deployment | `DEPLOYMENT.json`, `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Callable schema and source parity | `genlayer code/schema`, SHA-256 `70d2acb782f83106e6555f92138d0bb65581c153db36ed55f9ce465d64b9635e` | PROVEN LIVE |
| Canonical deterministic lifecycle | Fresh canonical hashes in `docs/LIVE_EVIDENCE.md` | PROVEN LIVE |
| Historical semantic fail-closed attempt | assessment tx + post-attempt reads on prior deployment | OBSERVED LIVE (FAIL-CLOSED; NOT SEMANTIC SUCCESS) |
| Live semantic adjudication on current canonical deployment | requires validator-accessible authoritative source | NOT PROVEN / EXTERNALLY CONSTRAINED |
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
