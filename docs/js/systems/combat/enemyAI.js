// js/systems/combat/enemyAI.js

export function enemyChooseAction(enemy, hero) {
  // Simple AI: always attack
  return {
    type: "attack",
    name: "Strike"
  };
}

