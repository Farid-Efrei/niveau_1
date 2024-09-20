import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import CitationsListe from "./views/CitationsListe.vue";
import RandomCitation from "./views/RandomCitation.vue";
import NewCitation from "./views/NewCitation.vue";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/citations", component: CitationsListe },
  { path: "/random-citation", component: RandomCitation },
  { path: "/new-citation", component: NewCitation },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
