const express = require('express');
const Flashcard = require('../models/Flashcard');
const router = express.Router();

// ✅ Hämtar nu BARA aktiva kortlekar
router.get('/', async (req, res) => {
  try {
    const decks = await Flashcard.find({ isActive: true }).select('deckTitle description difficulty');
    res.json(decks);
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av flashcards.');
  }
});

// Hämta en komplett kortlek med alla kort (oförändrad)
router.get('/:id', async (req, res) => {
  try {
    const deck = await Flashcard.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: 'Kortleken hittades inte.' });
    }
    res.json(deck);
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av flashcards.');
  }
});

module.exports = router;
