const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  registerUser,
  loginUser,
  addCitation,
  getAllCitations,
  getRandomCitation,
  deleteCitationById,
  connectToMongo,
} = require("./db_utils");

//Middleware d'authentication:
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token manquant ! " });
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
}
// Routes pour s'enregistrer:
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = await connectToMongo();
    const usersCollection = await db.collection("users");
    console.log("Collection users :", usersCollection);
    const existingUser = await usersCollection.findOne({ username });
    console.log("Utilisateur existant :", existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "Nom d'utilisateur déjà pris." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
    });

    if (result.acknowledged) {
      res.status(201).json({
        message: "Utilisateur créé avec succès.",
        userId: result.insertedId,
      });
    } else {
      throw new Error("L'insertion de l'user a échoué.");
    }
  } catch (error) {
    console.error("Erreur dans /register :", error);
    res.status(500).json({ message: error.message });
  }
});

// Route pour se loguer:
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const infos = await loginUser(username, password);
    res.json(infos);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Routes pour les citations :
router.get("/citations", async (req, res) => {
  try {
    const citations = await getAllCitations();
    res.json(citations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/new-citation", authenticateToken, async (req, res) => {
  const { citation, auteur, source } = req.body;
  try {
    const newCitation = await addCitation(
      citation,
      auteur,
      source
      // req.user.userId
    );
    res.status(201).json(newCitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/citations/:id", authenticateToken, async (req, res) => {
  try {
    await deleteCitationById(req.params.id, req.user.userId);
    res.json({ message: "Citation supprimée avec succès !" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour une citation aléatoire:
router.get("/random-citation", async (req, res) => {
  try {
    const randomCitation = await getRandomCitation();
    res.json(randomCitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
