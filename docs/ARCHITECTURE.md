# NUBILE architecture

## Thesis

NUBILE turns a natural-language public recall bulletin into a bounded semantic fact about one exact registered component, then deterministically propagates that fact through an immutable containment graph.

The model never decides which ancestor assemblies are quarantined, how many active recalls a unit carries, which graph path is traversed, whether a duplicate cause counts twice, or whether a unit can be released.

## State model

A **component** has immutable identifying metadata and a creator. A component can contain child components through directed BOM edges. Edges are admitted only while both nodes are unlocked and must never introduce a cycle.

A **recall** freezes a title, bulletin URL, expected bulletin SHA-256, applicability rule, and creator. It moves through:

`DRAFT -> SEALED -> ACTIVE -> CLEARING -> CLEARED`

A **direct finding** binds one recall to one component:

- `AFFECTED`
- `NOT_AFFECTED`
- `INCONCLUSIVE`

Only `AFFECTED` starts propagation.

## Consensus boundary

Validators independently fetch the exact frozen bulletin URL. The fetched bytes must match the expected SHA-256. They then answer only whether the bulletin applies to the exact frozen component definition under the exact frozen applicability rule.

Consensus-critical fields are the categorical verdict and source hash. Explanatory prose is non-authoritative.

A source failure, hash mismatch, malformed model result, or disagreement never becomes a negative answer. It fails closed.

## Deterministic propagation

Each active recall owns a queue. The directly affected component is enqueued once. Permissionless callers execute bounded propagation steps. For every processed node, all direct parents are discovered from frozen reverse edges and receive the same recall cause exactly once.

Quarantine is derived from active recall bindings, not a mutable boolean. A component with three active causes remains quarantined if one is cleared.

## Clearance

A recall creator may freeze a later clearance bulletin and request consensus for a directly affected component. Only a specific `CLEARED` semantic result can deactivate that direct cause. Deterministic propagation then removes that recall cause from all ancestors previously reached by that recall. Other recall causes remain untouched.

## Critical invariants

1. A recall cause can be attached to a component at most once.
2. Quarantine is equivalent to active cause count > 0.
3. Clearing one recall cannot clear another recall.
4. Propagation never invents graph edges.
5. Source unavailability never becomes NOT_AFFECTED or CLEARED.
6. A cycle can never be introduced into the BOM graph.
7. A sealed recall definition cannot mutate.
8. No live/deployment claim exists without transaction evidence.
