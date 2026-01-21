// main.js

// CORE
import { setState, STATE } from "./js/core/state.js";
import { applyState } from "./js/core/stateRouter.js";
import { preloadAssets } from "./js/core/loader.js";
import { updateLoadingProgress } from "./js/ui/loadingScreen.js";

// UI (side-effect imports to register listeners / logic)
import "./js/ui/titleScreen.js";
import "./js/ui/mainMenu.js";
import "./js/ui/newGame.js";
import "./js/ui/loadingScreen.js";
import "./js/ui/settingsMenu.js";
import "./js/ui/actIntro.js";

// SYSTEMS
import "./js/systems/map/mapUI.js";
import "./js/systems/map/mapCanvasScene.js";
import "./js/systems/map/mapGenerator.js";

import "./js/systems/combat/combatUI.js";
import "./js/systems/combat/engine.js";
import "./js/systems/combat/actions.js";
import "./js/systems/combat/statusEffects.js";
import "./js/systems/combat/enemyAI.js";

// ------------------------------------------------------------
// BOOT FLOW
// ------------------------------------------------------------

// 1. Show loading screen
setState(STATE.LOADING);
applyState();

// 2. Preload assets
preloadAssets(progress => {
  updateLoadingProgress(progress);
}).then(() => {
  // 3. When done, go to title
  setState(STATE.TITLE);
  applyState();
});
