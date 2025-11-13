// packages/backend/hotelhub-backend-management/src/routes/apiRoutes.js
import express from 'express';
import { protect, isBusiness, isAdmin } from '../middleware/authMiddleware.js';

// 컨트롤러 임포트
import { createMyHotel, getMyHotels } from '../controllers/businessController.js';
import { getAllUsers, getAllHotels } from '../controllers/adminController.js';

const router = express.Router();

// --- 1. Business API Routes (/business/api) ---
const businessRouter = express.Router();

// '/business/api' 경로로 들어오는 모든 요청은
// 1. 로그인했는지 (protect)
// 2. 'business' 역할인지 (isBusiness) 확인
businessRouter.use(protect, isBusiness); 

businessRouter.get('/hotels', getMyHotels);       // GET /business/api/hotels
businessRouter.post('/hotels', createMyHotel);    // POST /business/api/hotels
// businessRouter.get('/bookings', getMyBookings);
// businessRouter.get('/stats', getMyStats);

// --- 2. Admin API Routes (/admin/api) ---
const adminRouter = express.Router();

// '/admin/api' 경로로 들어오는 모든 요청은
// 1. 로그인했는지 (protect)
// 2. 'admin' 역할인지 (isAdmin) 확인
adminRouter.use(protect, isAdmin);

adminRouter.get('/users', getAllUsers);     // GET /admin/api/users
adminRouter.get('/hotels', getAllHotels);   // GET /admin/api/hotels
// adminRouter.put('/users/:id/approve', approveBusinessUser);
// adminRouter.delete('/reviews/:id', deleteReview);

// --- 3. 메인 라우터에 등록 ---
router.use('/business/api', businessRouter);
router.use('/admin/api', adminRouter);

export default router;