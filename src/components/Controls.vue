<template>
  <div
    v-if="isAxisX"
    class="flex flex-row mt-2 md:mt-5 justify-center md:hidden"
  >
    <button @click="handleKeydown({ key: 'ArrowLeft' })">
      <span class="material-icons-outlined"> keyboard_arrow_left </span>
    </button>
    <button @click="handleKeydown({ key: 'ArrowUp' })">
      <span class="material-icons-outlined"> autorenew </span>
    </button>
    <button @click="handleKeydown({ key: 'ArrowRight' })">
      <span class="material-icons-outlined"> keyboard_arrow_right </span>
    </button>
  </div>
  <div v-if="!isAxisX" class="flex flex-col mt-5 md:hidden">
    <button @click="drop">
      <span class="material-icons-outlined"> keyboard_arrow_down </span>
    </button>
    <button @click="hardDrop">
      <span class="material-icons-outlined"> keyboard_double_arrow_down </span>
    </button>
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
    ...mapActions("game", ["hardDrop", "handleKeydown"]),
    drop() {
      this.handleKeydown({ key: "ArrowDown" });
    },
  },
};
</script>

<style scoped>
button {
  @apply bg-gray-800 text-white p-2 m-2 rounded-md flex-1 flex items-center justify-center;
}
</style>
