// js/ui/UIManager.js

import { STATE } from "../core/state.js";

import { showTitle } from "./titleScreen.js";
import { showStartScreen } from "./startScreen.js";
import { showSettingsMenu } from "./settingsMenu.js";
import { showNewGameScreen } from "./newGameScreen.js";
import { showActIntro } from "./actIntro.js";
import { showMapScreen } from "./mapScreen.js";
import { showCombatUI } from "./combatUI.js";

export function runUIForState(state) {
  hideAllScreens();

  switch (state) {
    case STATE.TITLE:
      activate("title-screen");
      showTitle();
      break;

    case STATE.START:
      activate("start-screen");
      showStartScreen();
      break;

    case STATE.SETTINGS:
      activate("settings-screen");
      showSettingsMenu();
      break;

    case STATE.NEW_GAME:
      activate("newgame-screen");
      showNewGameScreen();
      break;

    case STATE.ACT_INTRO:
      activate("act-intro");
      showActIntro();
      break;

    case STATE.MAP:
      activate("map-screen");
      showMapScreen();
      break;

    case STATE.COMBAT:
      activate("combat-screen");
      showCombatUI();
      break;
  }
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
  });
}

function activate(id) {
  document.getElementById(id).classList.add("active");
}
