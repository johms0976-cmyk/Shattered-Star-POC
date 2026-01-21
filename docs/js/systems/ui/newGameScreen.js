// js/ui/newGameScreen.js

import { setState, STATE, GameState } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";
import { generateMap } from "../systems/map/mapGenerator.js";

export function showNewGame() {
  const screen = document.getElementById("newgame-screen");
  const image = document.getElementById("newgame-image");

  screen.classList.add("active");

  image.style.filter = "none";
  setTimeout(() => {
    image.style.filter = "contrast(1.5) hue-rotate(20deg)";
  }, 400);

  setTimeout(() => {
    GameState.run.map = generateMap();
    setState(STATE.MAP);
    applyState();
  }, 1200);
}
