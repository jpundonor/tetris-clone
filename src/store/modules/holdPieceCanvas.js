const state = {
  holdCanvas: null,
  holdContext: null,
};

const mutations = {
  SET_HOLD_CANVAS(state, canvas) {
    state.holdCanvas = canvas;
  },
  SET_HOLD_CONTEXT(state, context) {
    state.holdContext = context;
  },
  SET_HOLD_CANVAS_DIMENSIONS(state, { width, height }) {
    state.holdCanvas.width = width;
    state.holdCanvas.height = height;
  },
};

const actions = {
  initializeHoldCanvas({ state, commit, rootState }, ref) {
    commit("SET_HOLD_CANVAS", ref);
    commit("SET_HOLD_CONTEXT", ref.getContext("2d"));
    commit("SET_HOLD_CANVAS_DIMENSIONS", {
      width: 50,
      height: 60,
    });
    state.holdContext.scale(10, 10);
  },
  drawHoldPiece({ state, rootState }) {
    state.holdContext.clearRect(
      0,
      0,
      state.holdCanvas.width,
      state.holdCanvas.height
    );
    const piece = rootState.game.holdPiece.shape;
    state.holdContext.lineWidth = 0.05;
    state.holdContext.strokeStyle = "#000";
    piece.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          state.holdContext.fillStyle = rootState.game.holdPiece.color;
          state.holdContext.fillRect(x + 1, y + 1, 1, 1);
          state.holdContext.strokeRect(x + 1, y + 1, 1, 1);
        }
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
