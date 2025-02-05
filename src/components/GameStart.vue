<template>
  <div v-if="!isStarted" class="game-start">
    <h1>TetrisClone</h1>
    <div class="buttons-container">
      <button class="start-button" @click="startGame">Start Game</button>
      <button class="control-button" @click="showModalControls">Controls</button>
    </div>
    <div v-show="showControls">
      <UiControls />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UiControls from "./UiControls.vue";

export default {
  name: "GameStart",
  components: {
    UiControls,
  },
  data() {
    return {
      showControls: false,
    };
  },
  computed: {
    ...mapState("game", ["isStarted"]),
  },
  methods: {
    ...mapActions("game", ["startGame"]),
    showModalControls() {
      this.showControls = !this.showControls;
    },
  },
};
</script>

<style scoped>
h1 {
  @apply text-4xl font-bold mb-5 text-black;
}
button{
  @apply font-semibold px-4 py-2 rounded transition-all duration-500;
}
.game-start {
  @apply text-center fixed top-0 left-0 w-full h-full bg-slate-600 flex flex-col justify-center items-center z-10;
}
.buttons-container {
  @apply flex flex-col gap-5;
}
.start-button {
  @apply text-white bg-gray-900;
  @apply hover:bg-gray-200 hover:text-gray-900;
}
.control-button {
  @apply text-gray-900 bg-transparent border;
  @apply hover:bg-gray-700 hover:text-white;
}
</style>
