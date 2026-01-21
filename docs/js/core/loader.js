// js/core/loader.js

import { ASSET_MANIFEST } from "../../assets/manifest.js";

export const LoadedAssets = {};

export function preloadAssets(onProgress) {
  let loaded = 0;
  const total = ASSET_MANIFEST.length;

  return new Promise(resolve => {
    ASSET_MANIFEST.forEach(path => {
      const img = new Image();
      img.src = path;

      img.onload = () => {
        LoadedAssets[path] = img;
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
