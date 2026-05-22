const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  technicalFounder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessFounder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
