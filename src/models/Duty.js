const mongoose = require('mongoose');

const dutySchema = new mongoose.Schema(
  {
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    staffName: String,
    department: String,
    date: { type: String, required: true }, // YYYY-MM-DD
    timeSlot: { type: String, required: true },
    dutyType: {
      type: String,
      enum: ['Academic', 'Administrative', 'Examination', 'Event', 'Other'],
      default: 'Academic'
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['Assigned', 'Completed', 'Cancelled'],
      default: 'Assigned'
    },
    assignedBy: String
  },
  { timestamps: true }
);

// For conflict checking
dutySchema.index({ staff: 1, date: 1, timeSlot: 1 });

module.exports = mongoose.model('Duty', dutySchema);
