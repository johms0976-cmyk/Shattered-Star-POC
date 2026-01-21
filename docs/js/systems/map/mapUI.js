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

/**
 * Entry point for the MAP screen.
 * Called by the state router (later).
 */
export function showMap() {
  const screen = document.getElementById("map-screen");
  const canvas = document.getElementById("map-canvas");

  if (!canvas) {
    console.error("map-canvas not found in DOM");
    return;
  }

  // Create renderer once
  if (!renderer) {
    renderer = createRenderer(canvas);
    registerScene(renderer, "map", drawMapScene);
  }

  // Activate canvas scene
  setScene(renderer, "map");

  // Render DOM-based nodes
  renderMapNodes(GameState.run.map);

  // Start render loop
  stopLoop();
  loop();
}

/* ============================
   Render Loop
============================ */

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

/* ============================
   DOM Nodes
============================ */

function renderMapNodes(map) {
  if (!map || !map.nodes) {
    console.warn("No map data available");
    return;
  }

  const container = document.getElementById("map-screen");

  // Remove existing nodes
  container.querySelectorAll(".map-node").forEach(n => n.remove());

  map.nodes.forEach(node => {
    const el = document.createElement("div");
    el.className = `map-node ${node.type}`;
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    el.textContent = node.type[0].toUpperCase();

    el.onclick = () => onNodeSelected(node);

    container.appendChild(el);
  });
}

/* ============================
   Node Interaction
============================ */

function onNodeSelected(node) {
  GameState.run.currentNode = node;
  console.log("Node selected:", node);

  // Future flow:
  // combat → setState(STATE.COMBAT)
  // event  → setState(STATE.EVENT)
  // shop   → setState(STATE.SHOP)
}
