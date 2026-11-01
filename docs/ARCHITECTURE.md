# Architecture

- React + TypeScript + Vite client; Worker API and D1 persistence through ChatGPT Sites.
- `worker.ts` owns identity, private group membership checks, invitations, posts, comments, progress snapshots, and response security headers.
- `migrations/0001_init.sql` defines groups, memberships, invitations, shares, comments, snapshots, and consent state.
- WaniKani API v2 is called directly by the browser. No password or server proxy is involved.
- Japanese seed items are limited editorial examples; audio is browser `speechSynthesis` in Japanese. No restricted WaniKani learning material is redistributed.
- Browser-local cache is used for UI continuity. Group persistence is via the authenticated Worker API.

## Sites deployment

`.openai/hosting.json` declares a Worker entrypoint, static `dist` assets and the D1 binding. Create/configure a private ChatGPT Site and enable its supported authenticated identity context, apply the included migration, then push the exact source commit before saving/deploying that commit in Sites. Do not assume a Sites deployment syncs back to GitHub. The current Sites connector may provision a platform source remote; the user-requested public GitHub repository must separately contain the same source commit. Verify private audience and forwarded identity in production before inviting users.
