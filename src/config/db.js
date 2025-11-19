const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Prefer value from .env, but fall back to a sensible local default
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kec_scheduler';

    if (typeof uri !== 'string' || !uri) {
      throw new Error('MONGODB_URI is not set and no valid fallback URI is available');
    }

    console.log('ℹ️  Connecting to MongoDB with URI:', uri);
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
