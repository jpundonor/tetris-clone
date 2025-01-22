<template>
  <div @touchstart.passive="handleTouchStart" @touchend.passive="handleTouchEnd">
    <canvas ref="gameCanvas"></canvas>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GameCanvas",
  methods: {
    ...mapActions("canvas", ["initializeCanvas"]),
    ...mapActions("game", [
      "initializeGame",
      "gameLoop",
      "handleKeydown",
      "togglePause",
    ]),
    ...mapActions("inputs", ["handleTouchStart", "handleTouchEnd"]),
  },
  mounted() {
    this.initializeGame();
    this.initializeCanvas(this.$refs.gameCanvas);
    this.gameLoop();
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style scoped>
canvas {
  @apply border-2 border-black md:m-5 touch-manipulation w-full md:w-auto;
}
</style>