require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 

// Anslut till MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI saknas i .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Ansluten till MongoDB"))
  .catch(err => console.error("❌ Kunde inte ansluta till MongoDB", err));


// API-slutpunkter
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollments");
const quizRoutes = require('./routes/quizzes'); // ✅ Importerar quiz-vägar
const articleRoutes = require("./routes/articles");

app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use('/api/quizzes', quizRoutes); // ✅ Använder quiz-vägar
app.use('/api/articles', articleRoutes); // ✅ Använder artikel-vägar

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servern körs på port ${PORT}`);
});
