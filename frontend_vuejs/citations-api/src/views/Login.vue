<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/3 p-8 rounded-lg shadow-xl">
      <h2 class="text-3xl mb-6 text-center">Connexion :</h2>
      <form
        @submit.prevent="login"
        class="flex flex-col">
        <input
          type="text"
          v-model="username"
          placeholder="Nom d'utilisateur"
          class="mb-4 p-3 border rounded" />
        <input
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          class="mb-4 p-3 border rounded" />
        <button
          type="submit"
          class="bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
          Se connecter
        </button>

        <p
          v-if="erreur"
          class="text-red-500 mt-4 text-center text-lg">
          {{ erreur }}
        </p>

        <div>
          <p>
            <RouterLink
              to="/register"
              class="text-green-600 ml-10 hover:underline hover:text-lg"
              >Créer un Compte</RouterLink
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
