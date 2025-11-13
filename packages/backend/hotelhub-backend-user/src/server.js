// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

// 라우트 파일 임포트
import hotelRoutes from './routes/hotels.js';
// import authRoutes from './routes/auth.js';
// import bookingRoutes from './routes/bookings.js';

// .env 파일 로드 (.env.dev 또는 .env 사용)
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT || 3000;

// --- 미들웨어 설정 ---
// 보안 강화를 위한 Helmet
app.use(helmet()); 
// CORS 설정 (실제 배포 시에는 'http://www.hotelhub.store'만 허용)
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'http://www.hotelhub.store' : 'http://localhost:5173',
  credentials: true,
}));
// JSON 파싱
app.use(express.json()); 
// URL-encoded 파싱
app.use(express.urlencoded({ extended: true }));

// --- API 라우트 설정 ---
// 아키텍처에 따라 사용자 API는 /api 접두사를 가집니다.
app.use('/api/hotels', hotelRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/bookings', bookingRoutes);

// 헬스체크 엔드포인트 (배포 검증용)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 루트 경로 (서버 동작 확인용)
app.get('/', (req, res) => {
  res.send('Hotelhub User Backend Server가 실행 중입니다.');
});

// --- MongoDB 연결 ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB에 성공적으로 연결되었습니다.');
    // DB 연결 성공 시에만 서버 리스닝 시작
    app.listen(PORT, () => {
      console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    });
  })
  .catch(err => {
    console.error('MongoDB 연결 실패:', err);
    process.exit(1);
  });