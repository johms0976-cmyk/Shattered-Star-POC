// main.js

// CORE ENGINE
import "./js/core/state.js";
import "./js/core/stateRouter.js";
import "./js/core/renderer.js";
import "./js/core/transitions.js";
import "./js/core/crt.js";

// UI SCREENS
import "./js/ui/titleScreen.js";
import "./js/ui/mainMenu.js";
import "./js/ui/newGame.js";
import "./js/ui/loadingScreen.js";

// MAP SYSTEM
import "./js/systems/map/mapUI.js";
import "./js/systems/map/mapCanvasScene.js";
import "./js/systems/map/mapGenerator.js";

// COMBAT SYSTEM
import "./js/systems/combat/combatUI.js";
import "./js/systems/combat/engine.js";
import "./js/systems/combat/actions.js";
import "./js/systems/combat/statusEffects.js";
import "./js/systems/combat/enemyAI.js";

// START GAME
import { setState, STATE } from "./js/core/state.js";
import { applyState } from "./js/core/stateRouter.js";

setState(STATE.TITLE);
applyState();
