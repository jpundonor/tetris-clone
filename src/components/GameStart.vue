<template>
  <div v-if="!isStarted" class="game-start">
    <h1>TetrisClone</h1>
    <p class="start-button" @click="startGame">Start Game</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GameStart",
  computed: {
    ...mapState("game", ["isStarted"]),
  },
  methods: {
    ...mapActions("game", ["startGame"]),
  },
};
</script>

<style scoped>
h1 {
  @apply text-4xl font-bold mb-10 text-black;
}
.game-start{
  @apply text-center fixed top-0 left-0 w-full h-full bg-slate-600 flex flex-col justify-center items-center z-10;
}
.start-button {
  @apply text-white bg-gray-900 font-semibold px-4 py-2 rounded cursor-pointer transition-all duration-500;
  @apply hover:bg-gray-200 hover:text-gray-900;
}
</style>
