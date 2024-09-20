import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    userId: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username, password) {
      try {
        console.log("Tentative de connexion avec : ", username, password);

        const response = await axios.post("http://localhost:3000/api/login", {
          username,
          password,
        });
        console.log("Reponse du serveur : ", response.data);

        this.token = response.data.token;
        this.userId = response.data.userId;
        localStorage.setItem("token", this.token);
        localStorage.setItem("userId", this.userId);

        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        return response.data;
      } catch (error) {
        console.error("Erreur de co : ", error.response || error);

        if (error.response && error.response.status === 401) {
          throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        } else {
          throw new Error(
            "Echec de la connexion" + error.response?.data?.message ||
              error.message
          );
        }
      }
    },

    async register(username, password) {
      try {
        await axios.post("http://localhost:3000/api/register", {
          username,
          password,
        });
      } catch (error) {
        if (error.response && error.response.status === 409) {
          throw new Error(
            "Ce nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre."
          );
        } else {
          throw new Error("Erreur lors de l'inscription.");
        }
      }
    },

    logout() {
      this.token = null;
      this.userId = null;
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
