// js/ui/startScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showStartScreen() {
  const screen = document.getElementById("start-screen");
  screen.classList.add("active");

  const newGameBtn = document.getElementById("new-game");
  const settingsBtn = document.getElementById("open-settings");

  function handleNewGame() {
    cleanup();
    transitionToNewGame();
  }

  function handleSettings() {
    cleanup();
    transitionToSettings();
  }

  newGameBtn.addEventListener("click", handleNewGame);
  settingsBtn.addEventListener("click", handleSettings);

  function cleanup() {
    newGameBtn.removeEventListener("click", handleNewGame);
    settingsBtn.removeEventListener("click", handleSettings);
  }
}

async function transitionToNewGame() {
  await fadeOutUI(600);
  setState(STATE.NEW_GAME);
}

async function transitionToSettings() {
  await fadeOutUI(600);
  setState(STATE.SETTINGS);
}
