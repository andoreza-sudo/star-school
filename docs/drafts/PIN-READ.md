# Grown-ups PIN in first setup: read-through (PIN-SETUP)

Owner decision 2026-11-25: option (a), the grown-up sets the Grown-ups PIN during first setup.

How it works now:

- **New tablet:** on setup, "Let's go!" opens the PIN pad. A grown-up chooses 4 numbers and types them again. Nothing is saved until the PIN is chosen. Cancel stays on setup. A mismatch asks again.
- **A tablet that already has a PIN** (another child, Start over): setup does not ask again. The PIN is kept.
- **Old saves with no PIN:** unchanged from RC-1. The next Grown-ups tap asks the old times-table question once, then the grown-up chooses a PIN. Cancel just closes the pad; the next tap asks again. Nobody is locked out.
- **Forgot PIN?:** unchanged from RC-1. Three 2-digit times 2-digit sums, then a new PIN. All progress is kept.
- **Storage full, or the PIN pad cannot load:** setup still goes on, and the old question guards the first Grown-ups entry.

Every sentence on these screens is an approved RC-1 string except the ones below.

## New or changed sentences (approved by the owner 2026-11-25)

| Where | Proposed text | Why |
|---|---|---|
| Setup: the PIN pad after "Let's go!" (the line under "Choose a Grown-ups PIN") | A grown-up picks 4 numbers. The PIN keeps children out of the settings. | The child is holding the tablet on setup, so the first sentence tells them to hand it to a grown-up. The second sentence is the approved RC-1 line, unchanged. It replaces "Pick 4 numbers." on this one screen only. The Grown-ups first-entry pad keeps the approved line. |
| App log in Grown-ups (adult, only if the PIN pad's file fails to load) | the gate part did not load: setup went on without a PIN | A diagnostic line, like the approved "the gate part did not load: the old question was asked". |

## Reused, already approved (no change)

"Choose a Grown-ups PIN", "Type it again", "Type the same 4 numbers again.", "They didn't match. Choose a PIN again.", "PIN saved",
"The PIN could not be saved: the tablet's storage is full.", "Cancel", "Grown-ups PIN", "Type your 4-digit PIN.", "That's not the PIN. Try again.",
the Forgot PIN? sheet, and the About line "To open Grown-ups, tap Grown-ups on Home and type your PIN."
