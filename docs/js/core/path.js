// docs/js/core/path.js

// Detect the base path of the GitHub Pages project.
// Example: "/Shattered-Star-POC"
const BASE = window.location.pathname.split("/").filter(Boolean)[0];
const ROOT = BASE ? `/${BASE}` : "";

// All assets live under: <root>/assets/
export function assetPath(relative) {
  return `${ROOT}/assets/${relative}`;
}
