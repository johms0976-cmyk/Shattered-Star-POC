import { seededRandom } from "./seed.js";
import { NODE_TYPES } from "./nodeTypes.js";

export function generateAct1(seed) {
  const rand = seededRandom(seed);
  const nodes = [];

  for (let i = 0; i < 12; i++) {
    nodes.push({
      id: i,
      type: NODE_TYPES[Math.floor(rand() * NODE_TYPES.length)],
      x: 100 + i * 100,
      y: 150 + rand() * 300
    });
  }

  return nodes;
}
