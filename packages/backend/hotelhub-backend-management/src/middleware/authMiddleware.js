// packages/backend/hotelhub-backend-management/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// [공통] 로그인 확인
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // JWT payload 저장
      next();
    } catch (error) {
      res.status(401).json({ msg: '인증 실패: 토큰이 유효하지 않습니다.' });
    }
  } else {
    res.status(401).json({ msg: '인증 실패: 토큰이 없습니다.' });
  }
};

// [권한] 사업자(business) 확인 미들웨어
export const isBusiness = (req, res, next) => {
  if (req.user && req.user.role === 'business') {
    next();
  } else {
    res.status(403).json({ msg: '접근 권한이 없습니다 (사업자 전용).' });
  }
};

// [권한] 관리자(admin) 확인 미들웨어
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: '접근 권한이 없습니다 (관리자 전용).' });
  }
};