const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  courseType: {
    type: String,
    enum: ['Kurs', 'Utmaning'],
    default: 'Kurs'
  },
  challengeSteps: [{
    // ✅ KORRIGERING: Lade till 'code' som ett giltigt alternativ i enum-listan.
    type: { type: String, enum: ['text', 'image', 'code'], required: true },
    content: { type: String, required: true }
  }],
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

// Säkerställer att modellen inte skrivs över om den redan finns
module.exports = mongoose.models.Course || mongoose.model("Course", courseSchema, "courses");
