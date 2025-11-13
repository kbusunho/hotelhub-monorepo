// packages/backend/hotelhub-backend-management/src/controllers/adminController.js
import User from '../models/User.js';
import Hotel from '../models/Hotel.js';

/*
 * @route   GET /admin/api/users
 * @desc    관리자가 모든 사용자 목록 조회
 * @access  Private (Admin)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // 비밀번호 제외
    console.log(`관리자: 모든 사용자 목록 조회 (요청자: ${req.user.email})`);
    res.status(200).json(users);
  } catch (err) {
    console.error('getAllUsers 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};

/*
 * @route   GET /admin/api/hotels
 * @desc    관리자가 모든 호텔 목록 조회
 * @access  Private (Admin)
 */
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({}).populate('owner', 'name email'); // 사업자 정보 포함
    console.log(`관리자: 모든 호텔 목록 조회 (요청자: ${req.user.email})`);
    res.status(200).json(hotels);
  } catch (err) {
    console.error('getAllHotels 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};


// TODO:
// - PUT /admin/api/users/:id/approve (사업자 승인)
// - DELETE /admin/api/users/:id (사용자 삭제)
// - DELETE /admin/api/hotels/:id (호텔 삭제)
// - DELETE /admin/api/reviews/:id (리뷰 강제 삭제)