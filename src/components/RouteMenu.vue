<template>
  <div>
    <div><router-link to="/basic">Basic View</router-link></div>
    <div><router-link to="/materials">Materials</router-link></div>
    <div><router-link to="/solar">Solar</router-link></div>
    <div><router-link to="/marching-2">Marching Cubes</router-link></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RouteMenu",
});
</script>
