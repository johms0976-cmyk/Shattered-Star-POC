import fs from "fs";
import path from "path";

const ROOT = "assets";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full.replace(/\\/g, "/"));
    }
  });

  return results;
}

function categorize(files) {
  const images = [];
  const audio = [];
  const data = [];

  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg|gif|webp)$/i)) images.push(file);
    else if (file.match(/\.(mp3|ogg|wav)$/i)) audio.push(file);
    else if (file.match(/\.json$/i)) data.push(file);
  }

  return { images, audio, data };
}

function buildManifest() {
  const allFiles = walk(ROOT);

  const core = categorize(allFiles);

  const manifest = { core };

  fs.writeFileSync(
    path.join(ROOT, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log("Manifest generated successfully.");
}

buildManifest();
