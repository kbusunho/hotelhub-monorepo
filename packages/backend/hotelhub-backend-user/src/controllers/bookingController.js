const Booking = require('../models/Booking');

exports.create = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user._id });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
