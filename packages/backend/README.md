# Backend Packages

이 폴더에는 두 개의 백엔드 패키지가 있습니다.

- `hotelhub-backend-user` — 사용자 API (예약/검색/결제)
- `hotelhub-backend-management` — 사업자/관리자 공용 API

공통 빠른 실행

```powershell
# 패키지별로 설치 후 dev 실행
cd packages\backend\hotelhub-backend-user
npm install
npm run dev

# 또는
cd packages\backend\hotelhub-backend-management
npm install
npm run dev
```

환경 변수 샘플은 각 패키지의 `.env.example` 파일을 참조하세요.