// js/core/state.js

export const STATE = {
  LOADING: "loading",
  TITLE: "title",
  START: "start",
  NEWGAME: "newgame",
  SETTINGS: "settings",
  ACT_INTRO: "act_intro",
  MAP: "map",
  COMBAT: "combat"
};

export const GameState = {
  current: STATE.LOADING,
  run: {
    hero: null,
    difficulty: null,
    act: 1
  }
};

export function setState(newState) {
  GameState.current = newState;
}
