import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Star, ArrowLeft } from 'lucide-react';

// --- Mock Data ---
// 실제 앱에서는 이 데이터가 백엔드 API (/api/hotels)를 통해 MongoDB에서 옵니다.
const mockHotels = [
  {
    id: 1,
    name: '서울 럭셔리 호텔',
    location: '서울, 강남구',
    price: 280000,
    rating: 4.8,
    reviewCount: 1204,
    imageUrl: 'https://placehold.co/400x300/6EE7B7/333?text=Hotel+Image'
  },
  {
    id: 2,
    name: '부산 오션뷰 리조트',
    location: '부산, 해운대구',
    price: 350000,
    rating: 4.9,
    reviewCount: 2340,
    imageUrl: 'https://placehold.co/400x300/A78BFA/333?text=Resort+Image'
  },
  {
    id: 3,
    name: '제주 자연 속 펜션',
    location: '제주, 서귀포시',
    price: 150000,
    rating: 4.6,
    reviewCount: 876,
    imageUrl: 'https://placehold.co/400x300/FBBF24/333?text=Pension+Image'
  },
  {
    id: 4,
    name: '경주 한옥 스테이',
    location: '경주, 황남동',
    price: 180000,
    rating: 4.7,
    reviewCount: 991,
    imageUrl: 'https://placehold.co/400x300/F87171/333?text=Hanok+Stay'
  },
];

// --- 유틸리티 컴포넌트 ---
const IconWrapper = ({ icon: Icon, children }) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
      <Icon size={18} />
    </div>
    {children}
  </div>
);

// --- 세부 컴포넌트 ---

// 1. 호텔 검색 카드
const HotelCard = ({ hotel, onSelectHotel }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row"
      onClick={() => onSelectHotel(hotel)}
    >
      <img 
        src={hotel.imageUrl} 
        alt={hotel.name} 
        className="w-full md:w-1/3 h-48 md:h-full object-cover"
        onError={(e) => { e.target.src = 'https://placehold.co/400x300/CBD5E1/333?text=Image+Error'; }}
      />
      <div className="p-5 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{hotel.name}</h3>
          <p className="text-sm text-gray-500 mb-3 flex items-center">
            <MapPin size={14} className="mr-1" /> {hotel.location}
          </p>
          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="font-bold ml-1">{hotel.rating}</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">({hotel.reviewCount.toLocaleString()} 리뷰)</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-teal-600">
            {hotel.price.toLocaleString()}원
          </span>
          <span className="text-sm text-gray-600"> / 1박</span>
        </div>
      </div>
    </div>
  );
};

