<template>
  <div class="text-lg py-10">
    <h2 class="text-center">Next Piece</h2>
    <div class="bg-gray-900 border border-x-gray-200 flex justify-center items-center">
      <canvas class="mx-6 my-4 m-auto" ref="nextPieceCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NextPiece",
  data() {
    return {
      canvas: null,
      context: null,
    };
  },
  computed: {
    ...mapGetters("game", ["getNextPiece"]),
  },
  mounted() {
    this.initializeCanvas();
    this.drawNextPiece();
  },
  methods: {
    initializeCanvas() {
      this.canvas = this.$refs.nextPieceCanvas;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = 60;
      this.canvas.height = 80;
      this.context.scale(20, 20);
    },
    drawNextPiece() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const piece = this.getNextPiece;
      this.context.lineWidth = 0.05;
      this.context.strokeStyle = "#000";
      piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.context.fillStyle = piece.color;
            this.context.fillRect(x, y, 1, 1);
            this.context.strokeRect(x, y, 1, 1);
          }
        });
      });
    },
  },
  watch: {
    getNextPiece() {
      this.drawNextPiece();
    },
  },
};
</script>
