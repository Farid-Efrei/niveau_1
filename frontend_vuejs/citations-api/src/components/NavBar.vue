<template>
  <nav class="bg-blue-500 text-yellow-200 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">
        <RouterLink to="/">Pop'Quotes App</RouterLink>
      </h1>
      <ul>
        <li>
          <router-link
            to="/"
            class="hover:underline"
            >Accueil</router-link
          >
        </li>
        <li>
          <RouterLink
            to="/citations"
            class="hover:underline"
            >Toutes les Citations</RouterLink
          >
        </li>
        <li v-if="userStore.isAuthenticated">
          <RouterLink
            to="/new-citation"
            class="hover:underline"
            >Ajouter une Citation</RouterLink
          >
        </li>
        <li
          v-if="userStore.isAuthenticated"
          @click="logout"
          class="cursor-pointer hover:underline">
          Se Déconnecter
        </li>
        <li v-else>
          <RouterLink
            to="/login"
            class="hover:underline"
            >Se Connecter</RouterLink
          >
        </li>
      </ul>
      <img
        src="../assets/1d985b6d-f977-46e8-a609-bdf201b51222.webp"
        class="size-24" />
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

function logout() {
  userStore.logout();
}
</script>

<style scoped>
/* nav ul li {
  list-style: none; 
}*/
</style>
