// js/core/renderer.js
//
// Central render loop for Shattered Star.
// Responsible for:
// - Clearing the canvas
// - Rendering the active scene
// - Updating and rendering transitions

import {
  renderTransition,
  updateTransition
} from "./transitions.js";

/* ============================================================
   RENDERER CREATION
============================================================ */

export function createRenderer(canvas) {
  const ctx = canvas.getContext("2d");

  return {
    canvas,
    ctx,
    lastTime: performance.now(),
    delta: 0,
    scenes: {},
    activeScene: null
  };
}

/* ============================================================
   SCENE REGISTRATION
============================================================ */

export function registerScene(renderer, name, drawFn) {
  renderer.scenes[name] = drawFn;
}

export function setScene(renderer, name) {
  renderer.activeScene = name;
}

/* ============================================================
   MAIN RENDER STEP (called every frame)
============================================================ */

export function renderFrame(renderer, gameState) {
  const now = performance.now();
  renderer.delta = now - renderer.lastTime;
  renderer.lastTime = now;

  const ctx = renderer.ctx;
  const canvas = renderer.canvas;

  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw active scene
  const scene = renderer.scenes[renderer.activeScene];

  if (scene) {
    scene(ctx, gameState, renderer);
  } else {
    // Safe fallback (prevents blank screen debugging hell)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "20px monospace";
    ctx.fillText("No active scene", 20, 40);
  }

  // Update transition state (IMPORTANT)
  updateTransition(renderer.delta);

  // Draw transition overlay on top
  renderTransition(ctx);
}
