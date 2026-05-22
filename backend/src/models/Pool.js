const mongoose = require('mongoose');

const poolSchema = new mongoose.Schema({
  pitch: { type: mongoose.Schema.Types.ObjectId, ref: 'Pitch', required: true },
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amountCommitted: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pool', poolSchema);
