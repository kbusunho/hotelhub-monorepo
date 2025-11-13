# Frontend Packages

여기에는 세 개의 React 기반 프론트엔드가 있습니다.

- `hotelhub-frontend-user` — 사용자 사이트 (예약/검색/리스트)
- `hotelhub-frontend-business` — 사업자 대시보드
- `hotelhub-frontend-admin` — 관리자 대시보드

빠른 실행

```powershell
cd packages\frontend\hotelhub-frontend-user
npm install
npm run dev
```

각 패키지별로 `package.json`에 `dev` 스크립트가 정의되어 있습니다. `.env.example`를 참고해 환경 변수 파일을 복사하여 사용하세요.