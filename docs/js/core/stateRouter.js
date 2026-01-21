import { STATE, GameState } from "./state.js";
import { showTitle } from "../ui/titleScreen.js";
import { showStart } from "../ui/mainMenu.js";
import { showMap } from "../systems/map/mapUI.js";

export function applyState() {
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
  }
}
