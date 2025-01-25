<template>
  <div class="text-xl flex flex-col gap-2">
    <div>
      <h2>Score</h2>
      <p>{{ getScore }}</p>
    </div>
    <div>
      <h2>Level</h2>
      <p>{{ getLevel }}</p>
    </div>
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
