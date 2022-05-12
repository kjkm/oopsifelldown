<template>
  <div>
    <h3>Solar</h3>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SolarSystemScene } from "@/babylon/SolarSystemScene";

export default defineComponent({
  name: "SolarSystemComponent",
  mounted() {
    const canvas = document.querySelector("canvas")!;
    new BasicScene(canvas);
  },
});
</script>

<style scoped>
canvas {
  width: 90%;
  height: 90%;
}
</style>
