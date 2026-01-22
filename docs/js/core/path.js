// docs/js/core/path.js

// ============================================================
// PATH RESOLUTION FOR CURRENT GITHUB PAGES SETUP
// ============================================================
//
// Your site is served from:
//   https://johms0976-cmyk.github.io/
//
// Your assets live at:
//   /assets/...
//
// So all asset URLs must resolve to:
//   /assets/<relative>
//
// This file guarantees correct resolution everywhere.
// ============================================================

export function assetPath(relative) {
  return `/assets/${relative}`;
}

// Optional helpers (not required but convenient)

export function imagePath(relative) {
  return assetPath(`screens/${relative}`);
}

export function audioPath(relative) {
  return assetPath(`audio/${relative}`);
}

export function dataPath(relative) {
  return assetPath(`data/${relative}`);
}

export function spritePath(relative) {
  return assetPath(`sprites/${relative}`);
}
