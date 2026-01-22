// docs/js/ui/actIntro.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";
import { selectedHero, selectedDifficulty } from "./newGameScreen.js";
import { HERO_STORIES, DIFFICULTY_TAGS } from "../data/heroBackstories.js";

// ============================================================
// ACT INTRO SEQUENCE
// ============================================================

export function showActIntro() {
  const screen = document.getElementById("act-intro");

  // Clear previous content
  screen.innerHTML = "";
  screen.classList.add("active");

  // ------------------------------------------------------------
  // Build wrapper + text block
  // ------------------------------------------------------------
  const wrapper = document.createElement("div");
  wrapper.className = "act-intro-wrapper";

  const text = document.createElement("div");
  text.className = "act-intro-text";

  // Pull hero + difficulty narrative
  const heroStory = HERO_STORIES[selectedHero] || "";
  const diffTag = DIFFICULTY_TAGS[selectedDifficulty] || "";

  text.innerText = `${heroStory.trim()}\n\n${diffTag}`;

  wrapper.appendChild(text);
  screen.appendChild(wrapper);

  // ------------------------------------------------------------
  // Cinematic fade + upward crawl
  // ------------------------------------------------------------
  text.style.opacity = 0;
  text.style.transform = "translateY(40px)";

  requestAnimationFrame(() => {
    text.style.transition = "all 2.5s ease";
    text.style.opacity = 1;
    text.style.transform = "translateY(0px)";
  });

  // ------------------------------------------------------------
  // Proceed handler (click, key, or auto)
  // ------------------------------------------------------------
  const proceed = async () => {
    window.removeEventListener("click", proceed);
    window.removeEventListener("keydown", proceed);

    await fadeOutUI(800);
    setState(STATE.MAP);
  };

  // Allow user to skip
  window.addEventListener("click", proceed);
  window.addEventListener("keydown", proceed);

  // Auto‑advance after 6 seconds
  setTimeout(proceed, 6000);
}
