// js/core/renderer.js
import { renderTransition } from "./transitions.js";

/**
 * Renderer is a lightweight canvas loop.
 * It does NOT handle navigation or screen state.
 */
export function createRenderer(canvas) {
  const ctx = canvas.getContext("2d");

  return {
    canvas,
    ctx,
    lastTime: performance.now(),
    delta: 0,
    scenes: {},      // scene registry
    activeScene: null
  };
}

/**
 * Register a drawable scene (map, combat, effects, etc)
 */
export function registerScene(renderer, name, drawFn) {
  renderer.scenes[name] = drawFn;
}

/**
 * Switch the active canvas scene
 */
export function setScene(renderer, name) {
  renderer.activeScene = name;
}

/**
 * Main render loop
 */
export function renderFrame(renderer, gameState) {
  const now = performance.now();
  renderer.delta = now - renderer.lastTime;
  renderer.lastTime = now;

  const ctx = renderer.ctx;
  const { width, height } = renderer.canvas;

  ctx.clearRect(0, 0, width, height);

  const scene = renderer.scenes[renderer.activeScene];

  if (scene) {
    scene(ctx, gameState, renderer);
  } else {
    // Fallback debug screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "red";
    ctx.font = "20px monospace";
    ctx.fillText(
      renderer.activeScene
        ? `Missing scene: ${renderer.activeScene}`
        : "No active canvas scene",
      20,
      40
    );
  }

  renderTransition(ctx);
}
