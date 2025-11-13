# Hotelhub Monorepo

로컬 개발 및 배포를 위한 monorepo 템플릿입니다.

## 개요
- 사용자 프론트엔드: `packages/frontend/hotelhub-frontend-user`
- 사업자 프론트엔드: `packages/frontend/hotelhub-frontend-business`
- 관리자 프론트엔드: `packages/frontend/hotelhub-frontend-admin`
- 사용자 백엔드(API): `packages/backend/hotelhub-backend-user`  (예약/결제/리뷰)
- 통합 관리 백엔드(API): `packages/backend/hotelhub-backend-management` (사업자/관리자 기능)

## 로컬 빠른 시작
루트에서 workspace 의존성 설치 후 각 패키지에서 실행합니다.

```powershell
# 루트에서 (Windows PowerShell)
cd c:\hotelhub-monorepo
npm install
# 각 패키지에서 실행 (예)
cd packages\backend\hotelhub-backend-user; npm run dev
cd ..\..\backend\hotelhub-backend-management; npm run dev
cd ..\..\frontend\hotelhub-frontend-user; npm run dev
```

## 배포 구조 요약
- 사용자 페이지: `/` → `hotelhub-frontend-user`
- 사업자 페이지: `/business` → `hotelhub-frontend-business`
- 관리자 페이지: `/admin` → `hotelhub-frontend-admin`
- 사용자 API: `/api` → `hotelhub-backend-user`
- 사업자/관리자 API: `/business/api`, `/admin/api` → `hotelhub-backend-management`

## 환경 변수
각 패키지 루트에 `.env.dev`가 존재합니다. 배포 시 `.env.prod` 또는 GitHub Secrets로 관리하세요.

## CI/CD
- GitHub Actions로 Frontend 빌드 후 S3 + CloudFront 배포
- Backend는 EC2에 CodeDeploy/PM2로 재시작

---
원하시면 각 패키지의 README 내용을 더 상세히 채우거나, ESLint/CI 템플릿을 추가해 드리겠습니다.