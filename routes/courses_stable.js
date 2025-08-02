const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/course');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Hämtar alla aktiva kurser (befintlig)
router.get('/', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).lean();
    res.send(courses);
  } catch (error) {
    res.status(500).send('Could not fetch courses');
  }
});

// ✅ NY ROUTE: För att gilla/ogilla en kurs
router.post('/:id/toggle-like', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Kursen hittades inte.' });
    }

    const userId = req.user.uid;
    const userIndex = course.likes.indexOf(userId);

    if (userIndex === -1) {
      // Om användaren inte har gillat än, lägg till ID:t
      course.likes.push(userId);
    } else {
      // Om användaren redan har gillat, ta bort ID:t (ogilla)
      course.likes.splice(userIndex, 1);
    }

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).send('Serverfel vid gillning av kurs.');
  }
});

// Hämtar en enskild kurs (befintlig)
router.get('/:id', authenticate, async (req, res) => {
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

module.exports = router;
