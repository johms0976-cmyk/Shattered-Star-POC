// js/ui/settingsMenu.js

import { setState, STATE } from "../core/state.js";
import { fadeOutUI } from "../core/transitions.js";
import { assetPath } from "../core/path.js";

export function showSettingsMenu() {
  const screen = document.getElementById("settings-screen");

  // Theme buttons
  const themeDefault = document.getElementById("theme-default");
  const themeVoidborn = document.getElementById("theme-voidborn");
  const backBtn = document.getElementById("settings-back");

  themeDefault.onclick = () => {
    document.body.dataset.theme = "default";
  };

  themeVoidborn.onclick = () => {
    document.body.dataset.theme = "voidborn";
  };

  backBtn.onclick = async () => {
    await fadeOutUI(600);
    setState(STATE.START);
  };
}
