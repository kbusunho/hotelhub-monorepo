const Hotel = require('../models/Hotel');

exports.search = async (req, res) => {
  const q = req.query.q || '';
  try {
    const hotels = await Hotel.find({ name: new RegExp(q, 'i') }).limit(20);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
