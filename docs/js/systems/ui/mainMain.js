// js/ui/mainMenu.js

import { setState, STATE } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";
import { glitchFlash, fadeIn } from "../core/transitions.js";

let initialized = false;

export function showStart() {
  const screen = document.getElementById("start-screen");
  screen.classList.add("active");

  // Smooth fade-in when the Start screen appears
  fadeIn(600);

  if (initialized) return;

  const newGameBtn = document.getElementById("new-game");

  newGameBtn.onclick = () => {
    glitchFlash(150, () => {
      setState(STATE.NEWGAME);
      applyState();
    });
  };

  initialized = true;
}
