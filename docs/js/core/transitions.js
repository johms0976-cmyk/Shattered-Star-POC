// js/core/transitions.js

export const Transitions = {
  active: null,          // current transition object
  overlayAlpha: 0,       // used for fades
  duration: 0,
  elapsed: 0,
  onComplete: null,
  type: null,
};

// Call this every frame from renderer
export function updateTransition(dt) {
  const t = Transitions;
  if (!t.active) return;

  t.elapsed += dt;
  const progress = Math.min(t.elapsed / t.duration, 1);

  switch (t.type) {
    case 'fade-in':
      t.overlayAlpha = 1 - progress;
      break;

    case 'fade-out':
      t.overlayAlpha = progress;
      break;

    case 'crossfade':
      t.overlayAlpha = progress;
      break;

    case 'glitch-flash':
      t.overlayAlpha = Math.random() * (1 - progress);
      break;

    case 'static-burst':
      t.overlayAlpha = (Math.random() * 0.5 + 0.5) * (1 - progress);
      break;

    case 'crt-pulse':
      t.overlayAlpha = Math.sin(progress * Math.PI);
      break;
  }

  if (progress >= 1) {
    const done = t.onComplete;
    t.active = null;
    if (done) done();
  }
}

// Draw overlay on top of everything
export function renderTransition(ctx) {
  const t = Transitions;
  if (!t.active) return;

  ctx.save();
  ctx.globalAlpha = t.overlayAlpha;

  switch (t.type) {
    case 'glitch-flash':
      ctx.fillStyle = '#ffffff';
      break;

    case 'static-burst':
      ctx.fillStyle = '#cccccc';
      break;

    default:
      ctx.fillStyle = 'black';
      break;
  }

  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

// Public API
export function fadeIn(duration = 500, onComplete = null) {
  startTransition('fade-in', duration, onComplete);
}

export function fadeOut(duration = 500, onComplete = null) {
  startTransition('fade-out', duration, onComplete);
}

export function crossfade(duration = 600, onComplete = null) {
  startTransition('crossfade', duration, onComplete);
}

export function glitchFlash(duration = 150, onComplete = null) {
  startTransition('glitch-flash', duration, onComplete);
}

export function staticBurst(duration = 200, onComplete = null) {
  startTransition('static-burst', duration, onComplete);
}

export function crtPulse(duration = 400, onComplete = null) {
  startTransition('crt-pulse', duration, onComplete);
}

function startTransition(type, duration, onComplete) {
  Transitions.active = true;
  Transitions.type = type;
  Transitions.duration = duration;
  Transitions.elapsed = 0;
  Transitions.onComplete = onComplete;
}
