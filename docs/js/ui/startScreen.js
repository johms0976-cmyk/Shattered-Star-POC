// js/ui/startScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";
import { assetPath } from "../core/path.js";

export function showStartScreen() {
  const screen = document.getElementById("start-screen");

  // Apply background dynamically
  screen.style.backgroundImage = `url(${assetPath("assets/screens/start/startscreen1.png")})`;

  const newGameBtn = document.getElementById("new-game");
  const settingsBtn = document.getElementById("open-settings");

  newGameBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.NEW_GAME);
  };

  settingsBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.SETTINGS);
  };
}
