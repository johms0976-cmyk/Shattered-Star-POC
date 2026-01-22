// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { assetPath } from "../core/path.js";

// ============================================================
// CONFIGURATION
// ============================================================

// Cinematic slideshow
const IMAGE_HOLD = 3000;
const FADE_TIME = 1000;

// Glitch burst
const ENABLE_GLITCH = true;
const GLITCH_FPS = 24;
const GLITCH_FRAMES = 4;
const GLITCH_INTERVAL = 12000;

// Tendrils
const ENABLE_TENDRILS = true;

// Title images (corrected paths)
const TITLE_IMAGES = [
  assetPath("screens/title/title1.png"),
  assetPath("screens/title/title2.png"),
  assetPath("screens/title/title3.png"),
  assetPath("screens/title/title4.png"),
  assetPath("screens/title/title5.png")
];

// Flyby assets (corrected paths)
const FLYBY_BG = assetPath("screens/background/vharostitle.png");
const FLYBY_SHIP = assetPath("sprites/ships/dawnseeker.jpg");

// Flyby timing
const FLYBY_DURATION = 4500; // ms
const FLYBY_EASE = t => 1 - Math.pow(1 - t, 3); // cubic ease-out

// ============================================================
// INTERNAL STATE
// ============================================================

let bgA, bgB, distortLayer;
let tendrilLayer, tendrilLeft, tendrilRight;

let currentIndex = 0;
let slideshowTimer = null;
let glitchTimer = null;
let acceptingInput = false;

// Canvas for flyby
let flyCanvas, flyCtx;
let flybyRunning = false;

// ============================================================
// PUBLIC API
// ============================================================

export function showTitleFlyby() {
  setupFlybyCanvas();

  const bg = new Image();
  const ship = new Image();

  let loaded = 0;
  const done = () => {
    loaded++;
    if (loaded === 2) runFlyby(bg, ship);
  };

  bg.onload = done;
  ship.onload = done;

  bg.src = FLYBY_BG;
  ship.src = FLYBY_SHIP;
}

export function showTitleLoop() {
  bgA = document.getElementById("title-bg-a");
  bgB = document.getElementById("title-bg-b");
  distortLayer = document.getElementById("title-distort");

  if (ENABLE_TENDRILS) setupTendrils();

  currentIndex = 0;
  acceptingInput = false;

  const firstImage = TITLE_IMAGES[0];
  bgA.style.backgroundImage = `url(${firstImage})`;
  bgA.style.opacity = 1;
  bgB.style.opacity = 0;

  bgA.classList.add("voidborn-pulse");
  bgB.classList.add("voidborn-pulse");

  if (distortLayer) {
    distortLayer.classList.add("voidborn-distort");
    distortLayer.style.backgroundImage = `url(${firstImage})`;
  }

  startSlideshow();
  startGlitchLoop();

  setTimeout(() => {
    acceptingInput = true;
    attachInputListeners();
  }, 800);
}

// ============================================================
// FLYBY IMPLEMENTATION
// ============================================================

function setupFlybyCanvas() {
  if (!flyCanvas) {
    flyCanvas = document.createElement("canvas");
    flyCanvas.id = "title-canvas";
    flyCanvas.className = "title-canvas";

    const screen = document.getElementById("title-screen");
    screen.appendChild(flyCanvas);

    flyCtx = flyCanvas.getContext("2d");
  }

  flyCanvas.width = window.innerWidth;
  flyCanvas.height = window.innerHeight;
}

function runFlyby(bg, ship) {
  flybyRunning = true;

  const start = performance.now();

  const animate = now => {
    if (!flybyRunning) return;

    const t = Math.min((now - start) / FLYBY_DURATION, 1);
    const eased = FLYBY_EASE(t);

    flyCtx.clearRect(0, 0, flyCanvas.width, flyCanvas.height);

    // Draw background
    flyCtx.drawImage(bg, 0, 0, flyCanvas.width, flyCanvas.height);

    // Ship path: left → right, slight upward arc
    const x = -300 + eased * (flyCanvas.width + 600);
    const y = flyCanvas.height * 0.55 - Math.sin(eased * Math.PI) * 80;

    const shipW = 320;
    const shipH = 180;

    flyCtx.drawImage(ship, x, y, shipW, shipH);

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      endFlyby();
    }
  };

  requestAnimationFrame(animate);
}

function endFlyby() {
  flybyRunning = false;

  if (flyCanvas && flyCanvas.parentNode) {
    flyCanvas.parentNode.removeChild(flyCanvas);
  }

  setState(STATE.TITLE_LOOP);
}

// ============================================================
// SLIDESHOW LOOP
// ============================================================

function startSlideshow() {
  clearInterval(slideshowTimer);

  slideshowTimer = setInterval(() => {
    const nextImage = TITLE_IMAGES[currentIndex];

    bgB.style.backgroundImage = `url(${nextImage})`;
    bgB.style.transition = `opacity ${FADE_TIME}ms ease`;
    bgB.style.opacity = 1;

    setTimeout(() => {
      bgA.style.backgroundImage = `url(${nextImage})`;
      bgA.style.opacity = 1;
      bgB.style.opacity = 0;

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

  if (tendrilLayer && tendrilLayer.parentNode) {
    tendrilLayer.parentNode.removeChild(tendrilLayer);
  }

  setState(STATE.START);
}

// ============================================================
// TENDRILS
// ============================================================

function setupTendrils() {
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
