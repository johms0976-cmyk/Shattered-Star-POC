// js/systems/combat/combatUI.js

import { setState, STATE } from "../../core/state.js";
import {
  fadeOutUI,
  glitchFlashCanvas,
  staticBurstCanvas,
  crtPulseCanvas
} from "../../core/transitions.js";

export function showCombat() {
  const screen = document.getElementById("combat-screen");
  screen.classList.add("active");

  // Example: UI buttons for testing transitions
  const glitchBtn = document.getElementById("combat-btn-glitch");
  const staticBtn = document.getElementById("combat-btn-static");
  const crtBtn = document.getElementById("combat-btn-crt");
  const fleeBtn = document.getElementById("combat-btn-flee");

  if (glitchBtn) glitchBtn.onclick = () => glitchFlashCanvas(150);
  if (staticBtn) staticBtn.onclick = () => staticBurstCanvas(200);
  if (crtBtn) crtBtn.onclick = () => crtPulseCanvas(400);

  if (fleeBtn) fleeBtn.onclick = () => fleeCombat();
}

async function fleeCombat() {
  await fadeOutUI(600);
  setState(STATE.MAP);
}
