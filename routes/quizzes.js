// backend/routes/quizzes.js

const express = require('express');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const authenticate = require('../middleware/auth');

const router = express.Router();

// ✅ Denna route är nu OFFENTLIG.
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('title description difficulty');
    res.json(quizzes);
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av quiz.');
  }
});

// ✅ Denna route är nu OFFENTLIG.
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions.relatedCourses', 'title');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz hittades inte.' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av quiz.');
  }
});

// ✅ Denna route är nu OFFENTLIG.
router.get('/:id/recommendations', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz || !quiz.difficulty) {
      return res.status(404).json({ message: 'Quiz eller svårighetsgrad hittades inte.' });
    }
    const recommendations = await Course.aggregate([
      { $match: { difficulty: quiz.difficulty, isActive: true } },
      { $sample: { size: 3 } },
      { $project: { title: 1, shortDescription: 1, provider: 1, difficulty: 1 } }
    ]);
    res.json(recommendations);
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av rekommendationer.');
  }
});

module.exports = router;
