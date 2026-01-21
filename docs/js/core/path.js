// js/core/path.js

// Automatically detects the correct base path whether hosted at:
// /Shattered-Star-POC/  (GitHub Pages)
// /                     (root)
// custom domain
// localhost
export const BASE_PATH = (() => {
  const path = window.location.pathname;

  // Split into parts, remove empty segments
  const parts = path.split("/").filter(Boolean);

  // If hosted in a subfolder (e.g., /Shattered-Star-POC/)
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
