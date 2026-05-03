import { createRouter, createWebHistory } from "vue-router";
import GalaxyGenerator from "../views/GalaxyGenerator.vue";

const routes = [
  {
    path: "/",
    name: "GalaxyGenerator",
    component: GalaxyGenerator,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
