import { showTitle } from "./title.js";
import { showStart } from "./start.js";
import { showMap } from "./systems/map/mapRenderer.js";

export const STATE = {
  TITLE: "title",
  START: "start",
  MAP: "map"
};

export let currentState = STATE.TITLE;

export function setState(state) {
  currentState = state;
  if (state === STATE.TITLE) showTitle();
  if (state === STATE.START) showStart();
  if (state === STATE.MAP) showMap();
}

setState(STATE.TITLE);
