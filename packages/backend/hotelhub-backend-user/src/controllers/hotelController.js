// controllers/hotelController.js
import Hotel from '../models/Hotel.js';

/*
 * @route   GET /api/hotels
 * @desc    호텔 목록 검색 및 조회 (필터링, 페이지네이션)
 * @access  Public
 */
export const getHotels = async (req, res) => {
  try {
    // 필터링: 쿼리에서 'location' 파라미터가 있으면 검색 조건에 추가
    const { location } = req.query;
    
    const filter = {};
    if (location) {
      // location 필드에 대해 '서울' 같은 값이 포함되어 있는지 대소문자 구분 없이 검색 (정규식 사용)
      filter.location = new RegExp(location, 'i');
    }

    // TODO: 날짜(checkIn, checkOut) 및 인원(guests) 필터링 로직 추가
    // 이 로직은 예약 가능한 객실(rooms) 재고를 확인해야 하므로 더 복잡합니다.

    // 페이지네이션 (추후 구현)
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // DB에서 호텔 검색
    const hotels = await Hotel.find(filter); // .limit(limit).skip(skip);

    // TODO: 현재 mock data를 사용하는 프론트엔드와 호환을 위해
    // 실제 DB 데이터가 없을 경우 mock data를 반환 (개발 초기 단계용)
    if (hotels.length === 0 && !location) {
      console.log('DB에 데이터 없음. 임시 Mock 데이터를 반환합니다.');
      return res.status(200).json([
        { id: 1, _id: 'mock1', name: '서울 럭셔리 호텔', location: '서울, 강남구', price: 280000, rating: 4.8, reviewCount: 1204, imageUrl: 'https://placehold.co/400x300/6EE7B7/333?text=Hotel+Image' },
        { id: 2, _id: 'mock2', name: '부산 오션뷰 리조트', location: '부산, 해운대구', price: 350000, rating: 4.9, reviewCount: 2340, imageUrl: 'https://placehold.co/400x300/A78BFA/333?text=Resort+Image' },
      ]);
    }

    console.log(`GET /api/hotels 호출됨 (필터: ${JSON.stringify(filter)})`);
    res.status(200).json(hotels);

  } catch (err) {
    console.error('getHotels 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};

/*
 * @route   GET /api/hotels/:id
 * @desc    특정 호텔 상세 정보 조회
 * @access  Public
 */
export const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    // Mock 데이터 ID 처리 (개발 초기 단계용)
    if (id === 'mock1' || id === 'mock2') {
      console.log(`GET /api/hotels/${id} (Mock ID) 호출됨`);
      const mockHotel = id === 'mock1' ? 
        { id: 1, _id: 'mock1', name: '서울 럭셔리 호텔', location: '서울, 강남구', price: 280000, rating: 4.8, reviewCount: 1204, imageUrl: 'https://placehold.co/400x300/6EE7B7/333?text=Hotel+Image' } :
        { id: 2, _id: 'mock2', name: '부산 오션뷰 리조트', location: '부산, 해운대구', price: 350000, rating: 4.9, reviewCount: 2340, imageUrl: 'https://placehold.co/400x300/A78BFA/333?text=Resort+Image' };
      return res.status(200).json(mockHotel);
    }

    // 실제 DB 조회 (Mongoose의 ObjectId 형식인지 확인)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: '유효하지 않은 호텔 ID입니다.' });
    }

    // DB에서 호텔 ID로 검색. 리뷰 작성자의 이름('name')도 함께 가져옴 (populate)
    const hotel = await Hotel.findById(id).populate('reviews.user', 'name');
    
    if (!hotel) {
      return res.status(404).json({ msg: '호텔을 찾을 수 없습니다.' });
    }

    console.log(`GET /api/hotels/${id} 호출됨`);
    res.status(200).json(hotel);

  } catch (err) {
    console.error('getHotelById 컨트롤러 오류:', err.message);
    // Mongoose의 CastError (예: ObjectId 형식 오류) 처리
    if (err.name === 'CastError') {
      return res.status(404).json({ msg: '호텔을 찾을 수 없습니다.' });
    }
    res.status(500).send('서버 오류');
  }
};