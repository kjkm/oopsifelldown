<script setup lang="ts">
import { RouterView } from "vue-router";
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
  <router-view/>
</template>

