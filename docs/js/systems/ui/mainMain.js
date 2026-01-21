// js/ui/mainMenu.js

import { setState, STATE } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";

let initialized = false;

export function showStart() {
  const screen = document.getElementById("start-screen");
  screen.classList.add("active");

  if (initialized) return;

  const newGameBtn = document.getElementById("new-game");

  newGameBtn.onclick = () => {
    setState(STATE.MAP);
    applyState();
  };

  initialized = true;
}

