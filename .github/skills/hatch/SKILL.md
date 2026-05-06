---
name: hatch-deploy
description: Deploy, manage, and monitor apps on the DJ AI service mesh using Hatch. Use this skill whenever the user mentions deploying, pushing, shipping, or publishing a project, app, or site. Also use when the user asks to check app status, view logs, manage app users or co-owners, list their apps, destroy an app, troubleshoot a failed deploy, or anything related to their deployed applications — even if they don't say "hatch" explicitly. Covers source upload, image deploy, build monitoring, failure recovery, static site auto-detection, and dashboard access.
---

# Hatch Deploy

Deploy apps to the DJ AI service mesh. Apps run as containers on Kubernetes with Istio, auto-scaling, and optional Okta auth.

**Deployed app URL patterns**:
- Internal (default): `https://<app-name>.hatch.internal.ai.dowjones.io`
- Public internet (opt-in, Okta always enforced): `https://<app-name>.hatch.ai.dowjones.io`
- Hatch platform: `https://platform.hatch.internal.ai.dowjones.io`

**Reference files** (read when needed):
- `references/troubleshooting.md` — Full error catalog with diagnosis and fixes. Read this when any error occurs.
- `references/gotchas.md` — Top 12 gotchas that trip up users. Skim before every deploy.

---

## Step 0 — Ensure hatch MCP is connected

Before anything else, verify the hatch MCP server is available by attempting to call `mcp__hatch__get_deploy_token`.

**If the tool call succeeds:** The MCP is connected. Extract the user's email from the token and proceed.

**If the tool is not found or the call fails:** The hatch MCP server is not configured. Set it up automatically:

1. Check if `.mcp.json` exists in the project root (the current working directory).
2. If it exists, read it. If it already has a `"hatch"` entry:
   - Check if the URL is `https://platform.hatch.internal.ai.dowjones.io/`. If it points to any other URL (e.g. `hatch.ai.build.pib.dowjones.io`, `platform.hatch.ai.dowjones.io`, or `localhost`), update it to `https://platform.hatch.internal.ai.dowjones.io/` and tell the user: _"I've updated the hatch MCP URL to the new domain. Claude Code will prompt you to approve the connection — please accept it, then ask me again."_
   - If the URL is already correct, the issue is that the user hasn't approved the MCP connection — tell them: _"The hatch MCP server is configured but not connected. Please approve the MCP connection when prompted by Claude Code."_
3. If `.mcp.json` exists but has no `"hatch"` entry, add it to the existing config:
   ```json
   "hatch": {
     "type": "http",
     "url": "https://platform.hatch.internal.ai.dowjones.io/"
   }
   ```
4. If `.mcp.json` doesn't exist, create it:
   ```json
   {
     "mcpServers": {
       "hatch": {
         "type": "http",
         "url": "https://platform.hatch.internal.ai.dowjones.io/"
       }
     }
   }
   ```
5. After writing `.mcp.json`, tell the user: _"I've configured the hatch MCP server. Claude Code will prompt you to approve the connection — please accept it, then ask me again."_

Never ask the user for their email — the token tells you who they are. All hatch tools are scoped to the authenticated user: you can only list, view, and manage apps you own or co-own.

---

## Output Rules

**Happy path (building / running):**
- One-line progress per poll: `Building my-app... (~40s)`
- Final result: name, clickable URL, status, size — shown prominently
- Pod/replica details in a collapsible block:
  ```markdown
  <details>
  <summary>Pod details (1/1 ready)</summary>

  | Pod | Status | Restarts | Age |
  |-----|--------|----------|-----|
  | my-app-7f8b9-x2k4l | Running | 0 | 12s |

  Replicas: 1/1 (auto-scales 1 → 3)
  Image: artifactory.dowjones.io:5000/djpe/my-app:latest
  </details>
  ```
- Do NOT dump raw JSON responses

**Error path (build_failed / CrashLoopBackOff / rollout_timeout):**
1. Read `references/troubleshooting.md` to identify the error category
2. Auto-call `get_build_logs` (build failures) or `get_deploy_logs` (runtime crashes)
3. Extract the actionable error lines — not the full log, just what matters
4. Explain what went wrong in plain language (the user may not be a developer)
5. Fix it yourself if possible, or explain exactly what the user needs to change
6. Offer to retry after the fix
7. Always provide the dashboard URL: `mcp__hatch__get_dashboard(name="<APP_NAME>")`

