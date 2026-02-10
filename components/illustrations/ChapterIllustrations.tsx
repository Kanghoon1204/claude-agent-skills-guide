import React from 'react';

interface IllustrationProps {
  className?: string;
}

// Introduction - Abstract welcome/entry visual
export const IntroductionIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="intro-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ea580c" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="intro-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fb923c" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#fdba74" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <rect fill="#fff7ed" width="400" height="200" rx="12" />
    <circle cx="320" cy="60" r="80" fill="url(#intro-grad1)" opacity="0.6" />
    <circle cx="80" cy="140" r="60" fill="url(#intro-grad2)" opacity="0.7" />
    <path d="M150 100 L200 60 L250 100 L200 140 Z" fill="#f97316" opacity="0.8" />
    <circle cx="200" cy="100" r="20" fill="#fff" opacity="0.9" />
    <path d="M50 80 Q100 50 150 80 T250 80" stroke="#fdba74" strokeWidth="3" fill="none" opacity="0.5" />
    <path d="M150 150 Q200 120 250 150 T350 150" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.4" />
    <text x="200" y="185" textAnchor="middle" className="fill-orange-600 text-xs font-semibold" opacity="0.8">시작하기</text>
  </svg>
);

// Fundamentals - Building blocks visual
export const FundamentalsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fund-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect fill="#f0fdf4" width="400" height="200" rx="12" />
    {/* Stacked blocks representing layers */}
    <rect x="120" y="130" width="160" height="40" rx="6" fill="#22c55e" opacity="0.9" />
    <rect x="140" y="85" width="120" height="40" rx="6" fill="#4ade80" opacity="0.8" />
    <rect x="160" y="40" width="80" height="40" rx="6" fill="#86efac" opacity="0.7" />
    {/* Connection lines */}
    <line x1="200" y1="40" x2="200" y2="20" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
    <circle cx="200" cy="15" r="8" fill="#22c55e" opacity="0.6" />
    {/* Side decorations */}
    <circle cx="60" cy="100" r="30" fill="url(#fund-grad1)" opacity="0.5" />
    <circle cx="340" cy="80" r="25" fill="#4ade80" opacity="0.4" />
    <circle cx="320" cy="150" r="20" fill="#86efac" opacity="0.5" />
    <text x="200" y="185" textAnchor="middle" className="fill-green-600 text-xs font-semibold" opacity="0.8">기초 쌓기</text>
  </svg>
);

// Planning and Design - Blueprint/sketch visual
export const PlanningIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="plan-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#db2777" stopOpacity="0.4" />
      </linearGradient>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fce7f3" strokeWidth="1" />
      </pattern>
    </defs>
    <rect fill="#fdf2f8" width="400" height="200" rx="12" />
    <rect fill="url(#grid)" width="400" height="200" rx="12" opacity="0.5" />
    {/* Blueprint elements */}
    <rect x="80" y="50" width="100" height="80" rx="4" fill="none" stroke="#ec4899" strokeWidth="2" />
    <rect x="220" y="70" width="80" height="60" rx="4" fill="none" stroke="#f472b6" strokeWidth="2" />
    <line x1="180" y1="90" x2="220" y2="100" stroke="#db2777" strokeWidth="2" strokeDasharray="5" />
    <circle cx="130" cy="90" r="15" fill="#ec4899" opacity="0.3" />
    <circle cx="260" cy="100" r="10" fill="#f472b6" opacity="0.4" />
    {/* Pencil icon */}
    <path d="M320 40 L340 60 L320 80 L300 60 Z" fill="#ec4899" opacity="0.6" />
    <line x1="320" y1="80" x2="310" y2="120" stroke="#db2777" strokeWidth="3" />
    <text x="200" y="185" textAnchor="middle" className="fill-pink-600 text-xs font-semibold" opacity="0.8">설계와 기획</text>
  </svg>
);

