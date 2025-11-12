import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validators.js'; // (validators.js는 다음 단계에서 만듭니다)

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', validateLogin, loginUser);

export default router;