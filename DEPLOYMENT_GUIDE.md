# Deployment Guide

No programming required. No terminal, no Node.js, no Vercel CLI, no access token.

## Test it locally first

Unzip the folder and double-click `index.html`. It opens in your browser and works
completely offline. Check Home, Rectification Search, Alternate Finder, Repair Notes,
T-Code, Finding Dictionary and Fastener Reference, then narrow the browser window to
phone width to check the mobile layout.

## 1. Create the GitHub repository

1. GitHub → **New repository**
2. Name: `repair-engineering-starter-hub`
3. Visibility: **Private**
4. **Create repository**

## 2. Upload the files

1. **Add file → Upload files**
2. Drag in the **contents** of the project folder, not the folder itself.
   `index.html` must sit at the repository root:

   ```
   repair-engineering-starter-hub/
   ├── index.html        ← correct
   ├── styles.css
   ├── app.js
   ├── data/
   └── assets/
   ```

   Not `repair-engineering-starter-hub/repair-engineering-starter-hub/index.html`.
3. Commit message: `Initial Repair Engineering Starter Hub` → **Commit changes**

## 3. Connect Vercel

1. Vercel Dashboard → **Add New → Project**
2. Select `repair-engineering-starter-hub` → **Import**
3. Framework Preset: **Other**
4. Root Directory: `./`
5. Build Command: leave empty
6. Output Directory: leave empty
7. Install Command: leave empty
8. **Deploy**

Vercel serves `index.html` directly.

## 4. Protect the deployment

A private repository does **not** make the website private. Anyone with the URL can open
it unless you say otherwise. In Vercel:

**Project → Settings → Deployment Protection** → enable Vercel Authentication (or Password
Protection) for Production, then save and re-test in a private browser window.

## 5. Updating later

1. GitHub → the repo → navigate to the file, e.g. `data/repair-note-data.js`
2. **Add file → Upload files**, drop the new version in the same path, commit with a clear
   message such as `Update Repair Note database Rev 2`
3. Vercel deploys automatically. Check **Deployments** — status should read **Ready**.
4. If a new deployment is broken, open the previous deployment in the list and use
   **Promote to Production** to roll back.

## Troubleshooting

| Symptom | Cause |
|---|---|
| Blank page, no content | `index.html` is not at the repository root |
| Tools load but tables are empty | a file in `data/` is missing or was renamed |
| Handbook images missing | `assets/handbook-images/` was not uploaded |
| Rectification → Repair scheme search shows "could not be loaded" | `data/repair-schemes.js` is missing from the deployment — it is fetched on demand and is not in `index.html`'s script list, so it's easy to forget when uploading files one at a time |
| Old content after a commit | deployment still building — check Deployments, then hard-refresh |
