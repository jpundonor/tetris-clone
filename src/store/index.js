import { createStore } from "vuex";
import game from "./modules/game";
import canvas from "./modules/canvas";
import inputs from "./modules/inputs";

const store = createStore({
  modules: {
    game,
    inputs,
    canvas,
  },
});

export default store;
