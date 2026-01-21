// js/ui/mapScreen.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";

export function showMapScreen() {
  const canvas = document.getElementById("map-canvas");
  const ctx = canvas.getContext("2d");

  resizeCanvas(canvas);

  const nodes = [
    { x: 150, y: 400, next: [1] },
    { x: 300, y: 300, next: [2, 3] },
    { x: 200, y: 150, next: [] },
    { x: 400, y: 150, next: [] }
  ];

  drawMap(ctx, nodes);

  canvas.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.COMBAT);
  };
}

function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawMap(ctx, nodes) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;

  // Draw connections
  nodes.forEach((node, i) => {
    node.next.forEach(n => {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(nodes[n].x, nodes[n].y);
      ctx.stroke();
    });
  });

  // Draw nodes
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
}
