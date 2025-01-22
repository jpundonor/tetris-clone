<template>
  <div class="text-xl">
    <h2>Score</h2>
    <p>{{ getScore }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ScoreBoard",
  computed: {
    ...mapGetters("game", ["getScore"]),
  },
};
</script>
