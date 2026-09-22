# Demo Guide

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Demo credentials

The login form is decorative — **any email/password is accepted**, nothing
is checked. It's pre-filled with:

```
Email:    demo@freelancepilot.app
Password: demo-pass
```

There is no real account behind these — see [LIMITATIONS.md](LIMITATIONS.md).

## Suggested walkthrough (~2 minutes)

1. **Landing page** — read the "Honest project status" section near the
   bottom; it's the same disclosure as this doc, just in-product.
2. **Login** → any input → lands on the dashboard.
3. **Dashboard** — note the demo-data banner, the KPI cards, and the
   "Top matches" list.
4. Click into the **"Landing page copy + translation (EN → FA)"** project —
   it's the best example of the core loop:
   - Toggle **"Show Persian translation"** — the whole panel flips to RTL.
   - Edit the AI-drafted proposal text or bid if you like.
   - Click **"Approve & submit"** — watch the status badge and the toast.
5. **Projects** page — try the platform/status filters, and click
   **"Simulate load error"** to see the error + retry state.
6. **Analytics** — toggle **"View as table"** on the weekly chart (the
   accessible fallback for the chart's one contrast warning — see
   [TESTING.md](TESTING.md)).
7. Switch the top-bar language toggle to **FA** — the entire app mirrors to
   RTL, not just the text.
8. Toggle **dark mode** from the top bar.
9. **AI Assistant** — ask "What's my current win rate?" or "Which project
   is my best match?" and see the keyword-matched (not LLM-generated)
   response.

## Resetting demo state

Refresh the page — nothing persists beyond the current session (no
`localStorage` writes except your theme/locale preference).
