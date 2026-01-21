// js/ui/mainMenu.js

import { setState, STATE } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";

export function showStart() {
  const screen = document.getElementById("start-screen");
  screen.classList.add("active");

  // Apply background image
  screen.style.backgroundImage = "url('assets/screens/start/startscreen1.png')";
  screen.style.backgroundSize = "cover";
  screen.style.backgroundPosition = "center";
  screen.style.backgroundRepeat = "no-repeat";

  // NEW GAME button
  const newGameBtn = document.getElementById("new-game");
  if (newGameBtn) {
    newGameBtn.onclick = () => {
      setState(STATE.NEWGAME);
      applyState();
    };
  }

  // SETTINGS button
  const settingsBtn = document.getElementById("open-settings");
  if (settingsBtn) {
    settingsBtn.onclick = () => {
      setState(STATE.SETTINGS);
      applyState();
    };
  }
}
