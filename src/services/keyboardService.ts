export type ShortcutAction =
  | "toggleSearch"
  | "toggleTerminal"
  | "toggleAudio"
  | "closeModal"
  | "prevArticle"
  | "nextArticle";

type ShortcutHandler = (action: ShortcutAction) => void;
const handlers: ShortcutHandler[] = [];

let isInitialized = false;

export function initKeyboardService() {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const isInput =
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA";

    // Ctrl+K or Cmd+K: Spotlight Search
    if (isCtrlOrCmd && e.key.toLowerCase() === "k") {
      e.preventDefault();
      emitAction("toggleSearch");
      return;
    }

    // Ctrl+` or Cmd+`: Quake Terminal
    if (isCtrlOrCmd && e.key === "`") {
      e.preventDefault();
      emitAction("toggleTerminal");
      return;
    }

    // Escape: Close modal
    if (e.key === "Escape") {
      emitAction("closeModal");
      return;
    }

    // If typing in an input field, do not trigger space or bracket shortcuts
    if (isInput) return;

    // Space: Toggle Audio
    if (e.key === " ") {
      e.preventDefault();
      emitAction("toggleAudio");
      return;
    }

    // [ or ]: Prev / Next
    if (e.key === "[") {
      emitAction("prevArticle");
    } else if (e.key === "]") {
      emitAction("nextArticle");
    }
  });
}

function emitAction(action: ShortcutAction) {
  handlers.forEach((fn) => fn(action));
}

export function subscribeShortcuts(handler: ShortcutHandler) {
  handlers.push(handler);
  return () => {
    const idx = handlers.indexOf(handler);
    if (idx !== -1) handlers.splice(idx, 1);
  };
}
