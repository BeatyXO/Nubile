"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity, Box, Boxes, CircleAlert, GitBranch, Network, Plus, Radar,
  ShieldCheck, Sparkles, Wallet, Waypoints
} from "lucide-react";
import {
  connectWallet, contractConfigured, explorerTx, readContract, submitAndReconcile, type WalletClient
} from "@/lib/genlayer";

type Stats = { components: number; recalls: number };
type ComponentRecord = { component_id:number; name:string; kind:string; external_key:string; definition:string; active_recall_count:number; graph_locked:boolean };
type RecallRecord = { recall_id:number; title:string; bulletin_url:string; bulletin_sha256:string; status:number; queue_head:number; queue_tail:number; directly_affected_count:number; impacted_count:number; clearance_cursor:number };
type Finding = { verdict:number; active_cause:boolean; reason:string };
type View = "overview" | "component" | "bom" | "recall" | "operations";

function shortAddress(address: string) {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";
}

export function NubileApp() {
  const configured = contractConfigured();
  const [view, setView] = useState<View>("overview");
  const [address, setAddress] = useState("");
  const [client, setClient] = useState<WalletClient | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");
  const [txState, setTxState] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const [busy, setBusy] = useState(false);
  const [components, setComponents] = useState<ComponentRecord[]>([]);
  const [recalls, setRecalls] = useState<RecallRecord[]>([]);
  const [relations, setRelations] = useState<Record<number, {parents:number[];children:number[]}>>({});
  const [findings, setFindings] = useState<Record<string, Finding>>({});
  const workspaceRef = useRef<HTMLElement>(null);

  function navigate(next: View) {
    setView(next);
    window.requestAnimationFrame(() => workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function refresh() {
    if (!configured) return;
    try {
      const nextStats = await readContract<Stats>("stats");
      setStats(nextStats);
      const loadedComponents: ComponentRecord[] = [];
      const loadedRelations: Record<number, {parents:number[];children:number[]}> = {};
      for (let id = 1; id <= nextStats.components; id += 1) {
        loadedComponents.push(await readContract<ComponentRecord>("get_component", [id]));
        loadedRelations[id] = { parents: await readContract<number[]>("get_parents", [id]), children: await readContract<number[]>("get_children", [id]) };
      }
      const loadedRecalls: RecallRecord[] = [];
      for (let id = 1; id <= nextStats.recalls; id += 1) loadedRecalls.push(await readContract<RecallRecord>("get_recall", [id]));
      const loadedFindings: Record<string, Finding> = {};
      for (const recall of loadedRecalls) for (const component of loadedComponents) {
        loadedFindings[`${recall.recall_id}:${component.component_id}`] = await readContract<Finding>("get_finding", [recall.recall_id, component.component_id]);
      }
      setComponents(loadedComponents); setRelations(loadedRelations); setRecalls(loadedRecalls); setFindings(loadedFindings);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to read StudioNet state.");
    }
  }

  useEffect(() => { void refresh(); }, [configured]);

  async function handleWallet() {
    setError("");
    try {
      const connected = await connectWallet();
      setAddress(connected.address);
      setClient(connected.client);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Wallet connection failed.");
    }
  }

  async function write(functionName: string, args: unknown[]) {
    if (!client) {
      setError("Connect an injected wallet before submitting a write.");
      return;
    }
    setBusy(true); setError(""); setTxHash(""); setTxState("pending");
    try {
      const result = await submitAndReconcile(client, functionName, args);
      setTxHash(result.hash); setTxState("success"); await refresh();
    } catch (e) {
      setTxState("failed");
      setError(e instanceof Error ? e.message : "Transaction failed before finality.");
    } finally {
      setBusy(false);
    }
  }

  const status = useMemo(() => configured ? "StudioNet configured" : "Awaiting deployment", [configured]);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="wrap" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div className="brand">
            <div className="brand-mark"><Network size={19}/></div>
            NUBILE
          </div>
          <nav className="nav">
            <button onClick={() => navigate("overview")}>Protocol</button>
            <button onClick={() => navigate("component")}>Components</button>
            <button onClick={() => navigate("bom")}>BOM</button>
            <button onClick={() => navigate("recall")}>Recalls</button>
            <a href="https://github.com/BeatyXO/Nubile" target="_blank" rel="noreferrer" style={{color:"inherit",textDecoration:"none"}}>GitHub</a>
          </nav>
          <button className="wallet" onClick={handleWallet}>
            <Wallet size={14} style={{display:"inline",marginRight:7,verticalAlign:-2}}/>
            {address ? shortAddress(address) : "Connect wallet"}
          </button>
        </div>
      </header>

      <main className="wrap">
        {view === "overview" && <section className="hero">
          <div>
            <div className="eyebrow"><Sparkles size={13}/> GenLayer recall intelligence</div>
            <h1>Trace the <span className="accent">impact.</span><br/>Contain the risk.</h1>
            <p>
              NUBILE reads frozen public recall bulletins through validator consensus, then lets deterministic
              contract logic propagate each confirmed cause through the exact component graph—without letting
              an AI invent a path, quarantine a product, or release one.
            </p>
            <div className="actions">
              <button className="primary" onClick={() => navigate("component")}><Plus size={15} style={{display:"inline",marginRight:7,verticalAlign:-2}}/>Register component</button>
              <button className="secondary" onClick={() => navigate("recall")}><Radar size={15} style={{display:"inline",marginRight:7,verticalAlign:-2}}/>Open recall</button>
            </div>
          </div>
          <div className="protocol-card" aria-label="Illustrative NUBILE containment graph">
            <div className="edge e1"/><div className="edge e2"/><div className="edge e3"/>
            <div className="node lemon n1"><small>bulletin scope</small><strong>Direct unit</strong></div>
            <div className="node pink n2"><small>containment</small><strong>Subassembly</strong></div>
            <div className="node n3"><small>propagated cause</small><strong>Parent product</strong></div>
            <div className="node n4"><small>derived state</small><strong>Release gate</strong></div>
            <div className="legend">Illustrative protocol topology — not live chain data</div>
          </div>
        </section>}

        {view === "overview" && <section className="stats">
          <div className="stat"><span>Registered components</span><strong className="lemon">{stats?.components ?? "—"}</strong></div>
          <div className="stat"><span>Recall records</span><strong className="pink">{stats?.recalls ?? "—"}</strong></div>
          <div className="stat"><span>Network</span><strong style={{fontSize:17}}>StudioNet · 61999</strong></div>
          <div className="stat"><span>Contract</span><strong style={{fontSize:17}}>{configured ? "Configured" : "Not deployed"}</strong></div>
        </section>}

        {error && <div className="notice"><CircleAlert size={14} style={{display:"inline",marginRight:8,verticalAlign:-2}}/>{error}</div>}

        <section className={`workspace ${view !== "overview" ? "workspace-focused" : ""}`} ref={workspaceRef}>
          <aside className="sidebar">
            <div className="side-title">Workspace</div>
            <button className={`side-btn ${view === "overview" ? "active":""}`} onClick={() => navigate("overview")}><Activity size={15}/>Overview</button>
            <button className={`side-btn ${view === "component" ? "active":""}`} onClick={() => navigate("component")}><Boxes size={15}/>Register component</button>
            <button className={`side-btn ${view === "bom" ? "active":""}`} onClick={() => navigate("bom")}><GitBranch size={15}/>BOM relation</button>
            <button className={`side-btn ${view === "recall" ? "active":""}`} onClick={() => navigate("recall")}><Radar size={15}/>Create recall</button>
            <button className={`side-btn ${view === "operations" ? "active":""}`} onClick={() => navigate("operations")}><ShieldCheck size={15}/>Assess & propagate</button>
          </aside>

          <section className="mainpanel">
            <div className="panel-head">
              <div>
                <h2>{view === "overview" ? "Containment graph" : view === "component" ? "Register a component" : view === "bom" ? "Create BOM relation" : view === "recall" ? "Freeze a recall bulletin" : "Assess, propagate & release"}</h2>
                <p>{view === "overview" ? "Chain state appears here after the canonical deployment is configured." : view === "component" ? "Create immutable unit identity before linking BOM edges." : view === "bom" ? "Edges are parent → child and freeze when the first recall is sealed." : view === "recall" ? "Pin exact bulletin bytes before semantic applicability can be assessed." : "Only the contract decides findings, causes, propagation, and release eligibility."}</p>
              </div>
              <span className="status-pill">{status}</span>
            </div>
            <div className="panel-body">
              {view === "overview" && <Overview configured={configured} components={components} recalls={recalls} relations={relations} findings={findings}/>} 
              {view === "component" && <ComponentForm configured={configured} busy={busy} onSubmit={write}/>}
              {view === "bom" && <BomForm configured={configured} busy={busy} onSubmit={write}/>}
              {view === "recall" && <RecallForm configured={configured} busy={busy} onSubmit={write}/>}
              {view === "operations" && <OperationsForm configured={configured} busy={busy} recalls={recalls} onSubmit={write}/>} 
              {txState === "pending" && <div className="notice">Transaction submitted; waiting for StudioNet finality and successful GenVM execution. This is not yet a successful write.</div>}
              {txHash && txState === "success" && <div className="tx">Finalized successfully: <a href={explorerTx(txHash)} target="_blank" rel="noreferrer">{txHash}</a></div>}
            </div>
          </section>
        </section>
      </main>

      <footer className="wrap footer">
        <span>NUBILE · Networked Unit Bulletin Impact & Lifecycle Engine</span>
        <span><a href="https://genlayer.com" target="_blank" rel="noreferrer">Powered by GenLayer</a></span>
      </footer>
    </div>
  );
}

function recallStatus(status:number) { return ({1:"DRAFT",2:"ACTIVE",3:"CLEARING",4:"CLEARED"} as Record<number,string>)[status] ?? "UNKNOWN"; }
function findingLabel(finding: Finding | undefined) {
  if (!finding || finding.verdict === 0) return "NO DIRECT FINDING";
  if (finding.verdict === 1) return finding.active_cause ? "DIRECT AFFECTED · ACTIVE CAUSE" : "DIRECT AFFECTED";
  return finding.verdict === 2 ? "NOT AFFECTED" : "INCONCLUSIVE";
}

function Overview({ configured, components, recalls, relations, findings }: { configured:boolean; components:ComponentRecord[]; recalls:RecallRecord[]; relations:Record<number,{parents:number[];children:number[]}>; findings:Record<string, Finding> }) {
  return (
    <div className="empty">
      <div className="empty-inner">
        <div className="empty-icon"><Waypoints size={24}/></div>
        <h3>{configured ? `${components.length} components · ${recalls.length} recalls` : "Canonical deployment not configured"}</h3>
        <p>
          {configured
            ? "Live state loaded from the Intelligent Contract. Direct causes are assessed findings; propagated quarantine follows the immutable parent → child graph."
            : "The interface is intentionally empty rather than showing mock recalls. After Codex finishes Direct Mode, deploys the exact source, and sets NEXT_PUBLIC_CONTRACT_ADDRESS, this surface becomes the live containment graph."}
        </p>
        {configured && <div style={{textAlign:"left",marginTop:24,width:"100%"}}>
          {components.map((component) => <div key={component.component_id} className="notice" style={{marginBottom:8}}>
            <strong>#{component.component_id} {component.name}</strong> · {component.kind} · {component.active_recall_count ? "QUARANTINED" : "RELEASE ELIGIBLE"}<br/>
            <small>Parents: {(relations[component.component_id]?.parents ?? []).join(", ") || "—"} · Children: {(relations[component.component_id]?.children ?? []).join(", ") || "—"} · {component.graph_locked ? "graph locked" : "graph open"}</small>
            {recalls.map((recall) => <small key={`${recall.recall_id}:${component.component_id}`} style={{display:"block"}}>Recall {recall.recall_id}: {findingLabel(findings[`${recall.recall_id}:${component.component_id}`])}</small>)}
          </div>)}
          {recalls.map((recall) => <div key={recall.recall_id} className="notice" style={{marginBottom:8}}>
            <strong>Recall #{recall.recall_id}: {recall.title}</strong> · {recallStatus(recall.status)} · impacted {recall.impacted_count}<br/>
            <small>Source: {recall.bulletin_url} · SHA-256: {recall.bulletin_sha256} · propagation {recall.queue_head}/{recall.queue_tail} · direct roots {recall.directly_affected_count} · clearance cursor {recall.clearance_cursor}</small>
          </div>)}
        </div>}
      </div>
    </div>
  );
}

function ComponentForm({ configured, busy, onSubmit }: { configured:boolean; busy:boolean; onSubmit:(fn:string,args:unknown[])=>Promise<void> }) {
  const [key,setKey]=useState(""); const [name,setName]=useState(""); const [kind,setKind]=useState(""); const [definition,setDefinition]=useState("");
  return (
    <>
      {!configured && <div className="notice">Writes are disabled until a verified StudioNet contract address is configured. The form remains available for product review.</div>}
      <form onSubmit={(e)=>{e.preventDefault(); if(configured) void onSubmit("register_component",[key,name,kind,definition]);}}>
        <div className="form-grid">
          <div className="field"><label>External key</label><input value={key} onChange={e=>setKey(e.target.value)} placeholder="Stable manufacturer / registry key" required/></div>
          <div className="field"><label>Component name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Human-readable unit name" required/></div>
          <div className="field"><label>Component kind</label><input value={kind} onChange={e=>setKind(e.target.value)} placeholder="Cell, module, controller, product…" required/></div>
          <div className="field full"><label>Immutable definition</label><textarea value={definition} onChange={e=>setDefinition(e.target.value)} placeholder="Model, lot, revision, production window, manufacturer identifiers and any fields needed to distinguish this exact component." required/></div>
        </div>
        <div className="form-footer"><button className="primary" disabled={!configured||busy}>{busy ? "Submitting…" : "Register component"}</button></div>
      </form>
    </>
  );
}

function RecallForm({ configured, busy, onSubmit }: { configured:boolean; busy:boolean; onSubmit:(fn:string,args:unknown[])=>Promise<void> }) {
  const [title,setTitle]=useState(""); const [url,setUrl]=useState(""); const [hash,setHash]=useState(""); const [rule,setRule]=useState("");
  return (
    <>
      {!configured && <div className="notice">No live contract is configured, so nothing submitted here can be mistaken for a real recall record.</div>}
      <form onSubmit={(e)=>{e.preventDefault(); if(configured) void onSubmit("create_recall",[title,url,hash,rule]);}}>
        <div className="form-grid">
          <div className="field"><label>Recall title</label><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Bulletin / campaign identifier" required/></div>
          <div className="field"><label>Bulletin URL</label><input type="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://…" required/></div>
          <div className="field full"><label>Exact bulletin SHA-256</label><input value={hash} onChange={e=>setHash(e.target.value)} placeholder="64 hex characters" pattern="[a-fA-F0-9]{64}" required/></div>
          <div className="field full"><label>Applicability rule</label><textarea value={rule} onChange={e=>setRule(e.target.value)} placeholder="State precisely which identifiers, production ranges, revisions or conditions make a registered component in scope." required/></div>
        </div>
        <div className="form-footer"><button className="primary" disabled={!configured||busy}>{busy ? "Submitting…" : "Create recall draft"}</button></div>
      </form>
    </>
  );
}

function BomForm({ configured, busy, onSubmit }: { configured:boolean; busy:boolean; onSubmit:(fn:string,args:unknown[])=>Promise<void> }) {
  const [parent,setParent]=useState(""); const [child,setChild]=useState("");
  return <form onSubmit={(e)=>{e.preventDefault(); if(configured) void onSubmit("add_containment",[Number(parent),Number(child)]);}}>
    {!configured && <div className="notice">Connect a verified contract before creating graph state.</div>}
    <div className="form-grid"><div className="field"><label>Parent component ID</label><input type="number" min="1" value={parent} onChange={e=>setParent(e.target.value)} required/></div><div className="field"><label>Child component ID</label><input type="number" min="1" value={child} onChange={e=>setChild(e.target.value)} required/></div></div>
    <div className="form-footer"><button className="primary" disabled={!configured||busy}>{busy ? "Submitting…" : "Add containment edge"}</button></div>
  </form>;
}

function OperationsForm({ configured, busy, recalls, onSubmit }: { configured:boolean; busy:boolean; recalls:RecallRecord[]; onSubmit:(fn:string,args:unknown[])=>Promise<void> }) {
  const [recall,setRecall]=useState(""); const [component,setComponent]=useState(""); const [steps,setSteps]=useState("16");
  const [clearanceUrl,setClearanceUrl]=useState(""); const [clearanceHash,setClearanceHash]=useState(""); const [clearanceResult,setClearanceResult]=useState("");
  const id=Number(recall); const cid=Number(component);
  const selected = recalls.find((item) => item.recall_id === id);
  const validId = (value:number) => Number.isInteger(value) && value > 0;
  const submit = (fn:string, args:unknown[]) => { if (!validId(id) || (fn === "clear_direct_component" || fn === "assess_component") && !validId(cid)) return; void onSubmit(fn,args); };
  return <div className="form-grid">
    {!configured && <div className="notice full">No contract is configured. Reads and writes remain truthful and empty.</div>}
    <div className="field"><label>Recall ID</label><input type="number" min="1" value={recall} onChange={e=>setRecall(e.target.value)} required/></div>
    <div className="field"><label>Component ID</label><input type="number" min="1" value={component} onChange={e=>setComponent(e.target.value)} required/></div>
    <div className="field"><label>Propagation steps (1–64)</label><input type="number" min="1" max="64" value={steps} onChange={e=>setSteps(e.target.value)} required/></div>
    <div className="form-footer full" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
      <button className="primary" disabled={!configured||busy||!validId(id)} onClick={()=>submit("seal_recall",[id])}>Seal recall</button>
      <button className="secondary" disabled={!configured||busy||!validId(id)||!validId(cid)} onClick={()=>submit("assess_component",[id,cid])}>Assess component</button>
      <button className="secondary" disabled={!configured||busy||!validId(id)} onClick={()=>submit("propagate",[id,Number(steps)])}>Propagate cursor</button>
    </div>
    <div className="field full"><label>Clearance bulletin HTTPS URL</label><input type="url" value={clearanceUrl} onChange={e=>setClearanceUrl(e.target.value)} placeholder="https://authoritative.example/clearance" /></div>
    <div className="field"><label>Clearance SHA-256</label><input value={clearanceHash} onChange={e=>setClearanceHash(e.target.value)} pattern="[a-fA-F0-9]{64}" placeholder="64 hex characters" /></div>
    <div className="field"><label>Clear direct affected component</label><input type="number" min="1" value={component} onChange={e=>setComponent(e.target.value)} placeholder="Component ID" /></div>
    <div className="form-footer full" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
      <button className="secondary" disabled={!configured||busy||!validId(id)||!/^https:\/\//.test(clearanceUrl)||!/^[a-fA-F0-9]{64}$/.test(clearanceHash)} onClick={()=>submit("set_clearance_bulletin",[id,clearanceUrl,clearanceHash])}>Set clearance bulletin</button>
      <button className="secondary" disabled={!configured||busy||!validId(id)||!validId(cid)} onClick={async()=>{ if (!validId(id)||!validId(cid)) return; setClearanceResult("submitted"); await onSubmit("clear_direct_component",[id,cid]); }}>Clear direct component</button>
      {selected?.status === 3 && <button className="secondary" disabled={!configured||busy||!validId(id)} onClick={()=>submit("finalize_clearance",[id,Number(steps)])}>Continue clearance reconciliation</button>}
    </div>
    <div className="notice full">{selected ? `Recall ${selected.recall_id} is ${recallStatus(selected.status)} · propagation ${selected.queue_head}/${selected.queue_tail} · clearance cursor ${selected.clearance_cursor} · direct roots ${selected.directly_affected_count} · impacted ${selected.impacted_count}` : "Select a recall ID to load clearance progress."}{clearanceResult && ` · ${clearanceResult}`}</div>
    <div className="notice full"><ShieldCheck size={14} style={{display:"inline",marginRight:8,verticalAlign:-2}}/>Assessment is consensus-backed; graph traversal and release remain deterministic contract operations.</div>
  </div>;
}
