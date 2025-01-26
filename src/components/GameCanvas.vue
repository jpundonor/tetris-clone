<template>
  <div
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <canvas ref="gameCanvas"></canvas>
  </div>
  <GameOver :isGameOver="getGameOver" @close="resetGame" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GameOver from "./GameOver.vue";

export default {
  name: "GameCanvas",
  components: {
    GameOver,
  },
  computed: {
    ...mapGetters("game", ["getGameOver"]),
  },
  methods: {
    ...mapActions("canvas", ["initializeCanvas"]),
    ...mapActions("game", [
      "initializeGame",
      "gameLoop",
      "handleKeydown",
      "resetBoard",
    ]),
    ...mapActions("inputs", ["handleTouchStart", "handleTouchEnd"]),
    resetGame() {
      this.resetBoard();
    },
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
