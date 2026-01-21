// js/ui/titleScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";
import { assetPath } from "../core/path.js";

const TITLE_IMAGES = [
  assetPath("assets/screens/title/title1.png"),
  assetPath("assets/screens/title/title2.png"),
  assetPath("assets/screens/title/title3.png"),
  assetPath("assets/screens/title/title4.png"),
  assetPath("assets/screens/title/title5.png")
];

let imagesLoaded = false;
let currentIndex = 0;
let slideshowInterval = null;

export async function showTitle() {
  const screen = document.getElementById("title-screen");
  const bgA = document.getElementById("title-bg-a");
  const bgB = document.getElementById("title-bg-b");

  screen.classList.add("active");

  await preloadTitleImages();
  startSlideshow(bgA, bgB);

  function handleKey(e) {
    if (!imagesLoaded) return;
    if (e.key === "Enter") {
      cleanup();
      startTransitionToMenu();
    }
  }

  window.addEventListener("keydown", handleKey);

  function handleTap() {
    if (!imagesLoaded) return;
    cleanup();
    startTransitionToMenu();
  }

  screen.addEventListener("click", handleTap);

  function cleanup() {
    window.removeEventListener("keydown", handleKey);
    screen.removeEventListener("click", handleTap);
  }
}

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

function startSlideshow(bgA, bgB) {
  bgA.style.backgroundImage = `url(${TITLE_IMAGES[0]})`;
  bgA.style.opacity = 1;
  bgB.style.opacity = 0;

  currentIndex = 1;

  slideshowInterval = setInterval(() => {
    const nextImage = TITLE_IMAGES[currentIndex];

    bgB.style.backgroundImage = `url(${nextImage})`;
    bgB.style.opacity = 1;

    setTimeout(() => {
      bgA.style.backgroundImage = `url(${nextImage})`;
      bgA.style.opacity = 1;
      bgB.style.opacity = 0;
    }, 1000);

    currentIndex = (currentIndex + 1) % TITLE_IMAGES.length;
  }, 4000);
}

async function startTransitionToMenu() {
  clearInterval(slideshowInterval);
  await fadeOutUI(600);
  setState(STATE.START);
}
