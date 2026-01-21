// main.js

// ------------------------------------------------------------
// CORE ENGINE IMPORTS
// ------------------------------------------------------------
import "./js/core/state.js";
import "./js/core/stateRouter.js";
import "./js/core/renderer.js";
import "./js/core/transitions.js";
import "./js/core/crt.js";

// ------------------------------------------------------------
// UI SCREENS
// ------------------------------------------------------------
import "./js/ui/titleScreen.js";
import "./js/ui/mainMenu.js";
import "./js/ui/newGame.js";
import "./js/ui/loadingScreen.js";

// ------------------------------------------------------------
// GAME SYSTEMS
// ------------------------------------------------------------

// MAP
import "./js/systems/map/mapUI.js";
import "./js/systems/map/mapCanvasScene.js";
import "./js/systems/map/mapGenerator.js";

// COMBAT
import "./js/systems/combat/combatUI.js";
import "./js/systems/combat/engine.js";
import "./js/systems/combat/actions.js";
import "./js/systems/combat/statusEffects.js";
import "./js/systems/combat/enemyAI.js";

// ------------------------------------------------------------
// ASSET PRELOADER
// ------------------------------------------------------------
import { preloadAssets } from "./js/core/loader.js";
import { updateLoadingProgress } from "./js/ui/loadingScreen.js";

// ------------------------------------------------------------
// STATE MACHINE
// ------------------------------------------------------------
import { setState, STATE } from "./js/core/state.js";
import { applyState } from "./js/core/stateRouter.js";

// ------------------------------------------------------------
// GAME BOOTSTRAP
// ------------------------------------------------------------

// Step 1: Show loading screen immediately
setState(STATE.LOADING);
applyState();

// Step 2: Begin preloading assets
preloadAssets(progress => {
  updateLoadingProgress(progress);
}).then(() => {
  // Step 3: When done, go to title screen
  setState(STATE.TITLE);
  applyState();
});
