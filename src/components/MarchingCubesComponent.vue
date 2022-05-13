<template>
    <div>
        <h3>Marching Cubes</h3>
        <canvas></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MarchingCubes } from "@/babylon/MarchingCubes";

export default defineComponent({
    name: "MarchingCubesComponent",
    mounted() {
        const canvas = document.querySelector("canvas")!;
        new MarchingCubes(canvas);
    },
});
</script>

<style scoped>
canvas {
  width: 90%;
  height: 90%;
}
</style>