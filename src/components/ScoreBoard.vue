<template>
  <div class="text-xl">
    <h2>Score</h2>
    <p>{{ getScore }}</p>
    <h2>Level</h2>
    <p>{{ getLevel }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ScoreBoard",
  computed: {
    ...mapGetters("game", ["getScore", "getLevel"]),
  },
};
</script>
