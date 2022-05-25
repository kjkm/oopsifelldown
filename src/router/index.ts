import { createRouter, createWebHistory } from "vue-router";
import MaterialsView from "@/views/MaterialsView.vue";
import HomeView from "@/views/HomeView.vue";
import SolarView from "@/views/SolarView.vue"; 
import MarchingView2 from "@/views/MarchingView2.vue";

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
      path: "/solar",
      name: "solar",
      component: SolarView,
    },
    {
      path: "/marching-2",
      name: "marching-2",
      component: MarchingView2,
    }
  ],
});

export default router;
