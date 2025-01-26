<template>
  <form class="flex flex-col gap-2 bg-pink-950 py-6 px-10 rounded-lg mt-4" @submit.prevent="submitScore">
    <label class="text-sm">Name:</label>
    <input type="text" v-model="name" class="text-black p-1" required />
    <button class="border rounded p-1" type="submit">Submit</button>
  </form>
</template>

<script>
import { addHighscore } from '../api/highscoresService';

export default {
  name: "ScoreForm",
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    async submitScore() {
      await addHighscore(this.name, this.score);
      this.$emit("close");
    },
  },
};
</script>
