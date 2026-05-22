const mongoose = require('mongoose');

const pitchSchema = new mongoose.Schema({
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fundingGoal: { type: Number, required: true },
  pitchDeckUrl: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Pitch', pitchSchema);
