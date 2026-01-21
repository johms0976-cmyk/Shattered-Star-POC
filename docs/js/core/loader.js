// js/core/loader.js

let assetCache = new Map();

async function loadJSON(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = fetch(url).then(res => {
    if (!res.ok) throw new Error(`Failed to load JSON: ${url}`);
    return res.json();
  });

  assetCache.set(url, promise);
  return promise;
}

function loadImage(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });

  assetCache.set(url, promise);
  return promise;
}

function loadAudio(url) {
  if (assetCache.has(url)) return assetCache.get(url);

  const promise = new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve(audio);
    audio.onerror = () => reject(new Error(`Failed to load audio: ${url}`));
    audio.src = url;
  });

  assetCache.set(url, promise);
  return promise;
}

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

export async function preloadAllAssets(onStageUpdate, onProgressUpdate, act = 1) {
  const manifest = await loadJSON("assets/manifest.json");

  const stages = [];

  stages.push({
    name: "Loading core assets…",
    group: manifest.core
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

  for (const stage of stages) {
    if (onStageUpdate) onStageUpdate(stage.name);

    const g = stage.group;

    await loadAssetList(g.images, "images", handleItemLoaded);
    await loadAssetList(g.audio, "audio", handleItemLoaded);
    await loadAssetList(g.data, "data", handleItemLoaded);
  }
}
