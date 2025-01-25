<template>
  <div class="flex flex-col mt-5">
    <button @click="drop">Drop</button>
    <button @click="hardDrop">Hard drop</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Controls",
  methods: {
    ...mapActions("game",["hardDrop", "handleKeydown"]),
    drop() {
      this.handleKeydown({ key: "ArrowDown" });
    },
    
  },
};
</script>

<style scoped>
button {
  @apply bg-gray-800 text-white p-2 m-2 rounded-md;
}
</style>
