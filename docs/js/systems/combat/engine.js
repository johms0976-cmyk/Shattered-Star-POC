// js/systems/combat/engine.js

import { performAction } from "./actions.js";
import { applyStatusEffects } from "./statusEffects.js";
import { enemyChooseAction } from "./enemyAI.js";

export function startCombat(hero, enemy) {
  return {
    hero,
    enemy,
    turn: "hero",
    log: []
  };
}

export function updateCombat(state) {
  if (state.turn === "hero") {
    // Wait for UI to trigger an action
    return;
  }

  if (state.turn === "enemy") {
    const action = enemyChooseAction(state.enemy, state.hero);
    performAction(action, state.enemy, state.hero, state.log);
    applyStatusEffects(state.hero, state.log);
    state.turn = "hero";
  }
}
