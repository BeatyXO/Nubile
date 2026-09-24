import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export const CHAIN_ID = 61999;
export const CHAIN_HEX = "0xf22f";
export const STUDIO_RPC = "https://studio.genlayer.com/api";
export const EXPLORER_BASE = process.env.NEXT_PUBLIC_EXPLORER_BASE || "https://explorer-studio.genlayer.com";
export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "") as `0x${string}`;

export const readClient = createClient({ chain: studionet });
export type WalletClient = ReturnType<typeof createClient>;

const WALLET_DISCONNECT_KEY = "nubile.wallet.disconnected";

declare global {
  interface Window {
    ethereum?: {
      request(args: { method: string; params?: unknown[] | object }): Promise<unknown>;
      on?(event: string, listener: (...args: unknown[]) => void): void;
      removeListener?(event: string, listener: (...args: unknown[]) => void): void;
    };
  }
}

export function contractConfigured() {
  return /^0x[a-fA-F0-9]{40}$/.test(CONTRACT_ADDRESS);
}

function validAddress(value: unknown): value is `0x${string}` {
  return typeof value === "string" && /^0x[a-fA-F0-9]{40}$/.test(value);
}

export async function ensureStudioNet(provider: NonNullable<Window["ethereum"]>) {
  const chain = String(await provider.request({ method: "eth_chainId" })).toLowerCase();
  if (chain === CHAIN_HEX) return;
  try {
    await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: CHAIN_HEX }] });
  } catch (error: unknown) {
    const code = typeof error === "object" && error !== null && "code" in error
      ? Number((error as { code?: unknown }).code) : undefined;
    if (code !== 4902) throw error;
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: CHAIN_HEX,
        chainName: "GenLayer StudioNet",
        rpcUrls: [STUDIO_RPC],
        nativeCurrency: { name: "GEN", symbol: "GEN", decimals: 18 },
        blockExplorerUrls: [EXPLORER_BASE],
      }],
    });
    await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: CHAIN_HEX }] });
  }
}

function setManualDisconnect(disconnected: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (disconnected) window.localStorage.setItem(WALLET_DISCONNECT_KEY, "1");
    else window.localStorage.removeItem(WALLET_DISCONNECT_KEY);
  } catch {
    // Storage can be unavailable in hardened/private browser contexts.
  }
}

export function rememberWalletDisconnect() {
  setManualDisconnect(true);
}

function manualDisconnectRequested() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(WALLET_DISCONNECT_KEY) === "1";
  } catch {
    return false;
  }
}

function walletSession(provider: NonNullable<Window["ethereum"]>, address: `0x${string}`) {
  return { address, client: createClient({ chain: studionet, account: address, provider }) };
}

export async function connectWallet() {
  const provider = window.ethereum;
  if (!provider) throw new Error("No injected EIP-1193 wallet found.");
  const accounts = await provider.request({ method: "eth_requestAccounts" });
  const address = Array.isArray(accounts) ? accounts.find(validAddress) : undefined;
  if (!address) throw new Error("Wallet did not expose a valid account.");
  await ensureStudioNet(provider);
  setManualDisconnect(false);
  return walletSession(provider, address);
}

export async function restoreWalletConnection() {
  if (typeof window === "undefined" || manualDisconnectRequested()) return null;
  const provider = window.ethereum;
  if (!provider) return null;
  const accounts = await provider.request({ method: "eth_accounts" });
  const address = Array.isArray(accounts) ? accounts.find(validAddress) : undefined;
  if (!address) return null;
  await ensureStudioNet(provider);
  return walletSession(provider, address);
}

export async function readContract<T>(functionName: string, args: unknown[] = []): Promise<T> {
  if (!contractConfigured()) throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is not configured.");
  return await readClient.readContract({
    address: CONTRACT_ADDRESS,
    functionName,
    args: args as never[],
  }) as T;
}

export async function submitContract(client: WalletClient, functionName: string, args: unknown[] = []) {
  if (!contractConfigured()) throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is not configured.");
  const hash = String(await client.writeContract({
    address: CONTRACT_ADDRESS,
    functionName,
    args: args as never[],
    value: 0n,
  }));
  return hash;
}

export type ReconciledTransaction = {
  hash: string;
  status: string;
  result: string;
  execution: string;
};

export async function submitAndReconcile(client: WalletClient, functionName: string, args: unknown[] = []): Promise<ReconciledTransaction> {
  const hash = await submitContract(client, functionName, args);
  const receipt = await client.waitForTransactionReceipt({
    hash: hash as never,
    status: "FINALIZED" as never,
    interval: 3000,
    retries: 100,
  });
  const status = String(receipt.statusName ?? receipt.status ?? "UNKNOWN");
  const result = String(receipt.resultName ?? receipt.result ?? "UNKNOWN");
  const execution = String(receipt.txExecutionResultName ?? receipt.txExecutionResult ?? "UNKNOWN");
  if (status !== "FINALIZED" || result !== "MAJORITY_AGREE" || execution !== "FINISHED_WITH_RETURN") {
    throw new Error(`StudioNet rejected the transaction: status=${status}, result=${result}, execution=${execution}.`);
  }
  return { hash, status, result, execution };
}

export function explorerTx(hash: string) {
  return `${EXPLORER_BASE}/tx/${hash}`;
}
