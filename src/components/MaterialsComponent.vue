<template>
  <div>
    <h3>Materials</h3>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BasicMaterials } from "@/babylon/BasicMaterials";

export default defineComponent({
  name: "MaterialsComponent",
  mounted() {
    const canvas = document.querySelector("canvas")!;
    new BasicMaterials(canvas);
  },
});
</script>

<style scoped>
canvas {
  width: 70%;
  height: 70%;
}
</style>
