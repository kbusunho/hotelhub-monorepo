// controllers/bookingController.js
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import mongoose from 'mongoose';

/*
 * @route   POST /api/bookings
 * @desc    새 예약 생성 (결제 전 'pending' 상태)
 * @access  Private (로그인 사용자)
 */
export const createBooking = async (req, res) => {
  const {
    hotelId,
    roomId,
    checkIn,
    checkOut,
    guests,
    totalPrice,
  } = req.body;

  try {
    // 1. 호텔과 객실 정보가 유효한지 확인 (간단한 예시)
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ msg: '호텔을 찾을 수 없습니다.' });
    }
    
    // Hotel.rooms (서브 다큐먼트 배열)에서 roomId로 객실 찾기
    const room = hotel.rooms.find(r => r._id.toString() === roomId);
    if (!room) {
      return res.status(404).json({ msg: '객실을 찾을 수 없습니다.' });
    }
    
    // TODO: 2. 해당 날짜(checkIn, checkOut)에 객실(roomId)이 이미 예약되었는지 확인
    // (재고 관리 로직 - 이 부분이 실제 서비스의 핵심입니다)
    // const existingBooking = await Booking.findOne({ ... });
    // if (existingBooking) {
    //   return res.status(400).json({ msg: '해당 날짜에 예약이 불가능합니다.' });
    // }

    // 3. 새 예약 생성 (상태: pending)
    const booking = new Booking({
      user: req.user.id, // protect 미들웨어에서 넣어준 사용자 ID
      hotel: hotelId,
      room: roomId,
      roomName: room.name, // 찾은 객실 이름 저장
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      totalPrice,
      status: 'pending', // 결제 대기
    });

    const createdBooking = await booking.save();

    console.log(`새 예약 생성됨 (Pending): ${createdBooking._id}, User: ${req.user.email}`);
    res.status(201).json(createdBooking);

  } catch (err) {
    console.error('createBooking 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};

/*
 * @route   GET /api/bookings/mybookings
 * @desc    내 예약 목록 조회
 * @access  Private (로그인 사용자)
 */
export const getMyBookings = async (req, res) => {
  try {
    // protect 미들웨어에서 받은 req.user.id로 내 예약 목록 찾기
    // 호텔 정보(이름, 위치, 이미지)도 함께 populate
    const bookings = await Booking.find({ user: req.user.id })
      .populate('hotel', 'name location imageUrl')
      .sort({ createdAt: -1 }); // 최신순으로 정렬

    if (!bookings) {
      return res.status(404).json({ msg: '예약 내역을 찾을 수 없습니다.' });
    }
    
    console.log(`내 예약 목록 조회: User ${req.user.email}`);
    res.status(200).json(bookings);

  } catch (err) {
    console.error('getMyBookings 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};

// TODO:
// 1. GET /api/bookings/:id : 특정 예약 상세 조회 (본인 또는 관리자)
// 2. PUT /api/bookings/:id/pay : (Toss Payments) 결제 완료 처리
// 3. PUT /api/bookings/:id/cancel : 예약 취소 처리