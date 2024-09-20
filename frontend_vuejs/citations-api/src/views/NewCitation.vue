<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-7 text-center">
      Ajout d'une nouvelle citation :
    </h1>
    <form
      @submit.prevent="submitCitation"
      class="flex flex-col space-y-4">
      <input
        type="text"
        v-model="citation"
        placeholder="Texte la citation"
        class="p-4 border rounded-lg text-lg" />
      <input
        type="text"
        v-model="auteur"
        placeholder="Auteur"
        class="p-4 border rounded-lg text-lg" />
      <input
        type="text"
        v-model="source"
        placeholder="Source"
        class="p-4 border rounded-lg" />
      <button
        type="submit"
        class="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700">
        Ajouter la citation
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCitationsStore } from "../stores/citationsStore";

const citation = ref("");
const auteur = ref("");
const source = ref("");
const citationsStore = useCitationsStore();

async function submitCitation() {
  await citationsStore.addCitation(citation.value, auteur.value, source.value);
  citation.value = "";
  auteur.value = "";
  source.value = "";
}
</script>

<style lang="scss" scoped></style>
