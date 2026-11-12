/* ---------- sharing needs a connection (the rest of the app works offline) ---------- */
/* Star School is an offline app. Anything that sends something off the tablet (share, send, email, print, upload)
   needs a connection, so every such button:
   - shows onlineNote() next to it, so a grown-up knows to get online first;
   - runs its action through needOnline(action, {block}): offline, it shows a friendly message first.
     block:true (share, send, upload) stops there; block:false (print, which can still save a PDF on the tablet)
     shows the message and then carries on.
   Nothing here ever reaches the network itself. */
const ONLINE_NOTE = 'Make sure the tablet is online to share or print.';
const OFFLINE_MSG = "You're offline. Connect to wifi to share or print.";

// The small note that sits under or beside a share / send / print button.
function onlineNote() {
  return `<div class="online-note">${esc(ONLINE_NOTE)}</div>`;
}

// true when the browser says it is offline (navigator.onLine is only reliable when false).
function isOffline() {
  return typeof navigator != 'undefined' && navigator.onLine === false;
}

// Runs action() unless offline and blocked; returns true when the action ran.
function needOnline(action, o = {}) {
  if (isOffline()) {
    fb(OFFLINE_MSG, 'bad', 2600);
    if (o.block !== false) return false;
  }
  action();
  return true;
}
