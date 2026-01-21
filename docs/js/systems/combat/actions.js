// js/systems/combat/actions.js

export function performAction(action, attacker, defender, log) {
  switch (action.type) {
    case "attack":
      const dmg = Math.max(1, attacker.atk - defender.def);
      defender.hp -= dmg;
      log.push(`${attacker.name} hits ${defender.name} for ${dmg} damage.`);
      break;

    case "skill":
      // Placeholder for skill logic
      log.push(`${attacker.name} uses ${action.name}.`);
      break;
  }
}
