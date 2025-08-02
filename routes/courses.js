const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Hämtar alla aktiva kurser (redan offentlig)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).lean();
    res.send(courses);
  } catch (error) {
    res.status(500).send('Could not fetch courses');
  }
});

// ✅ KORRIGERING: Denna route är nu OFFENTLIG.
// Vem som helst kan se detaljerna för en kurs.
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).send('Could not fetch course');
  }
});

// 🔒 Denna route är fortfarande SKYDDAD, eftersom den ändrar data.
router.post('/:id/toggle-like', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Kursen hittades inte.' });
    }
    const userId = req.user.uid;
    const userIndex = course.likes.indexOf(userId);
    if (userIndex === -1) {
      course.likes.push(userId);
    } else {
      course.likes.splice(userIndex, 1);
    }
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).send('Serverfel vid gillning av kurs.');
  }
});

module.exports = router;

