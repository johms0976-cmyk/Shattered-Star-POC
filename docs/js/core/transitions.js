// js/core/transitions.js
//
// Unified transition API for Shattered Star.
// Renderer only talks to THIS file.

import {
  updateCanvasTransition,
  renderCanvasTransition
} from "./transitionsCanvas.js";

export function updateTransition(dt) {
  updateCanvasTransition(dt);
}

export function renderTransition(ctx) {
  renderCanvasTransition(ctx);
}

// Re-export helpers if UI wants them later
export * from "./transitionsCanvas.js";
export * from "./transitionsUI.js";
