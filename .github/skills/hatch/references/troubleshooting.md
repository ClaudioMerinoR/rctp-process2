# Troubleshooting Reference

Comprehensive error catalog for diagnosing and resolving hatch failures. Organized by when they occur in the deploy lifecycle.

## Table of Contents

1. [Authentication Errors](#1-authentication-errors)
2. [Source Upload Errors](#2-source-upload-errors)
3. [Build Failures](#3-build-failures)
4. [Runtime / Pod Failures](#4-runtime--pod-failures)
5. [Permission Errors](#5-permission-errors)
6. [Quota Errors](#6-quota-errors)

---

## 1. Authentication Errors

### HTTP 401 — "Authentication required"
**Cause:** Missing or invalid Bearer token.
**Fix:** Call `get_deploy_token` to get a fresh token. Tokens expire after 1 hour.

### HTTP 401 — "Invalid or expired token"
**Cause:** Token expired or signed with wrong key.
**Fix:** Call `get_deploy_token` again for a new token. If persistent, the server may have restarted with a new secret.

---

## 2. Source Upload Errors

### HTTP 413 — "Source archive too large"
**Cause:** tar.gz exceeds 50 MB.
**Diagnosis:** Run `tar tzf /tmp/_hatch_deploy.tar.gz | head -80` to see what's inside.
**Common culprits:**
- `node_modules/` not excluded (often 200MB+)
- `.git/` directory included
- `.next/`, `.nuxt/`, `dist/`, `build/` directories
- Large media files (videos, datasets)
**Fix:** Add missing `--exclude` flags. See the deploy workflow for the full exclude list.

### HTTP 422 — "Source archive is empty"
**Cause:** tar.gz has no files, or the archive is corrupted.
**Fix:** Verify the source directory exists and has files. Recreate the archive.

### HTTP 422 — "Source contains secrets"
**Cause:** Archive contains files that must never be pushed to a repository.
**Blocked files:** `.env`, `.env.*`, `credentials.json`, `.npmrc`, `.pypirc`, `service-account*.json`
**Blocked extensions:** `.pem`, `.key`, `.p12`, `.pfx`, `.jks`
**Fix:** Remove secret files from the source directory. Pass sensitive values via the `env_vars` parameter instead — these are stored as K8s Secrets and never touch GitHub.

### HTTP 422 — "No Dockerfile found"
**Cause:** Source has no `Dockerfile` and no `.html` files for auto-generation.
**Fix:** Either:
- Add a `Dockerfile` to the project root, OR
- Add an `index.html` for automatic static site deployment (nginx auto-generated)

### HTTP 422 — "no index.html"
**Cause:** HTML files exist but no `index.html` entry point.
**Fix:** Add `index.html` as the main entry point OR create a Dockerfile manually.

### HTTP 422 — "Invalid env_vars JSON"
**Cause:** The `env_vars` field isn't valid JSON or isn't a JSON object.
**Fix:** Pass a JSON object like `{"API_KEY":"secret","DB_URL":"postgres://..."}`. Not an array, not a string.

---

## 3. Build Failures

### Status: "build_failed" — Workflow failed
**Diagnosis:** Call `get_build_logs` to see the GitHub Actions output.
**Common causes:**

#### Docker build error
Look for `ERROR` or `failed to` in the build log.
- **Missing dependency:** The Dockerfile installs packages that aren't available. Check package names, add missing system deps.
- **Wrong base image:** Image not available in Artifactory. Hatch rewrites Docker Hub images to Artifactory automatically, but uncommon images may not be mirrored. Use standard images: `node`, `python`, `alpine`, `ubuntu`, `nginx`.
- **Build command fails:** `npm install`, `pip install`, `go build`, etc. Read the error, fix the code or dependencies.

#### Build timeout (>10 minutes)
**Cause:** Docker build takes too long — usually large dependency installs or no caching.
**Fix:** Use multi-stage builds, reduce dependencies, add `.dockerignore` to exclude test files.

#### Workflow not triggered
**Cause:** Source push succeeded but GitHub Actions didn't run.
**Fix:** Retry the deploy. If persistent, check that the GitHub Actions workflow file exists in the repo.

### Status: "building" for too long
**Cause:** Build is running but hasn't completed.
**Action:** Keep polling `get_status`. Builds typically take 2-5 minutes. If >10 minutes, check `get_build_logs` for progress.

---

## 4. Runtime / Pod Failures

After a successful build, the app deploys to Kubernetes. These errors appear in pod status.

### CrashLoopBackOff
**Cause:** Container starts and immediately crashes, over and over.
**Diagnosis:** Call `get_deploy_logs` — the pod logs show the crash reason.
**Common causes:**
- App crashes on startup (unhandled exception, missing env var, wrong port)
- Missing runtime dependency
- App expects a database/service that isn't available
**Fix:** Read the logs, fix the startup error. Check that the `port` parameter matches what the app actually listens on.

### OOMKilled
**Cause:** App exceeded its memory limit.
**Fix:** Upgrade to a larger size tier:
- `huddle` → 128 MB → try `meetup` (256 MB)
- `meetup` → 256 MB → try `town-hall` (512 MB)
If the app needs more than 512 MB, it may need code-level optimization.

### ImagePullBackOff
**Cause:** Kubernetes can't pull the container image.
**Common causes:**
- Image URL is wrong or doesn't exist in the registry
- Registry credentials expired
- Build succeeded but image wasn't pushed correctly
**Fix:** Verify the image URL in `get_status` output. If it shows `(pending)`, the build may not have completed. Retry the deploy.

### Rollout timeout (status: "rollout_timeout")
**Cause:** New pods didn't become ready within 5 minutes.
**Diagnosis:** Check pod status in `get_status` — look for CrashLoopBackOff, OOMKilled, or Pending.
**Fix:** Address the underlying pod issue (see above).

### Pending pods
**Cause:** Kubernetes can't schedule the pod — usually insufficient cluster resources.
**Fix:** This is typically transient. Wait a few minutes. If persistent, the cluster may need scaling.

---

## 5. Permission Errors

### HTTP 403 — "Only the owner can modify this app"
**Cause:** You're trying to update/destroy an app you don't own.
**Fix:** Ask the app owner to add you as a co-owner using `add_coowner`.

### HTTP 403 — "You can only view apps you own or co-own"
**Cause:** Trying to get status or logs for someone else's app.
**Fix:** You can only see your own apps and apps where you're a co-owner.

### HTTP 400 — "Cannot remove the owner from allowed users"
**Cause:** Tried to remove the owner from the allowed-users list.
**Fix:** The owner always has access. This is by design.

---

## 6. Quota Errors

### HTTP 429 — "App limit reached (7/7)"
**Cause:** You already own 7 apps (the maximum per user).
**Fix:** Delete an app you no longer need with `destroy_app`, then deploy again. Co-owned apps don't count toward your limit.

---

## Quick Diagnosis Checklist

When something goes wrong, check in this order:

1. **What's the HTTP status code?** → Find it in the sections above
2. **Is the app building?** → Call `get_status` — if `building`, just wait and poll
3. **Did the build fail?** → Call `get_build_logs` — read the error
4. **Is the app crashing?** → Call `get_deploy_logs` — read pod logs
5. **Is it a size issue?** → Check for OOMKilled, upgrade tier
6. **Is it a port issue?** → Verify port matches what the app listens on
7. **Is it an auth issue?** → Get a fresh token with `get_deploy_token`
