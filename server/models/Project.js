const mongoose = require('mongoose');
 
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 1000 },
  category: { type: String, enum: ['dev', 'comic'], required: true }, // which timeline this shows up in
  year: { type: Number, required: true }, // groups projects under a year on the timeline
  thumbnailUrl: { type: String, default: null }, // R2 image, same pattern as Slide.mediaUrl
  linkType: { type: String, enum: ['internal', 'external'], default: 'external' },
  linkTo: { type: String, default: '' }, // repo/demo URL, or /blog/:id, or future /projects/:id
  order: { type: Number, default: 0 }, // controls position within the same year
}, { timestamps: true });
 
module.exports = mongoose.model('Project', projectSchema);
 








