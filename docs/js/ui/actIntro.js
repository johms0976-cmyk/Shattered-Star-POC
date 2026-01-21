// js/ui/actIntro.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI, fadeInUI, corruptionSpread } from "../core/transitions.js";

export function showActIntro() {
  const screen = document.getElementById("act-intro-screen");
  screen.classList.add("active");

  runActIntroSequence();
}

async function runActIntroSequence() {
  await fadeOutUI(600);
  await corruptionSpread();
  await fadeInUI(600);

  setState(STATE.MAP);
}
