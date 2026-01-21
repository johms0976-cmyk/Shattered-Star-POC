// js/ui/loadingScreen.js

import { fadeIn } from "../core/transitions.js";

let initialized = false;
let progressBar = null;

export function showLoading() {
  const screen = document.getElementById("loading-screen");
  screen.classList.add("active");

  fadeIn(300);

  if (!initialized) {
    progressBar = document.getElementById("loading-progress");
    initialized = true;
  }
}

export function updateLoadingProgress(value) {
  if (progressBar) {
    progressBar.style.width = `${value * 100}%`;
  }
}
