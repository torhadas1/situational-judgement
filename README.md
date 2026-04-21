# Situational Judgement Simulation

A React SPA delivering the **Rainforest Restoration Mission** — a 13-question, 20-minute situational-judgement simulation with forward-only navigation and a downloadable CSV answer key.

**Live:** https://torhadas1.github.io/situational-judgement/

---

## Running locally

```bash
cd sjs
npm install
npm start
```

Opens at `http://localhost:3000`. The app is fixed at 1120×630 to match the iframe host.

## Running tests

```bash
cd sjs
npm test
```

26 tests across 6 suites (utils, context, components).

## Editing content

All mission content lives in `sjs/public/db.json`. The schema:

```
missions[] → questions[] → steps[]
```

Each step has a `type` field: `narrative`, `pick-one`, `reorder`, or `outcome`.

- **narrative** — `body` (string, supports `\n\n` paragraph breaks, `- ` bullet lines, `**bold**` headings)
- **pick-one** — `prompt` + `options[]` (`id` + `text`)
- **reorder** — `prompt` + `options[]` (`id` + `text`)
- **outcome** — `variants` object keyed by the pick-one `id` from the same question

No code changes needed to add questions or change wording — edit the JSON and reload.

## Deploying to GitHub Pages

```bash
cd sjs
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch of the configured remote. The `homepage` in `package.json` is set to `https://torhadas1.github.io/situational-judgement/`.

On first deploy, enable Pages in the GitHub repo settings: **Settings → Pages → Source: `gh-pages` branch**.
