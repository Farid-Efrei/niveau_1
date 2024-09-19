<template>
  <div>
    <h2>Ajouter une Citation :</h2>

    <form @submit.prevent="submitCitation">
      <input
        type="text"
        v-model="citation"
        placeholder="Texte de la citation"
        :class="{ 'border-red-500': textError }" />
      <span
        v-if="textError"
        class="text-red-500"
        >Le texte de la citation est requis !!!</span
      >
      <input
        type="text"
        v-model="auteur"
        placeholder="Auteur" />
      <span
        v-if="textError"
        class="text-red-500"
        >L'Auteur de la citation est requis !!!</span
      >
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const citation = ref("");
const auteur = ref("");
const textError = ref(false);

const emit = defineEmits(["citAjout"]);

async function submitCitation() {
  if (!citation.value.trim() || !auteur.value.trim()) {
    textError.value = true;
    return;
  }

  textError.value = false;
  const response = await fetch("http://localhost:3000/new-citation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      citation: citation.value.trim(),
      auteur: auteur.value.trim(),
    }),
  });

  if (response.ok) {
    citation.value = "";
    auteur.value = "";
    alert("Citation ajoutée avec succès !");
    emit("CitAjout");
  }
}
</script>

<style lang="scss" scoped></style>
