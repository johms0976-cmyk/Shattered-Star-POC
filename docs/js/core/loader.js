// js/core/loader.js

// Cache for all loaded assets (images, audio, JSON)
let assetCache = new Map();

// -------------------------------
// JSON LOADER
// -------------------------------
async function loadJSON(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = fetch(url).then(res => {
    if (!res.ok) throw new Error(`Failed to load JSON: ${url}`);
    return res.json();
  });

  assetCache.set(url, promise);
  return promise;
}

// -------------------------------
// IMAGE LOADER
// -------------------------------
function loadImage(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.error(`Failed to load image: ${url}`);
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = url;
  });

  assetCache.set(url, promise);
  return promise;
}

// -------------------------------
// FIXED + CROSS-BROWSER AUDIO LOADER
// -------------------------------
function loadAudio(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = new Promise((resolve, reject) => {
    const audio = new Audio();
    let resolved = false;

    const finish = () => {
      if (!resolved) {
        resolved = true;
        resolve(audio);
      }
    };

    // Most reliable event across browsers
    audio.onloadeddata = finish;

    // Safari sometimes only fires this
    audio.onloadedmetadata = finish;

    // Chrome sometimes fires this first
    audio.oncanplay = finish;

    // Fallback timeout to prevent infinite hangs
    setTimeout(() => {
      if (!resolved) {
        console.warn(`Audio load timeout, continuing anyway: ${url}`);
        finish();
      }
    }, 3000);

    audio.onerror = () => {
      console.error(`Failed to load audio: ${url}`);
      reject(new Error(`Failed to load audio: ${url}`));
    };

    audio.src = url;
    audio.load();
  });

  assetCache.set(url, promise);
  return promise;
}

// -------------------------------
// LOAD A LIST OF ASSETS BY TYPE
// -------------------------------
async function loadAssetList(list, type, onItemLoaded) {
  const loaders = {
    images: loadImage,
    audio: loadAudio,
    data: loadJSON
  };

  const loader = loaders[type];
  if (!loader || !list || list.length === 0) return;

  for (const url of list) {
    try {
      await loader(url);
    } catch (err) {
      console.warn(err.message);
    }
    if (onItemLoaded) onItemLoaded();
  }
}

// -------------------------------
// MAIN PRELOAD FUNCTION
// -------------------------------
export async function preloadAllAssets(onStageUpdate, onProgressUpdate, act = 1) {
  // Load manifest first
  const manifest = await loadJSON("assets/manifest.json");

  const stages = [];

  // Core assets always load first
  stages.push({
    name: "Loading core assets…",
    group: manifest.core
  });

  // Act-specific assets
  const actKey = `act${act}`;
  if (manifest[actKey]) {
    stages.push({
      name: `Preparing Act ${act}…`,
      group: manifest[actKey]
    });
  }

  // Count total items
  let totalItems = 0;
  for (const stage of stages) {
    const g = stage.group;
    totalItems += (g.images?.length || 0) + (g.audio?.length || 0) + (g.data?.length || 0);
  }

  let loadedItems = 0;

  const handleItemLoaded = () => {
    loadedItems++;
    if (onProgressUpdate && totalItems > 0) {
      onProgressUpdate(loadedItems / totalItems);
    }
  };

  // Load each stage in order
  for (const stage of stages) {
    if (onStageUpdate) onStageUpdate(stage.name);

    const g = stage.group;

    await loadAssetList(g.images, "images", handleItemLoaded);
    await loadAssetList(g.audio, "audio", handleItemLoaded);
    await loadAssetList(g.data, "data", handleItemLoaded);
  }
}
