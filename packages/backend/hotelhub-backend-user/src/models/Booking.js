const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  room: String,
  checkIn: Date,
  checkOut: Date,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
