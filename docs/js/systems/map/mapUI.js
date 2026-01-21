// js/systems/map/mapUI.js

import { GameState } from "../../core/state.js";
import {
  createRenderer,
  registerScene,
  setScene,
  renderFrame
} from "../../core/renderer.js";

import { drawMapScene } from "./mapCanvasScene.js";

let renderer = null;
let rafId = null;

export function showMap() {
  const screen = document.getElementById("map-screen");
  const canvas = document.getElementById("map-canvas");

  screen.classList.add("active");

  if (!canvas) {
    console.error("map-canvas not found");
    return;
  }

  if (!renderer) {
    renderer = createRenderer(canvas);
    registerScene(renderer, "map", drawMapScene);
  }

  setScene(renderer, "map");
  renderMapNodes(GameState.run.map);

  stopLoop();
  loop();
}

/* =========================
   Render Loop
========================= */

function loop() {
  renderFrame(renderer, GameState);
  rafId = requestAnimationFrame(loop);
}

function stopLoop() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/* =========================
   DOM Nodes
========================= */

function renderMapNodes(map) {
  if (!map || !map.nodes) return;

  const container = document.getElementById("map-screen");

  container.querySelectorAll(".node").forEach(n => n.remove());

  map.nodes.forEach(node => {
    const el = document.createElement("div");
    el.className = `node ${node.type}`;
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    el.textContent = node.type[0].toUpperCase();

    el.onclick = () => {
      GameState.run.currentNode = node;
      console.log("Node selected:", node);
    };

    container.appendChild(el);
  });
}
