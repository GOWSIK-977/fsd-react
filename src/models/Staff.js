const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    contact: { type: String },
    availability: {
      type: [String], // e.g. ["Mon","Tue","Wed"]
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', staffSchema);
