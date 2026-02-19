# Android Bug Bounty Methodology

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

## Customising the methodology

Edit `public/methodology.json`: add or change `modulos` and `secciones`/`subsecciones`. Each subsection can have `triggers` (strings to look for in the manifest). When the user pastes a manifest, any subsection whose triggers appear in the text is marked "In scope".
