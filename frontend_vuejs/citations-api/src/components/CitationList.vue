<template>
  <div>
    <h2>Liste des citations :</h2>
    <div v-if="citations.length === 0">Aucune citation trouvée !</div>
    <ol>
      <li
        v-for="citation in citations"
        :key="citation._id">
        <p>
          "{{ citation.citation }}" - de <i>{{ citation.auteur }}</i>
        </p>
        <button @click="deleteCitation(citation._id)">Supprimer</button>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const citations = ref([]);

async function fetchCitations() {
  const response = await fetch("http://localhost:3000/citations");
  const data = await response.json();
  citations.value = data;
}

async function deleteCitation(id) {
  await fetch(`http://localhost:3000/citations/${id}`, {
    method: "DELETE",
  });

  fetchCitations();
}

onMounted(() => {
  fetchCitations(); //  pour charger les citations dès que le composant est monté.
});

defineExpose({
  fetchCitations,
});
</script>

<style lang="scss" scoped></style>
