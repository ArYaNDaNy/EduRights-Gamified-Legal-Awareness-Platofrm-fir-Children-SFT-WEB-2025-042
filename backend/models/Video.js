
const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  video_url: { type: String, required: true }, // The YouTube Link
  category: { 
    type: String, 
    required: true,
    enum: ['CYBER_SAFETY', 'TRAFFIC', 'CIVIC_SENSE', 'RIGHTS', 'GENERAL'] 
  },
  // To verify who uploaded it
  uploaded_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  likes: { type: Number, default: 0 } // Kids can like videos in the feed
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;