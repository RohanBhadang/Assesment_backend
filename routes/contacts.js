const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    const c = new Contact({ fullName, email, mobile, city });
    await c.save();
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  const list = await Contact.find().sort({ createdAt: -1 });
  res.json(list);
});

module.exports = router;
