// js/core/renderer.js

import { renderTransition } from './transitions.js';

export function initRenderer(ctx, state) {
  return {
    ctx,
    state,
    lastTime: performance.now(),
    delta: 0,
    scenes: {},   // scene registry
  };
}

// Register a scene renderer from anywhere in the codebase
export function registerScene(renderer, name, drawFn) {
  renderer.scenes[name] = drawFn;
}

export function renderFrame(renderer, state) {
  const now = performance.now();
  renderer.delta = now - renderer.lastTime;
  renderer.lastTime = now;

  const ctx = renderer.ctx;
  const { width, height } = ctx.canvas;

  // Clear screen
  ctx.clearRect(0, 0, width, height);

  // Draw active scene
  const scene = renderer.scenes[state.scene];
  if (scene) {
    scene(ctx, state, renderer);
  } else {
    // fallback if scene missing
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'red';
    ctx.font = '20px monospace';
    ctx.fillText(`Missing scene: ${state.scene}`, 20, 40);
  }

  // Draw transitions on top
  renderTransition(ctx);
}
