<template>
  <div v-if="isAxisX" class="flex flex-row mt-2 md:mt-5 justify-center md:hidden">
    <button @click="handleKeydown({ key: 'ArrowLeft' })">Left</button>
    <button @click="handleKeydown({ key: 'ArrowUp' })">Rotate</button>
    <button @click="handleKeydown({ key: 'ArrowRight' })">Right</button>
  </div>
  <div v-if="!isAxisX" class="flex flex-col mt-5 md:hidden">
    <button @click="drop">Drop</button>
    <button @click="hardDrop">Hard drop</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Controls",
  props: {
    isAxisX: Boolean,
  },
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
  @apply bg-gray-800 text-white p-2 m-2 rounded-md flex-1;
}
</style>
