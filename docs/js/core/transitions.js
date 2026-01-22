// js/core/transitions.js
//
// Unified transition API for Shattered Star.
// Aggregates canvas and UI transition systems
// and exposes stable names for the engine.

export * from "./transitionsCanvas.js";
export * from "./transitionsUI.js";

/* ============================================================
   ENGINE ALIASES (REQUIRED)
   These names are what renderer.js and stateRouter expect.
============================================================ */

export {
  renderCanvasTransition as renderTransition,
  updateCanvasTransition as updateTransition
} from "./transitionsCanvas.js";
