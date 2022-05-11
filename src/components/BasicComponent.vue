<template>
  <div>
    <h3>Basic</h3>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BasicScene } from "@/babylon/BasicScene";

export default defineComponent({
  name: "BasicComponent",
  mounted() {
    const canvas = document.querySelector("canvas")!;
    new BasicScene(canvas);
  },
});
</script>

<style scoped>
canvas {
  width: 70%;
  height: 70%;
}
</style>
