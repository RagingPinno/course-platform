const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String, required: true },
  relatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  // ✅ Nytt fält för svårighetsgrad
  difficulty: {
    type: Number,
    min: 1,
    max: 4
  },
  questions: [questionSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
