// routes/bookings.js
import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
// TODO: 예약 생성용 유효성 검사기 (validators.js)

const router = express.Router();

/*
 * @route   POST /api/bookings
 * @desc    새 예약 생성
 * @access  Private
 */
// 'protect' 미들웨어를 통과해야만 (로그인해야만) createBooking 실행
router.post('/', protect, createBooking);

/*
 * @route   GET /api/bookings/mybookings
 * @desc    내 예약 목록 조회
 * @access  Private
 */
// 'protect' 미들웨어를 통과해야만 (로그인해야만) getMyBookings 실행
router.get('/mybookings', protect, getMyBookings);


// TODO:
// router.get('/:id', protect, getBookingById);
// router.put('/:id/pay', protect, updateBookingToPaid);
// router.put('/:id/cancel', protect, cancelBooking);

export default router;