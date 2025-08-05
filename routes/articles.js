const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

// Hämta en lista över alla artiklar
router.get('/', async (req, res) => {
  try {
    // ✅ Hämtar nu BARA aktiva artiklar och sorterar dem
    const articles = await Article.find({ isActive: true })
      .select('title slug imageUrl')
      .sort({ sortOrder: 1 }); 
      
    res.json(articles);
  } catch (error) {
    console.error("Fel vid hämtning av artiklar:", error);
    res.status(500).send('Serverfel vid hämtning av artiklar.');
  }
});

// Hämta en specifik artikel baserat på dess "slug" (befintlig)
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: 'Artikeln hittades inte.' });
    }
    res.json(article);
  } catch (error) {
    console.error("Fel vid hämtning av artikel:", error);
    res.status(500).send('Serverfel vid hämtning av artikel.');
  }
});

module.exports = router;
