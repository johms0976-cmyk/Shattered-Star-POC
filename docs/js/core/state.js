// js/core/state.js

// ============================================================
// GAME STATE ENUM
// ============================================================
// These define every major UI/gameplay mode in Shattered Star.
// LOADING → TITLE → START → SETTINGS → NEW_GAME → ACT_INTRO → MAP → COMBAT
// ============================================================

export const STATE = {
  LOADING: 0,
  TITLE: 1,
  START: 2,
  SETTINGS: 3,
  NEW_GAME: 4,
  ACT_INTRO: 5,
  MAP: 6,
  COMBAT: 7
};

// ============================================================
// INTERNAL STATE TRACKING
// ============================================================

let currentState = STATE.LOADING;
let listeners = [];

// ============================================================
// STATE TRANSITION FUNCTION
// ============================================================

export function setState(newState) {
  if (newState === currentState) return;

  if (!Object.values(STATE).includes(newState)) {
    console.warn("Attempted to switch to invalid state:", newState);
    return;
  }

  currentState = newState;

  // Notify all listeners
  listeners.forEach(fn => fn(newState));
}

// ============================================================
// SUBSCRIBE TO STATE CHANGES
// ============================================================

export function onStateChange(callback) {
  listeners.push(callback);
}

// ============================================================
// GET CURRENT STATE (optional helper)
// ============================================================

export function getState() {
  return currentState;
}
