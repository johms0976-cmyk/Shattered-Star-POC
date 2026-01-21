// js/ui/newGame.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showNewGame() {
  const screen = document.getElementById("newgame-screen");
  screen.classList.add("active");

  const startBtn = document.getElementById("btn-start-run");
  startBtn.onclick = () => startRun();
}

async function startRun() {
  await fadeOutUI(600);
  setState(STATE.ACT_INTRO);
}
