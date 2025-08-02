const express = require('express');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Hämta en lista över alla quiz (befintlig)
router.get('/', authenticate, async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('title description difficulty');
    res.json(quizzes);
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av quiz.');
  }
});

// Hämta kursrekommendationer för ett quiz
router.get('/:id/recommendations', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz || !quiz.difficulty) {
      return res.status(404).json({ message: 'Quiz eller svårighetsgrad hittades inte.' });
    }

    const recommendations = await Course.aggregate([
      { $match: { difficulty: quiz.difficulty, isActive: true } },
      { $sample: { size: 3 } },
      // ✅ KORRIGERING: Lägger till 'difficulty' så att det skickas till frontend.
      { $project: { title: 1, shortDescription: 1, provider: 1, difficulty: 1 } }
    ]);

    res.json(recommendations);
  } catch (error) {
    console.error("Fel vid hämtning av rekommendationer:", error);
    res.status(500).send('Serverfel vid hämtning av rekommendationer.');
  }
});

// Hämta ett komplett quiz (befintlig)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('questions.relatedCourses', 'title');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz hittades inte.' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av quiz.');
  }
});

module.exports = router;
