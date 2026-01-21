// js/ui/actIntro.js

import { setState, STATE, GameState } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";
import { corruptionSpread } from "./themeManager.js";

export function showActIntro() {
  const screen = document.getElementById("act-intro");
  screen.classList.add("active");

  const act = GameState.run.act;

  if (act === 1) {
    screen.innerHTML = `
      <div class="intro-text">
        <h1>ACT I — FRACTURED LIGHT</h1>
        <p>The Shattered Star calls to you...</p>
        <div class="continue">Press Enter to continue</div>
      </div>
    `;
  }

  if (act === 2) {
    screen.innerHTML = `
      <div class="intro-text">
        <h1>ACT II — THE VOID STIRS</h1>
        <p>Corruption spreads. Reality bends.</p>
        <div class="continue">Press Enter to continue</div>
      </div>
    `;

    // Trigger corruption theme transition
    corruptionSpread();
  }

  window.onkeydown = e => {
    if (e.key === "Enter") {
      setState(STATE.MAP);
      applyState();
    }
  };
}
