import React from 'react';
import { NAV_DATA } from '../constants';
import { ExternalLinkIcon } from '../components/icons/ExternalLinkIcon';
import HeroSection from '../components/HeroSection';
import ChapterCard from '../components/ChapterCard';

const CHAPTER_LABELS: Record<string, string> = {
  introduction: '소개',
  fundamentals: '제1장: 기초',
  planningAndDesign: '제2장: 설계와 기획',
  testingAndIteration: '제3장: 테스트와 반복',
  distributionAndSharing: '제4장: 배포와 공유',
  patternsAndTroubleshooting: '제5장: 패턴과 문제 해결',
  resourcesAndReferences: '제6장: 리소스와 참고자료',
  appendices: '부록',
};

const CHAPTER_DESC: Record<string, string> = {
  introduction: '스킬이란 무엇이며, 누구를 위한 가이드인지 알아봅니다.',
  fundamentals: '스킬의 구조, 핵심 설계 원칙, MCP와의 관계를 이해합니다.',
  planningAndDesign: '유스 케이스 정의부터 YAML 프론트매터 작성까지의 전 과정을 다룹니다.',
  testingAndIteration: '스킬을 테스트하고, 반복하여 개선하는 방법을 배웁니다.',
  distributionAndSharing: '스킬을 배포하고 공유하는 다양한 방법을 살펴봅니다.',
  patternsAndTroubleshooting: '실무에서 검증된 5가지 패턴과 일반적인 문제 해결법을 다룹니다.',
  resourcesAndReferences: '공식 문서, 예제 스킬, 도구 및 지원 채널을 안내합니다.',
  appendices: '빠른 체크리스트, YAML 레퍼런스, 완전한 스킬 예제를 제공합니다.',
};

const HomePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-slide-up">
      {/* Hero Section */}
      <HeroSection />

      {/* What are Skills - Enhanced */}
      <div className="relative overflow-hidden bg-white dark:bg-neutral-800 rounded-2xl p-8 mb-10 border border-neutral-200 dark:border-neutral-700">
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-transparent rounded-full blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">스킬(Skill)이란?</h2>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            스킬은 지시사항의 패키지입니다 - Claude에게 특정 작업이나 워크플로우를 처리하는
            방법을 가르치는 간단한 폴더입니다. 매번 대화마다 선호도, 프로세스, 도메인
            전문지식을 다시 설명하는 대신 스킬을 통해 한 번 가르치면 매번 혜택을 받을 수
            있습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { text: '프론트엔드 디자인 생성', icon: '🎨', color: 'from-pink-500 to-rose-500' },
              { text: '일관된 방법론으로 리서치', icon: '🔍', color: 'from-blue-500 to-indigo-500' },
              { text: '다단계 프로세스 오케스트레이션', icon: '⚙️', color: 'from-green-500 to-emerald-500' },
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-900 dark:to-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300">
                <div className={`absolute -right-6 -top-6 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500`} />
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <span className="text-sm font-medium relative z-10">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Principles - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          {
            title: 'Progressive Disclosure',
            desc: '3단계 시스템으로 토큰 사용을 최소화하면서 전문지식을 유지합니다.',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ),
            color: 'green',
          },
          {
            title: 'Composability',
            desc: 'Claude는 여러 스킬을 동시에 로드할 수 있습니다. 스킬은 다른 스킬과 함께 잘 작동해야 합니다.',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            ),
            color: 'violet',
          },
          {
            title: 'Portability',
            desc: '스킬은 Claude.ai, Claude Code, API 모두에서 동일하게 작동합니다.',
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ),
            color: 'blue',
          },
        ].map((item, i) => {
          const colorClasses = {
            green: 'bg-green-500 text-white',
            violet: 'bg-violet-500 text-white',
            blue: 'bg-blue-500 text-white',
          };
          const bgClasses = {
            green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700',
            violet: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 hover:border-violet-300 dark:hover:border-violet-700',
            blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700',
          };
          return (
            <div key={i} className={`group p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${bgClasses[item.color as keyof typeof bgClasses]}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Chapter Grid - Using new ChapterCard */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">챕터 구성</h2>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">총 {NAV_DATA.reduce((acc, cat) => acc + cat.items.length, 0)}개 섹션</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {NAV_DATA.map((cat) => (
          <ChapterCard
            key={cat.key}
            chapterKey={cat.key}
            label={CHAPTER_LABELS[cat.key]}
            description={CHAPTER_DESC[cat.key]}
            sectionCount={cat.items.length}
            path={cat.items[0].path}
          />
        ))}
      </div>

      {/* External Resources - Enhanced */}
      <div className="relative overflow-hidden bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-transparent rounded-full blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="text-lg font-bold">외부 리소스</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: '공식 스킬 문서', url: 'https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview', icon: '📖' },
              { label: 'GitHub 스킬 저장소', url: 'https://github.com/anthropics/skills', icon: '💻' },
              { label: 'Anthropic 엔지니어링 블로그', url: 'https://www.anthropic.com/engineering', icon: '📝' },
              { label: 'Claude Code 문서', url: 'https://docs.anthropic.com/en/docs/claude-code', icon: '🛠️' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700
                  bg-slate-50 dark:bg-neutral-900 hover:bg-white dark:hover:bg-neutral-800
                  hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md transition-all duration-300"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm font-medium flex-1">{link.label}</span>
                <ExternalLinkIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-10 py-4">
        <p>Anthropic 공식 &quot;The Complete Guide to Building Skills for Claude&quot; 기반</p>
        <p className="mt-1 opacity-70">Made with Claude Code</p>
      </div>
    </div>
  );
};

export default HomePage;
