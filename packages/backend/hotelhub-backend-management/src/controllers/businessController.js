// packages/backend/hotelhub-backend-management/src/controllers/businessController.js
import Hotel from '../models/Hotel.js';

/*
 * @route   POST /business/api/hotels
 * @desc    사업자가 새 호텔 등록
 * @access  Private (Business)
 */
export const createMyHotel = async (req, res) => {
  const { name, location, price, description, amenities, rooms } = req.body;
  try {
    // protect 미들웨어를 통과했으므로 req.user.id는 사업자 ID
    const ownerId = req.user.id; 

    // TODO: 유효성 검사 (각 필드가 올바른지)

    const newHotel = new Hotel({
      name,
      location,
      price,
      description,
      amenities: amenities || [],
      rooms: rooms || [],
      imageUrl: 'https://placehold.co/800x400/333/FFF?text=Hotel+Image', // 임시 이미지
      owner: ownerId,
    });

    const createdHotel = await newHotel.save();
    
    console.log(`새 호텔 등록됨: ${createdHotel.name}, Owner: ${req.user.email}`);
    res.status(201).json(createdHotel);

  } catch (err) {
    console.error('createMyHotel 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};

/*
 * @route   GET /business/api/hotels
 * @desc    사업자가 등록한 호텔 목록 조회
 * @access  Private (Business)
 */
export const getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user.id });
    
    if (!hotels) {
      return res.status(404).json({ msg: '등록된 호텔이 없습니다.' });
    }
    
    console.log(`내 호텔 목록 조회: ${req.user.email}`);
    res.status(200).json(hotels);

  } catch (err) {
    console.error('getMyHotels 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};

// TODO:
// - PUT /business/api/hotels/:id (내 호텔 정보 수정)
// - DELETE /business/api/hotels/:id (내 호텔 삭제)
// - GET /business/api/bookings (내 호텔의 예약 내역 조회)
// - GET /business/api/stats (내 호텔 매출 통계)