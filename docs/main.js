// main.js

import { STATE, setState, onStateChange } from "/js/core/state.js";
import { preloadAllAssets } from "/js/core/loader.js";

// UI modules
import { showTitle } from "/js/ui/titleScreen.js";
import { showStartScreen } from "/js/ui/startScreen.js";
import { showNewGameScreen } from "/js/ui/newGameScreen.js";
import { showMapScreen } from "/js./ui/mapScreen.js";

// ------------------------------------------------------------
// INITIAL BOOT
// ------------------------------------------------------------
window.addEventListener("DOMContentLoaded", async () => {
  // Start with loading screen
  setState(STATE.LOADING);

  await preloadAllAssets(
    stage => updateLoadingStage(stage),
    progress => updateLoadingProgress(progress)
  );

  // After loading, go to title
  setState(STATE.TITLE);
});

// ------------------------------------------------------------
// STATE ROUTER
// ------------------------------------------------------------
onStateChange(newState => {
  hideAllScreens();

  switch (newState) {
    case STATE.TITLE:
      showScreen("title-screen");
      showTitle();
      break;

    case STATE.START:
      showScreen("start-screen");
      showStartScreen();
      break;

    case STATE.NEW_GAME:
      showScreen("newgame-screen");
      showNewGameScreen();
      break;

    case STATE.MAP:
      showScreen("map-screen");
      showMapScreen();
      break;

    case STATE.COMBAT:
      showScreen("combat-screen");
      // combat screen module goes here
      break;

    case STATE.SETTINGS:
      showScreen("settings-screen");
      // settings screen module goes here
      break;

    case STATE.ACT_INTRO:
      showScreen("act-intro");
      // act intro module goes here
      break;
  }
});

// ------------------------------------------------------------
// SCREEN HELPERS
// ------------------------------------------------------------
function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
}

function showScreen(id) {
  document.getElementById(id).classList.add("active");
}

// ------------------------------------------------------------
// LOADING SCREEN HELPERS
// ------------------------------------------------------------
function updateLoadingStage(text) {
  const el = document.querySelector(".loading-text");
  if (el) el.textContent = text;
}

function updateLoadingProgress(value) {
  const bar = document.getElementById("loading-progress");
  if (bar) bar.style.width = `${Math.floor(value * 100)}%`;
}
