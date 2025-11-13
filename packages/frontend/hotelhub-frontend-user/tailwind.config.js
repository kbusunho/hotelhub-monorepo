/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내의 모든 .jsx/.tsx 파일 스캔
  ],
  theme: {
    extend: {
      fontFamily: {
        // (기본 폰트를 Inter로 설정 - 예시)
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}