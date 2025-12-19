const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const s = new Subscriber({ email });
    await s.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const list = await Subscriber.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
