import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
// import HotelListPage from './pages/HotelListPage'; // (다음 단계에서 생성)
// import HotelDetailPage from './pages/HotelDetailPage'; // (다음 단계에서 생성)
// import LoginPage from './pages/LoginPage'; // (다음 단계에서 생성)

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* 1. 공통 헤더 */}
      <Header />

      {/* 2. 페이지 컨텐츠 */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/hotels" element={<HotelListPage />} /> */}
          {/* <Route path="/hotel/:id" element={<HotelDetailPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </main>

      {/* 3. 공통 푸터 (예시 이미지의 '구독 서비스' 부분) */}
      <footer className="bg-green-100 p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">구독 서비스 신청해보세요</h2>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 rounded-l-md border border-gray-300 w-80"
          />
          <button className="bg-gray-800 text-white p-3 rounded-r-md">
            Subscribe
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;