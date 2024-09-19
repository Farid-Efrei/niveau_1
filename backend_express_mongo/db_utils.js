const { MongoClient, ObjectId } = require("mongodb");

const mongoUri = "mongodb://localhost:27017";
// const dbName = "citationsDB";

async function connectToMongo() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    return client.db("dbtest").collection("citationsDB");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
}

// Fonction pour obtenir toutes les citations
async function getAllCitations() {
  const citationsCollection = await connectToMongo();
  return await citationsCollection.find({}).toArray();
}

// Fonction pour ajouter une nouvelle citation à la collection:
async function addCitation(citation, auteur, source) {
  const citationsCollection = await connectToMongo();
  const newCitation = {
    citation,
    auteur,
    source: source || "Inconnu",
  };
  const cita = await citationsCollection.insertOne(newCitation);
  console.log(citationsCollection);
  console.log(cita);
}

// Fonction pour supprimer une citation par son ID :
async function deleteCitationById(id) {
  const citationsCollection = await connectToMongo();
  //   const { ObjectId } = require("mongodb");
  await citationsCollection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllCitations, addCitation, deleteCitationById };
