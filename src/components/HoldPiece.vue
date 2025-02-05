<template>
  <div class="flex flex-col items-center">
    <button @click="holdPiece">Hold Piece</button>
    <div class="bg-gray-900 border border-x-gray-200">
      <canvas class="m-auto" ref="pieceHeldCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "HoldPiece",
  data() {
    return {
      canvas: null,
      context: null,
    };
  },
  computed: {
    ...mapState("game", ["isPaused", "isGameOver", "isStarted"]),
    ...mapGetters("game", ["getHoldPiece"]),
  },
  mounted() {
    this.initializeCanvas();
    this.drawNextPiece();
    document.addEventListener("keydown", this.handleKeydown);
  },
  methods: {
    ...mapActions("game", ["holdCurrentPiece"]),
    initializeCanvas() {
      this.canvas = this.$refs.pieceHeldCanvas;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = 50;
      this.canvas.height = 60;
      this.context.scale(10, 10);
    },
    drawNextPiece() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const piece = this.getHoldPiece;
      this.context.lineWidth = 0.05;
      this.context.strokeStyle = "#000";
      piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.context.fillStyle = piece.color;
            this.context.fillRect(x + 1, y + 1, 1, 1);
            this.context.strokeRect(x + 1, y + 1, 1, 1);
          }
        });
      });
    },
    holdPiece() {
      this.holdCurrentPiece();
      this.drawNextPiece();
      document.activeElement.blur();
    },
    handleKeydown(event) {
      if (
        event.key === "Enter" &&
        !this.isPaused &&
        !this.isGameOver &&
        this.isStarted
      ) {
        this.holdPiece();
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style scoped>
button {
  @apply bg-gray-800 text-sm text-white p-1 m-1 rounded-md flex-1 flex items-center justify-center;
  @apply md:text-base md:p-2 md:m-2;
}
</style>
