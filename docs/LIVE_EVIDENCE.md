# StudioNet evidence

## Current canonical deployment

Contract: `0xc53ea93EC011C4f8a54495bF6825e330f8475e00`

Deployment source commit: `7932e021611cb7bc5f48b59072a61b84887588f6`

Source SHA-256: `70d2acb782f83106e6555f92138d0bb65581c153db36ed55f9ce465d64b9635e`

| Operation | Transaction | Observed result |
|---|---|---|
| Deploy exact `contracts/nubile.py` | `0xb4f6f2f245d39184cc4eb9bee6886170ffb9c00c0378ee78506dbabafcdfa526` | FINALIZED, MAJORITY_AGREE, GenVM SUCCESS; deployed source/schema parity verified |
| Register component 1 | `0x8da6cef19c23aa423e09ad77e1b8dd746b02df8af37c8f6ff5db04598ded520f` | FINALIZED, component 1 |
| Register component 2 | `0x16a04f9c162dd1dd84397a7a747b69d9561c2143c3e1aeb1aa14f38433a5ca60` | FINALIZED, component 2 |
| Add parent 2 → child 1 | `0x079ffc29f2e769c2a8c7ec58d4c85c7273c57e57e534484bd010bebfa26fcdf2` | FINALIZED, MAJORITY_AGREE |
| Create recall 1 | `0x3deacf2dc1ca232608e7e139e173f6e7a21326b17f9dddb4e98321b8b4cec20a` | FINALIZED, recall 1 |
| Seal recall 1 | `0xcc44aa0d7a6a79a9e49057738409d7dc79d2dce7e6f82fe1b5e12bd31602c0c8` | FINALIZED |

Fresh post-seal reads on this canonical address:

- `stats()` → `components=2`, `recalls=1`, `graph_frozen=true`
- `get_parents(1)` → `[2]`
- `get_recall(1)` → `status=2 (ACTIVE)`, queue `0/0`, impacted `0`, with the frozen authoritative URL and SHA-256

This proves the current deployment's deterministic lifecycle through recall sealing. No semantic success is claimed for the current canonical address without a completed validator-backed authoritative-source assessment.

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
