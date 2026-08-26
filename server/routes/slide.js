const express = require('express');
const router = express.Router();
const Slide = require('../models/Slide');
const auth = require('../midware/adminAuth');
const multer = require('multer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const r2 = require('../config/r2');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } }); // 15MB — video/gif needs more room than a photo

// GET all slides — public, ordered
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create — protected
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const { title, description, tags, badge, linkTo, linkType, order, accentColor } = req.body;
    let mediaUrl = null;

    if (req.file) {
      const key = `slides/${Date.now()}-${req.file.originalname}`;
      await r2.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }));
      mediaUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    }

    const slide = new Slide({
      title,
      description,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      badge,
      mediaUrl,
      linkTo: linkTo || '/projects',
      linkType: linkType || 'internal',
      order: Number(order) || 0,
      accentColor: accentColor || '#06B6D4',
    });
    const saved = await slide.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE — protected
router.delete('/:id', auth, async (req, res) => {
  try {
    await Slide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;