const state = {
  canvas: null,
  context: null,
};

const mutations = {
  SET_CANVAS(state, canvas) {
    state.canvas = canvas;
  },
  SET_CONTEXT(state, context) {
    state.context = context;
  },
  SET_CANVAS_DIMENSIONS(state, { width, height }) {
    state.canvas.width = width;
    state.canvas.height = height;
  },
};

const actions = {
  initializeCanvas({ state, commit, rootState }, ref) {
    commit("SET_CANVAS", ref);
    commit("SET_CONTEXT", ref.getContext("2d"));
    commit("SET_CANVAS_DIMENSIONS", {
      width: rootState.game.cols * rootState.game.blockSize,
      height: rootState.game.rows * rootState.game.blockSize,
    });
    state.context.scale(rootState.game.blockSize, rootState.game.blockSize);
  },
  clearCanvas() {
    state.context.fillStyle = "#000";
    state.context.fillRect(0, 0, state.canvas.width, state.canvas.height);
  },
  drawCells({ state }, { cells, color, position = { x: 0, y: 0 } }) {
    if (!Array.isArray(cells)) {
      console.log("Cells is not an array:", cells);
      return;
    }
    state.context.fillStyle = color;
    state.context.strokeStyle = "#000";
    state.context.lineWidth = 0.05;
    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          state.context.fillStyle = cell;
          state.context.fillRect(x + position.x, y + position.y, 1, 1);
          state.context.strokeRect(x + position.x, y + position.y, 1, 1);
        }
      });
    });
  },
  drawGrid({ rootState, dispatch }) {
    dispatch("clearCanvas");
    dispatch("drawCells", { cells: rootState.game.grid, color: "#000" });
    dispatch("drawCells", {
      cells: rootState.game.piece.shape,
      color: rootState.game.piece.color,
      position: rootState.game.piece.position,
    });
  },
};

const getters = {
  canvas: (state) => state.canvas,
  context: (state) => state.context,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
