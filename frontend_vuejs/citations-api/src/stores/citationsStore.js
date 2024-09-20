import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./userStore";

export const useCitationsStore = defineStore("citations", {
  state: () => ({
    citations: [],
  }),
  actions: {
    async fetchAllCitations() {
      try {
        const response = await axios.get("http://localhost:3000/api/citations");
        this.citations = response.data;
      } catch (e) {
        console.error("Erreur lors du fetch des citations", e);
      }
    },

    async addCitation(citation, auteur, source) {
      const userStore = useUserStore();
      if (!userStore.token) {
        throw new Error(
          "Vous devez être connecté pour ajouter une citation, ohhh !"
        );
      }
      try {
        await axios.post(
          "http://localhost:3000/api/new-citation",
          {
            citation,
            auteur,
            source,
          },
          {
            headers: {
              Authorization: `Bearer ${userStore.token}`,
            },
          }
        );
        await this.fetchAllCitations(); // recharger les citations apres l'ajout.
      } catch (e) {
        console.error("Erreur lors de l'ajout de la citations", e);
      }
    },
    async fetchRandomCitation() {
      const response = await axios.get("/api/citations/random-citation");
      return response.data;
    },

    async deleteCitationById(citationId) {
      const userStore = useUserStore();
      if (!userStore.token) {
        throw new Error("Utilisateur non identifié.");
      }
      try {
        await axios.delete(
          `http://localhost:3000/api/citations/${citationId}`,
          {
            headers: {
              Authorization: `Bearer ${userStore.token}`,
            },
          }
        );
        this.fetchAllCitations();
      } catch (error) {
        console.error("Erreur lors de la suppression de la citation : ", error);
      }
    },
  },
});
