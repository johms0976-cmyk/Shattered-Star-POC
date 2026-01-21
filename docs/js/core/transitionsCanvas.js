// js/core/transitionsCanvas.js
//
// Canvas-based transition engine for Shattered Star.
// Driven by renderer.js via:
//   updateTransition(delta);
//   renderTransition(ctx);
//
// Handles glitch, static, CRT pulse, fade, and crossfade effects.

export const CanvasTransitions = {
  active: false,
  type: null,
  duration: 0,
  elapsed: 0,
  overlayAlpha: 0,
  onComplete: null
};

/* ============================================================
   UPDATE — called every frame from renderer
============================================================ */

export function updateCanvasTransition(dt) {
  const t = CanvasTransitions;
  if (!t.active) return;

  t.elapsed += dt;
  const progress = Math.min(t.elapsed / t.duration, 1);

  switch (t.type) {
    case "fade-in":
      t.overlayAlpha = 1 - progress;
      break;

    case "fade-out":
      t.overlayAlpha = progress;
      break;

    case "crossfade":
      t.overlayAlpha = progress;
      break;

    case "glitch-flash":
      t.overlayAlpha = Math.random() * (1 - progress);
      break;

    case "static-burst":
      t.overlayAlpha = (Math.random() * 0.5 + 0.5) * (1 - progress);
      break;

    case "crt-pulse":
      t.overlayAlpha = Math.sin(progress * Math.PI);
      break;
  }

  if (progress >= 1) {
    const done = t.onComplete;
    t.active = false;
    t.type = null;
    t.onComplete = null;
    if (done) done();
  }
}

/* ============================================================
   RENDER — draws overlay on top of everything
============================================================ */

export function renderCanvasTransition(ctx) {
  const t = CanvasTransitions;
  if (!t.active) return;

  ctx.save();
  ctx.globalAlpha = t.overlayAlpha;

  switch (t.type) {
    case "glitch-flash":
      ctx.fillStyle = "#ffffff";
      break;

    case "static-burst":
      ctx.fillStyle = "#cccccc";
      break;

    default:
      ctx.fillStyle = "black";
      break;
  }

  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

/* ============================================================
   PUBLIC API
============================================================ */

export function fadeInCanvas(duration = 500, onComplete = null) {
  startCanvasTransition("fade-in", duration, onComplete);
}

export function fadeOutCanvas(duration = 500, onComplete = null) {
  startCanvasTransition("fade-out", duration, onComplete);
}

export function crossfadeCanvas(duration = 600, onComplete = null) {
  startCanvasTransition("crossfade", duration, onComplete);
}

export function glitchFlashCanvas(duration = 150, onComplete = null) {
  startCanvasTransition("glitch-flash", duration, onComplete);
}

export function staticBurstCanvas(duration = 200, onComplete = null) {
  startCanvasTransition("static-burst", duration, onComplete);
}

export function crtPulseCanvas(duration = 400, onComplete = null) {
  startCanvasTransition("crt-pulse", duration, onComplete);
}

/* ============================================================
   INTERNAL
============================================================ */

function startCanvasTransition(type, duration, onComplete) {
  const t = CanvasTransitions;
  t.active = true;
  t.type = type;
  t.duration = duration;
  t.elapsed = 0;
  t.overlayAlpha = 0;
  t.onComplete = onComplete;
}
