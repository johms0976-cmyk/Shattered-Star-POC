// js/ui/loadingScreen.js

import { fadeIn } from "../core/transitions.js";

let initialized = false;

export function showLoading() {
  const screen = document.getElementById("loading-screen");
  screen.classList.add("active");

  fadeIn(400);

  if (!initialized) {
    initialized = true;
  }
}
