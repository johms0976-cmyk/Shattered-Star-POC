// js/ui/startScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";
import { assetPath } from "../core/path.js";

export function showStartScreen() {
  const screen = document.getElementById("start-screen");

  // Corrected path (no "assets/" prefix)
  screen.style.backgroundImage = `url(${assetPath("screens/start/startscreen1.png")})`;

  const newGameBtn = document.getElementById("new-game");
  const settingsBtn = document.getElementById("open-settings");

  // Remove previous listeners to avoid stacking
  const newGameClone = newGameBtn.cloneNode(true);
  const settingsClone = settingsBtn.cloneNode(true);

  newGameBtn.replaceWith(newGameClone);
  settingsBtn.replaceWith(settingsClone);

  // Re-select after cloning
  const freshNewGameBtn = document.getElementById("new-game");
  const freshSettingsBtn = document.getElementById("open-settings");

  freshNewGameBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.NEW_GAME);
  };

  freshSettingsBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.SETTINGS);
  };
}
