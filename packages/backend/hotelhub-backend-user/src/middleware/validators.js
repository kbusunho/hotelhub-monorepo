// middleware/validators.js
import { body, validationResult } from 'express-validator';

// 유효성 검사 오류를 처리하는 핸들러
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 회원가입 유효성 검사 규칙
export const registerValidator = [
  body('name', '이름을 입력해주세요.').notEmpty().trim(),
  body('email', '유효한 이메일을 입력해주세요.').isEmail(),
  body('password', '비밀번호는 최소 6자 이상이어야 합니다.').isLength({ min: 6 }),
  handleValidationErrors, // 오류 처리 핸들러 실행
];

// 로그인 유효성 검사 규칙
export const loginValidator = [
  body('email', '유효한 이메일을 입력해주세요.').isEmail(),
  body('password', '비밀번호를 입력해주세요.').notEmpty(),
  handleValidationErrors, // 오류 처리 핸들러 실행
];