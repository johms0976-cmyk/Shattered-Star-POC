import { generateAct1 } from "./mapGenerator.js";
import { transition } from "../transitions.js";

const screen = document.getElementById("screen");

export function showMap() {
  transition(() => {
    screen.innerHTML = "";
    const map = generateAct1(Date.now());

    map.forEach(node => {
      const div = document.createElement("div");
      div.className = `node ${node.type}`;
      div.style.left = node.x + "px";
      div.style.top = node.y + "px";
      div.innerText = node.type[0].toUpperCase();

      div.onclick = () => {
        alert(`Node: ${node.type}`);
      };

      screen.appendChild(div);
    });
  });
}
