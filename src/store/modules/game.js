import { getRandomTetromino } from "../../utils/tetrominos";

const state = {
  level: 1,
  score: 0,
  dropCounter: 0,
  lastTime: 0,
  grid: [],
  rows: 20,
  cols: 10,
  blockSize: 30,
  piece: {},
  nextPiece: {},
  isPaused: false,
  isStarted: false,
};

const mutations = {
  INITIALIZE_GRID(state) {
    state.grid = Array(state.rows)
      .fill()
      .map(() => Array(state.cols).fill(0)); // 0 means empty cell
  },
  SPAWN_PIECE(state) {
    state.piece = { ...getRandomTetromino(), position: { x: 4, y: 0 } };
  },
  SPAWN_NEXT_PIECE(state) {
    state.piece = { ...state.nextPiece, position: { x: 4, y: 0 } };
    state.nextPiece = getRandomTetromino();
  },
  UPDATE_PIECE_POSITION(state, { x, y }) {
    if (x !== undefined) state.piece.position.x = x;
    if (y !== undefined) state.piece.position.y = y;
  },
  SET_LEVEL(state, level) {
    state.level = level;
  },
  INCREMENT_SCORE(state, points) {
    state.score += points;
  },
  RESET_SCORE(state) {
    state.score = 0;
  },
  UPDATE_GRID(state, grid) {
    state.grid = grid;
  },
  SET_NEXT_PIECE(state, piece) {
    state.nextPiece = piece;
  },
  SET_IS_PAUSED(state) {
    state.isPaused = !state.isPaused;
  },
  SET_IS_STARTED(state) {
    state.isStarted = !state.isStarted;
  },
};

const actions = {
  initializeGame({ commit }) {
    commit("INITIALIZE_GRID");
    commit("SPAWN_PIECE");
    commit("SET_NEXT_PIECE", getRandomTetromino());
  },
  togglePause({ commit }) {
    commit("SET_IS_PAUSED");
  },
  startGame({ commit }) {
    commit("SET_IS_STARTED");
  },
  async dropPiece({ state, dispatch }) {
    state.piece.position.y++;
    if (await dispatch("checkCollision")) {
      state.piece.position.y--;
      dispatch("solidifyPiece");
      dispatch("removeRows");
    }
    state.dropCounter = 0;
  },
  gameLoop({ state, dispatch }, time = 0) {
    if (state.isPaused || !state.isStarted) {
      requestAnimationFrame((newTime) => dispatch("gameLoop", newTime));
      return;
    }

    const deltaTime = time - state.lastTime;
    state.lastTime = time;
    state.dropCounter += deltaTime;
    if (state.dropCounter > (1000 / state.level)) dispatch("dropPiece");
    dispatch("canvas/drawGrid", null, { root: true });
    requestAnimationFrame((newTime) => dispatch("gameLoop", newTime));
  },
  handleKeydown({ state, dispatch, commit }, event) {
    const { x, y } = state.piece.position;
    const movements = {
      ArrowLeft: () => (
        commit("UPDATE_PIECE_POSITION", { x: x - 1 }),
        dispatch("handleCollision", { axis: "x", revert: 1 })
      ),
      ArrowRight: () => (
        commit("UPDATE_PIECE_POSITION", { x: x + 1 }),
        dispatch("handleCollision", { axis: "x", revert: -1 })
      ),
      ArrowDown: () => (
        commit("UPDATE_PIECE_POSITION", { y: y + 1 }),
        dispatch("handleCollision", { axis: "y", revert: -1, solidify: true })
      ),
      " ": async () => {
        await dispatch("hardDrop");
      },
      ArrowUp: () => dispatch("rotatedPiece"),
    };
    if (!state.isStarted) return;
    if (state.isPaused) return;

    movements[event.key]?.();
  },
  async handleCollision(
    { state, dispatch },
    { axis, revert, solidify = false }
  ) {
    if (await dispatch("checkCollision")) {
      state.piece.position[axis] += revert;
      if (solidify) {
        dispatch("solidifyPiece");
        dispatch("removeRows");
      }
    }
  },
  async hardDrop({ state, dispatch }) {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 25));
      state.piece.position.y++;
      if (await dispatch("checkCollision")) {
        state.piece.position.y--;
        dispatch("solidifyPiece");
        dispatch("removeRows");
        break;
      }
    }
  },
  async rotatedPiece({ state, dispatch }) {
    const shape = state.piece.shape;
    const rotatedShape = shape[0].map((_, i) =>
      shape.map((row) => row[i]).reverse()
    );
    const previousShape = state.piece.shape;
    state.piece.shape = rotatedShape;
    if (await dispatch("checkCollision")) state.piece.shape = previousShape;
  },
  checkCollision({ state }) {
    const collision = state.piece.shape.some((row, y) =>
      row.some(
        (cell, x) =>
          cell &&
          (state.grid[y + state.piece.position.y]?.[
            x + state.piece.position.x
          ] ??
            1)
      )
    );
    return collision;
  },
  async solidifyPiece({ state, commit, dispatch }) {
    state.piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          state.grid[y + state.piece.position.y][x + state.piece.position.x] =
            state.piece.color;
        }
      });
    });
    commit("SPAWN_NEXT_PIECE");

    if (await dispatch("checkCollision")) {
      alert("Game Over");
      dispatch("resetBoard");
    }
  },
  removeRows({ state, commit }) {
    const newGrid = state.grid.filter((row) => !row.every((cell) => cell));
    while (newGrid.length < state.rows) {
      newGrid.unshift(Array(state.cols).fill(0));
      commit("INCREMENT_SCORE", 100);
      const levelUp = Math.floor(state.score / 1000) + 1;
      if (levelUp > state.level) {
        commit("SET_LEVEL", levelUp);
      }
    }
    commit("UPDATE_GRID", newGrid);
  },
  resetBoard({ commit }) {
    state.grid.forEach((row) => row.fill(0));
    commit("RESET_SCORE");
    commit("SET_LEVEL", 1);
  },
};

const getters = {
  getGrid: (state) => state.grid,
  getBlockSize: (state) => state.blockSize,
  getPiece: (state) => state.piece,
  getScore: (state) => state.score,
  getNextPiece: (state) => state.nextPiece,
  getLevel: (state) => state.level,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
