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

  // Remove previous listeners to avoid stacking
  newGameBtn.replaceWith(newGameBtn.cloneNode(true));
  settingsBtn.replaceWith(settingsBtn.cloneNode(true));

  const newNewGameBtn = document.getElementById("new-game");
  const newSettingsBtn = document.getElementById("open-settings");

  newNewGameBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.NEW_GAME);
  };

  newSettingsBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.SETTINGS);
  };
}
