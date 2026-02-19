# Android Bug Bounty Methodology (ABBM)

A modular web platform for Android bug bounty methodology, inspired by OWASP WSTG. Content is driven by `public/methodology.json`.

## Features

- **Data driven**: Methodology sections (ID, title, description, triggers) are loaded from `methodology.json`.
- **Scope Mapper**: Paste `AndroidManifest.xml` to see which sections apply (e.g. deep links, exported components).
- **Dynamic UI**: Three modules (Manifest/Static, Dynamic, Exploitation). Sections without matching triggers appear shaded but remain readable.
- **Neutral**: No severity labels; the tool only surfaces attack surface, not ratings.
- **Arsenal**: Recommended tools per phase (JADX, Frida, Burp Suite, etc.).
- **Persistence**: Projects, notes and checklist are saved in the browser (localStorage). Each visitor has their own data; no backend or login required.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (static export)

The app is built as a **static export** so you can host it on any static host (e.g. GitHub Pages):

```bash
npm run build
```

Output is in the `out/` folder. Serve that folder with any static server, or deploy it to GitHub Pages.

## Deploy on GitHub Pages

1. **Project site** (e.g. `https://username.github.io/meth1/`) – most common:  
   In `next.config.js`, uncomment and set your repo name:
   ```js
   basePath: '/meth1',      // replace meth1 with your repo name
   assetPrefix: '/meth1/',
   ```

2. Push the repo to GitHub. In the repo go to **Settings → Pages**:
   - **Source**: “Deploy from a branch” → switch to **GitHub Actions** (or use the workflow below).
   - If you use the included workflow (`.github/workflows/deploy-gh-pages.yml`): trigger it by pushing to `main` or running it manually. Then in **Settings → Pages**, set source to **GitHub Actions** and select the “Deploy to GitHub Pages” workflow. The first run will publish the site.

3. **User/org site** (e.g. `https://username.github.io/`):  
   Use a repo named `username.github.io`. Leave `basePath` and `assetPrefix` commented out in `next.config.js`. Build and deploy the contents of `out/` (e.g. to the `main` branch or via the same workflow).

Once deployed, anyone can use the site. **Projects, notes and checklist persist in each visitor’s browser** (localStorage) on that device. No server or database is required.

## Customising the methodology

Edit `public/methodology.json`: add or change `modulos` and `secciones`/`subsecciones`. Each subsection can have `triggers` (strings to look for in the manifest). When the user pastes a manifest, any subsection whose triggers appear in the text is marked "In scope".
