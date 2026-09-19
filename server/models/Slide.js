const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({    
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  tags: [{ type: String, maxlength: 30 }],
  badge: { type: String, maxlength: 50 },
  mediaUrl: { type: String, default: null },
  linkType: { type: String, enum: ['internal', 'external'], default: 'internal' },
  linkTo: { type: String, default: '/projects' },
  order: { type: Number, default: 0 },
  accentColor: { type: String, default: '#06B6D4' },
}, { timestamps: true });

module.exports = mongoose.model('Slide', slideSchema);