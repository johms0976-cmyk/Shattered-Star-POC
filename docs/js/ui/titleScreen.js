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

  // Preload images
  await preloadTitleImages();

  // Start slideshow
  startSlideshow(bgA, bgB);

  // Enable Enter key
  function handleKey(e) {
    if (!imagesLoaded) return; // prevent early input
    if (e.key === "Enter") {
      window.removeEventListener("keydown", handleKey);
      startTransitionToMenu();
    }
  }

  window.addEventListener("keydown", handleKey);
}

async function preloadTitleImages() {
  const promises = TITLE_IMAGES.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        console.warn("Failed to load title image:", src);
        resolve(false); // don't block slideshow
      };
      img.src = src;
    });
  });

  await Promise.all(promises);
  imagesLoaded = true;
}

function startSlideshow(bgA, bgB) {
  // Set initial image
  bgA.style.backgroundImage = `url(${TITLE_IMAGES[0]})`;
  bgA.style.opacity = 1;
  bgB.style.opacity = 0;

  currentIndex = 1;

  slideshowInterval = setInterval(() => {
    const nextImage = TITLE_IMAGES[currentIndex];

    // Crossfade
    bgB.style.backgroundImage = `url(${nextImage})`;
    bgB.style.opacity = 1;

    setTimeout(() => {
      bgA.style.backgroundImage = `url(${nextImage})`;
      bgA.style.opacity = 1;
      bgB.style.opacity = 0;
    }, 1000); // fade duration

    currentIndex = (currentIndex + 1) % TITLE_IMAGES.length;
  }, 4000); // 4 seconds per image
}

async function startTransitionToMenu() {
  clearInterval(slideshowInterval);
  await fadeOutUI(600);
  setState(STATE.START);
}
