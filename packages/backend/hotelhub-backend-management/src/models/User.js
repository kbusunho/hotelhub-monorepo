// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름은 필수입니다.'],
  },
  email: {
    type: String,
    required: [true, '이메일은 필수입니다.'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, '유효하지 않은 이메일 주소입니다.'],
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다.'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'business', 'admin'], // 3계층 사용자 역할
    default: 'user',
  },
  // TODO: 포인트, 쿠폰, 예약 내역 등
  
}, { timestamps: true });

// 비밀번호 저장 전, 암호화 (Hashing) 처리
userSchema.pre('save', async function(next) {
  // 비밀번호가 변경되었을 때만 해싱 실행
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 비밀번호 비교 메소드
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
