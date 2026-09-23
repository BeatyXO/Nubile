# StudioNet evidence

Canonical deployment: `0x53D66e8f27DE1ef60120a51eF78F2d38f81422d9`

| Operation | Transaction | Observed result |
|---|---|---|
| Deploy exact `contracts/nubile.py` | `0x7b7baecaa4957515361dde769d1d74aac9a7f9e9b7cc9e10b00c004465d64bac` | FINALIZED, MAJORITY_AGREE, GenVM SUCCESS, 5 validators, source SHA-256 `599cf6f9c3c0c576fce638d2be73fa3ddcdb2e94a9407af79642ebd043b80e95` |
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

The old address and its writes are historical only. The new canonical
deployment is source-parity verified, but applicability, propagation, and
clearance remain NOT PROVEN because the validator web boundary must permit the
authoritative source fetch for a successful semantic assessment.
