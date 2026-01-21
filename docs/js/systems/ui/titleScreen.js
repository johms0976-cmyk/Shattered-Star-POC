// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";

let initialized = false;

export function showTitle() {
  const screen = document.getElementById("title-screen");
  screen.classList.add("active");

  // Only wire listeners once
  if (!initialized) {
    const pressEnter = document.getElementById("press-enter");

    const goToStart = () => {
      setState(STATE.START);
      applyState();
    };

    pressEnter.onclick = goToStart;

    window.addEventListener("keydown", e => {
      if (e.key === "Enter") goToStart();
    });

    initialized = true;
  }
}
