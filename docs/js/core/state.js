// js/core/state.js

// ============================================================
// GAME STATE ENUM
// ============================================================
// LOADING
// → TITLE_FLYBY (Dawnseeker over Vharos)
// → TITLE_LOOP (title slideshow)
// → START
// → SETTINGS
// → NEW_GAME
// → ACT_INTRO
// → MAP
// → COMBAT
// ============================================================

export const STATE = {
  LOADING: 0,
  TITLE_FLYBY: 1,
  TITLE_LOOP: 2,
  START: 3,
  SETTINGS: 4,
  NEW_GAME: 5,
  ACT_INTRO: 6,
  MAP: 7,
  COMBAT: 8
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
// GET CURRENT STATE
// ============================================================

export function getState() {
  return currentState;
}
