// ------------------------------------------------------------
// GLOBAL ERROR LOGGER — CATCHES ALL RUNTIME + PROMISE ERRORS
// ------------------------------------------------------------
window.addEventListener("error", e => {
  console.error(
    "GLOBAL ERROR:",
    e.message,
    "at",
    e.filename,
    "line",
    e.lineno,
    "col",
    e.colno
  );
});

window.addEventListener("unhandledrejection", e => {
  console.error("UNHANDLED PROMISE:", e.reason);
});

// ------------------------------------------------------------
// IMPORTS
// ------------------------------------------------------------
import { STATE, setState, onStateChange } from "./js/core/state.js";
import { preloadAllAssets } from "./js/core/loader.js";

import { showTitleFlyby, showTitleLoop } from "./js/ui/titleScreen.js";
import { showStartScreen } from "./js/ui/startScreen.js";
import { showNewGameScreen } from "./js/ui/newGameScreen.js";
import { showMapScreen } from "./js/ui/mapScreen.js";
import { showSettingsMenu } from "./js/ui/settingsMenu.js";
import { showActIntro } from "./js/ui/actIntro.js";
import { showCombatUI } from "./js/ui/combatUI.js";

// ------------------------------------------------------------
// STATE ROUTER — MUST BE REGISTERED BEFORE ANY STATE CHANGES
// ------------------------------------------------------------
onStateChange(newState => {
  hideAllScreens();

  switch (newState) {

    case STATE.LOADING:
      showScreen("loading-screen");
      break;

    case STATE.TITLE_FLYBY:
      showScreen("title-screen");
      showTitleFlyby();
      break;

    case STATE.TITLE_LOOP:
      showScreen("title-screen");
      showTitleLoop();
      break;

    case STATE.START:
      showScreen("start-screen");
      showStartScreen();
      break;

    case STATE.SETTINGS:
      showScreen("settings-screen");
      showSettingsMenu();
      break;

    case STATE.NEW_GAME:
      showScreen("newgame-screen");
      showNewGameScreen();
      break;

    case STATE.ACT_INTRO:
      showScreen("act-intro");
      showActIntro();
      break;

    case STATE.MAP:
      showScreen("map-screen");
      showMapScreen();
      break;

    case STATE.COMBAT:
      showScreen("combat-screen");
      showCombatUI();
      break;
  }
});

// ------------------------------------------------------------
// INITIAL BOOT — MUST COME AFTER ROUTER
// ------------------------------------------------------------
window.addEventListener("DOMContentLoaded", async () => {

  // Enter loading state
  setState(STATE.LOADING);

  // Preload assets
  await preloadAllAssets(
    stage => updateLoadingStage(stage),
    progress => updateLoadingProgress(progress)
  );

  // Move to cinematic flyby
  setState(STATE.TITLE_FLYBY);
});

// ------------------------------------------------------------
// SCREEN HELPERS
// ------------------------------------------------------------
function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
}

function showScreen(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
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
