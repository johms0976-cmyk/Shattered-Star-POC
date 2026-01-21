// js/core/stateRouter.js

import { GameState, STATE } from "./state.js";

import { showTitle } from "../ui/titleScreen.js";
import { showStart } from "../ui/mainMenu.js";
import { showNewGame } from "../ui/newGame.js";
import { showLoading } from "../ui/loadingScreen.js";
import { showSettings } from "../ui/settingsMenu.js";
import { showActIntro } from "../ui/actIntro.js";

import { showMap } from "../systems/map/mapUI.js";
import { showCombat } from "../systems/combat/combatUI.js";

export function applyState() {
  hideAllScreens();

  switch (GameState.current) {
    case STATE.TITLE:
      showTitle();
      break;

    case STATE.START:
      showStart();
      break;

    case STATE.NEWGAME:
      showNewGame();
      break;

    case STATE.SETTINGS:
      showSettings();
      break;

    case STATE.LOADING:
      showLoading();
      break;

    case STATE.ACT_INTRO:
      showActIntro();
      break;

    case STATE.MAP:
      showMap();
      break;

    case STATE.COMBAT:
      showCombat();
      break;

    default:
      console.warn("Unknown state:", GameState.current);
  }
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
}
