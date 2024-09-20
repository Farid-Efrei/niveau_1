const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoUri = "mongodb://localhost:27017";
// const dbName = "citationsDB";
let db, usersCollection, citationsCollection;

async function connectToMongo() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    db = client.db("dbtest");
    usersCollection = await db.collection("users");
    citationsCollection = await db.collection("citationsDB");
    console.log("Connecté à MongoDB");
    return db;
    // return client.db("dbtest").collection("citationsDB");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
}

// Fonction pour obtenir toutes les citations
async function getAllCitations() {
  await connectToMongo();
  return await citationsCollection.find({}).toArray();
}

// Fonction pour ajouter une nouvelle citation à la collection:
async function addCitation(citation, auteur, source) {
  await connectToMongo();
  const newCitation = {
    citation,
    auteur,
    source: source || "Inconnu",
    createdAt: new Date(),
  };
  const cita = await citationsCollection.insertOne(newCitation);
  console.log(citationsCollection);
  console.log(cita);
  return cita.ops[0];
}

// Fonction pour supprimer une citation par son ID :
async function deleteCitationById(id) {
  const citationsCollection = await connectToMongo();
  //   const { ObjectId } = require("mongodb");
  await citationsCollection.deleteOne({ _id: new ObjectId(id) });
}

async function getRandomCitation() {
  await connectToMongo();
  const count = await citationsCollection.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const randomCitation = await citationsCollection
    .find()
    .limit(1)
    .skip(randomIndex)
    .toArray();
  return randomCitation[0];
}

// Gestion des users:
async function registerUser(username, password) {
  await connectToMongo();
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await usersCollection.insertOne({
    username,
    password: hashedPassword,
  });
  return result.ops[0];
}

async function loginUser(username, password) {
  await connectToMongo();
  const user = await usersCollection.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect");
  }
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  return { token, userId: user._id };
}

module.exports = {
  getAllCitations,
  addCitation,
  deleteCitationById,
  getRandomCitation,
  registerUser,
  loginUser,
  connectToMongo,
};
