# User Flows

All flows below are implemented and clickable in the demo. None of them
trigger a real network call — see [LIMITATIONS.md](LIMITATIONS.md).

## 1. First visit → demo login

```
Landing page (/)
  → "View the demo" → /login (any input accepted, nothing checked)
  → "Enter demo workspace" → /dashboard
```

## 2. Discover → translate → draft → submit (the core loop)

```
Dashboard: "Top matches for you"
  → click a project → /projects/[id]
      → read the original (English) brief
      → click "Show Persian translation" → see the pre-translated brief, RTL
      → review the AI-drafted proposal text + suggested bid (editable)
      → click "Approve & submit"
          → simulated network delay → success toast
          → project status badge flips to "Submitted"
```

This is the flow that most directly demonstrates the product's core value
proposition (translation-first review before an irreversible send action —
the human-in-the-loop requirement carried over from the original dossier).

## 3. Filter and search the project feed

```
/projects
  → search by title, filter by platform, filter by status
  → "Simulate load error" → shows the app's error/retry state on demand
  → clearing filters when a filter set returns zero results → empty state
```

## 4. Review proposal history

```
/proposals
  → filter by status (draft / sent / won / lost)
  → click through to the originating project
```

## 5. Check performance

```
/analytics
  → weekly proposals-sent-vs-won trend (chart or table view)
  → win rate by platform
```

## 6. Manage the workspace

```
/settings
  → connect/disconnect a platform (simulated)
  → switch language (English ⇄ فارسی, full RTL layout switch)
  → switch AI preference (local vs. cloud model — UI only, no live call either way)
```

## 7. Ask the assistant

```
/assistant
  → suggested prompts or free text
  → keyword-matched canned answers referencing the current mock dataset
```

## Cross-cutting: language & theme

Every page respects the global locale (EN/FA, with RTL mirroring of layout,
not just text direction) and light/dark theme, set from the top bar and
persisted to `localStorage` for the session.
