<template>
  <GameStart />
  <div
    class="grid grid-cols-4 md:grid-cols-8 gap-4 justify-center m-auto md:w-auto"
  >
    <div class="game-container">
      <h2 class="text-center text-2xl font-semibold">TetrisClone</h2>

      <GameCanvas />
    </div>
    <div class="info-container">
      <GamePause />
      <NextPiece />
      <ScoreBoard />
    </div>
  </div>
</template>

<script setup>
import GameCanvas from "./components/GameCanvas.vue";
import GamePause from "./components/GamePause.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
import NextPiece from "./components/NextPiece.vue";
import GameStart from "./components/GameStart.vue";
</script>

<style scoped>
.game-container {
  @apply col-span-3 md:col-span-3 md:col-start-3;
}
.info-container {
  @apply col-span-1 md:col-start-6 flex flex-col;
}
</style>
