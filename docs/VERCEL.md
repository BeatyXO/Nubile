# Vercel deployment

Deploy the `frontend` directory as the project root.

- Root Directory: `frontend`
- Framework Preset: Next.js
- Node.js: 22
- Build command: default (`next build`)
- Install command: default (`npm install`)

Required public variables:

```text
NEXT_PUBLIC_CONTRACT_ADDRESS=0x18D0f312C127542Ca443f8f065c679B5938b7de3
NEXT_PUBLIC_EXPLORER_BASE=https://explorer-studio.genlayer.com
```

No secret, private key, backend, or database is required. Writes use the
browser's injected EIP-1193 wallet and public reads use StudioNet.
