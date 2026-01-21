// js/ui/newGame.js

import { setState, STATE, GameState } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";

export function showNewGame() {
  const screen = document.getElementById("newgame-screen");
  screen.classList.add("active");

  // Apply background image
  screen.style.backgroundImage = "url('assets/screens/new-game/newgame1.png')";
  screen.style.backgroundSize = "cover";
  screen.style.backgroundPosition = "center";
  screen.style.backgroundRepeat = "no-repeat";

  // HERO SELECTION
  const heroButtons = document.querySelectorAll(".hero-select");
  heroButtons.forEach(btn => {
    btn.onclick = () => {
      heroButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      // Save hero choice
      GameState.run.hero = btn.dataset.hero;
    };
  });

  // DIFFICULTY SELECTION
  const diffButtons = document.querySelectorAll(".difficulty-select");
  diffButtons.forEach(btn => {
    btn.onclick = () => {
      diffButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      // Save difficulty choice
      GameState.run.difficulty = btn.dataset.difficulty;
    };
  });

  // BEGIN RUN
  const beginBtn = document.getElementById("begin-run");
  if (beginBtn) {
    beginBtn.onclick = () => {
      // Default values if user didn't click anything
      if (!GameState.run.hero) GameState.run.hero = "korvax";
      if (!GameState.run.difficulty) GameState.run.difficulty = "normal";

      // Start Act I intro
      GameState.run.act = 1;

      setState(STATE.ACT_INTRO);
      applyState();
    };
  }
}
