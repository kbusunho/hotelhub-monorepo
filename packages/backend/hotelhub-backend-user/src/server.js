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

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotelhub';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('backend-user: MongoDB connected'))
  .catch((err) => console.error('backend-user: MongoDB connection error:', err.message));

app.get('/', (req, res) => res.json({ ok: true, service: 'hotelhub-backend-user' }));

app.listen(PORT, () => console.log(`backend-user listening on ${PORT}`));
