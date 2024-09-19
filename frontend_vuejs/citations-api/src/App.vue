<script setup>
import { ref } from "vue";
import AddCitation from "./components/AddCitation.vue";
import CitationList from "./components/CitationList.vue";

const citationList = ref(null);

function fetchCitations() {
  citationList.value.fetchCitations();
}
</script>

<template>
  <div>
    <h1>Application de Citations</h1>
    <AddCitation @CitAjout="fetchCitations" />
    <CitationList ref="citationList" />
  </div>
</template>

<style scoped></style>
