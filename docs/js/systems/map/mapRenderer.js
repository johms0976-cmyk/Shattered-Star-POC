import { generateAct1 } from "./mapGenerator.js";
import { transition } from "../transitions.js";

const screen = document.getElementById("screen");
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

export function showMap() {
  transition(() => {
    screen.innerHTML = `<canvas id="mapCanvas"></canvas>`;
    
    const map = generateAct1(Date.now());

    setupCanvas();
    drawConnections(map);
    drawNodes(map.nodes);
  });
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawConnections(map) {
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 2;

  map.connections.forEach(edge => {
    const from = map.nodes.find(n => n.id === edge.from);
    const to = map.nodes.find(n => n.id === edge.to);

    ctx.beginPath();
    ctx.moveTo(from.x + 20, from.y + 20);
    ctx.lineTo(to.x + 20, to.y + 20);
    ctx.stroke();
  });
}

function drawNodes(nodes) {
  nodes.forEach(node => {
    const div = document.createElement("div");
    div.className = `node ${node.type}`;
    div.style.left = node.x + "px";
    div.style.top = node.y + "px";
    div.innerText = node.type[0].toUpperCase();

    div.onclick = () => {
      alert(`Node ${node.id}: ${node.type}`);
    };

    screen.appendChild(div);
  });
}
