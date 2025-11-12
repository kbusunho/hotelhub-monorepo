const Hotel = require('../../hotelhub-backend-user/src/models/Hotel');

exports.createHotel = async (req, res) => {
  try {
    const h = await Hotel.create(req.body);
    res.status(201).json(h);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.stats = async (req, res) => {
  // Placeholder for revenue/stats logic
  res.json({ revenue: 0 });
};
