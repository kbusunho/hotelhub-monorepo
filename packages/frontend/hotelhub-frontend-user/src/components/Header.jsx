import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, User, LogIn } from 'lucide-react'; // 아이콘

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 1. 로고 */}
          <Link to="/" className="text-3xl font-bold text-green-600">
            <div className="flex items-center gap-2">
              <Hotel size={32} />
              <span>Hotelhub</span>
            </div>
          </Link>

          {/* 2. 내비게이션 링크 */}
          <div className="flex items-center space-x-6">
            <Link
              to="/my-page"
              className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <User size={20} className="mr-1" />
              <span>My Page</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition-colors"
            >
              <LogIn size={20} className="mr-2" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;