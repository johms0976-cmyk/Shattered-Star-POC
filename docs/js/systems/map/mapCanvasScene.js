// js/systems/map/mapCanvasScene.js

/**
 * Draws the map background and connections.
 * NO DOM.
 * NO state changes.
 * Canvas only.
 */
export function drawMapScene(ctx, gameState, renderer) {
  const map = gameState.run.map;

  // Safety guard
  if (!map) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "16px monospace";
    ctx.fillText("Map not generated", 20, 30);
    return;
  }

  drawBackground(ctx);
  drawConnections(ctx, map.nodes);
}

/* -----------------------------
   Background
----------------------------- */

function drawBackground(ctx) {
  const { width, height } = ctx.canvas;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // Subtle grid / noise placeholder
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
}

/* -----------------------------
   Connections
----------------------------- */

function drawConnections(ctx, nodes) {
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 2;

  nodes.forEach(node => {
    if (!node.links) return;

    node.links.forEach(linkId => {
      const target = nodes.find(n => n.id === linkId);
      if (!target) return;

      ctx.beginPath();
      ctx.moveTo(node.x + 20, node.y + 20);
      ctx.lineTo(target.x + 20, target.y + 20);
      ctx.stroke();
    });
  });
}

