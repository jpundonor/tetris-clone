<template>
  <div class="flex flex-col items-center py-2">
    <p>Piece Held</p>
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
    this.initializeHoldCanvas(this.$refs.pieceHeldCanvas);
  },
  methods: {
    ...mapActions("game", ["holdCurrentPiece", "handleKeydown"]),
    ...mapActions("holdPieceCanvas", ["initializeHoldCanvas"]),
  },
};
</script>

<style scoped>
button {
  @apply bg-gray-800 text-sm text-white p-1 m-1 rounded-md flex-1 flex items-center justify-center;
  @apply md:text-base md:p-2 md:m-2;
}
</style>
