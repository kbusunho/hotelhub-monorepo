// models/Hotel.js
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  // ... 기타 객실 정보
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '호텔 이름은 필수입니다.'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, '위치는 필수입니다.'],
  },
  address: {
    type: String,
  },
  // 메인 이미지
  imageUrl: {
    type: String,
    required: true,
  },
  // 상세 이미지 갤러리 (S3 URL 배열)
  imageGallery: [String],
  description: {
    type: String,
  },
  // 1박 기본 가격
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  amenities: [String], // 예: ["wifi", "pool", "parking"]
  
  // 객실 정보 (내장 문서 배열)
  rooms: [roomSchema],
  
  // 리뷰 (내장 문서 배열)
  reviews: [reviewSchema],

  // 사업자 (이 호텔을 등록한 사업자)
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessUser', // 'BusinessUser' 모델 (management 백엔드) 또는 'User' 모델
    required: true,
  },
}, { timestamps: true }); // createdAt, updatedAt 자동 생성

// 텍스트 검색을 위한 인덱스 (필요시)
// hotelSchema.index({ name: 'text', location: 'text' });

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
