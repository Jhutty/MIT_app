# MIT — The Most Important Thing

A single-file, local-first daily focus app built around one deceptively simple question: **what is the most important thing you need to do today?**

It lives in a single HTML file. No server, no account, no install. Open it in a browser and start working.

---

## The idea

Most productivity tools optimise for capturing everything. This one optimises for forgetting everything except one thing. Each day you pin one MIT — your Most Important Thing — and the rest of the app exists to support it: a Pomodoro timer to protect your focus time, a task list to capture the work around it, and a goals panel to make sure today's effort connects to something bigger.

---

## Features

### Goals & Milestones
- Three persistent goals, each with up to five milestones
- Navigate between goals with the arrow buttons (or ← → keyboard shortcuts)
- Click any goal name or milestone text to edit it inline
- Mark milestones complete; the next uncompleted one is highlighted as active
- One-click "→ Set as MIT" button on the active milestone promotes it to today's focus

### Daily MIT
- One MIT per day, pinned prominently at the top of the focus panel
- On first open each day, the app prompts you to set one — suggesting your active milestone or accepting free text
- The MIT is automatically added to your task list as a pinned "★ The MIT" task
- Click the MIT text to edit it inline at any time

### Tasks
- Three task types: **MIT** (a subtask of your MIT), **Other** (standalone), and the auto-created **★ The MIT** itself
- Completed tasks sink below a dashed fold line; unchecking moves them back
- Delete any task or milestone with the `×` button (appears on hover)

### Pomodoro Timer
- 45-minute sessions with a two-tone audio chime at completion (no external audio file needed — generated via Web Audio API)
- Optional browser notification on completion (prompts for permission once)
- Drift-resistant: stores an absolute end time, so pausing a tab or sleeping your laptop won't corrupt the countdown
- If a session finished while the tab was closed, it's silently counted on next load

### Daily Log
Each day's log shows three things, and only three things:
- Your MIT (the current one, not every change)
- Tasks you completed, in the order you completed them
- Total number of Pomodoros for the day

### MIT Streak
Counts consecutive days where you set an MIT and completed at least one task tied to it. The counter doesn't flash to zero first thing in the morning — it counts from yesterday until today qualifies.

### Light / Dark theme
Toggle with the 🌞/🌙 button. Defaults to your OS preference. Dark mode uses a desk-lamp-at-night palette rather than simple colour inversion.

### Data & Privacy
- Everything is stored in your browser's `localStorage` under the key `mit_app`
- Nothing is sent anywhere
- **Export** downloads a timestamped JSON backup (`mit-backup-YYYY-MM-DD.json`)
- **Import** replaces all current data after a confirmation prompt; validates the file shape before touching anything

---

## Usage

Download `mit-app.html` and open it in any modern browser. That's it.

```
# Option A — just open it
open mit-app.html

# Option B — serve it locally (avoids any file:// quirks)
npx serve .
# or
python3 -m http.server
```

No build step. No `npm install`. No bundler. The only external dependency is Google Fonts, loaded from a CDN — the app works without it, just falls back to system fonts.

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `←` / `→` | Navigate between goals (when not typing) |
| `Enter` | Commit an inline edit (goal name, MIT text, milestone text) |
| `Escape` | Cancel an inline edit without saving |
| `Enter` | Add a task (in the task input) |
| `Enter` | Add a milestone (in the milestone input) |
| `Space` | Toggle a milestone's done state (when focused) |

---

## Data schema

Stored as JSON in `localStorage`:

```json
{
  "version": 1,
  "theme": "light",
  "activeGoalIndex": 0,
  "goals": [
    {
      "id": "goal_1",
      "name": "Launch product",
      "milestones": [
        { "id": "ms_abc", "text": "Write spec", "done": false }
      ]
    }
  ],
  "days": {
    "2025-08-14": {
      "mit": "Write spec",
      "mitSetAt": "2025-08-14T08:32:00.000Z",
      "tasks": [
        {
          "id": "task_xyz",
          "text": "Write spec",
          "source": "mit_itself",
          "done": true,
          "doneAt": "2025-08-14T16:47:00.000Z"
        }
      ],
      "pomodoroCount": 3
    }
  },
  "timerState": { "running": false, "endTime": null, "remainingMs": 2700000 },
  "mitStreak": 4
}
```

Task `source` values: `mit_itself` · `mit_subtask` · `standalone`

---

## Design

The visual language is a warm cork board with index cards — handwriting font ([Caveat](https://fonts.google.com/specimen/Caveat)) for the MIT headline, serif ([Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4)) for dates and labels, and a neutral sans ([Archivo](https://fonts.google.com/specimen/Archivo)) for the UI chrome. Cards are slightly rotated, attached with pins or tape.

On mobile (≤ 880 px) the three panels collapse into accordions, with the Focus panel pinned open and placed first so your MIT is the first thing you see every morning.

---

## Browser support

Tested in Chrome, Firefox, and Safari. Requires a browser that supports:
- `localStorage`
- `Web Audio API` (for the timer chime — degrades silently if unavailable)
- `Notification API` (optional — permission is requested once on first timer start)
- CSS custom properties and Grid

---

## License

Apache Licence 2.0
