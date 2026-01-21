// js/systems/combat/combatUI.js

import { GameState } from "../../core/state.js";

export function showCombat() {
  const screen = document.getElementById("combat-screen");
  screen.classList.add("active");

  screen.innerHTML = `
    <div style="
      color:#00ccff;
      font-size:2em;
      padding:40px;
    ">
      COMBAT START<br><br>
      Node type: ${GameState.run.currentNode.type}
    </div>
  `;
}
