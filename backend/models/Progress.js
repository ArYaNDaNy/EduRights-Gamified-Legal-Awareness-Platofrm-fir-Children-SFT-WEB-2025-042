const mongoose = require('mongoose');

// 1. Module Progress (Which level is Blue/Active?)
const userModuleProgressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'LegalModule', required: true },
  current_level: { type: Number, default: 1 }, // Starts at Level 1
  is_completed: { type: Boolean, default: false }
});

// 2. Level History (Medals for specific levels)
const levelHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  medal: { 
    type: String, 
    enum: ['BRONZE', 'SILVER', 'GOLD']
  },
  completed_at: { type: Date, default: Date.now }
});

const UserModuleProgress = mongoose.model('UserModuleProgress', userModuleProgressSchema);
const LevelHistory = mongoose.model('LevelHistory', levelHistorySchema);

module.exports = { UserModuleProgress, LevelHistory };