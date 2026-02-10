import React from 'react';

interface IllustrationProps {
  className?: string;
}

// ============================================================================
// 소개 섹션 일러스트 (추상적 스타일)
// ============================================================================

// whatAreSkills - 중앙에서 퍼져나가는 원
export const WhatAreSkillsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="was-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ea580c" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <rect fill="#fff7ed" width="400" height="160" rx="12" />
    <circle cx="200" cy="80" r="50" fill="url(#was-grad)" opacity="0.7" />
    <circle cx="200" cy="80" r="30" fill="#f97316" opacity="0.5" />
    <circle cx="200" cy="80" r="12" fill="#fff" opacity="0.9" />
    <circle cx="280" cy="50" r="20" fill="#fdba74" opacity="0.5" />
    <circle cx="120" cy="110" r="25" fill="#fb923c" opacity="0.4" />
  </svg>
);

// whoIsThisFor - 세 개의 연결된 원
export const WhoIsThisForIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fff7ed" width="400" height="160" rx="12" />
    <line x1="130" y1="80" x2="200" y2="80" stroke="#fdba74" strokeWidth="3" />
    <line x1="200" y1="80" x2="270" y2="80" stroke="#fdba74" strokeWidth="3" />
    <circle cx="130" cy="80" r="30" fill="#f97316" opacity="0.7" />
    <circle cx="200" cy="80" r="35" fill="#fb923c" opacity="0.8" />
    <circle cx="270" cy="80" r="30" fill="#fdba74" opacity="0.7" />
    <circle cx="130" cy="80" r="12" fill="#fff" opacity="0.8" />
    <circle cx="200" cy="80" r="14" fill="#fff" opacity="0.8" />
    <circle cx="270" cy="80" r="12" fill="#fff" opacity="0.8" />
  </svg>
);

// twoPaths - 분기하는 두 경로
export const TwoPathsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fff7ed" width="400" height="160" rx="12" />
    <circle cx="80" cy="80" r="25" fill="#f97316" opacity="0.8" />
    <path d="M105 80 Q150 80 180 50 L300 50" stroke="#22c55e" strokeWidth="4" fill="none" opacity="0.7" />
    <path d="M105 80 Q150 80 180 110 L300 110" stroke="#3b82f6" strokeWidth="4" fill="none" opacity="0.7" />
    <circle cx="320" cy="50" r="20" fill="#22c55e" opacity="0.6" />
    <circle cx="320" cy="110" r="20" fill="#3b82f6" opacity="0.6" />
  </svg>
);

// ============================================================================
// 제1장: 기초 섹션 일러스트
// ============================================================================

// whatIsASkill - 단순한 문서 아이콘
export const WhatIsASkillIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#16a34a" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <rect fill="#f0fdf4" width="400" height="160" rx="12" />
    <rect x="150" y="30" width="100" height="100" rx="8" fill="url(#wis-grad)" />
    <rect x="165" y="50" width="50" height="6" rx="2" fill="#fff" opacity="0.8" />
    <rect x="165" y="65" width="70" height="4" rx="2" fill="#fff" opacity="0.6" />
    <rect x="165" y="78" width="60" height="4" rx="2" fill="#fff" opacity="0.6" />
    <rect x="165" y="91" width="65" height="4" rx="2" fill="#fff" opacity="0.6" />
    <circle cx="320" cy="60" r="20" fill="#4ade80" opacity="0.4" />
    <circle cx="80" cy="100" r="25" fill="#86efac" opacity="0.5" />
  </svg>
);

// coreDesignPrinciples - 세 개의 기둥
export const CoreDesignPrinciplesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f0fdf4" width="400" height="160" rx="12" />
    <rect x="100" y="50" width="50" height="80" rx="6" fill="#22c55e" opacity="0.8" />
    <rect x="175" y="50" width="50" height="80" rx="6" fill="#4ade80" opacity="0.7" />
    <rect x="250" y="50" width="50" height="80" rx="6" fill="#86efac" opacity="0.6" />
    <rect x="85" y="35" width="230" height="12" rx="4" fill="#16a34a" opacity="0.5" />
    <circle cx="50" cy="100" r="15" fill="#bbf7d0" opacity="0.6" />
    <circle cx="350" cy="80" r="18" fill="#86efac" opacity="0.5" />
  </svg>
);

