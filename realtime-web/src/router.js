import { createRouter, createWebHistory } from "vue-router";

import Home from "./page/Home.vue";
import Crud from "./page/Crud.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/crud", component: Crud },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
