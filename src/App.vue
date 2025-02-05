<template>
  <GameStart />
  <div
    class="grid grid-cols-4 md:grid-cols-8 md:gap-4 gap-1 justify-center m-auto md:w-auto md:p-0 p-2"
  >
    <div class="game-container">
      <h2 class="text-center text-2xl font-semibold">TetrisClone</h2>

      <GameCanvas />
      <Controls :isAxisX="true" />
    </div>
    <div class="info-container">
      <GamePause />
      <NextPiece />
      <HoldPiece />
      <ScoreBoard />
      <Controls :isAxisX="false" />
    </div>
  </div>
</template>

<script setup>
import GameCanvas from "./components/GameCanvas.vue";
import GamePause from "./components/GamePause.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
import NextPiece from "./components/NextPiece.vue";
import GameStart from "./components/GameStart.vue";
import Controls from "./components/Controls.vue";
import HoldPiece from "./components/HoldPiece.vue";
</script>

<style scoped>
.game-container {
  @apply col-span-3 md:col-span-3 md:col-start-3;
}
.info-container {
  @apply col-span-1 md:col-start-6 flex flex-col;
}
</style>
