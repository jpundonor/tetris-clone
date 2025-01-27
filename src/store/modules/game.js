import { detectCollision, rotateMatrix } from "../../utils/gameLogic";
import { getRandomTetromino } from "../../utils/tetrominos";

const INITIAL_POSITION = { x: 4, y: 0 };

const state = {
  level: 1,
  lines: 0,
  score: 0,
  dropCounter: 0,
  lastTime: 0,
  grid: [],
  rows: 20,
  cols: 10,
  blockSize: 30,
  piece: { shape: [], color: null, position: { ...INITIAL_POSITION } },
  nextPiece: getRandomTetromino(),
  isPaused: false,
  isStarted: false,
  gameOver: false,
  isHardDropActive: false,
};

const mutations = {
  INITIALIZE_GRID(state) {
    state.grid = Array.from({ length: state.rows }, () =>
      Array(state.cols).fill(0)
    ); // 0 means empty cell
  },
  SPAWN_NEXT_PIECE(state) {
    state.piece = { ...state.nextPiece, position: { ...INITIAL_POSITION } };
    state.nextPiece = getRandomTetromino();
  },
  UPDATE_PIECE_POSITION(state, { x = 0, y = 0 }) {
    state.piece.position.x += x;
    state.piece.position.y += y;
  },
  SET_PIECE_SHAPE(state, shape) {
    state.piece.shape = shape;
  },
  SOLIDIFY_PIECE(state) {
    state.piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          state.grid[y + state.piece.position.y][x + state.piece.position.x] =
            state.piece.color;
        }
      });
    });
  },
  INCREMENT_LINES(state, lines) {
    state.lines += lines;
  },
  UPDATE_LEVEL(state) {
    state.level = Math.floor(state.lines / 10) + 1;
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
  TOGGLE_PAUSED(state) {
    state.isPaused = !state.isPaused;
  },
  SET_IS_STARTED(state) {
    state.isStarted = !state.isStarted;
  },
  SET_GAME_OVER(state) {
    state.gameOver = !state.gameOver;
  },
  SET_HARD_DROP_ACTIVE(state, isActive) {
    state.isHardDropActive = isActive;
  },
};

const actions = {
  initializeGame({ commit }) {
    commit("INITIALIZE_GRID");
    commit("SPAWN_NEXT_PIECE");
  },
  togglePause({ commit }) {
    commit("TOGGLE_PAUSED");
  },
  startGame({ commit }) {
    commit("SET_IS_STARTED");
  },
  async dropPiece({ dispatch }) {
    await dispatch("handleCollision", { axis: "y", move: 1, solidify: true });
  },
  async gameLoop({ state, dispatch }, time = 0) {
    if (state.isPaused || !state.isStarted || state.gameOver) {
      state.lastTime = null;
      requestAnimationFrame((newTime) => dispatch("gameLoop", newTime));
      return;
    }

    if (!state.lastTime) state.lastTime = time;
    const deltaTime = time - state.lastTime;
    state.lastTime = time;

    state.dropCounter += deltaTime;
    const dropInterval = 1000 / (state.level + 1);

    while (state.dropCounter > dropInterval) {
      await dispatch("dropPiece");
      state.dropCounter -= dropInterval;
    }
    if (!state.isPaused)
      await dispatch("canvas/drawGrid", null, { root: true });
    requestAnimationFrame((newTime) => dispatch("gameLoop", newTime));
  },
  handleKeydown({ state, dispatch }, event) {
    const movements = {
      ArrowLeft: async () =>
        await dispatch("handleCollision", { axis: "x", move: -1 }),
      ArrowRight: async () =>
        await dispatch("handleCollision", { axis: "x", move: 1 }),
      ArrowDown: async () =>
        await dispatch("handleCollision", {
          axis: "y",
          move: 1,
          solidify: true,
        }),
      " ": async () => {
        await dispatch("hardDrop");
      },
      ArrowUp: async () => await dispatch("rotatedPiece"),
    };
    if (!state.isStarted) return;
    if (state.isPaused) return;
    if (state.gameOver) return;

    movements[event.key]?.();
  },
  async handleCollision(
    { state, dispatch, commit },
    { axis, move, solidify = false }
  ) {
    commit("UPDATE_PIECE_POSITION", { [axis]: move });
    if (detectCollision(state.grid, state.piece, state.piece.position)) {
      commit("UPDATE_PIECE_POSITION", { [axis]: -move });
      if (solidify) {
        await dispatch("solidifyPiece");
        await dispatch("removeRows");
      }
    }
  },
  async hardDrop({ state, dispatch, commit }) {
    if (state.isHardDropActive) return;

    commit("SET_HARD_DROP_ACTIVE", true);
    let maxDrop = 0;

    while (
      !detectCollision(state.grid, state.piece, {
        ...state.piece.position,
        y: state.piece.position.y + maxDrop + 1,
      })
    ) {
      maxDrop++;
    }

    for (let step = 1; step <= maxDrop; step++) {
      dispatch("handleCollision", { axis: "y", move: 1, solidify: true });
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    commit("SET_HARD_DROP_ACTIVE", false);
  },
  rotatedPiece({ state, commit }) {
    const rotatedShape = rotateMatrix(state.piece.shape);
    const previousShape = state.piece.shape;
    commit("SET_PIECE_SHAPE", rotatedShape);
    if (detectCollision(state.grid, state.piece, state.piece.position)) {
      commit("SET_PIECE_SHAPE", previousShape);
    }
  },
  solidifyPiece({ commit, state }) {
    commit("SOLIDIFY_PIECE");
    commit("SPAWN_NEXT_PIECE");
    if (detectCollision(state.grid, state.piece, state.piece.position))
      commit("SET_GAME_OVER");
  },
  removeRows({ state, commit }) {
    const clearedRows = state.grid.filter((row) => !row.every((cell) => cell));
    const newRows = Array.from(
      { length: state.rows - clearedRows.length },
      () => Array(state.cols).fill(0)
    );
    const updatedGrid = [...newRows, ...clearedRows];
    commit("UPDATE_GRID", updatedGrid);
    commit("INCREMENT_SCORE", newRows.length * 100);
    commit("INCREMENT_LINES", newRows.length);
    commit("UPDATE_LEVEL");
  },
  toggleGameOver({ commit }) {
    commit("SET_GAME_OVER");
  },
  async resetBoard({ commit, dispatch, state }) {
    if (state.gameOver) commit("SET_GAME_OVER");
    if (state.isPaused) commit("TOGGLE_PAUSED");
    await dispatch("initializeGame");
    commit("RESET_SCORE");
    commit("SET_LEVEL", 1);
  },
};

const getters = {
  getScore: (state) => state.score,
  getNextPiece: (state) => state.nextPiece,
  getLevel: (state) => state.level,
  getGameOver: (state) => state.gameOver,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
