# Hotelhub - 설치 및 실행 가이드

루트에서 워크스페이스 의존성을 설치하고 각 패키지를 실행하는 방법입니다.

필수: Node.js LTS, npm

1) 루트에서 의존성 설치 (워킹 디렉터리: C:\hotelhub-monorepo)

```powershell
npm install
```

2) 백엔드 실행

```powershell
cd packages\backend\hotelhub-backend-user
npm run dev

cd ..\hotelhub-backend-management
npm run dev
```

3) 프런트엔드 실행

```powershell
cd packages\frontend\hotelhub-frontend-user
npm run dev
```

각 프런트엔드는 별도 포트에서 실행됩니다.

4) 보안 취약점 확인

```powershell
npm audit
npm audit fix
```

-- 끝 --
