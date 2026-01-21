// js/ui/settingsMenu.js

import { ThemeManager } from "./themeManager.js";
import { setState, STATE } from "../core/state.js";
import { applyState } from "../core/stateRouter.js";

export function showSettings() {
  document.getElementById("settings-screen").classList.add("active");

  document.getElementById("theme-default").onclick = () => {
    ThemeManager.setTheme("default");
  };

  document.getElementById("theme-voidborn").onclick = () => {
    ThemeManager.setTheme("voidborn");
  };

  document.getElementById("settings-back").onclick = () => {
    setState(STATE.START);
    applyState();
  };
}
