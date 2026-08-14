const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({    
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  tags: [{ type: String, maxlength: 30 }],
  badge: { type: String, maxlength: 50 },                       // e.g. "ISSUE 3 OUT"
  mediaUrl: { type: String, default: null },                    // video/gif from R2
  linkTo: { type: String, default: '/projects' },                // where "VIEW PROJECT" goes
  order: { type: Number, default: 0 },                           // controls slide sequence
}, { timestamps: true });

module.exports = mongoose.model('Slide', slideSchema);