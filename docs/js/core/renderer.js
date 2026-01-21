// js/core/renderer.js

import { renderTransition } from "./transitions.js";

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

export function registerScene(renderer, name, drawFn) {
  renderer.scenes[name] = drawFn;
}

export function setScene(renderer, name) {
  renderer.activeScene = name;
}

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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "red";
    ctx.font = "20px monospace";
    ctx.fillText("No active scene", 20, 40);
  }

  renderTransition(ctx);
}
