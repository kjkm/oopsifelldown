import { createRouter, createWebHistory } from "vue-router";
import MaterialsView from "@/views/MaterialsView.vue";
import BasicView from "@/views/BasicView.vue";
import HomeView from "@/views/HomeView.vue";
import SolarView from "@/views/SolarView.vue"; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/materials",
      name: "materials",
      component: MaterialsView,
    },
    {
      path: "/basic",
      name: "basic",
      component: BasicView,
    },
    {
      path: "/solar",
      name: "solar",
      component: SolarView,
    },
  ],
});

export default router;
