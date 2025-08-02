const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  // Vilken användare det gäller (från Firebase Auth)
  userId: { type: String, required: true, index: true },
  
  // Vilken kurs det gäller
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  
  // Användarens status för kursen
  status: {
    type: String,
    required: true,
    enum: ['Intresserad', 'Planerar att gå', 'Pågående', 'Avslutad']
  }
}, {
  // Lägger automatiskt till timestamps för när dokumentet skapades/uppdaterades
  timestamps: true
});

// Skapa ett sammansatt index för att säkerställa att varje användare bara kan ha en status per kurs
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
