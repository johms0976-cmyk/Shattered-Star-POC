// js/systems/combat/engine.js

import { applyStatusEffects, decayStatusEffects } from "./statusEffects.js";
import { executeAction } from "./actions.js";
import { chooseEnemyIntent } from "./enemyAI.js";
import { GameState } from "../../core/state.js";

export const Combat = {
  player: null,
  enemies: [],
  deck: [],
  hand: [],
  discard: [],
  drawPile: [],
  energy: 3,
  turn: 1,
  intent: null,
  onUpdate: null // UI callback
};

export function startCombat(nodeData, onUpdate) {
  Combat.onUpdate = onUpdate;

  Combat.player = {
    hp: 50,
    maxHp: 50,
    block: 0,
    status: {}
  };

  Combat.enemies = [
    {
      id: "enemy1",
      name: "Wastes Raider",
      hp: 20,
      maxHp: 20,
      block: 0,
      status: {},
      intent: null
    }
  ];

  Combat.deck = createStartingDeck(GameState.run.hero);
  Combat.drawPile = shuffle([...Combat.deck]);
  Combat.hand = [];
  Combat.discard = [];
  Combat.energy = 3;
  Combat.turn = 1;

  drawCards(5);
  rollEnemyIntents();
  updateUI();
}

function createStartingDeck(hero) {
  // Placeholder — replace with hero-specific decks
  return [
    { id: "strike", type: "attack", cost: 1, damage: 6 },
    { id: "defend", type: "skill", cost: 1, block: 5 },
    { id: "strike", type: "attack", cost: 1, damage: 6 },
    { id: "defend", type: "skill", cost: 1, block: 5 },
    { id: "focus", type: "skill", cost: 1, effect: "draw1" }
  ];
}

export function playCard(card, target) {
  if (Combat.energy < card.cost) return;

  Combat.energy -= card.cost;
  executeAction(card, Combat, target);

  Combat.hand = Combat.hand.filter(c => c !== card);
  Combat.discard.push(card);

  updateUI();
}

export function endTurn() {
  applyStatusEffects(Combat);
  decayStatusEffects(Combat);

  Combat.player.block = 0;
  Combat.enemies.forEach(e => e.block = 0);

  enemyPhase();
  checkCombatEnd();

  Combat.turn++;
  Combat.energy = 3;

  drawCards(5);
  rollEnemyIntents();
  updateUI();
}

function enemyPhase() {
  Combat.enemies.forEach(enemy => {
    if (enemy.intent) {
      executeAction(enemy.intent, Combat, Combat.player);
    }
  });
}

function drawCards(n) {
  for (let i = 0; i < n; i++) {
    if (Combat.drawPile.length === 0) {
      Combat.drawPile = shuffle([...Combat.discard]);
      Combat.discard = [];
    }
    Combat.hand.push(Combat.drawPile.pop());
  }
}

function rollEnemyIntents() {
  Combat.enemies.forEach(enemy => {
    enemy.intent = chooseEnemyIntent(enemy, Combat);
  });
}

function checkCombatEnd() {
  if (Combat.enemies.every(e => e.hp <= 0)) {
    console.log("Combat won");
  }
  if (Combat.player.hp <= 0) {
    console.log("Combat lost");
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateUI() {
  if (Combat.onUpdate) Combat.onUpdate(Combat);
}

