const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  department: String,
  courseProgress: [
    {
      courseId: mongoose.Schema.Types.ObjectId,
      status: { type: String, enum: ["not started", "in progress", "completed"] }
    }
  ],
  createdPackages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }],
  ratings: [
    {
      courseId: mongoose.Schema.Types.ObjectId,
      rating: { type: Number, min: 1, max: 5 },
      comment: String
    }
  ]
});

module.exports = mongoose.model("User", userSchema);