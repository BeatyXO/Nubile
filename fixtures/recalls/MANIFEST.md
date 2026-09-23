# Recall evidence corpus

This directory separates public evidence from synthetic controls. A manifest
entry is not contract proof until its exact bytes are captured and hashed.

## REAL CAPTURE

| ID | Authoritative source | Relationship | Capture status |
|---|---|---|---|
| `cpsc-polaris-ranger-2025-2026` | https://www.cpsc.gov/Recalls/2026/Polaris-Industries-Recalls-Model-Year-2025-2026-Ranger-XP-1000-NorthStar-and-Crew-NorthStar-Recreational-Off-Road-Vehicles-ROVs-Due-to-Risk-of-Serious-Injury-from-Fire-Hazard | Exact model-year family in scope; adjacent models are outside scope unless named by the notice | URL recorded; exact-byte capture pending |
| `cpsc-brp-skidoo-lynx-2025` | https://www.cpsc.gov/Recalls/2025/Bombardier-Recreational-Products-BRP-Recalls-Ski-Doo-and-Lynx-Snowmobiles-Due-to-Crash-Hazard | Named 2025 model families and engine variants in scope | URL recorded; exact-byte capture pending |
| `nhtsa-toyota-camry-2020` | https://api.nhtsa.gov/recalls/recallsByVehicle?make=Toyota&model=Camry&modelYear=2020 | 2020 Toyota Camry appears in campaigns 20V682000, 20V064000, and 23V865000; adjacent models are explicitly named in the response | Captured JSON checked in; retrieval SHA-256 `5ed45bc7a6de116ad93fa048074d88e3a96967d7336bf6bc2828e0538b403759`; checked-in UTF-8 file SHA-256 `6eb923975fdd573c3771a91bc1d650c9a8f9ae87d0efa8e325fcb0efb842ca8e` |

These are real public notices, but this repository does not claim a frozen
bulletin hash for them until a reproducible byte capture is checked in.

## SYNTHETIC CONTROL

The Direct Mode suite should use local deterministic fixtures for exact-byte
tests: affected, adjacent/out-of-range, ambiguous, malformed identifier,
unavailable source, hash mismatch, prompt injection, and clearance outcomes.
Synthetic controls are protocol tests only and are never evidence that a real
recall was adjudicated.
