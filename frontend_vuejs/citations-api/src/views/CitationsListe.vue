<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-3xl font-bold mb-4 text-center animate-pulse">
      Toutes les citations
    </h1>

    <div
      v-if="loading"
      class="text-center text-lg">
      Chargement des citations...
    </div>
    <ul v-if="!loading && citationsStore.citations.length">
      <li
        v-for="citation in citationsStore.citations"
        :key="citation._id"
        class="mb-4 p-4 border border-indigo-600 rounded-lg relative">
        <p class="text-lg text-center">
          "{{ citation.citation }}" -
          <span class="italic text-orange-600">{{ citation.auteur }}</span>
        </p>
        <button
          v-if="userStore.token"
          @click="deleteCitationById(citation._id)"
          class="top-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 right-0 m-2">
          Supprimer
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCitationsStore } from "../stores/citationsStore";
import { useUserStore } from "../stores/userStore";

const loading = ref(true);
const citationsStore = useCitationsStore();
const userStore = useUserStore();

onMounted(async () => {
  await citationsStore.fetchAllCitations();
  loading.value = false;
});

async function deleteCitationById(citationId) {
  if (
    confirm(
      "Voulez-vous vraiment supprimer cette merveilleuse citation que j'ai mis 8 ans à écrire, penser et affiner  ?"
    )
  ) {
    await citationsStore.deleteCitationById(citationId);
  }
}
</script>
