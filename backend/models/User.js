const mongoose = require('mongoose');

// it is a rank schema in db because if we need to add more ranks in future we can eaasily add them
const rankSchema = new mongoose.Schema({
  title: { type: String, required: true }, //rank name
  min_xp: { type: Number, required: true }, //minimum Xp needed to reach a rank
  icon_url: { type: String } 
});

// user schema 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // select false to not return password field in queries by default
  role: { 
    type: String, 
    enum: ['KID', 'ADMIN'], 
    default: 'KID' 
  },
  total_xp: { type: Number, default: 0 },
 // mongoose will store the objectid of the rank document here like the rank we made just above that one
  current_rank: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rank' 
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Rank = mongoose.model('Rank', rankSchema);

module.exports = { User, Rank };