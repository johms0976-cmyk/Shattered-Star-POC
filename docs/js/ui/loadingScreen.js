// js/ui/loadingScreen.js

export function showLoading() {
  const screen = document.getElementById("loading-screen");
  screen.classList.add("active");
}

export function updateLoadingProgress(progress) {
  const bar = document.getElementById("loading-bar-fill");
  const text = document.getElementById("loading-text");

  if (bar) bar.style.width = `${progress * 100}%`;
  if (text) text.textContent = `${Math.floor(progress * 100)}%`;
}
