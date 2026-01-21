// js/core/state.js

export const STATE = {
  TITLE: "TITLE",
  START: "START",
  NEWGAME: "NEWGAME",
  LOADING: "LOADING",   // <‑‑ NEW
  MAP: "MAP",
  COMBAT: "COMBAT"
};

export const GameState = {
  current: STATE.TITLE,

  run: {
    hero: null,
    difficulty: "normal",
    act: 1
  }
};

export function setState(newState) {
  GameState.current = newState;
}
