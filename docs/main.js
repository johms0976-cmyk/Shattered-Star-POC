// main.js

import { setState, STATE, GameState } from "./js/core/state.js";
import { applyState } from "./js/core/stateRouter.js";
import { preloadAllAssets } from "./js/core/loader.js";

import {
  showLoading,
  setLoadingStage,
  updateLoadingProgressSmooth
} from "./js/ui/loadingScreen.js";

// UI Screens (side-effect imports)
import "./js/ui/titleScreen.js";
import "./js/ui/mainMenu.js";
import "./js/ui/newGame.js";
import "./js/ui/loadingScreen.js";
import "./js/ui/settingsMenu.js";
import "./js/ui/actIntro.js";

// Map System
import "./js/systems/map/mapUI.js";
import "./js/systems/map/mapCanvasScene.js";
import "./js/systems/map/mapGenerator.js";

// Combat System
import "./js/systems/combat/combatUI.js";
import "./js/systems/combat/engine.js";
import "./js/systems/combat/actions.js";
import "./js/systems/combat/statusEffects.js";
import "./js/systems/combat/enemyAI.js";

async function boot() {
  // Step 1: Enter loading state
  setState(STATE.LOADING);
  applyState();
  showLoading();

  // Step 2: Determine which Act to load assets for
  const act = GameState.run.act || 1;

  // Step 3: Preload assets using the manifest
  await preloadAllAssets(
    stageText => setLoadingStage(stageText),
    progress => updateLoadingProgressSmooth(progress),
    act
  );

  // Step 4: When done, go to title screen
  setState(STATE.TITLE);
  applyState();
}

boot();
