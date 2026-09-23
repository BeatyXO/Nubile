# StudioNet evidence

## Current canonical deployment

Contract: `0xc53ea93EC011C4f8a54495bF6825e330f8475e00`

| Operation | Transaction | Observed result |
|---|---|---|
| Deploy exact `contracts/nubile.py` | `0xb4f6f2f245d39184cc4eb9bee6886170ffb9c00c0378ee78506dbabafcdfa526` | FINALIZED, MAJORITY_AGREE, GenVM SUCCESS, source SHA-256 `70d2acb782f83106e6555f92138d0bb65581c153db36ed55f9ce465d64b9635e` |
No post-deployment lifecycle has been claimed for this replacement address yet.

## Historical deployments

Earlier deployments and their writes are historical evidence only, including the
following lifecycle on `0x18D0f312C127542Ca443f8f065c679B5938b7de3`:

- Register 1: `0xa7e6da4a02cd6e96be3931aa76c35021754012f78437fedf718819a99aa6e505`.
- Register 2: `0xac796137a918996e8af63d2155ecb586069adcfa2959c766625c1694368ce0cc`.
- Add containment: `0x4166781466ff62fb5cc7334c57adaf87a9094425916770f4e7339fa2adb0e93e`.
- Create recall: `0x7a5e7e02fcfa147e10590df39350d325dda0b40d918150419e0d5754a3997762`.
- Seal: `0xd748740e45d7b80ba6396315c1b9c965f40bab3ce7f7666f078f8ca5fc507a3c`.
- Semantic attempt: `0x736b9ac7a088dcf3ba08e2a3dc2ab8c95c309f9050de2b13e94efade12cb3b3d`, FAIL-CLOSED / NOT PROVEN; `verdict=0`, no cause, no propagation.

The finalized semantic receipt did not expose the validator failure payload; the
trace endpoint returned `Method not found: gen_dbg_traceTransaction`. Do not
call this a successful semantic lifecycle.

- `0x53D66e8f27DE1ef60120a51eF78F2d38f81422d9`, deployment
  `0x7b7baecaa4957515361dde769d1d74aac9a7f9e9b7cc9e10b00c004465d64bac`.
- `0x393D5D20538c8eAb18576eBC63aaAFfd42e1Fa84`, deployment
  `0x12c7f33abcd89d4cc4c08828355899b4763a4cbe8b84cb96b18360f7c86c7dca`.

Their transaction hashes and stale reads must not be used as evidence for the
current canonical address.
