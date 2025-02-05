import { createStore } from "vuex";
import game from "./modules/game";
import canvas from "./modules/canvas";
import inputs from "./modules/inputs";
import holdPieceCanvas from "./modules/holdPieceCanvas";

const store = createStore({
  modules: {
    game,
    inputs,
    canvas,
    holdPieceCanvas,
  },
});

export default store;
