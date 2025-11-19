const express = require('express');
const Staff = require('../models/Staff');

const router = express.Router();

// GET /api/staff
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find().sort({ name: 1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching staff' });
  }
});

// POST /api/staff
router.post('/', async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ message: 'Error creating staff', error: err.message });
  }
});

// PUT /api/staff/:id
router.put('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: 'Error updating staff', error: err.message });
  }
});

// DELETE /api/staff/:id
router.delete('/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting staff', error: err.message });
  }
});

module.exports = router;
