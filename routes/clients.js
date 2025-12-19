const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.get('/', async (req, res) => {
  const list = await Client.find().sort({ createdAt: -1 });
  res.json(list);
});

router.post('/', async (req, res) => {
  try {
    const { name, designation, description, image } = req.body;
    const c = new Client({ name, designation, description, image });
    await c.save();
    res.json(c);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