// mcpAndSkills - 두 원의 연결
export const McpAndSkillsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f0fdf4" width="400" height="160" rx="12" />
    <circle cx="130" cy="80" r="45" fill="#3b82f6" opacity="0.3" />
    <circle cx="130" cy="80" r="25" fill="#3b82f6" opacity="0.5" />
    <circle cx="270" cy="80" r="45" fill="#22c55e" opacity="0.3" />
    <circle cx="270" cy="80" r="25" fill="#22c55e" opacity="0.5" />
    <line x1="175" y1="80" x2="225" y2="80" stroke="#16a34a" strokeWidth="4" strokeDasharray="8 4" />
    <circle cx="200" cy="80" r="8" fill="#4ade80" opacity="0.8" />
  </svg>
);

// ============================================================================
// 제2장: 설계와 기획 섹션 일러스트
// ============================================================================

// useCases - 여러 개의 겹치는 원
export const UseCasesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fdf2f8" width="400" height="160" rx="12" />
    <circle cx="150" cy="70" r="40" fill="#ec4899" opacity="0.3" />
    <circle cx="200" cy="90" r="45" fill="#f472b6" opacity="0.4" />
    <circle cx="260" cy="65" r="35" fill="#db2777" opacity="0.3" />
    <circle cx="280" cy="110" r="30" fill="#ec4899" opacity="0.25" />
    <circle cx="120" cy="110" r="25" fill="#f9a8d4" opacity="0.4" />
  </svg>
);

// skillCategories - 세 개의 박스
export const SkillCategoriesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fdf2f8" width="400" height="160" rx="12" />
    <rect x="60" y="45" width="80" height="70" rx="8" fill="#ec4899" opacity="0.7" />
    <rect x="160" y="45" width="80" height="70" rx="8" fill="#f472b6" opacity="0.6" />
    <rect x="260" y="45" width="80" height="70" rx="8" fill="#f9a8d4" opacity="0.5" />
    <circle cx="100" cy="80" r="15" fill="#fff" opacity="0.4" />
    <circle cx="200" cy="80" r="15" fill="#fff" opacity="0.4" />
    <circle cx="300" cy="80" r="15" fill="#fff" opacity="0.4" />
  </svg>
);

// successCriteria - 과녁 모양
export const SuccessCriteriaIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fdf2f8" width="400" height="160" rx="12" />
    <circle cx="200" cy="80" r="55" fill="#ec4899" opacity="0.2" />
    <circle cx="200" cy="80" r="40" fill="#f472b6" opacity="0.3" />
    <circle cx="200" cy="80" r="25" fill="#db2777" opacity="0.4" />
    <circle cx="200" cy="80" r="10" fill="#ec4899" opacity="0.8" />
    <circle cx="90" cy="50" r="15" fill="#f9a8d4" opacity="0.5" />
    <circle cx="310" cy="110" r="18" fill="#fbcfe8" opacity="0.6" />
  </svg>
);

// technicalRequirements - 기어 모양
export const TechnicalRequirementsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fdf2f8" width="400" height="160" rx="12" />
    <circle cx="150" cy="80" r="40" fill="#ec4899" opacity="0.3" />
    <circle cx="150" cy="80" r="25" fill="#f472b6" opacity="0.5" />
    <circle cx="150" cy="80" r="10" fill="#fdf2f8" />
    <rect x="230" y="45" width="90" height="70" rx="6" fill="#db2777" opacity="0.4" />
    <rect x="245" y="60" width="50" height="6" rx="2" fill="#fff" opacity="0.6" />
    <rect x="245" y="75" width="60" height="4" rx="2" fill="#fff" opacity="0.5" />
    <rect x="245" y="88" width="45" height="4" rx="2" fill="#fff" opacity="0.5" />
  </svg>
);

