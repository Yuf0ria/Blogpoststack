const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../midware/adminAuth');
const multer = require('multer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const r2 = require('../config/r2');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB, thumbnails only

// GET all projects — public. ?category=dev or ?category=comic filters; omit for all.
// Sorted by year desc (newest timeline entries first), then order within a year.
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const projects = await Project.find(filter).sort({ year: -1, order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create — protected
router.post('/', auth, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, category, year, linkTo, linkType, order } = req.body;
    let thumbnailUrl = null;

    if (req.file) {
      const key = `projects/${Date.now()}-${req.file.originalname}`;
      await r2.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }));
      thumbnailUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    }

    const project = new Project({
      title,
      description,
      category,
      year: Number(year),
      thumbnailUrl,
      linkTo: linkTo || '',
      linkType: linkType || 'external',
      order: Number(order) || 0,
    });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE — protected
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;