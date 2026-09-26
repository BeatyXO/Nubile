# StudioNet evidence

## Current canonical deployment

Contract: `0x4Be082dDab5aFeC8985b19b016E71cDB84e415fe`

Deployment source commit: `87e5bc396d405bc32228596ed3b5809fa2d899dd`

Source SHA-256: `4305d730d670ee0b7ec568e8e3865bad9befce943130247e12ca164224eb4a82`

| Operation | Transaction | Observed result |
|---|---|---|
| Deploy exact `contracts/nubile.py` | `0x93b9a25a7d7d594b6ad32e87e7cf9759ba48ae40dde3db82e7a0d2a880014e9a` | FINALIZED, 5/5 validators agree, GenVM SUCCESS |
| Register component 1 | `0xe9e66a788f85a82137d28db122413d78b178f78ad5b76cf50d42186257b8af72` | FINALIZED, component 1 |
| Create recall 1 | `0x8347096c676c2f154e26c80043e5b0e8fe38ffdd7b022d384f79fa79d541795b` | FINALIZED, authority-controlled recall 1 |
| Seal recall 1 | `0x8246c013be80b546c0f056b2d5b5f082880dc0d7c693781c4ad05231d636af9d` | FINALIZED, source hash verified by validator consensus |
| Assess component 1 | `0x7152d7781f5b6ad1f49296316cf88bb91ba98dab4206341d72a780ba0a5d9f1a` | FINALIZED, validator-backed `AFFECTED`, source hash bound |
| Propagate recall 1 | `0x40e7dfe3d6ab99c0f802170d102e8a62ea33ff19b9142cf48cb48a6803ac14b6` | FINALIZED, queue complete, impacted count 1 |

Fresh post-seal reads on this canonical address:

- `stats()` → `components=1`, `recalls=1`, `graph_frozen=true`
- `get_finding(1,1)` → `verdict=1 (AFFECTED)`, `active_cause=true`, source hash `5ed45bc7a6de116ad93fa048074d88e3a96967d7336bf6bc2828e0538b403759`
- `get_recall(1)` → `status=2 (ACTIVE)`, `source_verified=true`, queue `1/1`, impacted `1`

This proves the hardened authority gate, validator-backed source verification and applicability assessment, deterministic propagation, and post-write state readback on the current canonical address.

## Historical semantic attempt

On the prior deployment `0x18D0f312C127542Ca443f8f065c679B5938b7de3`, a real semantic assessment was submitted:

- `assess_component(1,1)`: `0x736b9ac7a088dcf3ba08e2a3dc2ab8c95c309f9050de2b13e94efade12cb3b3d`
- Post-attempt `get_finding(1,1)`: `verdict=0`, `active_cause=false`
- Component 1 remained `active_recall_count=0`, `quarantined=false`
- `can_release(1)=true`
- No propagation transaction was run

The finalized receipt did not expose the validator failure payload, and the trace endpoint returned `Method not found: gen_dbg_traceTransaction`. The attempt is therefore retained only as **fail-closed evidence**, not as proof of successful semantic adjudication.

## Historical deployments

The following addresses are historical and must not be used as the current canonical deployment:

- `0x18D0f312C127542Ca443f8f065c679B5938b7de3` — deployment `0x685e12497f7f9ebf85d0d2b1cbc2985c8b6fd452ea4a0893f93cfdf7c03c901c`
- `0x53D66e8f27DE1ef60120a51eF78F2d38f81422d9` — deployment `0x7b7baecaa4957515361dde769d1d74aac9a7f9e9b7cc9e10b00c004465d64bac`
- `0x393D5D20538c8eAb18576eBC63aaAFfd42e1Fa84` — deployment `0x12c7f33abcd89d4cc4c08828355899b4763a4cbe8b84cb96b18360f7c86c7dca`
