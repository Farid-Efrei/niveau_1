// Comme j'utilise MongoDB, bcrypt et jsonwebtoken, je vais les simuler dans les tests pour ne pas avoir à exécuter les vraies opérations de BDD ni de générer de vrais tokens pour les tests. Cela me permet de tester les fonctions directement.
//J'ai choisi de tester les fonctions de créations d'utilisateuurs, de logins, et d'affichage de toutes les citations.

//1. Gestion des imports:
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  loginUser,
  getAllCitations,
  connectToMongo,
} = require("./db_utils");

//2. Gestion des simulations (mock) :
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

//Simulation d'une collection MongoDB par un objet mockCollection avec les méthodes:
const mockCollection = {
  insertOne: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
};

//Simulation objet db de MongoDB -> La méthode retourne notre mockCollection:
const mockDb = {
  collection: jest.fn().mockReturnValue(mockCollection),
};

//Simulation du client MongoDB par un objet mockClient retournant une promesse résolue(true).
const mockClient = {
  connect: jest.fn().mockResolvedValue(true),
  db: jest.fn().mockReturnValue(mockDb),
};
//Cette ligne remplace le module mongodb par notre mock. Chaque fois que MongoClient est instancié, il retournera notre mockClient.
jest.mock("mongodb", () => ({
  MongoClient: jest.fn().mockImplementation(() => mockClient),
}));

//3. ** Test des fonctions :

//Ce bloc teste la fonction registerUser. Nous configurons nos mocks pour simuler l'insertion d'un utilisateur et le hachage du mot de passe, puis nous vérifions que la fonction se comporte comme prévu:
describe("registerUser", () => {
  it("devrait enregistrer un nouvel User avec mdp haché", async () => {
    const mockInsertedUser = {
      username: "nouveUser",
      password: "hashedPassword",
    };
    mockCollection.insertOne.mockResolvedValue({ ops: [mockInsertedUser] });
    bcrypt.hash.mockResolvedValue("hashedPassword");

    const result = await registerUser("nouveUser", "password321");

    expect(bcrypt.hash).toHaveBeenCalledWith("password321", 10);
    expect(result).toEqual(mockInsertedUser);
  });
});

//Ce bloc teste la fonction loginUser(). Nous configurons nos mocks pour simuler la recherche d'un utilisateur, la comparaison de mot de passe et la génération de token JWT, puis nous vérifions que la fonction se comporte comme prévu.
describe("loginUser", () => {
  it("devrait générer un token JWT si le login est OK", async () => {
    const mockUser = {
      _id: "user321",
      username: "tanjiro",
      password: "hashedPassword",
    };
    mockCollection.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken");

    const result = await loginUser("tanjiro", "password321");

    expect(result).toEqual({ token: "fakeToken", userId: "user321" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password321",
      "hashedPassword"
    );
    expect(jwt.sign).toHaveBeenCalledWith({ userId: "user321" }, "secret", {
      expiresIn: "1h",
    });
  });

  it("devrait lancer une erreur si le login échoue", async () => {
    mockCollection.findOne.mockResolvedValue(null);

    await expect(loginUser("nonExistingUser", "password123")).rejects.toThrow(
      "Nom d'utilisateur ou mot de passe incorrect"
    );
  });
});
