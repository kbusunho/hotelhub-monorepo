// controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// JWT 토큰 생성 헬퍼 함수
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '1d', // 토큰 유효기간 1일
  });
};

/*
 * @route   POST /api/auth/register
 * @desc    사용자 회원가입
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. 이메일 중복 확인
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: '이미 가입된 이메일입니다.' }] });
    }

    // 2. 새 사용자 생성 (비밀번호는 User.js의 pre('save') 훅에서 자동 암호화됨)
    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    // 3. JWT 토큰 생성
    const token = generateToken(user._id);

    console.log(`신규 사용자 등록: ${email}`);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.error('registerUser 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};

/*
 * @route   POST /api/auth/login
 * @desc    사용자 로그인
 * @access  Public
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. 이메일로 사용자 확인
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: '이메일 또는 비밀번호가 유효하지 않습니다.' }] });
    }

    // 2. 비밀번호 비교 (User.js의 comparePassword 메소드 사용)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: '이메일 또는 비밀번호가 유효하지 않습니다.' }] });
    }

    // 3. JWT 토큰 생성
    const token = generateToken(user._id);

    console.log(`사용자 로그인: ${email}`);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.error('loginUser 컨트롤러 오류:', err.message);
    res.status(500).send('서버 오류');
  }
};