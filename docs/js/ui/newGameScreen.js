// js/ui/newGameScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

let selectedHero = "korvax";
let selectedDifficulty = "normal";

export function showNewGameScreen() {
  const screen = document.getElementById("newgame-screen");
  screen.classList.add("active");

  const heroButtons = document.querySelectorAll(".hero-select");
  const difficultyButtons = document.querySelectorAll(".difficulty-select");
  const beginBtn = document.getElementById("begin-run");

  heroButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedHero = btn.dataset.hero;
      updateHeroSelection(heroButtons, btn);
    });
  });

  difficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedDifficulty = btn.dataset.difficulty;
      updateDifficultySelection(difficultyButtons, btn);
    });
  });

  beginBtn.addEventListener("click", () => {
    beginRun();
  });
}

function updateHeroSelection(all, selected) {
  all.forEach(btn => btn.classList.remove("selected"));
  selected.classList.add("selected");
}

function updateDifficultySelection(all, selected) {
  all.forEach(btn => btn.classList.remove("selected"));
  selected.classList.add("selected");
}

async function beginRun() {
  // Store hero + difficulty in global game state
  window.gameConfig = {
    hero: selectedHero,
    difficulty: selectedDifficulty
  };

  await fadeOutUI(600);
  setState(STATE.ACT_INTRO);
}
