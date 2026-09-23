# NUBILE adversarial test plan

## Graph safety

- register bounded component metadata
- reject duplicate component keys
- add child -> parent edges
- reject self-edge
- reject duplicate edge
- reject edge that creates an indirect cycle
- freeze graph nodes once used by an active recall
- bound parent/child fanout

## Semantic applicability

- bulletin bytes match frozen SHA-256 and clearly affect unit
- matching bytes clearly do not affect unit
- ambiguous range/model language -> INCONCLUSIVE
- source unavailable -> fail closed
- source too large -> fail closed
- content hash mismatch -> fail closed
- malformed model output -> fail closed
- validator sees changed bytes -> reject leader result
- prompt injection inside bulletin text cannot alter task

## Propagation

- directly affected node gets one active cause
- first parent gets same cause
- multi-level ancestors propagate
- converging DAG paths do not double-count the same recall
- bounded steps preserve a resumable cursor
- repeated propagation after completion is idempotent
- two simultaneous recalls create two distinct causes
- clearing recall A leaves recall B active

## Clearance

- unrelated bulletin cannot clear
- source failure cannot clear
- ambiguous bulletin cannot clear
- valid component-specific clearance removes only target recall
- deterministic reverse propagation removes that recall from reached ancestors
- unit becomes releasable iff no active causes remain

## Evidence quality

Before submission, add a real public recall corpus with exact downloaded bytes, source URLs, digests, and explicit labels for real vs synthetic controls. Do not represent synthetic fixtures as real-world proof.
