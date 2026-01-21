// js/ui/loadingScreen.js

let currentProgress = 0;
let targetProgress = 0;
let animating = false;

export function showLoading() {
  const screen = document.getElementById("loading-screen");
  screen.classList.add("active");
}

export function setLoadingStage(text) {
  const el = document.getElementById("loading-stage-text");
  if (el) el.textContent = text;
}

export function updateLoadingProgressSmooth(progress) {
  targetProgress = Math.max(0, Math.min(1, progress));

  if (!animating) {
    animating = true;
    requestAnimationFrame(animateProgress);
  }
}

function animateProgress() {
  const bar = document.getElementById("loading-bar-fill");
  const text = document.getElementById("loading-text");

  const speed = 0.08; // easing factor
  currentProgress += (targetProgress - currentProgress) * speed;

  if (bar) bar.style.width = `${currentProgress * 100}%`;
  if (text) text.textContent = `${Math.floor(currentProgress * 100)}%`;

  if (Math.abs(targetProgress - currentProgress) > 0.001) {
    requestAnimationFrame(animateProgress);
  } else {
    currentProgress = targetProgress;
    animating = false;
  }
}
