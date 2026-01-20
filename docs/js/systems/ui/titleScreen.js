// js/systems/ui/titleScreen.js

import { registerScene } from '../../core/renderer.js';
import { glitchFlash, fadeIn } from '../../core/transitions.js';

let titleImage = null;
let ready = false;

export function showTitleScreen(state, renderer) {
  state.scene = 'title';

  // Register the scene renderer
  registerScene(renderer, 'title', drawTitle);

  // Load title image once
  if (!titleImage) {
    titleImage = new Image();
    titleImage.src = './assets/screens/title/title1.png';
    titleImage.onload = () => {
      ready = true;
    };
  }

  // Fade in when entering title
  fadeIn(600);

  // Input handler: any key or tap → main menu
  window.onkeydown = () => goToMainMenu(state);
  window.onmousedown = () => goToMainMenu(state);
  window.ontouchstart = () => goToMainMenu(state);
}

function goToMainMenu(state) {
  // Prevent multiple triggers
  if (state.scene !== 'title') return;

  glitchFlash(150, () => {
    state.scene = 'main-menu';
  });
}

function drawTitle(ctx, state) {
  const { width, height } = ctx.canvas;

  // Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  // Title image
  if (ready) {
    const scale = Math.min(width / titleImage.width, height / titleImage.height);
    const imgW = titleImage.width * scale;
    const imgH = titleImage.height * scale;
    const x = (width - imgW) / 2;
    const y = (height - imgH) / 2 - 40;

    ctx.drawImage(titleImage, x, y, imgW, imgH);
  }

  // "Press any key" prompt
  ctx.fillStyle = '#7fffd4';
  ctx.font = '24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PRESS ANY KEY', width / 2, height - 80);
}

