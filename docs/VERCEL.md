# Vercel deployment

Deploy the `frontend` directory as the project root.

- Root Directory: `frontend`
- Framework Preset: Next.js
- Node.js: 22
- Build command: default (`next build`)
- Install command: default (`npm install`)

Required public variables:

```text
NEXT_PUBLIC_CONTRACT_ADDRESS=0x53D66e8f27DE1ef60120a51eF78F2d38f81422d9
NEXT_PUBLIC_EXPLORER_BASE=https://explorer-studio.genlayer.com
```

No secret, private key, backend, or database is required. Writes use the
browser's injected EIP-1193 wallet and public reads use StudioNet.
