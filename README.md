# Kotoba Club

A small, mobile-first Japanese learning club: reference search, one-tap pronunciation, sharing, comments, favorites, private group progress, and direct WaniKani sync.

First-time visitors see a welcome page and a three-step setup for ChatGPT sign-in, a starting level, and optional read-only WaniKani sync. A connected WaniKani level takes priority over the manual starting preference. The setup can be opened again from Profile.

## Development

Requirements: Node.js 20+ and npm.

```sh
npm ci
npm run dev
```

Run checks:

```sh
npm run typecheck
npm test
npm run build
```

## WaniKani

Use a personal read-only API token from WaniKani settings; never use a password. Requests are made directly by the browser using API v2 revision `20170710`. Token memory is cleared when leaving/reloading the app. Published summaries require explicit per-field consent. The API data shown is limited to username, level, and counts of assignments with SRS stage above zero and total assignment counts by type; these are not review counts, accuracy, or a streak.

## Data and privacy

See [Privacy](docs/PRIVACY.md) and [Architecture](docs/ARCHITECTURE.md). No authentication, app database, or production security claim is provided by a static preview alone. ChatGPT Sites must supply a trusted authenticated identity header to the Worker, and the migration must be applied before group use. Keep the Site owner-only until authorization and invitation flows have been verified.

## Sources and assets

The starter vocabulary is hand-curated, not copied from WaniKani. Pronunciation uses the device's built-in Japanese speech synthesis. Design reference images informed the layout but are not redistributed with this source. UI dependencies are MIT; React and Vite are MIT; the interface uses system fonts. Project code is AGPL-3.0.

## Self-hosting

Build with `npm run build`. A compatible Worker/D1 host must provide a trusted identity assertion to `oai-authenticated-user-email`, bind D1 as `DB`, serve `dist/`, and apply `migrations/0001_init.sql`. Do not expose the Worker without a trusted authentication layer.

## ChatGPT Sites deployment

See [deployment workflow](docs/ARCHITECTURE.md#sites-deployment). Sites is the deployment target; GitHub is the source of truth and must be updated separately. Never put user tokens, user records, or deployment credentials in Git.
