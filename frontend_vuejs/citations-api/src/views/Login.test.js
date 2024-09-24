import { mount } from "@vue/test-utils";
import Login from "./Login.vue"; // Assurez-vous que le chemin est correct
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

// Mock des dépendances
jest.mock("../stores/userStore", () => ({
  useUserStore: jest.fn(() => ({
    login: jest.fn(),
    isAuthenticated: false,
  })),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/citations", name: "Citations" }],
});

describe("Login Component", () => {
  let wrapper;

  beforeEach(() => {
    const pinia = createPinia();
    wrapper = mount(Login, {
      global: {
        plugins: [pinia, router],
        stubs: ["RouterLink"], // Stub RouterLink pour éviter les erreurs
      },
    });
  });

  test("rendu de la page correct", () => {
    expect(wrapper.find("h2").text()).toBe("Connexion :");
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').text()).toBe("Se connecter");
  });

  test("mise à jour des champs text et password dans les inputs", async () => {
    const usernameInput = wrapper.find('input[type="text"]');
    const passwordInput = wrapper.find('input[type="password"]');

    await usernameInput.setValue("testUser");
    await passwordInput.setValue("testPassword");

    expect(wrapper.vm.username).toBe("testUser");
    expect(wrapper.vm.password).toBe("testPassword");
  });

  test("appel de la méthode 'login()' quand le form est submit", async () => {
    const usernameInput = wrapper.find('input[type="text"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find("form");

    await usernameInput.setValue("testUser");
    await passwordInput.setValue("testPassword");
    await form.trigger("submit");

    const userStore = wrapper.vm.userStore;
    expect(userStore.login).toHaveBeenCalledWith("testUser", "testPassword");
  });

  test("affichage des erreurs si le login est faux", async () => {
    const userStore = wrapper.vm.userStore;
    userStore.login.mockRejectedValue(new Error("Login échoué"));

    const form = wrapper.find("form");
    await form.trigger("submit");

    await wrapper.vm.$nextTick(); // Attendre la mise à jour du DOM
    expect(wrapper.find(".text-red-500").text()).toBe("Login échoué");
  });
});
