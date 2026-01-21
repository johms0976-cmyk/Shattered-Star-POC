// js/core/transitions.js
//
// Centralized transition engine for Shattered Star.
// Handles fade, glitch, static, CRT pulse, and crossfade transitions.
// Designed to be called from renderer.js each frame via:
//   updateTransition(delta);
//   renderTransition(ctx);
//
// All transitions support an onComplete callback.

export const Transitions = {
  active: false,       // whether a transition is running
  type: null,          // transition type string
  duration: 0,         // total duration in ms
  elapsed: 0,          // time progressed
  overlayAlpha: 0,     // alpha used for drawing
  onComplete: null     // callback when finished
};

/* ============================================================
   UPDATE — called every frame from renderer
============================================================ */

export function updateTransition(dt) {
  const t = Transitions;
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
      // chaotic white flash that diminishes over time
      t.overlayAlpha = Math.random() * (1 - progress);
      break;

    case "static-burst":
      // noisy grey burst that fades out
      t.overlayAlpha = (Math.random() * 0.5 + 0.5) * (1 - progress);
      break;

    case "crt-pulse":
      // sine wave pulse for CRT-like effect
      t.overlayAlpha = Math.sin(progress * Math.PI);
      break;
  }

  // Transition complete
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

export function renderTransition(ctx) {
  const t = Transitions;
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
   PUBLIC API — easy-to-use transition triggers
============================================================ */

export function fadeIn(duration = 500, onComplete = null) {
  startTransition("fade-in", duration, onComplete);
}

export function fadeOut(duration = 500, onComplete = null) {
  startTransition("fade-out", duration, onComplete);
}

export function crossfade(duration = 600, onComplete = null) {
  startTransition("crossfade", duration, onComplete);
}

export function glitchFlash(duration = 150, onComplete = null) {
  startTransition("glitch-flash", duration, onComplete);
}

export function staticBurst(duration = 200, onComplete = null) {
  startTransition("static-burst", duration, onComplete);
}

export function crtPulse(duration = 400, onComplete = null) {
  startTransition("crt-pulse", duration, onComplete);
}

/* ============================================================
   INTERNAL — initializes a transition
============================================================ */

function startTransition(type, duration, onComplete) {
  const t = Transitions;
  t.active = true;
  t.type = type;
  t.duration = duration;
  t.elapsed = 0;
  t.overlayAlpha = 0;
  t.onComplete = onComplete;
}
