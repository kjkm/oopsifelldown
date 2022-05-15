<template>
    <div>
        <h3>Marching Cubes</h3>
        <canvas></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MarchingCubesScene } from "@/babylon/MarchingCubesScene";
import * as BABYLON from "@babylonjs/core";

export default defineComponent({
    name: "Marching2",
    mounted() {
        const canvas = document.querySelector("canvas")!;
        new MarchingCubesScene(canvas);
    },
});
</script>

<style scoped>
canvas {
  width: 90%;
  height: 90%;
}
</style>