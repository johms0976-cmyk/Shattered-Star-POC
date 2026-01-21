// js/core/stateRouter.js

import { STATE, GameState } from "./state.js";
import { glitchTransition } from "./transition.js";

import { showTitle } from "../ui/titleScreen.js";
import { showStart } from "../ui/mainMenu.js";
import { showNewGame } from "../ui/newGameScreen.js";
import { showMap } from "../systems/map/mapUI.js";
import { showCombat } from "../systems/combat/combatUI.js";

export function applyState() {
  glitchTransition(() => {
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

      case STATE.MAP:
        showMap();
        break;

      case STATE.COMBAT:
        showCombat();
        break;
    }
  });
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
}
