export function transition(callback) {
  const screen = document.getElementById("screen");
  screen.classList.add("glitch");
  setTimeout(() => {
    screen.classList.remove("glitch");
    callback();
  }, 300);
}
