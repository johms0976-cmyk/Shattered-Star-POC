// docs/js/core/path.js

// ============================================================
// PATH RESOLUTION FOR GITHUB PAGES + LOCAL DEV
// ============================================================
//
// This file ensures that all asset URLs resolve correctly whether
// the game is running:
//
//   • Locally (file:// or localhost)
//   • On GitHub Pages (served from /<repo>/docs/)
//   • In any subfolder deployment
//
// The rule is simple:
//   All assets live under:  ./assets/
//
// So we always return:
//   ./assets/<relative>
//
// This guarantees correct resolution everywhere.
// ============================================================

// Detect the base path of the site.
// Example on GitHub Pages:
//   https://username.github.io/Shattered-Star-POC/
// window.location.pathname might be: "/Shattered-Star-POC/"
const BASE_PATH = window.location.pathname.replace(/\/$/, "");

// ============================================================
// MAIN ASSET PATH RESOLVER
// ============================================================
//
// Input:  "screens/title/title4.png"
// Output: "./assets/screens/title/title4.png"
//
// The "./" prefix ensures correct resolution in all environments.
// ============================================================

export function assetPath(relative) {
  return `${BASE_PATH}/assets/${relative}`;
}

// ============================================================
// OPTIONAL: PATH HELPERS FOR FUTURE SYSTEMS
// ============================================================

// JSON data files
export function dataPath(relative) {
  return assetPath(`data/${relative}`);
}

// Audio files
export function audioPath(relative) {
  return assetPath(`audio/${relative}`);
}

// Image files
export function imagePath(relative) {
  return assetPath(`screens/${relative}`);
}

// Sprites (heroes, enemies, UI, etc.)
export function spritePath(relative) {
  return assetPath(`sprites/${relative}`);
}

// Fonts
export function fontPath(relative) {
  return assetPath(`fonts/${relative}`);
}
