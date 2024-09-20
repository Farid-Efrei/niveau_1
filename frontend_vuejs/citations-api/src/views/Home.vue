<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-3xl font-bold mb-6">
      Bienvenue sur
      <span class="animate-pulse text-green-400">Pop'Citations </span> :
      l'Application de Pop Culture de Citations préférée du futur ^^
    </h1>
    <p class="text-lg mb-4">
      Vous pouvez ajouter, supprimer ou consulter des citations inspirantes
      venant de tous horizons : Séries TV, Animés, Littérature, Personnalités,
      Films, Théâtre, Histoire et j'en passe !
    </p>
    <div class="flex justify-center space-x-4">
      <router-link
        to="/citations"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >Voir toutes les Citations</router-link
      >
      <router-link
        v-if="userStore.isAuthenticated"
        to="/add-citation"
        class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >Ajouter une Citation</router-link
      >
      <router-link
        v-else
        to="/login"
        class="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
        >Se Connecter</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
const userStore = useUserStore(); // Vérifie si l'utilisateur est connecté
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
