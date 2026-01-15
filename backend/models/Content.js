const mongoose = require('mongoose');

// 1. The Level Schema (Individual Circles)
const levelSchema = new mongoose.Schema({
  module_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'LegalModule', 
    required: true 
  },
  level_number: { type: Number, required: true }, // 1 to 13
  title: { type: String, required: true },
  video_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Video', // Links to the schema above
    required: false 
  }, // see false is beacause all levels may not have video
  xp_reward: { type: Number, default: 50 },
  difficulty: { 
    type: String, 
    enum: ['EASY', 'MEDIUM', 'HARD'], 
    default: 'EASY' 
  }
});

// 2. this will be boxes planning to add submountains will see 

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  theme_color: { type: String, default: '#7ce4ff' }, // not sure may or may not use if not then remove
  completion_bonus_xp: { type: Number, default: 500 },
  badge_icon: { type: String, required: true }, //  image of the medal image
  badge_title: { type: String, required: true }, // e.g., "Cyber Guardian"
  learning_summary: [{ 
    type: String 
  }],
  time_estimate_minutes : { type : Number }
});

const Level = mongoose.model('Level', levelSchema);
const LegalModule = mongoose.model('LegalModule', moduleSchema);

module.exports = { Level, LegalModule };