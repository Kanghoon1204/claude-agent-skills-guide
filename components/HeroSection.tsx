import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-8 md:p-12 mb-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-300/10 rounded-full blur-2xl animate-float" />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Floating skill icons */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 opacity-20">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="white" fill="none"/>
          </svg>
        </div>
        <div className="absolute bottom-12 left-12 opacity-15 hidden md:block">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="2" stroke="white" fill="none"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          <span className="text-sm font-medium text-white">6개 챕터 + 3개 부록</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
          AI 에이전트
          <br />
          <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
            스킬 가이드
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-orange-100 max-w-2xl leading-relaxed mb-6">
          Claude, Cursor, Codex, Windsurf를 위한 스킬 구축 완벽 교재입니다.
          기초부터 배포까지, 코드 스킬과 비코드 스킬 모두를 다룹니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            to="/sections/skill-creator-wizard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <span className="text-xl">✨</span>
            지금 스킬 만들기
          </Link>
          <Link
            to="/sections/what-are-skills"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-medium rounded-xl border border-white/30 hover:bg-white/30 transition-all"
          >
            가이드 시작하기 →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 md:gap-10">
          {[
            { value: '8', label: '스킬 템플릿' },
            { value: '28', label: '섹션' },
            { value: '28', label: '음성 해설' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-orange-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative illustration on right side - visible on larger screens */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:flex items-center justify-center opacity-30">
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
          {/* Abstract skill representation */}
          <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="20" fill="white" opacity="0.3" />

          {/* Connection lines */}
          <line x1="100" y1="40" x2="100" y2="20" stroke="white" strokeWidth="1.5" />
          <line x1="160" y1="100" x2="180" y2="100" stroke="white" strokeWidth="1.5" />
          <line x1="100" y1="160" x2="100" y2="180" stroke="white" strokeWidth="1.5" />
          <line x1="40" y1="100" x2="20" y2="100" stroke="white" strokeWidth="1.5" />

          {/* Corner dots */}
          <circle cx="100" cy="15" r="5" fill="white" />
          <circle cx="185" cy="100" r="5" fill="white" />
          <circle cx="100" cy="185" r="5" fill="white" />
          <circle cx="15" cy="100" r="5" fill="white" />
        </svg>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
