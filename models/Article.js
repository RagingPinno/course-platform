const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  introduction: { type: String },
  imageUrl: { type: String },
  events: [eventSchema]
}, {
  timestamps: true
});

// Säkerställer att modellen inte skrivs över om den redan finns
module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
