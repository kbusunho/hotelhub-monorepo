// packages/backend/hotelhub-backend-management/src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

// 라우트 파일 임포트
import apiRoutes from './routes/apiRoutes.js';

// .env 파일 로드 (user 백엔드와 동일한 .env 파일을 공유할 수 있음)
dotenv.config();

const app = express();
// User 백엔드(3000)와 다른 포트 사용
const PORT = process.env.MANAGEMENT_PORT || 3001; 

// --- 미들웨어 설정 ---
app.use(helmet());
app.use(cors({
  // 이 백엔드는 사업자/관리자 프론트엔드 도메인만 허용
  origin: [
    'http://localhost:5174', // 예: business-frontend
    'http://localhost:5175'  // 예: admin-frontend
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API 라우트 설정 ---
// 모든 사업자/관리자 API는 이 라우트 파일을 통과
app.use('/', apiRoutes); 

// 헬스체크 엔드포인트
app.get('/health', (req, res) => {
  res.status(200).send('OK (Management Server)');
});

// 루트 경로
app.get('/', (req, res) => {
  res.send('Hotelhub Management Backend Server가 실행 중입니다.');
});

// --- MongoDB 연결 ---
// User 백엔드와 동일한 DB에 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('[Management] MongoDB에 성공적으로 연결되었습니다.');
    app.listen(PORT, () => {
      console.log(`[Management] 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    });
  })
  .catch(err => {
    console.error('[Management] MongoDB 연결 실패:', err);
    process.exit(1);
  });