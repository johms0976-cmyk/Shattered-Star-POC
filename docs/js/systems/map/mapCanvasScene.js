// js/systems/map/mapCanvasScene.js

import {
  updateCanvasTransition,
  renderCanvasTransition,
  glitchFlashCanvas,
  staticBurstCanvas,
  crtPulseCanvas
} from "../../core/transitions.js";

let canvas, ctx;

export function initMapCanvas() {
  canvas = document.getElementById("map-canvas");
  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  requestAnimationFrame(loop);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loop(timestamp) {
  update(timestamp);
  render();
  requestAnimationFrame(loop);
}

function update(dt) {
  updateCanvasTransition(dt);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw map background
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw nodes (placeholder)
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
  ctx.fill();

  // Draw canvas transitions on top
  renderCanvasTransition(ctx);
}

// Example triggers for debugging or scripted events
export function triggerGlitch() {
  glitchFlashCanvas(150);
}

export function triggerStatic() {
  staticBurstCanvas(200);
}

export function triggerCRTPulse() {
  crtPulseCanvas(400);
}
