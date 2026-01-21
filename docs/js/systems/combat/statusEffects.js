// js/systems/combat/statusEffects.js
//
// Centralized status effect engine for Shattered Star.
// Handles:
// - Damage-over-time effects
// - Buffs and debuffs
// - Hero-specific mechanics
// - End-of-turn decay
//
// This file is intentionally modular and easy to expand as the combat engine grows.

/* ============================================================
   APPLY ALL STATUS EFFECTS (Start/End of Turn)
============================================================ */

export function applyStatusEffects(Combat) {
  applyEntityEffects(Combat.player, Combat);

  Combat.enemies.forEach(enemy => {
    applyEntityEffects(enemy, Combat);
  });
}

/* ============================================================
   PER-ENTITY EFFECT APPLICATION
============================================================ */

function applyEntityEffects(entity, Combat) {
  const s = entity.status || {};

  /* -----------------------------
     UNIVERSAL DAMAGE-OVER-TIME
  ----------------------------- */

  // Bleed — stacking DoT, does NOT decay
  if (s.bleed) {
    entity.hp -= s.bleed;
  }

  // Burn — decreasing DoT each turn
  if (s.burn) {
    entity.hp -= s.burn;
  }

  // Radiance — holy DoT (Auren)
  if (s.radiance) {
    entity.hp -= s.radiance;
  }

  // Poison — persistent DoT (optional future use)
  if (s.poison) {
    entity.hp -= s.poison;
  }

  /* -----------------------------
     HERO-SPECIFIC EFFECTS
  ----------------------------- */

  /* === KORVAX: OVERHEAT ===
     - Builds from Overheat cards
     - If >= meltdown threshold, deals damage
     - Slowly vents each turn (handled in decay)
  */
  if (s.overheat && s.overheat >= 10) {
    entity.hp -= 2; // MVP meltdown tick
  }

  /* === KORVAX: RAGE ===
     - Passive buff
     - Consumed by cards
     - No automatic per-turn effect
  */

  /* === AUREN: AEGIS ===
     - Persistent block
     - Does NOT decay at end of turn
     - Only removed by taking damage
     - No automatic effect here
  */

  /* === LYRIA: ASTRAL CHARGE ===
     - Scaling damage resource
     - Consumed by Astral cards
     - No automatic effect
  */

  /* === LYRIA: TEMPORAL FLUX ===
     - MVP: +1 card draw per stack at start of turn
     - Later: cost manipulation, turn manipulation
  */
  if (s.temporalFlux && entity === Combat.player) {
    entity.extraDraw = (entity.extraDraw || 0) + s.temporalFlux;
  }

  /* === SHADE: STEALTH ===
     - Prevents targeting
     - Breaks when attacking
     - No automatic effect
  */

  /* === LYRIA: VOID INSTABILITY ===
     - MVP: 10% chance per stack to take 1 damage
     - Later: cost randomization, intent distortion
  */
  if (s.voidInstability) {
    const chance = 0.1 * s.voidInstability;
    if (Math.random() < chance) {
      entity.hp -= 1;
    }
  }
}

/* ============================================================
   DECAY EFFECTS (End of Turn)
============================================================ */

export function decayStatusEffects(Combat) {
  decayEntity(Combat.player);
  Combat.enemies.forEach(decayEntity);
}

function decayEntity(entity) {
  const s = entity.status || {};

  /* -----------------------------
     UNIVERSAL DECAY RULES
  ----------------------------- */

  // Burn decays
  if (s.burn) s.burn--;

  // Bleed does NOT decay
  // Radiance does NOT decay
  // Poison does NOT decay (unless purified)

  /* -----------------------------
     HERO-SPECIFIC DECAY RULES
  ----------------------------- */

  // Overheat vents slowly
  if (s.overheat && s.overheat > 0) {
    s.overheat -= 1;
  }

  // Rage does NOT decay
  // Aegis does NOT decay
  // Astral Charge does NOT decay
  // Temporal Flux does NOT decay
  // Stealth does NOT decay (breaks on attack)
  // Void Instability does NOT decay
}

/* ============================================================
   UTILITY HELPERS
============================================================ */

export function addStatus(entity, effect, amount = 1) {
  if (!entity.status) entity.status = {};
  entity.status[effect] = (entity.status[effect] || 0) + amount;
}

export function clearStatus(entity, effect) {
  if (entity.status && entity.status[effect]) {
    delete entity.status[effect];
  }
}

export function clearAllStatus(entity) {
  entity.status = {};
}
