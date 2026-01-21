// js/ui/mainMenu.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showStart() {
  const screen = document.getElementById("start-screen");
  screen.classList.add("active");

  const newGameBtn = document.getElementById("btn-newgame");
  const settingsBtn = document.getElementById("btn-settings");

  newGameBtn.onclick = () => beginNewGame();
  settingsBtn.onclick = () => openSettings();
}

async function beginNewGame() {
  await fadeOutUI(500);
  setState(STATE.NEWGAME);
}

async function openSettings() {
  await fadeOutUI(500);
  setState(STATE.SETTINGS);
}