// Testing and Iteration - Cycle/loop visual
export const TestingIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="test-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect fill="#f5f3ff" width="400" height="200" rx="12" />
    {/* Circular arrows representing iteration */}
    <circle cx="200" cy="100" r="50" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="10 5" />
    <circle cx="200" cy="100" r="70" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="8 4" />
    {/* Arrow heads */}
    <polygon points="250,100 240,90 240,110" fill="#8b5cf6" />
    <polygon points="200,30 190,40 210,40" fill="#a78bfa" />
    {/* Center check mark */}
    <circle cx="200" cy="100" r="25" fill="#8b5cf6" opacity="0.2" />
    <path d="M185 100 L195 110 L215 85" stroke="#7c3aed" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Floating elements */}
    <circle cx="320" cy="60" r="15" fill="#c4b5fd" opacity="0.6" />
    <circle cx="80" cy="140" r="20" fill="#a78bfa" opacity="0.5" />
    <rect x="50" y="50" width="30" height="30" rx="4" fill="#8b5cf6" opacity="0.3" />
    <text x="200" y="185" textAnchor="middle" className="fill-violet-600 text-xs font-semibold" opacity="0.8">테스트와 반복</text>
  </svg>
);

// Distribution and Sharing - Network/share visual
export const DistributionIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dist-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect fill="#eff6ff" width="400" height="200" rx="12" />
    {/* Central node */}
    <circle cx="200" cy="100" r="30" fill="#3b82f6" opacity="0.8" />
    <circle cx="200" cy="100" r="15" fill="#fff" opacity="0.9" />
    {/* Connected nodes */}
    <line x1="200" y1="100" x2="100" y2="60" stroke="#60a5fa" strokeWidth="2" />
    <line x1="200" y1="100" x2="300" y2="60" stroke="#60a5fa" strokeWidth="2" />
    <line x1="200" y1="100" x2="100" y2="140" stroke="#60a5fa" strokeWidth="2" />
    <line x1="200" y1="100" x2="300" y2="140" stroke="#60a5fa" strokeWidth="2" />
    <circle cx="100" cy="60" r="20" fill="#3b82f6" opacity="0.6" />
    <circle cx="300" cy="60" r="20" fill="#60a5fa" opacity="0.6" />
    <circle cx="100" cy="140" r="20" fill="#93c5fd" opacity="0.6" />
    <circle cx="300" cy="140" r="20" fill="#3b82f6" opacity="0.5" />
    {/* Additional decorations */}
    <circle cx="50" cy="100" r="10" fill="#bfdbfe" opacity="0.7" />
    <circle cx="350" cy="100" r="12" fill="#93c5fd" opacity="0.6" />
    <text x="200" y="185" textAnchor="middle" className="fill-blue-600 text-xs font-semibold" opacity="0.8">배포와 공유</text>
  </svg>
);

// Patterns and Troubleshooting - Puzzle/solution visual
export const PatternsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pat-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect fill="#f0fdfa" width="400" height="200" rx="12" />
    {/* Puzzle pieces */}
    <path d="M100 60 L140 60 L140 80 Q155 90 140 100 L140 120 L100 120 L100 100 Q85 90 100 80 Z" fill="#14b8a6" opacity="0.8" />
    <path d="M145 60 L185 60 L185 80 Q200 90 185 100 L185 120 L145 120 L145 100 Q130 90 145 80 Z" fill="#2dd4bf" opacity="0.7" />
    <path d="M190 60 L230 60 L230 80 Q245 90 230 100 L230 120 L190 120 L190 100 Q175 90 190 80 Z" fill="#5eead4" opacity="0.6" />
    {/* Lightbulb for solution */}
    <circle cx="310" cy="80" r="25" fill="#14b8a6" opacity="0.6" />
    <path d="M310 55 L310 45" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
    <path d="M330 60 L340 50" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
    <path d="M290 60 L280 50" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
    <rect x="300" y="105" width="20" height="15" rx="3" fill="#14b8a6" opacity="0.5" />
    {/* Decorations */}
    <circle cx="60" cy="150" r="15" fill="#99f6e4" opacity="0.6" />
    <text x="200" y="185" textAnchor="middle" className="fill-teal-600 text-xs font-semibold" opacity="0.8">패턴과 문제 해결</text>
  </svg>
);