// writingEffectiveSkills - 펜 라인
export const WritingEffectiveSkillsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fdf2f8" width="400" height="160" rx="12" />
    <rect x="100" y="35" width="200" height="90" rx="8" fill="#fff" opacity="0.8" />
    <line x1="120" y1="55" x2="280" y2="55" stroke="#f9a8d4" strokeWidth="2" />
    <line x1="120" y1="75" x2="280" y2="75" stroke="#f9a8d4" strokeWidth="2" />
    <line x1="120" y1="95" x2="280" y2="95" stroke="#f9a8d4" strokeWidth="2" />
    <path d="M130 55 Q160 50 190 55 T250 55" stroke="#ec4899" strokeWidth="2" fill="none" opacity="0.7" />
    <path d="M130 75 Q150 70 180 75 T220 75" stroke="#f472b6" strokeWidth="2" fill="none" opacity="0.6" />
    <circle cx="320" cy="50" r="15" fill="#ec4899" opacity="0.4" />
  </svg>
);

// ============================================================================
// 제3장: 테스트와 반복 섹션 일러스트
// ============================================================================

// testingApproaches - 피라미드
export const TestingApproachesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f5f3ff" width="400" height="160" rx="12" />
    <polygon points="200,25 300,130 100,130" fill="#8b5cf6" opacity="0.3" />
    <line x1="130" y1="95" x2="270" y2="95" stroke="#a78bfa" strokeWidth="2" opacity="0.6" />
    <line x1="155" y1="60" x2="245" y2="60" stroke="#c4b5fd" strokeWidth="2" opacity="0.5" />
    <circle cx="200" cy="45" r="8" fill="#8b5cf6" opacity="0.7" />
    <circle cx="60" cy="100" r="20" fill="#c4b5fd" opacity="0.4" />
    <circle cx="340" cy="80" r="15" fill="#a78bfa" opacity="0.5" />
  </svg>
);

// testingAreas - 세 개의 원
export const TestingAreasIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f5f3ff" width="400" height="160" rx="12" />
    <circle cx="110" cy="80" r="40" fill="#8b5cf6" opacity="0.4" />
    <circle cx="200" cy="80" r="40" fill="#a78bfa" opacity="0.5" />
    <circle cx="290" cy="80" r="40" fill="#c4b5fd" opacity="0.4" />
    <circle cx="110" cy="80" r="15" fill="#fff" opacity="0.6" />
    <circle cx="200" cy="80" r="15" fill="#fff" opacity="0.6" />
    <circle cx="290" cy="80" r="15" fill="#fff" opacity="0.6" />
  </svg>
);

// skillCreatorTool - 마법 지팡이 효과
export const SkillCreatorToolIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f5f3ff" width="400" height="160" rx="12" />
    <line x1="100" y1="120" x2="180" y2="40" stroke="#8b5cf6" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
    <circle cx="180" cy="40" r="12" fill="#c4b5fd" opacity="0.8" />
    <circle cx="200" cy="30" r="5" fill="#a78bfa" opacity="0.6" />
    <circle cx="195" cy="55" r="4" fill="#8b5cf6" opacity="0.5" />
    <circle cx="215" cy="45" r="6" fill="#c4b5fd" opacity="0.7" />
    <rect x="260" y="50" width="80" height="60" rx="6" fill="#8b5cf6" opacity="0.3" />
    <rect x="275" y="65" width="50" height="5" rx="2" fill="#fff" opacity="0.6" />
    <rect x="275" y="80" width="40" height="4" rx="2" fill="#fff" opacity="0.5" />
  </svg>
);

