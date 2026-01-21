// js/ui/newGameScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

let selectedHero = "korvax";
let selectedDifficulty = "normal";

export function showNewGameScreen() {
  const heroButtons = document.querySelectorAll(".hero-select");
  const difficultyButtons = document.querySelectorAll(".difficulty-select");
  const beginBtn = document.getElementById("begin-run");

  // HERO SELECTION
  heroButtons.forEach(btn => {
    btn.onclick = () => {
      selectedHero = btn.dataset.hero;

      heroButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });

  // DIFFICULTY SELECTION
  difficultyButtons.forEach(btn => {
    btn.onclick = () => {
      selectedDifficulty = btn.dataset.difficulty;

      difficultyButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });

  // BEGIN RUN
  beginBtn.onclick = async () => {
    console.log("Starting run with:", selectedHero, selectedDifficulty);

    await fadeOutUI(600);
    setState(STATE.ACT_INTRO);
  };
}
