// js/core/stateRouter.js

import { STATE, GameState } from "./state.js";

import { showTitle } from "../ui/titleScreen.js";
import { showStart } from "../ui/mainMenu.js";
import { showMap } from "../systems/map/mapUI.js";

/**
 * The ONLY place that decides which screen is shown.
 */
export function applyState() {
  hideAllScreens();

  switch (GameState.current) {
    case STATE.TITLE:
      showTitle();
      break;

    case STATE.START:
      showStart();
      break;

    case STATE.MAP:
      showMap();
      break;

    default:
      console.warn("Unknown state:", GameState.current);
      showTitle();
      break;
  }
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
}