// Resources and References - Library/books visual
export const ResourcesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="res-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect fill="#fffbeb" width="400" height="200" rx="12" />
    {/* Book stack */}
    <rect x="80" y="110" width="240" height="25" rx="3" fill="#f59e0b" opacity="0.9" />
    <rect x="90" y="80" width="220" height="25" rx="3" fill="#fbbf24" opacity="0.8" />
    <rect x="100" y="50" width="200" height="25" rx="3" fill="#fcd34d" opacity="0.7" />
    {/* Book spines decoration */}
    <line x1="120" y1="110" x2="120" y2="135" stroke="#d97706" strokeWidth="2" />
    <line x1="180" y1="110" x2="180" y2="135" stroke="#d97706" strokeWidth="2" />
    <line x1="250" y1="110" x2="250" y2="135" stroke="#d97706" strokeWidth="2" />
    {/* Floating bookmark */}
    <path d="M330 40 L350 40 L350 100 L340 85 L330 100 Z" fill="#f59e0b" opacity="0.7" />
    {/* Link icon */}
    <circle cx="60" cy="100" r="20" fill="#fcd34d" opacity="0.5" />
    <path d="M50 100 Q60 90 70 100" stroke="#d97706" strokeWidth="3" fill="none" />
    <text x="200" y="185" textAnchor="middle" className="fill-amber-600 text-xs font-semibold" opacity="0.8">리소스와 참고자료</text>
  </svg>
);

// Appendices - Checklist/reference visual
export const AppendicesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="app-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6b7280" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#4b5563" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect fill="#f9fafb" width="400" height="200" rx="12" />
    {/* Clipboard */}
    <rect x="130" y="30" width="140" height="140" rx="8" fill="#e5e7eb" opacity="0.8" />
    <rect x="160" y="20" width="80" height="20" rx="4" fill="#6b7280" opacity="0.7" />
    {/* Checklist items */}
    <rect x="150" y="60" width="15" height="15" rx="2" fill="#9ca3af" opacity="0.6" />
    <path d="M153 67 L158 72 L167 60" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="175" y="62" width="70" height="8" rx="2" fill="#d1d5db" />

    <rect x="150" y="90" width="15" height="15" rx="2" fill="#9ca3af" opacity="0.6" />
    <path d="M153 97 L158 102 L167 90" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="175" y="92" width="60" height="8" rx="2" fill="#d1d5db" />

    <rect x="150" y="120" width="15" height="15" rx="2" fill="#9ca3af" opacity="0.6" />
    <rect x="175" y="122" width="80" height="8" rx="2" fill="#d1d5db" />

    {/* Code brackets decoration */}
    <path d="M320 70 L300 100 L320 130" stroke="#6b7280" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M340 70 L360 100 L340 130" stroke="#9ca3af" strokeWidth="3" fill="none" strokeLinecap="round" />

    <circle cx="60" cy="100" r="25" fill="#e5e7eb" opacity="0.6" />
    <text x="200" y="185" textAnchor="middle" className="fill-neutral-600 text-xs font-semibold" opacity="0.8">부록</text>
  </svg>
);

// Map chapter keys to illustrations
export const CHAPTER_ILLUSTRATIONS_SVG: Record<string, React.FC<IllustrationProps>> = {
  introduction: IntroductionIllustration,
  fundamentals: FundamentalsIllustration,
  planningAndDesign: PlanningIllustration,
  testingAndIteration: TestingIllustration,
  distributionAndSharing: DistributionIllustration,
  patternsAndTroubleshooting: PatternsIllustration,
  resourcesAndReferences: ResourcesIllustration,
  appendices: AppendicesIllustration,
};
