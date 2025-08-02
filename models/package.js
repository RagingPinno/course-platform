// backend/models/Package.js
const mongoose = require("mongoose"); // ✅ Importera mongoose en gång

const packageSchema = new mongoose.Schema({
  title: String,
  purpose: String,
  courses: [
    {
      courseId: mongoose.Schema.Types.ObjectId,
      status: { type: String, enum: ["not started", "in progress", "completed"] }
    }
  ],
  plannedActivities: [
    {
      title: String,
      description: String,
      plannedDate: Date,
      participants: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          status: { type: String, enum: ["confirmed", "pending", "completed"] }
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Package", packageSchema);