const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

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
    const newUser = await registerUser(username, password);
    res.json(newUser);
  } catch (error) {
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
      source,
      req.user.userId
    );
    res.json(newCitation);
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
