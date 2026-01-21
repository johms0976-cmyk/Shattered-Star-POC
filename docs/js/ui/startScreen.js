// js/ui/startScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showStartScreen() {
  const newGameBtn = document.getElementById("new-game");
  const settingsBtn = document.getElementById("open-settings");

  // NEW GAME → NEW_GAME state
  newGameBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.NEW_GAME);
  };

  // SETTINGS → SETTINGS state
  settingsBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.SETTINGS);
  };
}
