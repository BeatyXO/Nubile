# NUBILE

**Networked Unit Bulletin Impact & Lifecycle Engine**

NUBILE is a GenLayer-native recall propagation protocol for composable products.

A public recall bulletin can describe affected models, lots, revisions, production windows, or other natural-language criteria that ordinary smart-contract code cannot safely interpret. NUBILE uses validator consensus only for that narrow semantic applicability question. Once an exact registered component is classified as affected, containment propagation, multi-cause quarantine, clearance reconciliation, replay protection, graph safety, and release eligibility are deterministic contract logic.

## Core split

- **Consensus-backed:** whether frozen bulletin bytes apply to one immutable component definition; whether a later frozen clearance bulletin specifically clears a directly affected component.
- **Deterministic:** component/BOM graph, cycle rejection, impact activation, bounded cursor propagation, overlapping causes, recall counters, clearance propagation, and `can_release`.
- **Fail closed:** unavailable/mismatched source bytes and inconclusive semantic evidence never become `NOT_AFFECTED` or `CLEARED`.

## Product boundary

NUBILE is one Intelligent Contract plus a reviewer/operator frontend. There is no canonical backend database, no privileged indexer, and no hidden administrator that decides quarantine state.

## Status

The canonical contract is deployed on StudioNet and source-parity verified. Deterministic registration, BOM creation, recall creation, public reads, and frontend finality handling are implemented. The semantic lifecycle remains explicitly limited by the StudioNet validator web boundary: the attempted authoritative NHTSA fetch failed closed with `SystemError: 6: forbidden`. See `docs/LIVE_EVIDENCE.md` and `docs/SUBMISSION.md` for the exact evidence and remaining unproven paths.

## Visual system

The interface uses a dark-purple base with electric lemon and vivid pink accents. The graph is the primary product surface: reviewers should be able to see why a unit is quarantined, which recall caused it, and which containment path propagated the state.

## Repository

```text
contracts/nubile.py          Intelligent Contract
tests/direct/                Direct Mode coverage
frontend/                    Next.js product interface
docs/ARCHITECTURE.md         protocol design and invariants
docs/TEST_PLAN.md            adversarial verification plan
docs/CODEX_HANDOFF.md        exact remaining work
DEPLOYMENT.json              deliberately unclaimed until real deployment
```

## Quality rule

Nothing is described as live, finalized, canonical, or proven on StudioNet without a real finalized transaction and source-parity evidence.
