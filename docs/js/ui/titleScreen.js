// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { assetPath } from "../core/path.js";

// ============================================================
// CONFIGURATION
// ============================================================

// Cinematic slideshow
const IMAGE_HOLD = 3000;          // 3 seconds per image
const FADE_TIME = 1000;           // 1 second crossfade

// Glitch burst
const ENABLE_GLITCH = true;
const GLITCH_FPS = 24;
const GLITCH_FRAMES = 4;
const GLITCH_INTERVAL = 12000;    // every 12 seconds

// Tendrils
const ENABLE_TENDRILS = true;

// Title images
const TITLE_IMAGES = [
  assetPath("assets/title/title1.png"),
  assetPath("assets/title/title2.png"),
  assetPath("assets/title/title3.png"),
  assetPath("assets/title/title4.png"),
  assetPath("assets/title/title5.png")
];

// ============================================================
// INTERNAL STATE
// ============================================================

let bgA, bgB, distortLayer;
let tendrilLayer, tendrilLeft, tendrilRight;

let currentIndex = 0;
let slideshowTimer = null;
let glitchTimer = null;
let acceptingInput = false;

// ============================================================
// MAIN ENTRY POINT
// ============================================================

export function showTitle() {
  bgA = document.getElementById("title-bg-a");
  bgB = document.getElementById("title-bg-b");
  distortLayer = document.getElementById("title-distort");

  // Create tendril layer if enabled
  if (ENABLE_TENDRILS) {
    setupTendrils();
  }

  currentIndex = 0;
  acceptingInput = false;

  // Initial image
  const firstImage = TITLE_IMAGES[0];
  bgA.style.backgroundImage = `url(${firstImage})`;
  bgA.style.opacity = 1;
  bgB.style.opacity = 0;

  // Corruption pulse classes
  bgA.classList.add("voidborn-pulse");
  bgB.classList.add("voidborn-pulse");
  if (distortLayer) {
    distortLayer.classList.add("voidborn-distort");
    distortLayer.style.backgroundImage = `url(${firstImage})`;
  }

  startSlideshow();
  startGlitchLoop();

  // Slight delay before accepting input
  setTimeout(() => {
    acceptingInput = true;
    attachInputListeners();
  }, 800);
}

// ============================================================
// TENDRIL SETUP
// ============================================================

function setupTendrils() {
  // Remove existing layer if any
  const existing = document.getElementById("tendril-layer");
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }

  tendrilLayer = document.createElement("div");
  tendrilLayer.id = "tendril-layer";
  tendrilLayer.className = "tendril-layer";

  tendrilLeft = document.createElement("div");
  tendrilLeft.className = "tendril tendril-left tendril-animate-left";

  tendrilRight = document.createElement("div");
  tendrilRight.className = "tendril tendril-right tendril-animate-right";

  tendrilLayer.appendChild(tendrilLeft);
  tendrilLayer.appendChild(tendrilRight);

  const titleScreen = document.getElementById("title-screen");
  if (titleScreen) {
    titleScreen.appendChild(tendrilLayer);
  }
}

// ============================================================
// SLIDESHOW LOOP
// ============================================================

function startSlideshow() {
  clearInterval(slideshowTimer);

  slideshowTimer = setInterval(() => {
    const nextImage = TITLE_IMAGES[currentIndex];

    // Fade B in with next image
    bgB.style.backgroundImage = `url(${nextImage})`;
    bgB.style.transition = `opacity ${FADE_TIME}ms ease`;
    bgB.style.opacity = 1;

    // After fade, swap A to match B and hide B
    setTimeout(() => {
      bgA.style.backgroundImage = `url(${nextImage})`;
      bgA.style.opacity = 1;
      bgB.style.opacity = 0;

      // Keep distortion layer in sync
      if (distortLayer) {
        distortLayer.style.backgroundImage = `url(${nextImage})`;
      }
    }, FADE_TIME);

    currentIndex = (currentIndex + 1) % TITLE_IMAGES.length;

  }, IMAGE_HOLD);
}

// ============================================================
// GLITCH BURST
// ============================================================

function startGlitchLoop() {
  if (!ENABLE_GLITCH) return;

  clearInterval(glitchTimer);

  glitchTimer = setInterval(() => {
    runGlitchBurst();
  }, GLITCH_INTERVAL);
}

function runGlitchBurst() {
  let frame = 0;

  const glitchInterval = setInterval(() => {
    const randomImage = TITLE_IMAGES[Math.floor(Math.random() * TITLE_IMAGES.length)];

    bgB.style.backgroundImage = `url(${randomImage})`;
    bgB.style.opacity = 1;

    frame++;

    if (frame >= GLITCH_FRAMES) {
      clearInterval(glitchInterval);

      const currentImage = TITLE_IMAGES[currentIndex];
      bgA.style.backgroundImage = `url(${currentImage})`;
      bgA.style.opacity = 1;
      bgB.style.opacity = 0;

      if (distortLayer) {
        distortLayer.style.backgroundImage = `url(${currentImage})`;
      }
    }

  }, 1000 / GLITCH_FPS);
}

// ============================================================
// INPUT HANDLING
// ============================================================

function attachInputListeners() {
  window.addEventListener("keydown", handleKey);
  window.addEventListener("click", handleTap);
}

function detachInputListeners() {
  window.removeEventListener("keydown", handleKey);
  window.removeEventListener("click", handleTap);
}

function handleKey(e) {
  if (!acceptingInput) return;
  if (e.key === "Enter") proceed();
}

function handleTap() {
  if (!acceptingInput) return;
  proceed();
}

// ============================================================
// EXIT TITLE SCREEN
// ============================================================

function proceed() {
  acceptingInput = false;

  clearInterval(slideshowTimer);
  clearInterval(glitchTimer);
  detachInputListeners();

  // Clean up tendrils
  if (tendrilLayer && tendrilLayer.parentNode) {
    tendrilLayer.parentNode.removeChild(tendrilLayer);
  }

  setState(STATE.START);
}