// iterationFeedback - 순환 화살표
export const IterationFeedbackIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f5f3ff" width="400" height="160" rx="12" />
    <circle cx="200" cy="80" r="45" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="12 6" opacity="0.6" />
    <circle cx="200" cy="80" r="25" fill="#c4b5fd" opacity="0.4" />
    <circle cx="200" cy="80" r="10" fill="#8b5cf6" opacity="0.6" />
    <polygon points="245,80 235,72 235,88" fill="#8b5cf6" opacity="0.7" />
    <polygon points="155,80 165,88 165,72" fill="#a78bfa" opacity="0.6" />
    <circle cx="80" cy="60" r="15" fill="#c4b5fd" opacity="0.4" />
    <circle cx="320" cy="100" r="18" fill="#a78bfa" opacity="0.4" />
  </svg>
);

// ============================================================================
// 제4장: 배포와 공유 섹션 일러스트
// ============================================================================

// distributionModel - 중앙에서 퍼져나가는 선
export const DistributionModelIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#eff6ff" width="400" height="160" rx="12" />
    <circle cx="200" cy="80" r="30" fill="#3b82f6" opacity="0.7" />
    <circle cx="200" cy="80" r="15" fill="#fff" opacity="0.8" />
    <line x1="200" y1="80" x2="100" y2="50" stroke="#60a5fa" strokeWidth="2" />
    <line x1="200" y1="80" x2="300" y2="50" stroke="#60a5fa" strokeWidth="2" />
    <line x1="200" y1="80" x2="100" y2="110" stroke="#60a5fa" strokeWidth="2" />
    <line x1="200" y1="80" x2="300" y2="110" stroke="#60a5fa" strokeWidth="2" />
    <circle cx="100" cy="50" r="15" fill="#93c5fd" opacity="0.6" />
    <circle cx="300" cy="50" r="15" fill="#93c5fd" opacity="0.6" />
    <circle cx="100" cy="110" r="15" fill="#93c5fd" opacity="0.6" />
    <circle cx="300" cy="110" r="15" fill="#93c5fd" opacity="0.6" />
  </svg>
);

// openStandard - 열린 자물쇠 모양
export const OpenStandardIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#eff6ff" width="400" height="160" rx="12" />
    <rect x="160" y="70" width="80" height="55" rx="8" fill="#3b82f6" opacity="0.6" />
    <path d="M180 70 L180 50 A20 20 0 0 1 220 50 L220 60" fill="none" stroke="#60a5fa" strokeWidth="6" strokeLinecap="round" />
    <line x1="200" y1="25" x2="200" y2="15" stroke="#93c5fd" strokeWidth="2" />
    <line x1="250" y1="45" x2="265" y2="35" stroke="#93c5fd" strokeWidth="2" />
    <line x1="150" y1="45" x2="135" y2="35" stroke="#93c5fd" strokeWidth="2" />
    <circle cx="80" cy="100" r="20" fill="#bfdbfe" opacity="0.5" />
    <circle cx="320" cy="80" r="15" fill="#93c5fd" opacity="0.4" />
  </svg>
);

// skillsViaApi - API 연결선
export const SkillsViaApiIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#eff6ff" width="400" height="160" rx="12" />
    <rect x="80" y="50" width="100" height="60" rx="8" fill="#3b82f6" opacity="0.6" />
    <rect x="95" y="65" width="50" height="6" rx="2" fill="#fff" opacity="0.6" />
    <rect x="95" y="80" width="70" height="4" rx="2" fill="#fff" opacity="0.5" />
    <line x1="180" y1="80" x2="220" y2="80" stroke="#60a5fa" strokeWidth="3" strokeDasharray="6 4" />
    <rect x="220" y="50" width="100" height="60" rx="8" fill="#93c5fd" opacity="0.5" />
    <rect x="235" y="65" width="50" height="6" rx="2" fill="#fff" opacity="0.6" />
    <rect x="235" y="80" width="70" height="4" rx="2" fill="#fff" opacity="0.5" />
  </svg>
);

