// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";
import { glitchFlash, fadeIn } from "../core/transitions.js";

let initialized = false;
let flickerInterval = null;
let ambientGlitchInterval = null;
let bgInterval = null;

export function showTitle() {
  const screen = document.getElementById("title-screen");
  const pressEnter = document.getElementById("press-enter");

  screen.classList.add("active");

  // Smooth fade-in when the title appears
  fadeIn(600);

  if (!initialized) {
    // Start the animated background loop
    startTitleBackgroundAnimation();

    const goToStart = () => {
      glitchFlash(150, () => {
        clearIntervals();
        setState(STATE.START);
        applyState();
      });
    };

    // Click → Start
    pressEnter.onclick = goToStart;

    // Enter key → Start
    window.addEventListener("keydown", e => {
      if (e.key === "Enter") goToStart();
    });

    // Start animations
    startPressEnterAnimation(pressEnter);
    startAmbientGlitch();

    initialized = true;
  }
}

/* ----------------------------------------------------------
   TITLE BACKGROUND ANIMATION (1→2→3→4→5→4→3→2 loop)
---------------------------------------------------------- */
function startTitleBackgroundAnimation() {
  const bg = document.getElementById("title-bg");

  const frames = [
    "assets/title/title1.png",
    "assets/title/title2.png",
    "assets/title/title3.png",
    "assets/title/title4.png",
    "assets/title/title5.png",
    "assets/title/title4.png",
    "assets/title/title3.png",
    "assets/title/title2.png"
  ];

  let index = 0;

  bgInterval = setInterval(() => {
    bg.style.backgroundImage = `url(${frames[index]})`;
    index = (index + 1) % frames.length;
  }, 120); // adjust speed if needed
}

/* ----------------------------------------------------------
   PRESS ENTER Animation (pulse + flicker)
---------------------------------------------------------- */
function startPressEnterAnimation(el) {
  flickerInterval = setInterval(() => {
    const flicker = Math.random() < 0.1; // occasional flicker
    const scale = 1 + Math.sin(Date.now() / 300) * 0.05; // soft breathing pulse

    el.style.opacity = flicker ? 0.4 : 1;
    el.style.transform = `scale(${scale})`;
  }, 60);
}

/* ----------------------------------------------------------
   Ambient Glitch Pulse (subtle, atmospheric)
---------------------------------------------------------- */
function startAmbientGlitch() {
  ambientGlitchInterval = setInterval(() => {
    if (Math.random() < 0.25) {
      glitchFlash(120);
    }
  }, 2000);
}

/* ----------------------------------------------------------
   Cleanup when leaving the title screen
---------------------------------------------------------- */
function clearIntervals() {
  if (flickerInterval) clearInterval(flickerInterval);
  if (ambientGlitchInterval) clearInterval(ambientGlitchInterval);
  if (bgInterval) clearInterval(bgInterval);
}
