<template>
    <div>
        <h3>Marching Cubes</h3>
        <canvas></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MarchingCubes } from "@/babylon/MarchingCubes";
import * as BABYLON from "@babylonjs/core";

export default defineComponent({
    name: "MarchingCubesComponent",
    mounted() {
        const canvas = document.querySelector("canvas")!;
        new MarchingCubes(canvas, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(16, 16, 16), 4, 500);
    },
});
</script>

<style scoped>
canvas {
  width: 90%;
  height: 90%;
}
</style>