// recommendedApproach - 경로 강조
export const RecommendedApproachIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#eff6ff" width="400" height="160" rx="12" />
    <path d="M50 80 Q100 40 150 80 T250 80 T350 80" stroke="#bfdbfe" strokeWidth="20" fill="none" strokeLinecap="round" />
    <path d="M50 80 Q100 40 150 80 T250 80 T350 80" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="100" cy="60" r="10" fill="#3b82f6" opacity="0.7" />
    <circle cx="200" cy="80" r="10" fill="#60a5fa" opacity="0.7" />
    <circle cx="300" cy="60" r="10" fill="#93c5fd" opacity="0.7" />
    <circle cx="350" cy="80" r="15" fill="#fbbf24" opacity="0.8" />
  </svg>
);

// positioningYourSkill - 그리드
export const PositioningYourSkillIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#eff6ff" width="400" height="160" rx="12" />
    <rect x="90" y="35" width="45" height="40" rx="4" fill="#bfdbfe" opacity="0.4" />
    <rect x="145" y="35" width="45" height="40" rx="4" fill="#bfdbfe" opacity="0.4" />
    <rect x="200" y="35" width="45" height="40" rx="4" fill="#3b82f6" opacity="0.7" />
    <rect x="255" y="35" width="45" height="40" rx="4" fill="#bfdbfe" opacity="0.4" />
    <rect x="90" y="85" width="45" height="40" rx="4" fill="#bfdbfe" opacity="0.4" />
    <rect x="145" y="85" width="45" height="40" rx="4" fill="#bfdbfe" opacity="0.4" />
    <rect x="200" y="85" width="45" height="40" rx="4" fill="#bfdbfe" opacity="0.4" />
    <rect x="255" y="85" width="45" height="40" rx="4" fill="#bfdbfe" opacity="0.4" />
    <polygon points="222,25 217,35 227,35" fill="#f97316" opacity="0.8" />
  </svg>
);

// ============================================================================
// 제5장: 패턴과 문제 해결 섹션 일러스트
// ============================================================================

// skillPatterns - 패턴 블록
export const SkillPatternsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f0fdfa" width="400" height="160" rx="12" />
    <rect x="60" y="40" width="50" height="80" rx="6" fill="#14b8a6" opacity="0.8" />
    <rect x="120" y="40" width="50" height="80" rx="6" fill="#2dd4bf" opacity="0.7" />
    <rect x="180" y="40" width="50" height="80" rx="6" fill="#5eead4" opacity="0.6" />
    <rect x="240" y="40" width="50" height="80" rx="6" fill="#99f6e4" opacity="0.5" />
    <rect x="300" y="40" width="50" height="80" rx="6" fill="#ccfbf1" opacity="0.4" />
  </svg>
);

// troubleshooting - 문제 해결
export const TroubleshootingIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f0fdfa" width="400" height="160" rx="12" />
    <circle cx="120" cy="80" r="35" fill="#ef4444" opacity="0.2" />
    <circle cx="120" cy="80" r="20" fill="#ef4444" opacity="0.3" />
    <path d="M160 80 L240 80" stroke="#14b8a6" strokeWidth="4" opacity="0.6" />
    <polygon points="240,80 230,75 230,85" fill="#14b8a6" opacity="0.6" />
    <circle cx="280" cy="80" r="35" fill="#14b8a6" opacity="0.3" />
    <circle cx="280" cy="80" r="20" fill="#22c55e" opacity="0.4" />
    <path d="M270 80 L277 87 L295 69" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
  </svg>
);

// ============================================================================
// 제6장: 리소스와 참고자료 섹션 일러스트
// ============================================================================

// officialDocs - 문서 스택
export const OfficialDocsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fffbeb" width="400" height="160" rx="12" />
    <rect x="120" y="30" width="160" height="100" rx="6" fill="#f59e0b" opacity="0.3" />
    <rect x="130" y="40" width="140" height="80" rx="6" fill="#fbbf24" opacity="0.4" />
    <rect x="140" y="50" width="120" height="60" rx="6" fill="#fcd34d" opacity="0.5" />
    <rect x="155" y="65" width="60" height="6" rx="2" fill="#fff" opacity="0.7" />
    <rect x="155" y="80" width="80" height="4" rx="2" fill="#fff" opacity="0.5" />
    <circle cx="310" cy="50" r="18" fill="#fcd34d" opacity="0.5" />
    <circle cx="90" cy="110" r="15" fill="#fbbf24" opacity="0.4" />
  </svg>
);

