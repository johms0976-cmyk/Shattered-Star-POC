// js/ui/loadingScreen.js

export function showLoading() {
  const screen = document.getElementById("loading-screen");
  if (screen) {
    screen.classList.add("active");
  }
}

export function updateLoadingProgress(value) {
  const bar = document.getElementById("loading-progress");
  if (bar) {
    bar.style.width = `${Math.max(0, Math.min(1, value)) * 100}%`;
  }
}
