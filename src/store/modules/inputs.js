const state = {
  touchStartX: 0,
  touchStartY: 0,
};

const mutations = {
  SET_TOUCH_START(state, { x, y }) {
    state.touchStartX = x;
    state.touchStartY = y;
  },
};

const actions = {
  handleTouchStart({ commit }, event) {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    commit("SET_TOUCH_START", { x, y });
  },
  handleTouchEnd({ state, dispatch }, event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - state.touchStartX;
    const deltaY = touch.clientY - state.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        dispatch("game/handleKeydown", { key: "ArrowRight" }, { root: true });
      } else {
        dispatch("game/handleKeydown", { key: "ArrowLeft" }, { root: true });
      }
    } else {
      if (deltaY > 0) {
        dispatch("game/handleKeydown", { key: "ArrowDown" }, { root: true });
      } else {
        dispatch("game/handleKeydown", { key: "ArrowUp" }, { root: true });
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
