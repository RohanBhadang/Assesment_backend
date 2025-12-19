const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  const list = await Project.find().sort({ createdAt: -1 });
  res.json(list);
});

router.post('/', async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const p = new Project({ name, description, image });
    await p.save();
    res.json(p);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