**When user asks about an app:**
- Call `get_status` — show status, pods, replicas, URL
- If failing, auto-diagnose (don't wait for the user to ask for logs)
- Provide dashboard URL for deep dive

---

## MCP Tools

| Tool | Purpose |
|------|---------|
| `get_deploy_token` | Get identity + Bearer token (valid 24 hours). **Call this first.** |
| `deploy_app` | Deploy/update from a pre-built container image |
| `list_deployed_apps` | List apps you own or co-own |
| `get_status` | Detailed app status (pods, replicas, build state, auto-surfaced logs) |
| `destroy_app` | Tear down an app and all its resources |
| `get_deploy_logs` | K8s pod logs + events (use when app is crashing) |
| `get_build_logs` | GitHub Actions build logs (use when build fails) |
| `get_dashboard` | Get clickable dashboard URL (opens in browser) |
| `pull_source` | Download latest source from build repo (use before deploying when co-owners exist) |
| `add_coowner` / `remove_coowner` | Manage co-owners (owner only) |
| `add_app_user` / `remove_app_user` | Manage per-app user access |
| `get_bedrock_usage` | Get current month's Bedrock LLM usage and budget for an app |
| `extend_bedrock_budget` | Extend monthly Bedrock budget (tiered: $250 self-service, admin above) |
| `get_platform_config` | Get supported deploy params, size tiers, domains, and limits (source of truth) |

If tools are unavailable, go back to Step 0 to configure and connect the hatch MCP server.

**Important:** Before presenting deploy options in Step 3, call `get_platform_config()` to get the latest supported parameters, size tiers, and platform limits. This ensures you always have current values even if this skill file is outdated.

---

## Deploy from Source — Full Workflow

When the user wants to deploy a local project directory, follow these steps in order.

### Step 1 — Analyze the project

Ask which directory to deploy if not obvious. Verify it exists with `ls`.

**Co-owner sync check:** If the app already exists (call `get_status`), check if it has co-owners. If it does, ask: _"This app has co-owners. Want me to pull the latest source from hatch before deploying? (This ensures you don't overwrite a co-owner's changes.)"_ If yes, call `pull_source(name="<APP_NAME>")` and write the returned files to the project directory. If no (or no co-owners), skip.

Detect in parallel:
- **Dockerfile**: `Dockerfile` or `dockerfile` at project root
- **HTML files**: all `.html` files (exclude `node_modules/`, `.git/`)
- **.gitignore**: presence at project root
- **Project type**: `package.json`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`

### Step 2 — Dockerfile handling

**If Dockerfile exists:** Read it. Note the `EXPOSE` port. Proceed.

**If NO Dockerfile exists:**

Find all `index.html` files (excluding `node_modules`, `.git`, `.next`).

- **`index.html` at root** — Server auto-generates a static Dockerfile. Port = 80.
- **`index.html` only in a subdirectory** (e.g., `dist/`, `build/`):
  Ask: _"I found `index.html` in `<subdir>/`. Should that be the web root?"_
  If yes, create a Dockerfile:
  ```dockerfile
  FROM nginx:alpine
  COPY <subdir>/ /usr/share/nginx/html
  EXPOSE 80
  ```
- **Multiple `index.html`**: List locations, ask which is the main entry point.
- **HTML files but no `index.html`**: List them, ask which is the entry point. Create a Dockerfile that copies and symlinks it.
- **No Dockerfile AND no HTML files**: Stop. Tell the user: _"No Dockerfile or HTML files found. Add a Dockerfile to your project and try again."_ Offer to help write one based on the project type.

### Step 3 — Gather settings

Present all options at once with smart defaults. Let the user confirm or override in one response.

**App name** — Derive from directory name. Must be lowercase, letters/digits/hyphens, 2-63 chars, start with letter.
Show the URL: `https://<name>.hatch.internal.ai.dowjones.io` (or `https://<name>.hatch.ai.dowjones.io` if `public=True`)

**Description** — Auto-generate a one-line description (max 200 chars) based on what you learned in Step 1 (project type, package.json name/description, README heading, Dockerfile, code purpose). Show it in the settings summary for user confirmation. If you genuinely can't determine what the app does, ask the user. On redeploys: call `get_status` to check the existing description — if it's empty, generate one and include it. If it already has a description, omit to preserve it.

**Size:**

| Size | Users | Resources | Auto-scaling |
|------|-------|-----------|--------------|
| **huddle** (default) | 1-5 | 250m CPU, 256Mi RAM | 1 → 3 pods |
| **meetup** | up to 30 | 500m CPU, 512Mi RAM | 2 → 10 pods |
| **town-hall** | 50-100 | 1000m CPU, 1Gi RAM | 3 → 20 pods |

**Port** — 80 for static sites, read `EXPOSE` from Dockerfile, or default 3000.

**Auth** — `okta` (default, Okta SSO login required) or `none` (no login prompt, still VPN/internal network only — cannot be combined with `public=True`).

**Public (optional)** — `public=True` exposes the app on the public internet at `https://<name>.hatch.ai.dowjones.io`. Okta is always enforced on public apps. `public=False` reverts to internal. Omitting it preserves the existing setting. **Only ask about this if the user explicitly wants the app reachable outside the DJ network.**

**Environment variables** — Ask: _"Any env vars? (API keys, database URLs, etc.) These are stored securely as Kubernetes Secrets — never pushed to GitHub."_
If the user has a `.env` file, offer to read it and convert to the JSON format.

**EFS volume (optional)** — Only surface this if the user mentioned persistence, file storage, uploads, or keeping files between restarts. Don't ask about it in the standard flow.

If relevant, ask: _"Should uploaded files or generated content persist across restarts? If so, I can mount a persistent volume at a path of your choice (e.g. `/files`). Without this, everything your app writes to disk is lost when a pod restarts."_

If yes, ask for the mount path (default `/files`). Note: once set, Hatch remembers it on every future redeploy — they won't need to pass it again.

Present as:
```
Deploy settings:
  Name:          my-app
  Description:   Internal chatbot for editorial team
  URL:           https://my-app.hatch.internal.ai.dowjones.io
  Size:          huddle (1-5 users, auto-scales 1→3 pods)
  Port:          80
  Auth:          okta
  Public:        no  (internal DJ network only)
  Env vars:      none
  Volume:        none  (or: /files  ← EFS mounted here)

Proceed? (or tell me what to change)
```

Wait for confirmation.

### Step 4 — Secret scan

Before building the archive, scan the source directory for files that must never be uploaded:

**Blocked files**: `.env`, `.env.*`, `credentials.json`, `.npmrc`, `.pypirc`, `service-account*.json`
**Blocked extensions**: `.pem`, `.key`, `.p12`, `.pfx`, `.jks`

If found: **stop immediately**. Tell the user which files were found and that values should go through `env_vars` instead. Offer to read `.env` and convert it.

### Step 5 — Build the tar archive

This step has the most gotchas. Follow exactly.

**5a. Read .gitignore** — If it exists, read every line. Convert each non-comment, non-empty pattern to `--exclude`:
- `node_modules` → `--exclude='./node_modules'`
- `*.log` → `--exclude='*.log'`
- `dist/` → `--exclude='./dist'`
- Lines starting with `!` (negation) → skip

**5b. Always exclude these** (even if not in .gitignore):
`.git`, `.next`, `.nuxt`, `.venv`, `venv`, `__pycache__`, `*.pyc`, `.env`, `.env.*`, `.DS_Store`, `coverage`, `.turbo`, `.cache`, `.parcel-cache`, `target`, `.terraform`, `node_modules`

**5c. Critical ordering: excludes MUST come before -C**
```bash
tar czf /tmp/_hatch_deploy.tar.gz \
  --exclude='./node_modules' --exclude='./.git' --exclude='./.next' \
  --exclude='./.nuxt' --exclude='./venv' --exclude='./.venv' \
  --exclude='./__pycache__' --exclude='./.env' --exclude='./.env.*' \
  --exclude='./coverage' --exclude='./.turbo' --exclude='./.cache' \
  --exclude='./.parcel-cache' --exclude='./target' --exclude='./.terraform' \
  --exclude='./.DS_Store' --exclude='*.pyc' \
  <... .gitignore excludes ...> \
  -C <project_dir> .
```

**5d. Never use process substitution** — `@<(...)` fails on macOS with exit 26.

**5e. Verify size** — `ls -lh /tmp/_hatch_deploy.tar.gz`. Max is **50 MB**.
If over, inspect: `tar tzf /tmp/_hatch_deploy.tar.gz | head -80`
Look for directories that shouldn't be there (node_modules, .git, build artifacts).
Add more excludes and rebuild.

### Step 6 — Upload

**6a.** Call `mcp__hatch__get_deploy_token` (if not already done in Step 0).

**6b.** Upload — tar + curl in ONE command:
```bash
tar czf /tmp/_hatch_deploy.tar.gz [EXCLUDES] -C /path/to/app . && \
curl -s --max-time 900 -X POST \
  https://platform.hatch.internal.ai.dowjones.io/api/apps/upload \
  -H 'Authorization: Bearer <TOKEN>' \
  -F 'name=<APP_NAME>' \
  -F 'source=@/tmp/_hatch_deploy.tar.gz;type=application/octet-stream' \
  -F 'port=<PORT>' \
  -F 'size=<SIZE>' \
  -F 'auth=<AUTH_MODE>' \
  && rm -f /tmp/_hatch_deploy.tar.gz
```

Add `-F 'allowed_users=email1@dj.com,email2@dj.com'` if specified.
Add `-F 'env_vars={"KEY":"value"}'` if specified.
Add `-F 'volume_mount_path=/files'` if the user requested persistent file storage (see Step 3).
Add `-F 'description=Internal chatbot for editorial team'` if set (first deploy or explicit update).
Add `-F 'public=true'` if the user wants the app reachable on the public internet (Okta always enforced; cannot combine with `auth=none`).
Add `-F 'bedrock=true'` if the user wants LLM access (see Advanced Features — Bedrock LLM Access).

**6c. Handle the response:**

| Code | Meaning | Action |
|------|---------|--------|
| **202** | Build triggered | Proceed to Step 7 |
| **422** | Validation error | Read `detail`, fix, retry. Read `references/troubleshooting.md` §2 |
| **413** | Archive too large | Inspect tar contents, exclude more, rebuild. Read `references/gotchas.md` §1-2 |
| **401** | Token expired | Call `get_deploy_token` again, retry |
| **429** | App limit (7 max) | Tell user to delete an app first with `destroy_app` |

If curl returns a connection error, retry the FULL tar+curl command from scratch.

### Step 7 — Monitor build

Build runs async (typically 2-5 minutes). Poll every ~20 seconds:

```
mcp__hatch__get_status(name="<APP_NAME>")
```

Show a one-line update each poll:
```
Building <APP_NAME>... (pods: 0/1, elapsed: ~40s)
```

**Status values and actions:**

| Status | Action |
|--------|--------|
| `building` | Keep polling |
| `running` | Success — go to Step 8 |
| `pending` / `updating` | K8s rollout in progress, poll a few more times |
| `build_failed` | Auto-diagnose — see below |
| NOT_FOUND after previous success | Transient — keep polling |

**On build failure:**
1. Call `get_build_logs` to get the GitHub Actions output
2. Read `references/troubleshooting.md` §3 for common build errors
3. Extract the error lines (not the full log — just the actionable part)
4. Explain what's wrong in plain language
5. If you can fix it (Dockerfile issue, missing file), fix it and retry
6. If the user needs to change something, explain exactly what and where
7. Provide dashboard URL

**On pod failure (CrashLoopBackOff / OOMKilled / ImagePullBackOff):**
1. Call `get_deploy_logs` to get pod logs + events
2. Read `references/troubleshooting.md` §4 for runtime errors
3. For OOMKilled: suggest upgrading size tier
4. For CrashLoopBackOff: read logs, identify the crash reason, suggest fix
5. For ImagePullBackOff: verify image exists, suggest retry
6. Provide dashboard URL

### Step 8 — Display results

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  <APP_NAME> is live
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Endpoint:   https://<APP_NAME>.hatch.internal.ai.dowjones.io  (internal)
              — or —
              https://<APP_NAME>.hatch.ai.dowjones.io  (public, if public=True)
  Status:     running
  Size:       <size>
  Auth:       <okta|none>
  Public:     <yes|no>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Use the URL returned by the API (it already picks the right domain based on the `public` flag). Make the endpoint a clickable markdown link.

Add pod details in a collapsible block (see Output Rules).

**Always** call `get_dashboard(name="<APP_NAME>")` and show:
```
  Dashboard:  [Open Dashboard](https://platform.hatch.internal.ai.dowjones.io/dashboard/<APP_NAME>)
```

For static sites with multiple pages, list each as a **full clickable URL**.

---

## Image Deploy

For pre-built container images, use `deploy_app` directly. No tar/curl needed. The image must be accessible from the cluster (typically Artifactory).

---

## Status Check

When the user asks about an app:
1. Call `get_status(name="<APP_NAME>")`
2. Present: status, URL, pods, replicas, owner, auth
3. If failing — auto-diagnose without waiting to be asked:
   - `build_failed` → call `get_build_logs`
   - `CrashLoopBackOff` / `Error` / `OOMKilled` → call `get_deploy_logs`
   - Read `references/troubleshooting.md` for the specific error
4. Provide dashboard URL

---

## Advanced Features

These features exist but are not part of the standard deploy flow. Surface them **only when the user asks — directly or indirectly**. Don't mention them unprompted.

### Persistence — Redis and EFS

**Surface when** the user says anything like: "my app loses data on restart", "I need caching", "I want sessions to survive", "I need to store files", "my uploaded files disappear", "I need persistent storage", "can I store data?", "I need a database".

When persistence comes up, **present both options together** so the user can pick the right tool:

---

**Option 1 — Redis** (always-on, no setup needed)

Every app automatically gets `REDIS_URL` and `REDIS_KEY_PREFIX` injected as environment variables. Use for: sessions, caches, counters, queues, pub/sub, structured data.

```python
import redis, os
r = redis.from_url(os.environ["REDIS_URL"])
prefix = os.environ["REDIS_KEY_PREFIX"]
r.set(f"{prefix}:user:{user_id}", value)  # always prefix keys
```

No deploy-time changes needed — it's already there.

---

**Option 2 — EFS Volume** (opt-in, for files)

For files that must survive pod restarts (uploads, reports, model weights, generated content). Without this, any path the app writes to is lost when a pod restarts.

Add `volume_mount_path` at deploy time — that's the only change needed:

For source deploys, add to the curl command:
```bash
-F 'volume_mount_path=/files'
```

For image deploys, add to `deploy_app`:
```python
deploy_app(name="my-app", ..., volume_mount_path="/files")
```

The volume is 5Gi, ReadWriteMany (all replicas read/write simultaneously). It persists until the app is destroyed.

**Once set, Hatch remembers it on every future redeploy** — the user doesn't need to pass it again.

**Never recommend SQLite on the EFS volume** — file locking breaks over NFS. Use Redis for structured data instead.

---

For full examples and details, point the user to: `https://platform.hatch.internal.ai.dowjones.io/README#persistence`

### Internal URL — app-to-app networking

All Hatch apps run in the same Kubernetes namespace. They can call each other over the internal mesh — faster and more efficient than going through the public internet.

**Surface when** the user says things like: "I want two apps to talk to each other", "can app-A call app-B?", "I have a backend and a frontend app", "inter-service communication".

- `get_status("app-name")` and `list_deployed_apps()` both return `internal_url` for apps you own or co-own
- Format: `http://<app-name>.djin-ai.svc.cluster.local:<port>`
- The `HATCH_INTERNAL_URL` env var is also auto-injected in every app (points to that app itself)

You can only discover `internal_url` for apps you own or co-own. The target app's auth policy still applies to incoming requests.

### LLM API Access

**Surface when** the user says anything like: "I want to call an LLM", "I need Claude in my app", "how do I use Bedrock", "AI features", "I want my app to call a model", "LLM access", "I need an API key for Claude", "I need an API key", "how do I call Claude from my app".

**Do NOT mention this during the standard deploy flow.** Only surface when the user explicitly asks about LLM/AI/model access.

Hatch can provision per-app LLM API credentials so apps can call models (Claude, etc.) without the user managing keys or AWS accounts. Currently backed by AWS Bedrock; in the future this may switch to direct Anthropic API keys — but the interface stays the same (env vars injected into the pod).

**How to enable:**

For source deploys, add to the curl command:
```bash
-F 'bedrock=true'
```

For image deploys, add to `deploy_app`:
```python
deploy_app(name="my-app", ..., bedrock=True)
```

**Once enabled, Hatch remembers it on every future redeploy** — the user doesn't need to pass it again.

**What the user gets:**

Hatch provisions AWS access keys scoped to Bedrock and injects them into the app's pods as environment variables:

| Env var | Description |
|---------|-------------|
| `AWS_ACCESS_KEY_ID` | Access key for Bedrock API calls |
| `AWS_SECRET_ACCESS_KEY` | Secret key (paired with access key) |
| `AWS_DEFAULT_REGION` | Region where Bedrock is enabled (us-east-1) |

The user does NOT create AWS accounts, request credentials, or manage IAM — hatch handles provisioning. But the app code DOES use these credentials via the AWS SDK (they're picked up automatically from the env vars).

**Usage — Python (boto3):**
```python
import boto3, os, json

client = boto3.client("bedrock-runtime", region_name=os.environ["AWS_DEFAULT_REGION"])
# credentials are picked up automatically from AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

response = client.invoke_model(
    modelId="global.anthropic.claude-sonnet-4-6",
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "Summarize this article..."}]
    })
)
result = json.loads(response["body"].read())
print(result["content"][0]["text"])
```

**Usage — Node.js (@aws-sdk/client-bedrock-runtime):**
```javascript
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: process.env.AWS_DEFAULT_REGION });
// credentials are picked up automatically from AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

const response = await client.send(new InvokeModelCommand({
  modelId: "global.anthropic.claude-sonnet-4-6",
  body: JSON.stringify({
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Summarize this article..." }]
  })
}));
const result = JSON.parse(new TextDecoder().decode(response.body));
console.log(result.content[0].text);
```

**Budget:**

Each app gets a $100/month default budget. Budget enforcement runs daily — not real-time.

| Tier | Limit | Who can set it |
|------|-------|----------------|
| Default | $100/month | Automatic |
| Self-service | Up to $250/month | App owner/co-owner via `extend_bedrock_budget` |
| Admin | Unlimited | Budget admins (see `get_platform_config()`) |

If an app exceeds its budget, the access key is deactivated until the budget is extended or a new month starts. The user sees this via `get_status` (bedrock_blocked=True with a reason message).

**Extending budgets:**
- **≤$250**: Call `extend_bedrock_budget(name="my-app", new_limit_cents=25000)` directly — any owner/co-owner can do this.
- **>$250, user IS a budget admin**: Call `extend_bedrock_budget` directly with any amount — admins can extend any app's budget, even apps they don't own.
- **>$250, user is NOT an admin**: Tell them to ask a budget admin. The admin runs `extend_bedrock_budget(name="<app>", new_limit_cents=<amount>)` via their own hatch MCP. No separate form — same tool, admin identity unlocks the higher tier.

To check who the budget admins are, call `get_platform_config()` and look at `bedrock.budget_admins`. If the current user's email is in that list, they're an admin.

**MCP tools:**
- `get_bedrock_usage(name="my-app")` — check current month spend and budget
- `extend_bedrock_budget(name="my-app", new_limit_cents=25000)` — extend budget

**Troubleshooting:** If the user says "my LLM calls are failing" or "Bedrock isn't working", call `get_status` first. If `bedrock_blocked=True`, explain the budget situation and offer to extend. If bedrock is not enabled at all, offer to enable it.

**Disabling:** Redeploy with `bedrock=False` to revoke credentials. Destroying the app also cleans up automatically.

---

For full details, point the user to: `https://platform.hatch.internal.ai.dowjones.io/README#llm-access`

---

## Rules — follow always

1. **Run Step 0 before any operation** — ensures MCP is connected and gives you identity + auth.
2. **Always exclude `.git` and `node_modules`** — #1 cause of oversized archives.
3. **Never include `.env` files** — use `env_vars` for secrets.
4. **Read `.gitignore` fully** — convert every pattern to `--exclude`.
5. **`--exclude` before `-C`** — tar silently ignores excludes placed after.
6. **Process substitution is forbidden** — `@<(...)` fails on macOS.
7. **Default to `huddle` size and `okta` auth** — safe defaults.
8. **One command for upload** — always combine tar + curl.
9. **Poll status after 202** — never assume the app is ready after upload.
10. **Same app name = update** — zero-downtime rolling update.
11. **On ANY error, auto-diagnose** — read `references/troubleshooting.md`, fetch logs, explain in plain language, suggest a fix. Don't just report the error and stop.
12. **Users may not be developers** — explain errors simply. Don't use jargon like "CrashLoopBackOff" without explaining it means "the app keeps crashing on startup". Offer to fix things yourself when possible.
13. **For anything not covered here**, point to the Hatch README: `https://platform.hatch.internal.ai.dowjones.io/README` — it covers platform limits, FAQ, detailed auth architecture, persistence, networking, and more.
14. **`public=True` requires `auth=okta`** — the API will reject `public=True` + `auth=none`. If the user wants an open app on the public internet, explain this is not supported for security reasons.
15. **Public flag is sticky** — omitting `public` on redeploy preserves the existing setting. Only pass `public=False` explicitly to revert a public app to internal.
16. **Size tier is sticky** — omitting `size` on redeploy preserves the existing tier. Only pass `size` explicitly to change it.
17. **Description is sticky** — omitting `description` on redeploy preserves the existing value. Only pass it to update. Ask for it on first deploy only.
18. **Bedrock is sticky** — omitting `bedrock` on redeploy preserves the existing setting. Pass `bedrock=False` explicitly to revoke LLM access.
