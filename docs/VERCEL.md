# Vercel deployment

Live app: https://nubile-psi.vercel.app/

The frontend is live and reads the canonical StudioNet deployment below.

Deploy the `frontend` directory as the project root.

- Root Directory: `frontend`
- Framework Preset: Next.js
- Node.js: 22
- Build command: default (`next build`)
- Install command: default (`npm install`)

Required public variables:

```text
NEXT_PUBLIC_CONTRACT_ADDRESS=0xc53ea93EC011C4f8a54495bF6825e330f8475e00
NEXT_PUBLIC_EXPLORER_BASE=https://explorer-studio.genlayer.com
```

No secret, private key, backend, or database is required. Writes use the
browser's injected EIP-1193 wallet and public reads use StudioNet.
