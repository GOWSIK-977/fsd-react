const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const staffRoutes = require('./routes/staff');
const dutyRoutes = require('./routes/duties');

app.use('/api/staff', staffRoutes);
app.use('/api/duties', dutyRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'KEC Scheduler backend running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
