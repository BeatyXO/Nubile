# NUBILE

**Networked Unit Bulletin Impact & Lifecycle Engine**

NUBILE is a GenLayer-native recall propagation protocol for composable products.

A public recall bulletin can describe affected models, lots, revisions, production windows, or other natural-language criteria that ordinary smart-contract code cannot safely interpret. NUBILE uses validator consensus only for that narrow semantic applicability question. Once an exact registered component is classified as affected, containment propagation, multi-cause quarantine, clearance reconciliation, replay protection, graph safety, and release eligibility are deterministic contract logic.

## Live submission

- **App:** https://nubile-psi.vercel.app/
- **GitHub:** https://github.com/BeatyXO/Nubile
- **Network:** GenLayer StudioNet
- **Canonical contract:** `0x4Be082dDab5aFeC8985b19b016E71cDB84e415fe`
- **Deployment tx:** `0x93b9a25a7d7d594b6ad32e87e7cf9759ba48ae40dde3db82e7a0d2a880014e9a`
- **Deployed source SHA-256:** `4305d730d670ee0b7ec568e8e3865bad9befce943130247e12ca164224eb4a82`

The deployed contract is source/schema parity verified. Live evidence on the canonical address includes component registration, validator-backed bulletin source verification, a successful applicability assessment, deterministic propagation, and post-write state readback. See `docs/LIVE_EVIDENCE.md` for transaction hashes and observed results.

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
6. Use **Assess & Propagate** for validator-backed semantic assessment and bounded propagation.
7. Review live component, recall, quarantine, release, and clearance state from the contract-backed UI.

## Verification snapshot

- Direct contract and static suite: **33 passed**
- Frontend tests: **8 passed**
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
