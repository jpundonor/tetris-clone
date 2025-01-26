<template>
  <div
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90"
    v-if="isOpen"
  >
    <button
      @click="closeModal"
      class="absolute top-0 right-0 m-4 text-2xl text-white"
    >
      <span class="material-icons-outlined">close</span>
    </button>
    <h2 class="text-2xl font-semibold mb-4">Scores</h2>
    <ul v-if="scores.length">
      <li v-for="(score, index) in scores" :key="index" class="flex gap-4 bg-teal-700 p-2 rounded-lg mb-2">
        <span class="font-bold">{{ index + 1 }}.</span>
        <span class="flex-1">{{ score.name.toLocaleUpperCase() }}</span>
        <span>{{ score.score }}</span>
      </li>
    </ul>
    <div v-if="!scores.length">
      <p>No scores yet</p>
    </div>
  </div>
</template>

<script>
import { getHighscores } from "../api/highscoresService";
export default {
  name: "ScoresModal",
  data() {
    return {
      scores: [],
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  async mounted() {
    this.scores = await getHighscores();
  },
  watch: {
    async isOpen() {
      if (this.isOpen) {
        this.scores = await getHighscores();
      }
    },
  },
};
</script>
