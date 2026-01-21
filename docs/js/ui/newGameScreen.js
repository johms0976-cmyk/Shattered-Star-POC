// js/ui/newGameScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";
import { assetPath } from "../core/path.js";

let selectedHero = "korvax";
let selectedDifficulty = "normal";

export function showNewGameScreen() {
  const screen = document.getElementById("newgame-screen");

  // Apply background dynamically
  screen.style.backgroundImage = `url(${assetPath("assets/screens/new-game/newgame1.png")})`;

  const heroButtons = document.querySelectorAll(".hero-select");
  const difficultyButtons = document.querySelectorAll(".difficulty-select");
  const beginBtn = document.getElementById("begin-run");

  heroButtons.forEach(btn => {
    btn.onclick = () => {
      selectedHero = btn.dataset.hero;

      heroButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });

  difficultyButtons.forEach(btn => {
    btn.onclick = () => {
      selectedDifficulty = btn.dataset.difficulty;

      difficultyButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });

  beginBtn.onclick = async () => {
    console.log("Starting run with:", selectedHero, selectedDifficulty);

    await fadeOutUI(600);
    setState(STATE.ACT_INTRO);
  };
}
