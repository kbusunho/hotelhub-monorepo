// routes/auth.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../middleware/validators.js';

const router = express.Router();

/*
 * @route   POST /api/auth/register
 * @desc    사용자 회원가입
 * @access  Public
 */
// registerValidator가 먼저 실행되어 유효성 검사를 통과해야 registerUser가 실행됨
router.post('/register', registerValidator, registerUser);

/*
 * @route   POST /api/auth/login
 * @desc    사용자 로그인
 * @access  Public
 */
// loginValidator가 먼저 실행되어 유효성 검사를 통과해야 loginUser가 실행됨
router.post('/login', loginValidator, loginUser);

export default router;