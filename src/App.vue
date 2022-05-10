<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import BabylonExamples from "@/components/BabylonExamples.vue";
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: "App",
    mounted() {
      const canvas = document.querySelector('canvas');
    },
  });
</script>

<template>
  <BabylonExamples msg="yo" />
</template>

