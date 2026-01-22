// js/ui/newGameScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";
import { assetPath } from "../core/path.js";

// Exported so actIntro.js can read the chosen hero + difficulty
export let selectedHero = "korvax";
export let selectedDifficulty = "normal";

export function showNewGameScreen() {
  const screen = document.getElementById("newgame-screen");

  // Corrected path (no "assets/" prefix)
  screen.style.backgroundImage = `url(${assetPath("screens/new-game/newgame1.png")})`;

  // Buttons
  const heroButtons = document.querySelectorAll(".hero-select");
  const difficultyButtons = document.querySelectorAll(".difficulty-select");
  const beginBtn = document.getElementById("begin-run");

  // ------------------------------------------------------------
  // Remove old listeners to prevent stacking
  // ------------------------------------------------------------
  heroButtons.forEach(btn => btn.replaceWith(btn.cloneNode(true)));
  difficultyButtons.forEach(btn => btn.replaceWith(btn.cloneNode(true)));
  beginBtn.replaceWith(beginBtn.cloneNode(true));

  // Re‑query after cloning
  const heroBtns = document.querySelectorAll(".hero-select");
  const diffBtns = document.querySelectorAll(".difficulty-select");
  const begin = document.getElementById("begin-run");

  // ------------------------------------------------------------
  // HERO SELECTION
  // ------------------------------------------------------------
  heroBtns.forEach(btn => {
    btn.onclick = () => {
      selectedHero = btn.dataset.hero;

      heroBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });

  // ------------------------------------------------------------
  // DIFFICULTY SELECTION
  // ------------------------------------------------------------
  diffBtns.forEach(btn => {
    btn.onclick = () => {
      selectedDifficulty = btn.dataset.difficulty;

      diffBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });

  // ------------------------------------------------------------
  // BEGIN RUN
  // ------------------------------------------------------------
  begin.onclick = async () => {
    console.log("Starting run with:", selectedHero, selectedDifficulty);

    await fadeOutUI(600);
    setState(STATE.ACT_INTRO);
  };
}
