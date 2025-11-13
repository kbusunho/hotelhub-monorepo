import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';

function HomePage() {
  // 검색창 상태 관리 (나중에 Context API로 분리 가능)
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: 검색 로직 구현 (예: /hotels?dest=... 로 이동)
    console.log({ destination, checkIn, checkOut, guests });
  };

  return (
    <div>
      {/* 1. 상단 영웅(Hero) 섹션 (image_e072c7.png 참고) */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x600/333/FFF?text=Beautiful+Hotel+Pool')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">
            플러스 호텔 및 다양한
            <br />
            숙소를 확인하세요!
          </h1>
          <p className="text-xl mb-8">
            언제든 이 멋진 휴가를 다시 예약하고 완벽한 휴가를 보내세요
          </p>

          {/* 검색창 */}
          <form 
            onSubmit={handleSearch}
            className="bg-white p-4 rounded-full shadow-lg grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-4xl"
          >
            {/* 목적지 */}
            <div className="flex items-center col-span-1 lg:col-span-2">
              <MapPin className="text-gray-500 mx-3" />
              <input
                type="text"
                placeholder="어디로 여행가시나요? (예: 서울, 제주)"
                className="w-full p-2 outline-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* 체크인 */}
            <div className="flex items-center border-l">
              <Calendar className="text-gray-500 mx-3" />
              <input
                type="date"
                className="w-full p-2 outline-none text-gray-700"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            {/* 체크아웃 */}
            <div className="flex items-center border-l">
              <Calendar className="text-gray-500 mx-3" />
              <input
                type="date"
                className="w-full p-2 outline-none text-gray-700"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            {/* 검색 버튼 */}
            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded-full flex items-center justify-center font-bold hover:bg-green-700 transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* 2. "여행에 빠지다" 섹션 (image_e072c7.png 참고) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">여행에 빠지다</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 가상 데이터 카드 */}
          {['루브르', '파리', '런던', '글래스고'].map((city, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300">
              <img src={`https://placehold.co/400x300/555/FFF?text=${city}`} alt={city} className="w-full h-48 object-cover" />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-xl mb-1">{city}</h3>
                <p className="text-gray-600">₩ 150,000 부터</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;