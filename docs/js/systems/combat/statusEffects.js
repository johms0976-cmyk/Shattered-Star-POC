// js/systems/combat/statusEffects.js

export function applyStatusEffects(Combat) {
  // Player DoTs
  applyDoT(Combat.player);

  // Enemy DoTs
  Combat.enemies.forEach(e => applyDoT(e));
}

function applyDoT(entity) {
  if (entity.status.bleed) {
    entity.hp -= entity.status.bleed;
  }
  if (entity.status.burn) {
    entity.hp -= entity.status.burn;
  }
  if (entity.status.radiance) {
    entity.hp -= entity.status.radiance;
  }
}

export function decayStatusEffects(Combat) {
  decay(Combat.player);
  Combat.enemies.forEach(decay);
}

function decay(entity) {
  if (entity.status.burn) entity.status.burn--;
  // bleed does NOT decay
  // radiance does NOT decay
}

