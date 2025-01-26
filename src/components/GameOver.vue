<template>
  <div
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90"
    v-if="isGameOver"
  >
    <button
      @click="closeModal"
      class="absolute top-0 right-0 m-4 text-2xl text-white"
    >
      <span class="material-icons-outlined">close</span>
    </button>
    <h2 class="text-2xl font-semibold mb-4">Game Over</h2>
    <p class="text-lg">Your score: {{ getScore }}</p>
    <ScoreForm :score="getScore" @close="closeModal" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ScoreForm from "./ScoreForm.vue";

export default {
  name: "GameOver",
  components: {
    ScoreForm,
  },
  props: {
    isGameOver: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters("game", ["getScore"]),
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
