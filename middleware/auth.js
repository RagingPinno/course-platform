// middleware/auth.js
const firebaseAdmin = require("../config/firebase-config");

const authenticate = async (req, res, next) => {
  console.log("--- AUTHENTICATE MIDDLEWARE KÖRS ---"); // Ny logg

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Auth-fel: Ingen Bearer-token.");
    return res.status(401).send("Unauthorized: No token provided.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log("✅ Token validerad för användare:", decodedToken.uid);
    next();
  } catch (error) {
    // VI MÅSTE SE DETTA MEDDELANDE I BACKEND-TERMINALEN
    console.error("🔥🔥🔥 TOKEN-VALIDERING MISSLYCKADES! 🔥🔥🔥");
    console.error("DETALJER:", error);
    res.status(401).send("❌ Ogiltig Firebase-token");
  }
};

module.exports = authenticate;