// docs/js/core/loader.js

import { assetPath } from "./path.js";

// ============================================================
// ASSET CACHE
// ============================================================

let assetCache = new Map();

// ============================================================
// BULLETPROOF JSON LOADER
// ============================================================

async function loadJSON(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = fetch(url)
    .then(res => {
      if (!res.ok) {
        console.error(`❌ JSON fetch failed: ${url}`);
        return {};
      }
      return res.json().catch(err => {
        console.error(`❌ Invalid JSON in ${url}:`, err);
        return {};
      });
    })
    .catch(err => {
      console.error(`❌ JSON load error: ${url}`, err);
      return {};
    });

  assetCache.set(url, promise);
  return promise;
}

// ============================================================
// BULLETPROOF IMAGE LOADER
// ============================================================

function loadImage(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = new Promise(resolve => {
    const img = new Image();
    let done = false;

    const finish = () => {
      if (!done) {
        done = true;
        resolve(img);
      }
    };

    const timeout = setTimeout(() => {
      console.warn(`⚠️ Image load timeout: ${url}`);
      finish();
    }, 3000);

    img.onload = () => {
      clearTimeout(timeout);
      finish();
    };

    img.onerror = () => {
      clearTimeout(timeout);
      console.error(`❌ Failed to load image: ${url}`);
      finish();
    };

    img.src = url;
  });

  assetCache.set(url, promise);
  return promise;
}

// ============================================================
// BULLETPROOF AUDIO LOADER
// ============================================================

function loadAudio(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = new Promise(resolve => {
    const audio = new Audio();
    let done = false;

    const finish = () => {
      if (!done) {
        done = true;
        resolve(audio);
      }
    };

    audio.onloadeddata = finish;
    audio.onloadedmetadata = finish;
    audio.oncanplay = finish;

    setTimeout(() => {
      console.warn(`⚠️ Audio load timeout: ${url}`);
      finish();
    }, 3000);

    audio.onerror = () => {
      console.error(`❌ Failed to load audio: ${url}`);
      finish();
    };

    audio.src = url;
    audio.load();
  });

  assetCache.set(url, promise);
  return promise;
}

// ============================================================
// LOAD A LIST OF ASSETS
// ============================================================

async function loadAssetList(list, type, onItemLoaded) {
  const loaders = { images: loadImage, audio: loadAudio, data: loadJSON };
  const loader = loaders[type];

  if (!loader || !list || list.length === 0) return;

  for (const raw of list) {
    const url = assetPath(raw);
    console.log(`🔄 Loading ${type}:`, url);

    try {
      await loader(url);
    } catch (err) {
      console.warn(`⚠️ Error loading ${url}:`, err);
    }

    if (onItemLoaded) onItemLoaded();
  }
}

// ============================================================
// MANIFEST VALIDATOR (LOGS MISSING FILES)
// ============================================================

function validateManifest(manifest, act) {
  const groups = [manifest.core, manifest[`act${act}`]];

  for (const group of groups) {
    if (!group) continue;

    ["images", "audio", "data"].forEach(type => {
      const list = group[type] || [];
      list.forEach(raw => {
        const url = assetPath(raw);
        fetch(url, { method: "HEAD" })
          .then(res => {
            if (!res.ok) console.warn(`❌ Missing asset: ${url}`);
          })
          .catch(() => console.warn(`❌ Missing asset: ${url}`));
      });
    });
  }
}

// ============================================================
// MAIN PRELOAD FUNCTION (BULLETPROOF)
// ============================================================

export async function preloadAllAssets(onStageUpdate, onProgressUpdate, act = 1) {
  const manifest = await loadJSON(assetPath("manifest.json"));

  validateManifest(manifest, act);

  const stages = [];

  stages.push({
    name: "Loading core assets…",
    group: manifest.core || {}
  });

  const actKey = `act${act}`;
  if (manifest[actKey]) {
    stages.push({
      name: `Preparing Act ${act}…`,
      group: manifest[actKey]
    });
  }

  let totalItems = 0;
  for (const stage of stages) {
    const g = stage.group || {};
    totalItems += (g.images?.length || 0) +
                  (g.audio?.length || 0) +
                  (g.data?.length || 0);
  }

  let loadedItems = 0;

  const handleItemLoaded = () => {
    loadedItems++;
    if (onProgressUpdate && totalItems > 0) {
      onProgressUpdate(loadedItems / totalItems);
    }
  };

  for (const stage of stages) {
    if (onStageUpdate) onStageUpdate(stage.name);

    const g = stage.group || {};

    await loadAssetList(g.images, "images", handleItemLoaded);
    await loadAssetList(g.audio, "audio", handleItemLoaded);
    await loadAssetList(g.data, "data", handleItemLoaded);
  }

  return true;
}
