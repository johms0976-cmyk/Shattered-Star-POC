// js/core/state.js

export const STATE = {
  TITLE: "title",
  START: "start",
  MAP: "map"
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
