// js/ui/combatUI.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showCombatUI() {
  const screen = document.getElementById("combat-screen");
  screen.innerHTML = "";

  const turnOrder = document.createElement("div");
  turnOrder.className = "turn-order";
  turnOrder.innerText = "Your Turn";

  const enemyIntent = document.createElement("div");
  enemyIntent.className = "enemy-intent";
  enemyIntent.innerText = "Enemy preparing attack";

  const cardRow = document.createElement("div");
  cardRow.className = "card-row";

  for (let i = 0; i < 5; i++) {
    const card = document.createElement("div");
    card.className = "card-slot";
    card.innerText = "Card";
    cardRow.appendChild(card);
  }

  screen.appendChild(turnOrder);
  screen.appendChild(enemyIntent);
  screen.appendChild(cardRow);

  screen.classList.add("active");

  // Temporary: click to end combat
  screen.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.MAP);
  };
}
