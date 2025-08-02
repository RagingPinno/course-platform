const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  // ... alla dina befintliga fält ...
  title: String,
  description: String,
  category: String,
  courseType: {
    type: String,
    enum: ['Kurs', 'Utmaning'],
    default: 'Kurs'
  },
  challengeSteps: [{
    type: { type: String, enum: ['text', 'image'], required: true },
    content: { type: String, required: true }
  }],
  // ✅ Nytt fält för att beskriva värdet
  targetAudience: [String],
  tags: [String],
  link: String,
  shortDescription: String,
  difficulty: { type: Number, min: 1, max: 4 },
  provider: String,
  lastUpdated: Date,
  certificate: Boolean,
  format: String,
  duration: String,
  language: String,
  prerequisites: String,
  price: {
    amount: Number,
    currency: String
  },
  imageUrl: String,
  isFeatured: { 
    type: Boolean, 
    default: false
  },
  editorsPick: {
    tag: String,
    comment: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  likes: [{
    type: String
  }]
}, {
  timestamps: true 
});

module.exports = mongoose.model("Course", courseSchema, "courses");
