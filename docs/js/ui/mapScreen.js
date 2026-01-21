// js/ui/mapScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

let ctx;
let canvas;
let nodes = [];
let hoveredNode = null;
let selectedNode = null;

export function showMapScreen() {
  canvas = document.getElementById("map-canvas");
  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Generate map nodes for this Act
  generateMapNodes();

  // Input handlers
  canvas.addEventListener("mousemove", handleHover);
  canvas.addEventListener("click", handleClick);

  // Start render loop
  requestAnimationFrame(renderMap);
}

/* -----------------------------------------------------------
   CANVAS RESIZE
----------------------------------------------------------- */
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

/* -----------------------------------------------------------
   MAP GENERATION (placeholder structure)
----------------------------------------------------------- */
function generateMapNodes() {
  // Simple vertical path for now — easy to expand later
  const count = 6;
  nodes = [];

  for (let i = 0; i < count; i++) {
    nodes.push({
      id: i,
      x: canvas.width / 2,
      y: 120 + i * 120,
      type: i === count - 1 ? "boss" : "combat",
      radius: 28
    });
  }
}

/* -----------------------------------------------------------
   INPUT HANDLING
----------------------------------------------------------- */
function handleHover(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  hoveredNode = null;

  for (const node of nodes) {
    const dx = mx - node.x;
    const dy = my - node.y;
    if (Math.sqrt(dx * dx + dy * dy) <= node.radius) {
      hoveredNode = node;
      break;
    }
  }
}

function handleClick() {
  if (!hoveredNode) return;

  selectedNode = hoveredNode;
  travelToNode(selectedNode);
}

/* -----------------------------------------------------------
   TRAVEL LOGIC
----------------------------------------------------------- */
async function travelToNode(node) {
  await fadeOutUI(600);

  if (node.type === "combat") {
    setState(STATE.COMBAT);
  } else if (node.type === "boss") {
    setState(STATE.COMBAT); // later: STATE.BOSS_INTRO
  }
}

/* -----------------------------------------------------------
   RENDER LOOP
----------------------------------------------------------- */
function renderMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawConnections();
  drawNodes();

  requestAnimationFrame(renderMap);
}

/* -----------------------------------------------------------
   DRAWING
----------------------------------------------------------- */
function drawNodes() {
  for (const node of nodes) {
    const isHovered = hoveredNode && hoveredNode.id === node.id;
    const isSelected = selectedNode && selectedNode.id === node.id;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

    if (isSelected) {
      ctx.fillStyle = "#ffcc00";
    } else if (isHovered) {
      ctx.fillStyle = "#66ccff";
    } else if (node.type === "boss") {
      ctx.fillStyle = "#ff4444";
    } else {
      ctx.fillStyle = "#888";
    }

    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
}

function drawConnections() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(255,255,255,0.3)";

  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
}
