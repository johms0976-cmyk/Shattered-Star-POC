// js/core/state.js

export const STATE = {
  TITLE: "title",
  START: "start",
  NEWGAME: "newgame",
  MAP: "map",
  COMBAT: "combat"
};

export const GameState = {
  current: STATE.TITLE,
  run: {
    map: null,
    currentNode: null
  }
};

export function setState(state) {
  GameState.current = state;
}
