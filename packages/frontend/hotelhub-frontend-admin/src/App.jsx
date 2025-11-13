import React from 'react'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-teal-600 font-bold text-2xl">🌿 Hotelhub</div>
          <div className="text-sm text-gray-600">관리자 대시보드</div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-4">관리자 대시보드</h1>
        <p className="text-gray-600 mb-6">신고/리뷰 처리, 사업자 승인 및 통계 관리 페이지입니다.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-xl shadow">리뷰 신고</div>
          <div className="p-6 bg-white rounded-xl shadow">사업자 승인</div>
          <div className="p-6 bg-white rounded-xl shadow">통계</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
