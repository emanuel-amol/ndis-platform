# NDIS Provider Platform – Dev Scaffold (PO6)

This repository is a **backend-ready, visual scaffold** for the AI-Integrated NDIS Provider Management Platform (PO6).

- 6 **React (Vite)** frontends (visual only) to demonstrate the end-to-end flow.
- **FastAPI** backend skeletons inside each module, ready for API work.
- **Single command, single URL** dev runner (no Docker required) to start all frontends behind a local proxy.

---

## Quick Start (run **all** frontends)

```powershell
npm install
npm start
```

**Opens:** [http://localhost:8080](http://localhost:8080)

**Routes**

* `/` → Portal (login + dashboard)
* `/talent/`, `/onboarding/`, `/rostering/`, `/compliance/`, `/tickets/` → module UIs

> Backends are skeletons (not wired yet). Each team can start building APIs in `backend/`.

---

## Run **one module** only (frontend)

**Example: run just `rostering-sil`**

```powershell
npm --prefix rostering-sil install
npm --prefix rostering-sil run dev -- --port 5103 --base /rostering/
```

Open: [http://localhost:5103/rostering/](http://localhost:5103/rostering/)

**Other modules**

```powershell
# portal
npm --prefix portal install
npm --prefix portal run dev -- --port 5100 --base /

# talent-acquisition
npm --prefix talent-acquisition install
npm --prefix talent-acquisition run dev -- --port 5101 --base /talent/

# onboarding
npm --prefix onboarding install
npm --prefix onboarding run dev -- --port 5102 --base /onboarding/

# compliance-billing
npm --prefix compliance-billing install
npm --prefix compliance-billing run dev -- --port 5104 --base /compliance/

# ticketing-incidents
npm --prefix ticketing-incidents install
npm --prefix ticketing-incidents run dev -- --port 5105 --base /tickets/
```

---

## Run a module's **backend** (FastAPI skeleton)

**Example: `rostering-sil/backend` on :7003**

```powershell
cd rostering-sil/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app:app --reload --port 7003
```

Health check: **GET [http://localhost:7003/health](http://localhost:7003/health)**

**Suggested backend dev ports**

* `portal/backend` → 7000
* `talent-acquisition/backend` → 7001
* `onboarding/backend` → 7002
* `rostering-sil/backend` → 7003
* `compliance-billing/backend` → 7004
* `ticketing-incidents/backend` → 7005

Document endpoints in **`docs/api-contracts.md`** as you implement them.

---

## How the scaffold works

* **Frontends**
  Each module is a standalone React (Vite) app. The root script `dev.mjs`:

  * Installs dependencies per module if missing,
  * Starts each Vite dev server on its own port,
  * Runs a lightweight **reverse proxy** on **:8080** so you get a single URL with clean paths.

* **Backends**
  Each module has `backend/` with a **FastAPI** app (`app.py`, `GET /health`).
  Add your routers/services per module without impacting others.

* **APIs**
  When implementing endpoints, expose them from your module's backend (e.g., `http://localhost:7003` for rostering). Frontends call these directly during dev. We can add an API gateway later if needed.

---

## Repository layout

```text
ndis-platform/
├─ portal/                 # Login UI + dashboard (visual). backend/ for auth/RBAC later.
├─ talent-acquisition/     # Req 1: job postings + AI ranking (Watsonx later)
├─ onboarding/             # Req 2: onboarding wizard + checks (RPA/ID later)
├─ rostering-sil/          # Req 3 & 6: rostering calendar + SIL homes
├─ compliance-billing/     # Req 4 & 8: compliance/credentials + comms + Xero invoicing
├─ ticketing-incidents/    # Req 5 & 7: HR tickets + incidents/doc workflow
├─ docs/
│  ├─ api-contracts.md     # Document your endpoints here as you implement them
│  └─ architecture-diagram.png
├─ package.json            # Runner deps (http-proxy, open)
├─ dev.mjs                 # One-process runner/proxy for all frontends @ :8080
└─ setup.ps1               # Scaffold builder (used to generate this structure)
```

**Each module** (e.g., `rostering-sil/`) contains:

```text
<module>/
├─ package.json
├─ vite.config.js
├─ index.html
├─ src/                    # React app (visual UI)
│  ├─ main.jsx
│  ├─ App.jsx
│  └─ styles.css
└─ backend/                # FastAPI skeleton (start building your APIs here)
   ├─ app.py
   ├─ requirements.txt
   ├─ routers/
   └─ services/
```

---

## Ownership & scope (PO6)

| Module (folder)        | Dev Route      | PO6 scope (summary)                                                                  | Owner                   |
| ---------------------- | -------------- | ------------------------------------------------------------------------------------ | ----------------------- |
| `portal/`              | `/`            | Login, role-based dashboard; later: auth/RBAC, audit, API gateway if needed          | **Emanuel Singh**       |
| `talent-acquisition/`  | `/talent/`     | **Req 1**: Jobs CRUD, applications, AI ranking (Watsonx adapter in backend/services) | **Vanshika Reddy**      |
| `onboarding/`          | `/onboarding/` | **Req 2**: Onboarding wizard, checks, contracts; RPA/ID integrations                 | **Natalia Evangelidis** |
| `rostering-sil/`       | `/rostering/`  | **Req 3 & 6**: Rostering calendar, conflict/overlap/travel; SIL homes/rooms          | **Aryan Singla**        |
| `compliance-billing/`  | `/compliance/` | **Req 4 & 8**: Credential tracking/alerts; Email/SMS comms; **Xero invoicing**       | **Kajal Dhanjal**       |
| `ticketing-incidents/` | `/tickets/`    | **Req 5 & 7**: HR ticketing (AskHR later), incident logging & document workflow      | **Sahil Amin**          |

> Folder names are neutral; this table is the single source of truth for responsibilities.

---

## GitHub workflow & etiquette (don't break `main`)

### Golden rules

* **Never push to `main` directly.** Always use branches + Pull Requests (PRs).
* **One PR = one module / one change.** Avoid cross-module edits in the same PR.
* **Keep the dev runner green.** `npm start` (root) must still open `/`, `/talent/`, `/onboarding/`, `/rostering/`, `/compliance/`, `/tickets/`.

### Branching

Use short, descriptive branches. Prefix with the type and the module.

* Types: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`
* Examples:

  * `feat/rostering-conflict-engine`
  * `fix/compliance-expiry-edgecase`
  * `docs/talent-api-contracts`

Create a branch:

```powershell
git checkout -b feat/rostering-conflict-engine
```

### Commit messages (Conventional Commits)

Format: `type(scope): summary`

* `feat(rostering-sil): add conflict engine stub`
* `fix(compliance-billing): null-safe expiry check`
* `docs(onboarding): add KYC flow diagram`

Commit:

```powershell
git add .
git commit -m "feat(rostering-sil): add conflict engine stub"
```

### Pull Requests (PRs)

1. **Push your branch**

   ```powershell
   git push -u origin feat/rostering-conflict-engine
   ```

2. **Open a PR** to `main`

   * Title = same as your best commit.
   * Description = what & why; screenshots/GIF welcome.
   * **Link to PO6 requirement** you're addressing.
   * **Checklist (tick before requesting review):**

     * [ ] Module UI runs: `npm --prefix <module> run dev`
     * [ ] **Root runner still works:** `npm start` (portal + all modules still open)
     * [ ] Updated `docs/api-contracts.md` if API surface changed
     * [ ] No secrets committed (`.env`, keys)
     * [ ] No unintentional edits in other modules

3. **Reviewers**

   * Request the **module owner** (see table above).
   * Any PR touching **`dev.mjs`** or **`portal/`** must also ping **Emanuel**.

4. **Merging**

   * Prefer **Squash & Merge** (keeps history clean).
   * If the change is risky or cross-cutting, consider a **Draft PR** first.

### Working safely (and fast)

* **Stay in your lane:** Only change files inside **your module** unless explicitly coordinating.
* **Shared files:** If you must touch `dev.mjs`, `README.md`, or `docs/api-contracts.md`, keep it tiny and well-explained in the PR.
* **Deleting modules:** Don't hard-delete on `main`. Move to `_archive/<module>-YYYYMMDD/` in a PR, or update `dev.mjs` to skip missing apps.
* **Conflicts:** Rebase early, rebase often.

  ```powershell
  git fetch origin
  git rebase origin/main
  # resolve conflicts, then:
  git push --force-with-lease
  ```

### Environment & secrets

* **Never commit secrets.** Use local `.env` / `.env.local` files, add them to `.gitignore`.
* If you must share test creds, put **fake/demo** values in `README.md` or `/docs/` with clear warnings.

### When adding or removing a module

* Add/remove the entry in `dev.mjs`'s `apps` list.
* Ensure `vite.config.js` `base` matches the route (`/talent/`, `/onboarding/`, etc.).
* Verify:

  ```powershell
  npm start   # portal + all modules still available under http://localhost:8080
  ```

### Hotfix protocol

* Branch from `main`: `fix/<module>-<issue>`
* Keep changes surgical; add a test or UI repro note if possible.
* PR with clear **Before/After** description; squash merge.

### Optional (recommended later): branch protection

Ask a maintainer to enable **Branch Protection** on `main`:

* Require PRs for merges
* Require at least **1 approval**
* Require branches to be up to date before merging
* (Later) add CI checks if you introduce lint/tests

---

## Troubleshooting

* **Nothing opens:** ensure Node 18+ (or 20+), then `npm install && npm start` at repo root.
* **Busy ports:** change the `--port` when running a single module, or close previous dev servers.
* **Windows BOM issues:** if you hand-create JSON files and see parse errors, re-save as **UTF-8 (no BOM)**.
* **Deleting a module but still using the root runner:** remove it from the `apps` list in `dev.mjs` (or add a filter to skip missing folders).

---

## Next steps

* Build real API routes under each module's `backend/routers/`.
* Wire UI components to your APIs.
* (Optional) Add Dockerfiles/compose for reproducible deployment after backend stabilises.