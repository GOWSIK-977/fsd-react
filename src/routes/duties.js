const express = require('express');
const Duty = require('../models/Duty');
const Staff = require('../models/Staff');

const router = express.Router();

// GET /api/duties
router.get('/', async (req, res) => {
  try {
    const { staffId, date, status } = req.query;
    const filter = {};
    if (staffId) filter.staff = staffId;
    if (date) filter.date = date;
    if (status) filter.status = status;

    const duties = await Duty.find(filter)
      .populate('staff', 'name department')
      .sort({ date: 1, createdAt: -1 });

    res.json(duties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching duties' });
  }
});

// POST /api/duties
router.post('/', async (req, res) => {
  try {
    const { staffId, date, timeSlot, dutyType, description, assignedBy } = req.body;

    if (!staffId || !date || !timeSlot || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    const conflict = await Duty.findOne({
      staff: staffId,
      date,
      timeSlot,
      status: { $ne: 'Completed' }
    });

    if (conflict) {
      return res.status(409).json({
        message: 'This staff member already has a duty for that date and time slot'
      });
    }

    const duty = await Duty.create({
      staff: staff._id,
      staffName: staff.name,
      department: staff.department,
      date,
      timeSlot,
      dutyType,
      description,
      assignedBy
    });

    res.status(201).json(duty);
  } catch (err) {
    res.status(400).json({ message: 'Error creating duty', error: err.message });
  }
});

// PUT /api/duties/:id
router.put('/:id', async (req, res) => {
  try {
    const duty = await Duty.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!duty) return res.status(404).json({ message: 'Duty not found' });
    res.json(duty);
  } catch (err) {
    res.status(400).json({ message: 'Error updating duty', error: err.message });
  }
});

// DELETE /api/duties/:id
router.delete('/:id', async (req, res) => {
  try {
    const duty = await Duty.findByIdAndDelete(req.params.id);
    if (!duty) return res.status(404).json({ message: 'Duty not found' });
    res.json({ message: 'Duty deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting duty', error: err.message });
  }
});

module.exports = router;
