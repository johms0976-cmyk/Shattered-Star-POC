// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

const TITLE_IMAGES = [
  "assets/screens/title/title1.png",
  "assets/screens/title/title2.png",
  "assets/screens/title/title3.png",
  "assets/screens/title/title4.png",
  "assets/screens/title/title5.png"
];

let imagesLoaded = false;
let currentIndex = 0;
let slideshowInterval = null;

export async function showTitle() {
  const screen = document.getElementById("title-screen");
  const bgA = document.getElementById("title-bg-a");
  const bgB = document.getElementById("title-bg-b");

  screen.classList.add("active");

  // Preload slideshow images
  await preloadTitleImages();

  // Start crossfade slideshow
  startSlideshow(bgA, bgB);

  // Desktop: Enter key
  function handleKey(e) {
    if (!imagesLoaded) return;
    if (e.key === "Enter") {
      cleanup();
      startTransitionToMenu();
    }
  }

  window.addEventListener("keydown", handleKey);

  // Mobile: tap anywhere
  function handleTap() {
    if (!imagesLoaded) return;
    cleanup();
    startTransitionToMenu();
  }

  screen.addEventListener("click", handleTap);

  // Cleanup helper
  function cleanup() {
    window.removeEventListener("keydown", handleKey);
    screen.removeEventListener("click", handleTap);
  }
}

/* -----------------------------------------------------------
   PRELOAD IMAGES
----------------------------------------------------------- */
async function preloadTitleImages() {
  const promises = TITLE_IMAGES.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        console.warn("Failed to load title image:", src);
        resolve(false);
      };
      img.src = src;
    });
  });

  await Promise.all(promises);
  imagesLoaded = true;
}

/* -----------------------------------------------------------
   SLIDESHOW CROSSFADE
----------------------------------------------------------- */
function startSlideshow(bgA, bgB) {
  // Initial frame
  bgA.style.backgroundImage = `url(${TITLE_IMAGES[0]})`;
  bgA.style.opacity = 1;
  bgB.style.opacity = 0;

  currentIndex = 1;

  slideshowInterval = setInterval(() => {
    const nextImage = TITLE_IMAGES[currentIndex];

    // Fade B in
    bgB.style.backgroundImage = `url(${nextImage})`;
    bgB.style.opacity = 1;

    // After fade, swap A to new image and hide B
    setTimeout(() => {
      bgA.style.backgroundImage = `url(${nextImage})`;
      bgA.style.opacity = 1;
      bgB.style.opacity = 0;
    }, 1000); // fade duration

    currentIndex = (currentIndex + 1) % TITLE_IMAGES.length;
  }, 4000); // 4 seconds per slide
}

/* -----------------------------------------------------------
   TRANSITION TO START MENU
----------------------------------------------------------- */
async function startTransitionToMenu() {
  clearInterval(slideshowInterval);
  await fadeOutUI(600);
  setState(STATE.START);
}
