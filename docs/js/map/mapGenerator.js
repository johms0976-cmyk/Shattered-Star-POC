import { seededRandom } from "./seed.js";
import { NODE_TYPES } from "./nodeTypes.js";

export function generateAct1(seed) {
  const rand = seededRandom(seed);

  const nodes = [];
  const connections = [];

  const columns = 6;
  const rows = 3;
  let id = 0;

  // Create nodes in columns (branch-friendly layout)
  for (let x = 0; x < columns; x++) {
    const nodesInColumn = 2 + Math.floor(rand() * rows);

    for (let y = 0; y < nodesInColumn; y++) {
      nodes.push({
        id,
        type: NODE_TYPES[Math.floor(rand() * NODE_TYPES.length)],
        col: x,
        row: y,
        x: 150 + x * 180,
        y: 150 + y * 140 + rand() * 40
      });
      id++;
    }
  }

  // Create branching connections
  for (let i = 0; i < nodes.length; i++) {
    const from = nodes[i];
    const nextCol = from.col + 1;

    const candidates = nodes.filter(n => n.col === nextCol);
    if (candidates.length > 0) {
      const targetCount = 1 + Math.floor(rand() * 2);

      for (let c = 0; c < targetCount; c++) {
        const to = candidates[Math.floor(rand() * candidates.length)];
        connections.push({ from: from.id, to: to.id });
      }
    }
  }

  return { nodes, connections };
}
