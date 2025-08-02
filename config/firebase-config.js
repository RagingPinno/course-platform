const admin = require("firebase-admin");

// Läs den hemliga nyckeln från miljövariabeln
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initiera Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
