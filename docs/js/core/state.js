// js/core/state.js

// ------------------------------------------------------------
// STATE ENUM
// ------------------------------------------------------------
export const STATE = {
  LOADING: "loading",
  TITLE: "title",
  START: "start",
  NEW_GAME: "new_game",
  SETTINGS: "settings",
  ACT_INTRO: "act_intro",
  MAP: "map",
  COMBAT: "combat"
};

// ------------------------------------------------------------
// INTERNAL STATE
// ------------------------------------------------------------
let currentState = STATE.LOADING;
const listeners = [];

// ------------------------------------------------------------
// SUBSCRIBE TO STATE CHANGES
// ------------------------------------------------------------
export function onStateChange(callback) {
  listeners.push(callback);
}

// ------------------------------------------------------------
// SET STATE
// ------------------------------------------------------------
export function setState(newState) {
  if (newState === currentState) return;

  currentState = newState;

  // Notify all listeners
  for (const fn of listeners) {
    fn(newState);
  }
}

// ------------------------------------------------------------
// GET CURRENT STATE (optional helper)
// ------------------------------------------------------------
export function getState() {
  return currentState;
}
