<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 rounded-lg shadow-xl bg-white mb-6">
      <h2 class="text-3xl mb-6 font-bold text-center">Connexion :</h2>
      <form
        @submit.prevent="login"
        class="flex flex-col">
        <input
          type="text"
          v-model="username"
          placeholder="Nom d'utilisateur"
          class="w-full mb-4 p-3 border border-gray-400 rounded-lg" />
        <input
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          class="w-full border-gray-400 mb-4 p-3 border rounded-lg" />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Se connecter
        </button>

        <p
          v-if="erreur"
          class="text-red-500 mt-4 text-center text-lg">
          {{ erreur }}
        </p>

        <div class="mt-4 text-center">
          <p>
            <RouterLink
              to="/register"
              class="text-green-600 hover:underline hover:text-lg"
              >Pas encore de compte? Créer un Compte</RouterLink
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const erreur = ref(null);

async function login() {
  try {
    erreur.value = null;

    const result = await userStore.login(username.value, password.value);
    console.log("Co réussie : ", result);

    router.push("/citations");
  } catch (error) {
    alert("Echec de la connexion");
    erreur.value = error.message;
  }
}
</script>

<style>
body {
  background-color: #f3f4f6;
}
</style>
