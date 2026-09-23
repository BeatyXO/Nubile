# NUBILE

**Networked Unit Bulletin Impact & Lifecycle Engine**

NUBILE is a GenLayer-native recall propagation protocol for composable products.

A public recall bulletin can describe affected models, lots, revisions, production windows, or other natural-language criteria that ordinary smart-contract code cannot safely interpret. NUBILE uses validator consensus only for that narrow semantic applicability question. Once an exact registered component is classified as affected, containment propagation, multi-cause quarantine, clearance reconciliation, replay protection, graph safety, and release eligibility are deterministic contract logic.

## Live submission

- **App:** https://nubile-psi.vercel.app/
- **GitHub:** https://github.com/BeatyXO/Nubile
- **Network:** GenLayer StudioNet
- **Canonical contract:** `0xc53ea93EC011C4f8a54495bF6825e330f8475e00`
- **Deployment tx:** `0xb4f6f2f245d39184cc4eb9bee6886170ffb9c00c0378ee78506dbabafcdfa526`
- **Deployed source SHA-256:** `70d2acb782f83106e6555f92138d0bb65581c153db36ed55f9ce465d64b9635e`

The deployed contract is source/schema parity verified. A fresh deterministic lifecycle on the canonical address proves component registration, BOM containment, recall creation, recall sealing, and graph freeze. The authoritative-source semantic path is separately documented as fail-closed when live validator retrieval cannot complete.

## Why GenLayer

The nondeterministic problem is deliberately narrow: validators decide whether frozen authoritative bulletin bytes apply to one immutable component definition.

Everything downstream is deterministic:

- BOM edges and cycle rejection
- authorization and graph freeze
- recall-cause activation
- bounded propagation
- overlapping recall accounting
- clearance reconciliation
- release eligibility through `can_release`

The model never chooses graph paths, quarantine arithmetic, release state, or ownership.

## Core safety properties

- **Exact-source binding:** semantic assessment uses the frozen HTTPS source and SHA-256.
- **Trusted authorities:** bulletin hosts are restricted deterministically.
- **Fail closed:** unavailable/mismatched sources and inconclusive evidence do not create an affected cause or clearance.
- **Immutable propagation graph:** topology freezes once the first recall is sealed.
- **Permissionless bounded work:** propagation and clearance use bounded continuation calls.
- **Multi-cause accounting:** release eligibility is derived from active recall causes rather than a mutable boolean.

## Reviewer path

1. Open the live app and connect an injected StudioNet wallet.
2. Register a child component and parent product.
3. Create the parent → child BOM relation.
4. Create a recall using an allowed authoritative source, exact SHA-256, and applicability rule.
5. Seal the recall and verify the graph freezes.
6. Use **Assess & Propagate** for semantic assessment and bounded propagation when the authoritative source is validator-accessible.
7. Review live component, recall, quarantine, release, and clearance state from the contract-backed UI.

## Verification snapshot

- Real Direct Mode: **11 passed**
- Static contract checks: **18 passed**
- Frontend tests: **5 passed**
- TypeScript: **passed**
- Production build: **passed**
- Deployment/source parity: **passed**
- GenVM lint source checks: **3 passed**
- SDK lint validation: blocked by a Windows cache-permission error (`WinError 5`), with no remaining source warning

See `docs/SUBMISSION.md` for evidence classification and `docs/LIVE_EVIDENCE.md` for canonical transaction hashes.

## Product boundary

NUBILE is one Intelligent Contract plus a reviewer/operator frontend. There is no canonical backend database, privileged indexer, or hidden administrator deciding quarantine state.

## Repository

```text
contracts/nubile.py          Intelligent Contract
tests/direct/                Direct Mode + static contract verification
frontend/                    Next.js reviewer/operator interface
fixtures/recalls/            Real recall capture and fixture manifest
docs/ARCHITECTURE.md         Protocol design and invariants
docs/TEST_PLAN.md            Adversarial verification plan
docs/LIVE_EVIDENCE.md        Canonical StudioNet lifecycle evidence
docs/SUBMISSION.md           Reviewer evidence matrix
docs/VERCEL.md               Live frontend deployment configuration
DEPLOYMENT.json              Canonical deployment and historical addresses
```

## Evidence policy

Nothing is described as live, finalized, canonical, or source-parity verified without observed evidence. Historical deployments are kept separate from the current canonical address.
