// js/ui/newGame.js

import { setState, STATE, GameState } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";
import { fadeIn, fadeOut, glitchFlash } from "../core/transitions.js";

let initialized = false;
let selectedHero = null;
let selectedDifficulty = "normal";

export function showNewGame() {
  const screen = document.getElementById("newgame-screen");
  screen.classList.add("active");

  fadeIn(600);

  if (!initialized) {
    wireHeroButtons();
    wireDifficultyButtons();
    wireStartButton();
    initialized = true;
  }
}

/* ----------------------------------------------------------
   HERO SELECTION
---------------------------------------------------------- */
function wireHeroButtons() {
  const heroButtons = document.querySelectorAll(".hero-select");

  heroButtons.forEach(btn => {
    btn.onclick = () => {
      heroButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedHero = btn.dataset.hero;
    };
  });
}

/* ----------------------------------------------------------
   DIFFICULTY SELECTION
---------------------------------------------------------- */
function wireDifficultyButtons() {
  const diffButtons = document.querySelectorAll(".difficulty-select");

  diffButtons.forEach(btn => {
    btn.onclick = () => {
      diffButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedDifficulty = btn.dataset.difficulty;
    };
  });
}

/* ----------------------------------------------------------
   START RUN
---------------------------------------------------------- */
function wireStartButton() {
  const startBtn = document.getElementById("begin-run");

  startBtn.onclick = () => {
    if (!selectedHero) {
      glitchFlash(120);
      return;
    }

    // Save hero + difficulty
    GameState.run.hero = selectedHero;
    GameState.run.difficulty = selectedDifficulty;

    // Fade to black → Act I intro
    fadeOut(800, () => {
      showAct1Intro(() => {
        setState(STATE.MAP);
        applyState();
      });
    });
  };
}

/* ----------------------------------------------------------
   ACT I INTRO SEQUENCE
---------------------------------------------------------- */
function showAct1Intro(onComplete) {
  const intro = document.getElementById("act1-intro");
  intro.classList.add("active");

  intro.innerHTML = `
    <div class="intro-text">
      <h1>ACT I — ASHES OF IRONSPINE</h1>
      <p>
        The Dawnseeker is gone.  
        The signal led you to a dead world.  
        The crash scattered your crew across Vharos.  
        The Ironspine Wastes greet you with rust, ruin… and whispers.
      </p>
      <p class="continue">Press Enter to continue</p>
    </div>
  `;

  fadeIn(800);

  const proceed = () => {
    intro.classList.remove("active");
    window.removeEventListener("keydown", proceed);
    onComplete();
  };

  window.addEventListener("keydown", proceed);
}
