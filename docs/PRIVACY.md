# Privacy and security

WaniKani credentials are requested only as personal read-only API tokens. The UI holds a token in component memory and calls `https://api.wanikani.com/v2` from the browser. The token is not written to localStorage, cookies, application requests, database rows, telemetry, or logs. Closing or reloading the page clears it. Disconnect removes this browser's stored snapshot and requests deletion of its group snapshot when connected.

The Worker derives identity from the Sites forwarded `oai-authenticated-user-email` header. Protected group routes check membership server-side for every request; the request's group identifier alone grants no access. Invitations are email-bound, single-use, hashed at rest, and expire after seven days. Posts/comments are parameterized and bounded. Progress publication requires explicit consent flags. A production review must verify that the Sites runtime injects the identity header for every route and blocks spoofed client-supplied values.

This code is a deployment candidate, not a claim of production security. Site privacy and app-level group authorization are separate controls. Before inviting family members, verify Sites Sign in with ChatGPT/identity configuration, migration application, invitation delivery/acceptance UX, the trusted identity header behavior, and access controls in the deployed environment.
