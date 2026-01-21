// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";
import { glitchFlash, fadeIn } from "../core/transitions.js";

let initialized = false;

export function showTitle() {
  const screen = document.getElementById("title-screen");
  screen.classList.add("active");

  // Fade in the moment the title screen becomes active
  fadeIn(600);

  if (!initialized) {
    const pressEnter = document.getElementById("press-enter");

    const goToStart = () => {
      glitchFlash(150, () => {
        setState(STATE.START);
        applyState();
      });
    };

    pressEnter.onclick = goToStart;

    window.addEventListener("keydown", e => {
      if (e.key === "Enter") goToStart();
    });

    initialized = true;
  }
}