// 2. 호텔 상세 정보
const HotelDetail = ({ hotel, onBack }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl animate-fade-in">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        목록으로 돌아가기
      </button>
      <img 
        src={hotel.imageUrl.replace('400x300', '800x400')} 
        alt={hotel.name} 
        className="w-full h-64 object-cover rounded-lg mb-6"
        onError={(e) => { e.target.src = 'https://placehold.co/800x400/CBD5E1/333?text=Image+Error'; }}
      />
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h2>
      <p className="text-md text-gray-600 mb-4 flex items-center">
        <MapPin size={16} className="mr-2" /> {hotel.location}
      </p>
      
      <div className="flex items-center mb-6">
        <div className="flex items-center text-yellow-500">
          <Star size={20} fill="currentColor" />
          <span className="text-xl font-bold ml-2">{hotel.rating}</span>
        </div>
        <span className="text-lg text-gray-600 ml-3">({hotel.reviewCount.toLocaleString()} 리뷰)</span>
      </div>

      <div className="border-y border-gray-200 py-6 my-6">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">객실 정보 (예시)</h4>
        {/* 실제로는 /api/hotels/:id/rooms API 호출 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>스탠다드 더블룸</span>
            <span className="font-medium text-teal-700">{hotel.price.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>디럭스 트윈룸</span>
            <span className="font-medium text-teal-700">{(hotel.price * 1.2).toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>프리미어 스위트</span>
            <span className="font-medium text-teal-700">{(hotel.price * 1.8).toLocaleString()}원</span>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full bg-teal-600 text-white font-bold text-lg py-4 rounded-lg shadow-md hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-300"
        onClick={() => alert('Toss Payments API로 연결됩니다 (프로토타입)')}
      >
        {hotel.price.toLocaleString()}원 예약하기
      </button>
    </div>
  );
};

// 3. 검색 바
const SearchBar = ({ onSearch }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg -mt-16 relative z-10 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <IconWrapper icon={MapPin}>
          <input
            type="text"
            placeholder="어디로 떠나시나요?"
            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            defaultValue="서울"
          />
        </IconWrapper>
        <IconWrapper icon={Calendar}>
          <input
            type="date"
            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-500"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </IconWrapper>
        <IconWrapper icon={Users}>
          <input
            type="number"
            placeholder="인원"
            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            defaultValue="2"
          />
        </IconWrapper>
        <button
          onClick={onSearch}
          className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center shadow-md hover:bg-teal-700 transition-colors duration-300"
        >
          <Search size={20} className="mr-2" />
          검색
        </button>
      </div>
    </div>
  );
};

// --- 사용자 뷰 (메인 페이지) ---
// 실제 앱에서는 이 컴포넌트가 /pages/HomePage.jsx 등이 되고
// App.jsx 에서는 React Router를 설정하게 됩니다.
const UserView = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 컴포넌트 마운트 시 호텔 목록 로드 (API 호출 시뮬레이션)
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    setSelectedHotel(null); // 검색 시 상세 뷰 닫기
    // 실제 앱: const res = await axios.get('/api/hotels', { params: {...} });
    setTimeout(() => {
      setHotels(mockHotels);
      setIsLoading(false);
    }, 500); // 로딩 스피너 시뮬레이션
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* --- 상단 배너 --- */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 h-64 rounded-b-3xl shadow-xl flex items-center justify-center">
        <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-md">
          어떤 여행을 꿈꾸시나요?
        </h1>
      </div>

      {/* --- 검색 바 --- */}
      <SearchBar onSearch={handleSearch} />
      
      {/* --- 컨텐츠 영역 --- */}
      <div className="mt-12">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">호텔을 찾고 있습니다...</p>
          </div>
        ) : selectedHotel ? (
          <HotelDetail hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">추천 호텔</h2>
            {hotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} onSelectHotel={setSelectedHotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// --- 메인 App 컴포넌트 ---
// 이 파일이 hotelhub-frontend-user 패키지의 엔트리포인트 역할을 합니다.
export default function App() {
  // 실제 앱에서는 React Router (<Routes>, <Route>)를 사용하여 
  // / (HomePage), /login, /mypage 등을 라우팅합니다.
  // 이 프로토타입에서는 UserView (홈페이지)만 렌더링합니다.

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* --- 글로벌 네비게이션 (사용자용) --- */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-teal-600">🌿 Hotelhub</span>
          </div>
          {/* TODO: 로그인/회원가입/마이페이지 버튼 
            (예: <UserMenu /> 컴포넌트)
          */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-teal-600 font-medium transition-colors">로그인</button>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">회원가입</button>
          </div>
        </nav>
      </header>

      {/* --- 메인 컨텐츠 영역 --- */}
      <main className="pb-20">
        {/* 실제 앱에서는 여기에 React Router의 <Outlet />이 위치하게 됩니다.
          <Routes>
            <Route path="/" element={<UserView />} />
            <Route path="/hotel/:id" element={<HotelDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        */}
        <UserView />
      </main>

      {/* --- 푸터 --- */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Hotelhub. All rights reserved.</p>
          <p className="mt-1">
            이것은 MERN 스택 프로젝트 프로토타입입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}