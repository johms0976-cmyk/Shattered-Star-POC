// js/ui/settingsMenu.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showSettings() {
  const screen = document.getElementById("settings-screen");
  screen.classList.add("active");

  const backBtn = document.getElementById("btn-settings-back");
  backBtn.onclick = () => returnToMenu();
}

async function returnToMenu() {
  await fadeOutUI(500);
  setState(STATE.START);
}
