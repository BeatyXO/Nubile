# Codex completion handoff

This repository contains the architecture, product UI, contract groundwork, wallet plumbing, deterministic helper tests, CI scaffold, and documentation. Finish the repository in place; do not redesign NUBILE into a generic AI evidence app.

## Required completion work

1. Audit `contracts/nubile.py` against the currently installed GenLayer SDK and fix only runtime/API incompatibilities.
2. Install dependencies and run GenVM lint / Direct Mode. Expand Direct Mode to exercise every public write and all failure branches.
3. Build a real recall fixture corpus from stable public recall sources. Store exact bytes and SHA-256 manifests. Clearly label synthetic controls.
4. Add nondeterministic test mocks for:
   - AFFECTED
   - NOT_AFFECTED
   - INCONCLUSIVE
   - source unavailable
   - source hash mismatch
   - validator/leader disagreement
   - CLEARED and STILL_AFFECTED clearance results.
5. Prove cycle rejection, convergent DAG idempotency, multi-recall isolation, bounded queue continuation, and clearance propagation.
6. Wire every frontend action to the final contract schema; do not add a backend or fake state. Public reads may work without wallet. Every write must use the injected EIP-1193 wallet.
7. Add served-build browser tests for the main graph, wallet/no-wallet behavior, empty states, and transaction failure states.
8. Run `npm run verify`, GenVM lint, Direct Mode, and production build from a clean clone.
9. Deploy the exact final contract source to StudioNet only after local gates pass.
10. Verify finalized deployment, callable schema, exact source parity, and store the source SHA-256.
11. Exercise a real live lifecycle on the canonical deployment and record only transactions actually observed:
    component registration -> BOM edges -> recall -> seal -> applicability -> propagation -> reads.
12. If practical, exercise a separate real clearance lifecycle.
13. Replace `DEPLOYMENT.json` placeholders only after proof exists and add `docs/SUBMISSION.md` with a strict PROVEN / NOT PROVEN evidence table.
14. Push all completed work to `main`.

## Quality bars

- Never invent a validator count, transaction hash, contract address, source hash, or live result.
- Missing external evidence is never success.
- The model never chooses graph paths, quarantine state, payout, or release eligibility.
- One recall clearing must never clear another.
- Keep the product visually dark-purple / electric-lemon / vivid-pink.
- Preserve the NUBILE name and expansion: Networked Unit Bulletin Impact & Lifecycle Engine.
