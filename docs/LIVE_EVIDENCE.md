# StudioNet evidence

## Current canonical deployment

Contract: `0x18D0f312C127542Ca443f8f065c679B5938b7de3`

| Operation | Transaction | Observed result |
|---|---|---|
| Deploy exact `contracts/nubile.py` | `0x685e12497f7f9ebf85d0d2b1cbc2985c8b6fd452ea4a0893f93cfdf7c03c901c` | FINALIZED, MAJORITY_AGREE, GenVM SUCCESS, source SHA-256 `d93cd0089abf2e359c1c4a125db9378c224658b270d24055f57dd5c05365caa8` |
| Register component 1 | `0xa7e6da4a02cd6e96be3931aa76c35021754012f78437fedf718819a99aa6e505` | FINALIZED, MAJORITY_AGREE |
| Register component 2 | `0xac796137a918996e8af63d2155ecb586069adcfa2959c766625c1694368ce0cc` | FINALIZED, MAJORITY_AGREE |
| Add parent 2 -> child 1 | `0x4166781466ff62fb5cc7334c57adaf87a9094425916770f4e7339fa2adb0e93e` | FINALIZED, MAJORITY_AGREE |
| Create recall 1 | `0x7a5e7e02fcfa147e10590df39350d325dda0b40d918150419e0d5754a3997762` | FINALIZED, MAJORITY_AGREE |
| Seal recall 1 | `0xd748740e45d7b80ba6396315c1b9c965f40bab3ce7f7666f078f8ca5fc507a3c` | FINALIZED, MAJORITY_AGREE; graph frozen |
| Assess component 1 against recall 1 | `0x736b9ac7a088dcf3ba08e2a3dc2ab8c95c309f9050de2b13e94efade12cb3b3d` | LIVE SEMANTIC ATTEMPT — FAIL-CLOSED / NOT PROVEN |

Canonical post-seal reads showed `graph_frozen=true`, two registered components,
one recall, parent relation `[2]` for component 1, and recall 1 sealed. The
semantic attempt did not record `AFFECTED`: `get_finding(1,1)` returned
`verdict=0`, `active_cause=false`; component 1 remained at
`active_recall_count=0`, `quarantined=false`; and `can_release(1)=true`.
No propagation transaction was run.

The finalized receipt did not expose the validator failure payload. The trace
attempt returned `Method not found: gen_dbg_traceTransaction`. The result is
therefore fail-closed and not a successful semantic lifecycle. Do not treat the
NHTSA fixture as live adjudication or retry the same source as proof.

## Historical deployments

Earlier deployments and their writes are historical evidence only:

- `0x53D66e8f27DE1ef60120a51eF78F2d38f81422d9`, deployment
  `0x7b7baecaa4957515361dde769d1d74aac9a7f9e9b7cc9e10b00c004465d64bac`.
- `0x393D5D20538c8eAb18576eBC63aaAFfd42e1Fa84`, deployment
  `0x12c7f33abcd89d4cc4c08828355899b4763a4cbe8b84cb96b18360f7c86c7dca`.

Their transaction hashes and stale reads must not be used as evidence for the
current canonical address.
