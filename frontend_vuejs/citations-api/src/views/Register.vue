<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/3 p-8 rounded-lg shadow-lg bg-white">
      <h2 class="text-3xl mb-6 text-center">Créer un compte</h2>

      <form
        @submit.prevent="register"
        class="flex flex-col space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="Nom d'utilisateur"
          class="p-4 border rounded-lg text-lg" />

        <input
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          class="p-4 border rounded-lg text-lg" />

        <button
          type="submit"
          class="bg-green-500 text-white p-4 rounded-lg hover:bg-green-700">
          Créer un compte
        </button>

        <p
          v-if="erreur"
          class="text-red-500 mt-4">
          {{ erreur }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

// Stores et router
const userStore = useUserStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const erreur = ref(null);

async function register() {
  try {
    erreur.value = null; // Réinitialiser les erreurs

    await userStore.register(username.value, password.value); // Tentative d'inscription
    router.push("/login"); // Redirection vers la page de connexion après succès
  } catch (error) {
    erreur.value = error.message; // Afficher l'erreur en cas d'échec
  }
}
</script>

<style scoped>
body {
  background-color: #f3f4f6;
}
</style>
