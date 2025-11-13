// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // 예약한 사용자 (로그인한 사용자)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // 예약한 호텔
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  // 예약한 객실 (Hotel 모델의 rooms 서브다큐먼트 ID)
  room: {
    type: mongoose.Schema.Types.ObjectId, 
    // ref: 'Hotel.rooms' - 서브다큐먼트 참조는 이렇게 직접 하지 않음.
    // 대신 객실 이름, 가격 등을 여기에 복사 저장할 수 있음.
    required: true,
  },
  roomName: { type: String, required: true }, // 예: "스탠다드 더블룸"
  
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  // 결제 정보 (Toss Payments API 연동 후)
  paymentResult: {
    id: String, // Toss Payment Key
    status: String, // 'PAID', 'CANCELLED'
    amount: Number,
    update_time: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  // 예약 상태
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending', // 결제 완료 시 'confirmed'로 변경
  },
  
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;