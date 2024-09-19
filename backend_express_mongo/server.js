const express = require("express");
const cors = require("cors");
const {
  getAllCitations,
  addCitation,
  deleteCitationById,
} = require("./db_utils");

// Confi;guration d'Express:
const app = express();
const PORT = 3000;

// Configuration des Middlewares:
app.use(express.json());
app.use(cors());

// 1. Route GET pour récupérer toutes les citations:
app.get("/citations", async (req, res) => {
  try {
    const citations = await getAllCitations();
    res.json(citations);
  } catch (erreur) {
    res.json({ message: erreur.message });
  }
});

// 2. Route POST pour ajouter une citation:
app.post("/new-citation", async (req, res) => {
  const { citation, auteur, source } = req.body;

  try {
    const newCitation = await addCitation(citation, auteur, source);
    res.json(newCitation);
  } catch (erreur) {
    res.json({ message: erreur.message });
  }
});

// 3.Route pour supprimer une citation via son ID :
app.delete("/citations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCitationById(id);
    res.json({ message: "Citation supprimée" });
  } catch (erreur) {
    res.json({ message: erreur.message });
  }
});

// Démarrer le serveur :
app.listen(PORT, () => {
  console.log(`Serveur backend ouvert sur le port : ${PORT}`);
});
