import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-emerald-50 border-t mt-12 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-bold text-teal-700">구독서비스 신청해보세요</h4>
            <p className="text-sm text-gray-600 mt-2">최신 호텔 소식과 할인 혜택을 받아보세요.</p>
          </div>
          <div className="md:col-span-2 flex items-center">
            <input className="border rounded-l-md p-3 w-full" placeholder="이메일을 입력하세요" />
            <button className="bg-teal-600 text-white px-4 py-3 rounded-r-md">구독</button>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-500 text-center">© {new Date().getFullYear()} Hotelhub</div>
      </div>
    </footer>
  );
}
