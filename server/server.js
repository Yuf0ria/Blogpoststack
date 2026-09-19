const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: ["http://localhost:5173"], //reminding myself to put my domain name here aifsgsgh
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/slides', require('./routes/slide'));
app.use('/api/projects', require('./routes/projects'));

app.get('/', (req, res) => res.send('Backend is running'));
app.get('/api/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
});

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err.message));