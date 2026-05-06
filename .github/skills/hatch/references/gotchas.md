# Top Gotchas

Things that trip up most users. Read these before every deploy.

## 1. node_modules in the archive

The #1 cause of oversized archives. If `node_modules/` is in the tar, the archive balloons to 100-300 MB and gets rejected (50 MB limit). Always `--exclude='./node_modules'`.

**How to check:** `tar tzf /tmp/_hatch_deploy.tar.gz | grep node_modules | head -5`
If you see output, node_modules leaked in.

## 2. .git directory in the archive

The `.git/` folder can be 50 MB+ in active repos. Always `--exclude='./.git'`.

## 3. Wrong port

The app must listen on the port you specified. Mismatched ports cause the pod to pass health checks on the wrong port and appear stuck or crash.

- Static sites (nginx auto-generated): port = **80**
- Node.js apps: usually **3000** (check `package.json` scripts or server code)
- Python Flask/FastAPI: usually **8000** or **5000**
- If the Dockerfile has `EXPOSE`, use that value

## 4. Secrets in the source

Never include `.env` files, API keys, or credentials in the source archive. Hatch scans for these and rejects the upload. Use `env_vars` instead — these go straight to Kubernetes Secrets and never touch GitHub.

## 5. Missing Dockerfile for non-static apps

If your app isn't a static HTML site, it needs a Dockerfile. Hatch only auto-generates Dockerfiles for projects with `index.html`. For Node.js, Python, Java, Go, etc., you need a Dockerfile at the project root.

## 6. Process substitution in tar

`tar czf archive.tar.gz --exclude-from=<(cat .gitignore)` fails on macOS with exit code 26. Write `--exclude` flags inline instead.

## 7. --exclude after -C

`tar czf archive.tar.gz -C /path . --exclude='./node_modules'` silently ignores the exclude because it comes after `-C`. Excludes must come **before** `-C`.

## 8. App name restrictions

Must be: lowercase, start with a letter, only `a-z`, `0-9`, `-`, between 2-63 characters. No underscores, no uppercase, no dots. The name becomes the subdomain: `https://<name>.hatch.internal.ai.dowjones.io` (internal default) or `https://<name>.hatch.ai.dowjones.io` (if `public=True`).

## 9. Deploying the same name updates the app

If an app with that name already exists and you own it, deploy is an update (zero-downtime rolling update). It doesn't create a second app.

## 10. Build takes 2-10 minutes

Source deploys are async. The upload returns 202 immediately, then the build runs in GitHub Actions. Don't assume the app is ready right after upload — poll `get_status` until it shows `running`.

## 11. Transient NOT_FOUND during builds

If you poll `get_status` during an active build and get NOT_FOUND once, keep polling. The K8s deployment may not exist yet if this is a first deploy. A single NOT_FOUND is not a failure.

## 12. Auth mode affects who can access the app

- `okta` (default): Only emails in the allowed-users list can access the app URL. The owner and co-owners are always included. Users must authenticate via Okta SSO.
- `none`: Removes the Okta login prompt. App is reachable without login — but still only on the DJ internal network/VPN (unless `public=True`, which is blocked with `auth=none`).

## 13. Public flag and domain

- By default all apps deploy to `*.hatch.internal.ai.dowjones.io` (internal NLB, VPN required).
- Pass `public=True` to expose on the public internet at `*.hatch.ai.dowjones.io`. Okta is **always** enforced on public apps — `public=True` + `auth=none` is rejected by the API.
- The public flag is **sticky**: omitting it on a redeploy preserves the current setting. Pass `public=False` explicitly to revert a public app to internal.
- Both the old `*.ai.build.pib.dowjones.io` URL and the new URL work simultaneously during the domain migration transition period.
