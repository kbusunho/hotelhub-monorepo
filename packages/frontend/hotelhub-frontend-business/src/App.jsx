import React from 'react'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-teal-600 font-bold text-2xl">🌿 Hotelhub</div>
          <div className="text-sm text-gray-600">사업자 대시보드</div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-4">사업자 대시보드</h1>
        <p className="text-gray-600 mb-6">호텔 등록 / 객실 관리 / 예약 확인 등 사업자 기능을 이곳에서 관리합니다.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-xl shadow">호텔 등록</div>
          <div className="p-6 bg-white rounded-xl shadow">객실 관리</div>
          <div className="p-6 bg-white rounded-xl shadow">예약 / 매출</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
