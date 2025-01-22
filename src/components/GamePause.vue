<template>
  <button @click="togglePause">Pause</button>
  <div v-if="isPaused" class="pause">
    <p>Pause</p>
    <div class="flex gap-2">
      <button @click="togglePause">Resume</button>
      <!-- <button @click="reset">Restart</button> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GamePause",
  computed: {
    ...mapState("game", ["isPaused"]),
  },
  methods: {
    ...mapActions("game", ["togglePause","resetBoard"]),
    reset() {
      this.resetBoard();
      this.togglePause();
    },
  },
};
</script>

<style scoped>
.pause {
  @apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center;
}
button {
  @apply text-gray-900 bg-white font-semibold px-4 py-2 rounded transition-all duration-500;
  @apply hover:bg-gray-500 hover:text-slate-50;
}
p {
  @apply text-4xl font-semibold text-white pb-5;
}
</style>
