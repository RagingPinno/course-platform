// backend/config/firebase-config.js

const admin = require("firebase-admin");

// Ladda din service account-nyckel
const serviceAccount = require("../serviceAccountKey.json"); // Justera sökvägen!

// Initiera Firebase Admin EN GÅNG med dina credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Exportera den färdiginitierade admin-instansen
module.exports = admin;