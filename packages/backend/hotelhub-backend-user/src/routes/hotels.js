// routes/hotels.js
import express from 'express';
import Hotel from '../models/Hotel.js';
// import { getHotels, getHotelById } from '../controllers/hotelController.js';

const router = express.Router();

// Mock Data (컨트롤러 분리 전 임시 데이터)
const mockHotels = [
  { id: 1, name: '서울 럭셔리 호텔', location: '서울, 강남구', price: 280000, rating: 4.8, reviewCount: 1204, imageUrl: 'https://placehold.co/400x300/6EE7B7/333?text=Hotel+Image' },
  { id: 2, name: '부산 오션뷰 리조트', location: '부산, 해운대구', price: 350000, rating: 4.9, reviewCount: 2340, imageUrl: 'https://placehold.co/400x300/A78BFA/333?text=Resort+Image' },
];

/*
 * @route   GET /api/hotels
 * @desc    호텔 목록 검색 및 조회 (필터링 포함)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // TODO: 쿼리 파라미터(location, date, guests) 기반으로 DB에서 호텔 검색
    // const { location, checkIn, checkOut, guests } = req.query;
    
    // 임시: Mock 데이터 반환 (실제로는 Hotel.find() 사용)
    // const hotels = await Hotel.find({ location: location });
    
    // 컨트롤러 분리 전 임시 응답
    console.log('GET /api/hotels 호출됨');
    res.status(200).json(mockHotels);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

/*
 * @route   GET /api/hotels/:id
 * @desc    특정 호텔 상세 정보 조회
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    // 임시: Mock 데이터에서 ID로 찾아 반환
    const hotel = mockHotels.find(h => h.id === parseInt(req.params.id));

    // 실제 DB 조회 로직
    // const hotel = await Hotel.findById(req.params.id).populate('reviews.user', 'name');
    
    if (!hotel) {
      return res.status(404).json({ msg: '호텔을 찾을 수 없습니다.' });
    }

    console.log(`GET /api/hotels/${req.params.id} 호출됨`);
    res.status(200).json(hotel);

  } catch (err) {
    // Mongoose의 유효하지 않은 ObjectId 형식 오류 처리
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '호텔을 찾을 수 없습니다.' });
    }
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

export default router;