// exampleSkills - 예제 카드
export const ExampleSkillsIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fffbeb" width="400" height="160" rx="12" />
    <rect x="70" y="40" width="70" height="80" rx="6" fill="#f59e0b" opacity="0.5" />
    <rect x="165" y="40" width="70" height="80" rx="6" fill="#fbbf24" opacity="0.5" />
    <rect x="260" y="40" width="70" height="80" rx="6" fill="#fcd34d" opacity="0.5" />
    <rect x="85" y="55" width="40" height="5" rx="2" fill="#fff" opacity="0.6" />
    <rect x="85" y="68" width="35" height="4" rx="2" fill="#fff" opacity="0.5" />
    <rect x="180" y="55" width="40" height="5" rx="2" fill="#fff" opacity="0.6" />
    <rect x="180" y="68" width="35" height="4" rx="2" fill="#fff" opacity="0.5" />
    <rect x="275" y="55" width="40" height="5" rx="2" fill="#fff" opacity="0.6" />
    <rect x="275" y="68" width="35" height="4" rx="2" fill="#fff" opacity="0.5" />
  </svg>
);

// toolsAndUtilities - 도구 상자
export const ToolsAndUtilitiesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#fffbeb" width="400" height="160" rx="12" />
    <rect x="130" y="50" width="140" height="70" rx="8" fill="#f59e0b" opacity="0.5" />
    <rect x="120" y="38" width="160" height="18" rx="4" fill="#d97706" opacity="0.6" />
    <rect x="190" y="32" width="20" height="10" rx="3" fill="#92400e" opacity="0.5" />
    <line x1="160" y1="75" x2="160" y2="100" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    <line x1="200" y1="70" x2="200" y2="105" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    <line x1="240" y1="75" x2="240" y2="100" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    <circle cx="60" cy="100" r="20" fill="#fcd34d" opacity="0.4" />
    <circle cx="340" cy="70" r="15" fill="#fbbf24" opacity="0.5" />
  </svg>
);

// ============================================================================
// 부록 섹션 일러스트
// ============================================================================

// quickChecklist - 체크리스트
export const QuickChecklistIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f9fafb" width="400" height="160" rx="12" />
    <rect x="130" y="25" width="140" height="110" rx="8" fill="#e5e7eb" opacity="0.6" />
    <rect x="170" y="15" width="60" height="18" rx="4" fill="#6b7280" opacity="0.5" />
    <rect x="150" y="50" width="12" height="12" rx="2" fill="#d1d5db" />
    <path d="M152 56 L156 60 L163 52" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="170" y="52" width="80" height="6" rx="2" fill="#d1d5db" />
    <rect x="150" y="75" width="12" height="12" rx="2" fill="#d1d5db" />
    <path d="M152 81 L156 85 L163 77" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="170" y="77" width="70" height="6" rx="2" fill="#d1d5db" />
    <rect x="150" y="100" width="12" height="12" rx="2" fill="#d1d5db" />
    <rect x="170" y="102" width="60" height="6" rx="2" fill="#d1d5db" />
    <circle cx="320" cy="70" r="18" fill="#9ca3af" opacity="0.3" />
    <circle cx="80" cy="100" r="15" fill="#d1d5db" opacity="0.5" />
  </svg>
);

