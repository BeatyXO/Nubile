# StudioNet evidence

Canonical deployment: `0x393D5D20538c8eAb18576eBC63aaAFfd42e1Fa84`

| Operation | Transaction | Observed result |
|---|---|---|
| Deploy exact `contracts/nubile.py` | `0x12c7f33abcd89d4cc4c08828355899b4763a4cbe8b84cb96b18360f7c86c7dca` | FINALIZED, MAJORITY_AGREE, GenVM SUCCESS, 5 validator agreements |
| Register leaf component (component 1) | `0xb59833633b42cdeb7423b454043bb59be81b37b3d5b795bc446ab23a0a477d77` | FINALIZED, MAJORITY_AGREE, return `1` |
| Register parent component (component 2) | `0xe9dbe553c3dbd85c66c40eff884dd1844f7e628e5e902f4170a810b7a489d444` | FINALIZED, MAJORITY_AGREE, return `2` |
| Add parent `2` -> child `1` | `0x699567de17cef88e76e655100fb83f77f6c9662a3358c9c3304e59d65e41c612` | FINALIZED, MAJORITY_AGREE |
| Create NHTSA-backed recall (recall 1) | `0x403e00234497ad282136c47050700b1ccbb454375db4f3f1115ff66ff2e8f41a` | FINALIZED, MAJORITY_AGREE, return `1` |
| Seal recall 1 | `0xbd81a5b186f937bb9c5f496d8d0d192c82e76678edf63fc17cb776f08b070579` | NOT PROVEN: validator web boundary returned `SystemError: 6: forbidden`; contract did not advance the recall |

The NHTSA API response used for the recall record was captured locally at
`https://api.nhtsa.gov/recalls/recallsByVehicle?make=Toyota&model=Camry&modelYear=2020`
with SHA-256
`5ed45bc7a6de116ad93fa048074d88e3a96967d7336bf6bc2828e0538b403759`.
The source is real public evidence, but the validator sandbox refusal means it
was not adjudicated live and must not be described as a completed recall proof.
