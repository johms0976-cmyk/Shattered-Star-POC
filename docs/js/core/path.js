// js/core/path.js

// Detect the base URL of the game automatically.
// Works on GitHub Pages, local dev, and custom domains.
export const BASE_PATH = (() => {
  const path = window.location.pathname;

  // If hosted in a subfolder (e.g., /Shattered-Star-POC/)
  const parts = path.split("/").filter(Boolean);

  // If the repo name is present, use it as the base
  if (parts.length > 0) {
    return "/" + parts[0] + "/";
  }

  // Otherwise root
  return "/";
})();

// Build a full asset path
export function assetPath(relative) {
  return BASE_PATH + relative.replace(/^\//, "");
}
