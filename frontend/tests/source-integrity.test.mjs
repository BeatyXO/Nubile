import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const app = fs.readFileSync(new URL("../components/NubileApp.tsx", import.meta.url), "utf8");
const client = fs.readFileSync(new URL("../lib/genlayer.ts", import.meta.url), "utf8");

test("frontend labels illustrative topology rather than fake live data", () => {
  assert.match(app, /Illustrative protocol topology — not live chain data/);
});

test("frontend leaves unconfigured chain counts blank", () => {
  assert.match(app, /stats\?\.components \?\? "—"/);
  assert.match(app, /stats\?\.recalls \?\? "—"/);
});

test("writes require injected wallet client and configured contract", () => {
  assert.match(client, /No injected EIP-1193 wallet found/);
  assert.match(client, /NEXT_PUBLIC_CONTRACT_ADDRESS is not configured/);
});

test("StudioNet chain id is pinned", () => {
  assert.match(client, /CHAIN_ID = 61999/);
  assert.match(client, /CHAIN_HEX = "0xf22f"/);
});

test("writes reconcile finality before claiming success", () => {
  assert.match(client, /waitForTransactionReceipt/);
  assert.match(client, /status !== "FINALIZED"/);
  assert.match(client, /FINISHED_WITH_RETURN/);
  assert.match(app, /waiting for StudioNet finality/);
});
