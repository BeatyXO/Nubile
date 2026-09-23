"""Verify that claimed deployment metadata points at the exact committed source."""
import hashlib
import json
import pathlib
import subprocess

root = pathlib.Path(__file__).resolve().parents[1]
metadata = json.loads((root / "DEPLOYMENT.json").read_text("utf-8"))
if metadata["canonicalStatus"] == "UNDEPLOYED":
    raise SystemExit("deployment metadata is intentionally unclaimed")
if not metadata.get("deployedSourceVerified") or not metadata.get("schemaVerified"):
    raise SystemExit("deployment parity flags must be true for a claimed deployment")

commit = metadata["sourceCommit"]
source = subprocess.check_output(["git", "show", f"{commit}:contracts/nubile.py"], cwd=root)
digest = hashlib.sha256(source).hexdigest()
if digest != metadata["sourceSha256"]:
    raise SystemExit(f"source hash mismatch: {digest} != {metadata['sourceSha256']}")
for field in ("contract", "deploymentTransaction"):
    value = metadata.get(field)
    if not isinstance(value, str) or not value.startswith("0x"):
        raise SystemExit(f"missing deployed {field}")
print(f"deployment parity verified: {metadata['contract']} {digest}")
