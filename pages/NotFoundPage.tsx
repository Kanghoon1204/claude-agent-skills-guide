import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-fade-in">
      <div className="text-6xl font-bold text-neutral-300 dark:text-neutral-600 mb-4">404</div>
      <h1 className="text-xl font-bold mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-6">
        요청하신 페이지가 존재하지 않습니다.
      </p>
      <Link
        to="/home"
        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
      >
        홈으로 이동
      </Link>
    </div>
  );
};

export default NotFoundPage;
