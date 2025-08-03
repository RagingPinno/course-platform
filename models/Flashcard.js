const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const flashcardSchema = new mongoose.Schema({
  deckTitle: { type: String, required: true },
  description: String,
  difficulty: {
    type: Number,
    min: 1,
    max: 4
  },
  // ✅ Nytt fält för att styra synlighet
  isActive: {
    type: Boolean,
    default: true
  },
  cards: [cardSchema]
}, {
  timestamps: true
});

module.exports = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);
