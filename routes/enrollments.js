const express = require('express');
const Enrollment = require('../models/Enrollment');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Hämta alla kurser en användare har en status på
router.get('/my-courses', authenticate, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.uid })
      // ✅ KORRIGERING: Lägger till 'targetAudience' och 'link' så att de följer med till frontend.
      .populate('courseId', 'title difficulty provider isActive targetAudience link') 
      .lean();
    
    const validEnrollments = enrollments.filter(e => e.courseId);
    res.status(200).json(validEnrollments);
  } catch (error) {
    console.error("Fel vid hämtning av användarens kurser:", error);
    res.status(500).send("Serverfel vid hämtning av kurser.");
  }
});

// --- Resten av filen är oförändrad ---

// Sätt eller uppdatera en status för en kurs
router.post('/', authenticate, async (req, res) => {
  const { courseId, status } = req.body;
  const userId = req.user.uid;
  try {
    const enrollment = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      { status },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).send("Serverfel vid uppdatering av status.");
  }
});

// Hämta en användares status för en specifik kurs
router.get('/:courseId', authenticate, async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.uid;
  try {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      return res.status(200).json(null); 
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).send("Serverfel vid hämtning av status.");
  }
});

module.exports = router;
