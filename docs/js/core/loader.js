// js/core/loader.js

import { ASSET_MANIFEST } from "../../assets/manifest.js";

export function preloadAssets(onProgress) {
  const total = ASSET_MANIFEST.length;

  if (total === 0) {
    if (onProgress) onProgress(1);
    return Promise.resolve();
  }

  let loaded = 0;

  return new Promise(resolve => {
    ASSET_MANIFEST.forEach(path => {
      const img = new Image();
      img.src = path;

      img.onload = () => {
        loaded++;
        if (onProgress) onProgress(loaded / total);
        if (loaded === total) resolve();
      };

      img.onerror = () => {
        console.warn("Failed to load asset:", path);
        loaded++;
        if (onProgress) onProgress(loaded / total);
        if (loaded === total) resolve();
      };
    });
  });
}
