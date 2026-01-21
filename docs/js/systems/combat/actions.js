// js/systems/combat/actions.js

export function executeAction(action, Combat, target) {
  switch (action.type) {
    case "attack":
      dealDamage(target, action.damage);
      break;

    case "skill":
      if (action.block) {
        Combat.player.block += action.block;
      }
      if (action.effect === "draw1") {
        drawOne(Combat);
      }
      break;

    case "enemyAttack":
      dealDamage(target, action.damage);
      break;

    default:
      console.warn("Unknown action:", action);
  }
}

function dealDamage(target, amount) {
  const blocked = Math.min(target.block, amount);
  target.block -= blocked;

  const hpLoss = amount - blocked;
  target.hp -= hpLoss;
}

function drawOne(Combat) {
  if (Combat.drawPile.length === 0) {
    Combat.drawPile = [...Combat.discard];
    Combat.discard = [];
  }
  Combat.hand.push(Combat.drawPile.pop());
}