// yamlReference - 코드 블록
export const YamlReferenceIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f9fafb" width="400" height="160" rx="12" />
    <rect x="100" y="25" width="200" height="110" rx="8" fill="#1f2937" opacity="0.9" />
    <circle cx="120" cy="42" r="5" fill="#ef4444" opacity="0.7" />
    <circle cx="136" cy="42" r="5" fill="#fbbf24" opacity="0.7" />
    <circle cx="152" cy="42" r="5" fill="#22c55e" opacity="0.7" />
    <rect x="115" y="60" width="30" height="5" rx="2" fill="#a78bfa" opacity="0.6" />
    <rect x="155" y="60" width="50" height="5" rx="2" fill="#4ade80" opacity="0.5" />
    <rect x="115" y="75" width="40" height="5" rx="2" fill="#60a5fa" opacity="0.6" />
    <rect x="165" y="75" width="70" height="5" rx="2" fill="#4ade80" opacity="0.5" />
    <rect x="115" y="90" width="35" height="5" rx="2" fill="#60a5fa" opacity="0.6" />
    <rect x="160" y="90" width="40" height="5" rx="2" fill="#4ade80" opacity="0.5" />
    <rect x="115" y="105" width="30" height="5" rx="2" fill="#a78bfa" opacity="0.6" />
  </svg>
);

// completeExamples - 폴더와 파일
export const CompleteExamplesIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#f9fafb" width="400" height="160" rx="12" />
    <path d="M100 50 L100 120 L300 120 L300 60 L220 60 L200 50 Z" fill="#6b7280" opacity="0.2" />
    <rect x="120" y="75" width="60" height="35" rx="4" fill="#fff" stroke="#9ca3af" strokeWidth="1" />
    <rect x="130" y="85" width="35" height="4" rx="1" fill="#d1d5db" />
    <rect x="130" y="94" width="40" height="3" rx="1" fill="#e5e7eb" />
    <rect x="200" y="75" width="60" height="35" rx="4" fill="#fff" stroke="#9ca3af" strokeWidth="1" />
    <rect x="210" y="85" width="35" height="4" rx="1" fill="#d1d5db" />
    <rect x="210" y="94" width="40" height="3" rx="1" fill="#e5e7eb" />
    <circle cx="330" cy="50" r="18" fill="#22c55e" opacity="0.6" />
    <path d="M322 50 L328 56 L340 44" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================================================
// Export map
// ============================================================================
export const SECTION_ILLUSTRATIONS: Record<string, React.FC<IllustrationProps>> = {
  // 소개
  whatAreSkills: WhatAreSkillsIllustration,
  whoIsThisFor: WhoIsThisForIllustration,
  twoPaths: TwoPathsIllustration,
  // 제1장: 기초
  whatIsASkill: WhatIsASkillIllustration,
  coreDesignPrinciples: CoreDesignPrinciplesIllustration,
  mcpAndSkills: McpAndSkillsIllustration,
  // 제2장: 설계와 기획
  useCases: UseCasesIllustration,
  skillCategories: SkillCategoriesIllustration,
  successCriteria: SuccessCriteriaIllustration,
  technicalRequirements: TechnicalRequirementsIllustration,
  writingEffectiveSkills: WritingEffectiveSkillsIllustration,
  // 제3장: 테스트와 반복
  testingApproaches: TestingApproachesIllustration,
  testingAreas: TestingAreasIllustration,
  skillCreatorTool: SkillCreatorToolIllustration,
  iterationFeedback: IterationFeedbackIllustration,
  // 제4장: 배포와 공유
  distributionModel: DistributionModelIllustration,
  openStandard: OpenStandardIllustration,
  skillsViaApi: SkillsViaApiIllustration,
  recommendedApproach: RecommendedApproachIllustration,
  positioningYourSkill: PositioningYourSkillIllustration,
  // 제5장: 패턴과 문제 해결
  skillPatterns: SkillPatternsIllustration,
  troubleshooting: TroubleshootingIllustration,
  // 제6장: 리소스와 참고자료
  officialDocs: OfficialDocsIllustration,
  exampleSkills: ExampleSkillsIllustration,
  toolsAndUtilities: ToolsAndUtilitiesIllustration,
  // 부록
  quickChecklist: QuickChecklistIllustration,
  yamlReference: YamlReferenceIllustration,
  completeExamples: CompleteExamplesIllustration,
};
