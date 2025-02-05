<template>
  <div class="flex flex-col items-center gap-2 mt-5 text-center bg-gray-500 py-3 p-5 mx-5 rounded">
    <h3 class="text-2xl font-semibold text-black">Controls</h3>
    <div class="flex flex-wrap justify-center gap-2">
      <div
        v-for="control in controls"
        :key="control.action"
        class="controls"
      >
        <strong>{{ control.action }}</strong>
        <span class="hidden md:block material-icons-outlined">{{ control.icon }}</span>
        <span class="block md:hidden material-icons-outlined">{{ control.mobile }}</span>
        <p class="hidden md:block">{{ control.control }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiControls",
  data() {
    return {
      controls: [
        { action: "Rotate", control: "Arrow up", icon: "arrow_upward", mobile: "touch_app"},
        { action: "Drop", control: "Arrow down", icon: "arrow_downward", mobile: "keyboard_arrow_down" },
        { action: "Move Left", control: "Space bar", icon: "arrow_back", mobile: "keyboard_arrow_left" },
        { action: "Move Right", control: "Space bar", icon: "arrow_forward", mobile: "keyboard_arrow_right" },
        { action: "Hard Drop", control: "Space bar", icon: "space_bar", mobile: "swipe_down" },
        { action: "Hold Piece", control: "Enter", icon: "bookmark", mobile: "bookmark"},
        { action: "Pause", control: "Esc / p", icon: "pause", mobile: "pause"},
      ],
    };
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra los elementos */
  gap: 0.5rem; /* Espacio entre elementos */
}

.controls {
    @apply flex gap-2 flex-col bg-gray-600 py-2 border-2 border-black rounded-lg;
    @apply w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.5rem)] lg:w-[calc(25%-0.5rem)];
}
</style>