const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4100;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotelhub-management';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('backend-management: MongoDB connected'))
  .catch((err) => console.error('backend-management: MongoDB connection error:', err.message));

app.get('/', (req, res) => res.json({ ok: true, service: 'hotelhub-backend-management' }));

app.listen(PORT, () => console.log(`backend-management listening on ${PORT}`));
