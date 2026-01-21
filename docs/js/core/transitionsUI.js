// js/core/transitionsUI.js
//
// DOM/UI transition engine for Shattered Star.
// Handles fades, theme switching, and Voidborn corruption spread.

let fadeLayer = null;
let corruptionLayer = null;

/* ============================================================
   FADE LAYER
============================================================ */

function ensureFadeLayer() {
  if (!fadeLayer) {
    fadeLayer = document.createElement("div");
    fadeLayer.id = "fade-layer";
    fadeLayer.style.position = "fixed";
    fadeLayer.style.inset = "0";
    fadeLayer.style.background = "black";
    fadeLayer.style.opacity = "0";
    fadeLayer.style.pointerEvents = "none";
    fadeLayer.style.transition = "opacity 0.6s ease";
    fadeLayer.style.zIndex = "99999";
    document.body.appendChild(fadeLayer);
  }
}

export function fadeOutUI(duration = 600) {
  ensureFadeLayer();
  fadeLayer.style.transition = `opacity ${duration}ms ease`;
  fadeLayer.style.opacity = "1";
  return new Promise(resolve => setTimeout(resolve, duration));
}

export function fadeInUI(duration = 600) {
  ensureFadeLayer();
  fadeLayer.style.transition = `opacity ${duration}ms ease`;
  fadeLayer.style.opacity = "0";
  return new Promise(resolve => setTimeout(resolve, duration));
}

/* ============================================================
   THEME SWITCHING
============================================================ */

export function switchTheme(themeName) {
  document.body.setAttribute("data-theme", themeName);
}

/* ============================================================
   CORRUPTION SPREAD
============================================================ */

function ensureCorruptionLayer() {
  if (!corruptionLayer) {
    corruptionLayer = document.createElement("div");
    corruptionLayer.id = "corruption-layer";
    corruptionLayer.style.position = "fixed";
    corruptionLayer.style.inset = "0";
    corruptionLayer.style.pointerEvents = "none";
    corruptionLayer.style.background = "url('assets/effects/corruption.png')";
    corruptionLayer.style.backgroundSize = "cover";
    corruptionLayer.style.backgroundPosition = "center";
    corruptionLayer.style.opacity = "0";
    corruptionLayer.style.mixBlendMode = "screen";
    corruptionLayer.style.transition = "opacity 1.2s ease";
    corruptionLayer.style.zIndex = "99998";
    document.body.appendChild(corruptionLayer);
  }
}

export async function corruptionSpread() {
  ensureCorruptionLayer();

  corruptionLayer.style.opacity = "0.85";
  await new Promise(r => setTimeout(r, 1200));

  switchTheme("voidborn");

  corruptionLayer.style.opacity = "0";
  await new Promise(r => setTimeout(r, 1200));
}

/* ============================================================
   OPTIONAL WHITE FLASH
============================================================ */

export function flashWhite(duration = 120) {
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "white";
  flash.style.opacity = "1";
  flash.style.pointerEvents = "none";
  flash.style.transition = `opacity ${duration}ms ease`;
  flash.style.zIndex = "999999";
  document.body.appendChild(flash);

  requestAnimationFrame(() => {
    flash.style.opacity = "0";
  });

  setTimeout(() => flash.remove(), duration + 50);
}
