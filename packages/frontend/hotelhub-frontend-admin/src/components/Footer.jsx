import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-emerald-50 border-t mt-12 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-bold text-teal-700">관리자 대시보드</h4>
            <p className="text-sm text-gray-600 mt-2">사이트 공지/신고 처리 및 승인 업무를 수행합니다.</p>
          </div>
          <div className="md:col-span-2 flex items-center">
            <input className="border rounded-l-md p-3 w-full" placeholder="관리자 이메일을 입력하세요" />
            <button className="bg-teal-600 text-white px-4 py-3 rounded-r-md">전송</button>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-500 text-center">© {new Date().getFullYear()} Hotelhub</div>
      </div>
    </footer>
  );
}
