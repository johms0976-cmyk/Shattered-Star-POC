// js/ui/themeManager.js

export const ThemeManager = {
  current: "default",

  setTheme(name) {
    document.body.dataset.theme = name;
    this.current = name;
  },

  toggle() {
    this.setTheme(this.current === "default" ? "voidborn" : "default");
  }
};
