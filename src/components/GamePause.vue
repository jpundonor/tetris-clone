<template>
  <ScoresModal :isOpen="isModalOpen" @close="toggleModal" />
  <button @click="togglePause">
    <span class="material-icons-outlined"> pause </span>
  </button>
  <div v-if="isPaused" class="pause">
    <p>Pause</p>
    <div class="flex gap-2">
      <button @click="reset">Restart</button>
      <button @click="toggleModal">Scores</button>
      <button @click="togglePause">Resume</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ScoresModal from "./ScoresModal.vue";

export default {
  name: "GamePause",
  components: {
    ScoresModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapState("game", ["isPaused"]),
  },
  methods: {
    ...mapActions("game", ["togglePause", "resetBoard", "gameLoop"]),
    reset() {
      this.resetBoard();
      this.togglePause();
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    reset() {
      this.resetBoard();
    },
  },
};
</script>

<style scoped>
.pause {
  @apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center;
}
button {
  @apply text-gray-900 bg-white font-semibold px-4 py-2 rounded transition-all duration-500 flex items-center justify-center;
  @apply hover:bg-gray-500 hover:text-slate-50;
}
p {
  @apply text-4xl font-semibold text-white pb-5;
}
</style>
