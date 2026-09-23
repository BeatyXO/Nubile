# NUBILE visual system

## Palette

- Deep purple: `#5F1B86`
- Electric lemon: `#EAFF58`
- Vivid pink: `#FF4FC8`
- Ink: `#09050D`
- Primary panel: `#120B18`
- Secondary panel: `#1A0D24`
- Primary text: `#FFF8FF`
- Muted text: `#B8A9C0`

## Direction

NUBILE should feel like a serious network operations product with fashion-editorial polish, not a generic Web3 dashboard.

The containment graph is the visual hero. Use purple as the structural brand color, lemon for high-signal actions and direct applicability, and pink for propagated risk/recall accents. Avoid filling every surface with the accent colors; most of the interface stays dark so the graph and status states carry visual hierarchy.

Do not use mock recalls, fake validator counts, fake addresses, or fabricated chain activity to make the product look populated. Empty chain state should look intentional and premium.

## Interaction

- public reads before wallet connection when possible
- injected EIP-1193 wallet only
- every write requires explicit wallet confirmation
- never label a submitted transaction successful before StudioNet finality/execution is confirmed
- every quarantined unit should eventually expose the exact recall cause and containment path that produced its state
- clearance UI must remain disabled until the contract's clearance recomputation is proven and enabled
