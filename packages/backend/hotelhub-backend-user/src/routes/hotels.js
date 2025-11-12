const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.search);
router.get('/:id', hotelController.getById);

module.exports = router;
