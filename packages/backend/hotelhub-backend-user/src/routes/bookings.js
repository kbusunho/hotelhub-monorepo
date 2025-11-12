const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, bookingController.create);
router.get('/me', auth, bookingController.getByUser);

module.exports = router;
