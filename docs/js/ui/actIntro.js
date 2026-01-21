// js/ui/actIntro.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showActIntro() {
  const screen = document.getElementById("act-intro");
  screen.innerHTML = "";

  const text = document.createElement("div");
  text.className = "act-intro-text";
  text.innerText = "In the shadow of the shattered star, corruption spreads...\nYour journey begins.";

  screen.appendChild(text);
  screen.classList.add("active");

  // Crawl animation
  text.style.opacity = 0;
  text.style.transform = "translateY(40px)";

  requestAnimationFrame(() => {
    text.style.transition = "all 2.5s ease";
    text.style.opacity = 1;
    text.style.transform = "translateY(0px)";
  });

  // After 3 seconds → fade out → map
  setTimeout(async () => {
    await fadeOutUI(800);
    setState(STATE.MAP);
  }, 3500);
}
