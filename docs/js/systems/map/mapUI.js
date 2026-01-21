// js/systems/map/mapUI.js

import { setState, STATE } from "../../core/state.js";
import { fadeOutUI } from "../../core/transitions.js";

export function showMap() {
  const screen = document.getElementById("map-screen");
  screen.classList.add("active");

  // Example: clicking a node enters combat
  const nodes = document.querySelectorAll(".map-node");
  nodes.forEach(node => {
    node.onclick = () => enterCombat(node.dataset.enemy);
  });
}

async function enterCombat(enemyId) {
  await fadeOutUI(600);

  // Store selected enemy for combat engine
  window.selectedEnemy = enemyId;

  setState(STATE.COMBAT);
}
