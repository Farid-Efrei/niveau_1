import Login from "../../views/Login.vue";
import { useUserStore } from "../../stores/userStore";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe("Login Component", () => {
  it("renders correctly", () => {
    cy.mount(Login, {
      global: {
        plugins: [pinia, router],
      },
    });
    cy.get("h2").should("contain", "Connexion :");
  });

  it("updates username and password inputs", () => {
    cy.mount(Login);
    cy.get('input[type="text"]').type("testuser");
    cy.get('input[type="password"]').type("password123");
    cy.get('input[type="text"]').should("have.value", "testuser");
    cy.get('input[type="password"]').should("have.value", "password123");
  });

  it("shows error message on failed login", () => {
    cy.mount(Login);
    // Simulez un échec de connexion
    const userStore = useUserStore();
    cy.stub(userStore, "login").rejects(new Error("Échec de la connexion"));
    cy.get("form").submit();
    cy.get(".text-red-500").should("contain", "Échec de la connexion");
  });
});
