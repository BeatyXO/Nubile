# StudioNet evidence

Canonical deployment: `0x18D0f312C127542Ca443f8f065c679B5938b7de3`

| Operation | Transaction | Observed result |
|---|---|---|
| Deploy exact `contracts/nubile.py` | `0x685e12497f7f9ebf85d0d2b1cbc2985c8b6fd452ea4a0893f93cfdf7c03c901c` | FINALIZED, MAJORITY_AGREE, GenVM SUCCESS, 5 validators, source SHA-256 `d93cd0089abf2e359c1c4a125db9378c224658b270d24055f57dd5c05365caa8` |
| Register leaf component (component 1) | `0xa7e6da4a02cd6e96be3931aa76c35021754012f78437fedf718819a99aa6e505` | FINALIZED, MAJORITY_AGREE |
| Register parent component (component 2) | `0xac796137a918996e8af63d2155ecb586069adcfa2959c766625c1694368ce0cc` | FINALIZED, MAJORITY_AGREE |
| Add parent `2` -> child `1` | `0x4166781466ff62fb5cc7334c57adaf87a9094425916770f4e7339fa2adb0e93e` | FINALIZED, MAJORITY_AGREE |
| Create canonical recall (recall 1) | `0x7a5e7e02fcfa147e10590df39350d325dda0b40d918150419e0d5754a3997762` | FINALIZED, MAJORITY_AGREE |
| Seal canonical recall | `0xd748740e45d7b80ba6396315c1b9c965f40bab3ce7f7666f078f8ca5fc507a3c` | FINALIZED, MAJORITY_AGREE; graph frozen |
| Register leaf component (component 1) | `0xb59833633b42cdeb7423b454043bb59be81b37b3d5b795bc446ab23a0a477d77` | FINALIZED, MAJORITY_AGREE, return `1` |
| Register parent component (component 2) | `0xe9dbe553c3dbd85c66c40eff884dd1844f7e628e5e902f4170a810b7a489d444` | FINALIZED, MAJORITY_AGREE, return `2` |
| Add parent `2` -> child `1` | `0x699567de17cef88e76e655100fb83f77f6c9662a3358c9c3304e59d65e41c612` | FINALIZED, MAJORITY_AGREE |
| Create NHTSA-backed recall (recall 1) | `0x403e00234497ad282136c47050700b1ccbb454375db4f3f1115ff66ff2e8f41a` | FINALIZED, MAJORITY_AGREE, return `1` |
| Seal recall 1 on historical deployment | `0xbd81a5b186f937bb9c5f496d8d0d192c82e76678edf63fc17cb776f08b070579` | Historical attempt failed closed at validator web boundary; not canonical |

Post-write canonical reads were also verified: `stats()` returned
`components=2`, `recalls=1`, `graph_frozen=false`; `get_parents(1)` returned
`[2]`; both components reported `active_recall_count=0`; and `get_recall(1)`
reported `status=1 (DRAFT)`, confirming the failed seal did not partially mutate
the recall.

The NHTSA API response used for the recall record was captured locally at
`https://api.nhtsa.gov/recalls/recallsByVehicle?make=Toyota&model=Camry&modelYear=2020`
with SHA-256
`5ed45bc7a6de116ad93fa048074d88e3a96967d7336bf6bc2828e0538b403759`.
The source is real public evidence, but the validator sandbox refusal means it
was not adjudicated live and must not be described as a completed recall proof.

The previous canonical address and its writes are historical only. The new
canonical lifecycle above has fresh evidence: two components, parent/child
relation `[2]` for leaf `1`, recall `1`, and `graph_frozen=true`. Semantic
applicability, propagation, and clearance remain BLOCKED EXTERNALLY if the
validator web boundary rejects the authoritative source fetch.
