<script setup>
import { ref } from "vue";
import AddCitation from "./components/AddCitation.vue";
import CitationList from "./components/CitationList.vue";
import Login from "./views/Login.vue";
import CitationsListe from "./views/CitationsListe.vue";
import NewCitation from "./views/NewCitation.vue";
import NavBar from "./components/NavBar.vue";

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
