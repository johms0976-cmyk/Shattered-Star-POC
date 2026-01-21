// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showTitle() {
  const screen = document.getElementById("title-screen");
  screen.classList.add("active");

  // Press Enter to continue
  function handleKey(e) {
    if (e.key === "Enter") {
      window.removeEventListener("keydown", handleKey);
      startTransitionToMenu();
    }
  }

  window.addEventListener("keydown", handleKey);
}

async function startTransitionToMenu() {
  await fadeOutUI(600);
  setState(STATE.START);
}
