// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  let token;

  // 'Authorization' 헤더에서 Bearer 토큰 확인
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 'Bearer ' 부분을 제거하고 토큰만 추출
      token = req.headers.authorization.split(' ')[1];

      // 1. 토큰 검증 (Verify)
      const decoded = jwt.verify(token, JWT_SECRET);

      // 2. 토큰 페이로드(id)를 사용해 DB에서 사용자 정보 조회
      //    (비밀번호는 제외 '-password')
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: '인증 실패: 사용자를 찾을 수 없습니다.' });
      }

      // 3. req.user에 사용자 정보를 담아 다음 미들웨어로 전달
      next();

    } catch (error) {
      console.error('토큰 검증 오류:', error.message);
      // 토큰이 유효하지 않은 경우 (만료 포함)
      res.status(401).json({ msg: '인증 실패: 토큰이 유효하지 않습니다.' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: '인증 실패: 토큰이 없습니다.' });
  }
};

// TODO: 관리자(admin) 또는 사업자(business) 권한 확인 미들웨어 (필요시)
// export const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ msg: '접근 권한이 없습니다 (관리자 전용).' });
//   }
// };