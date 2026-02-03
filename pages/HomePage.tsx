import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_DATA, CHAPTER_COLORS } from '../constants';
import { ExternalLinkIcon } from '../components/icons/ExternalLinkIcon';

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
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-block px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 rounded-full mb-4">
          6개 챕터 + 3개 부록
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Claude 에이전트 스킬 가이드
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Anthropic 공식 가이드를 기반으로 한 Claude 스킬 구축 완벽 교재입니다.
          기초부터 배포까지, 코드 스킬과 비코드 스킬 모두를 다룹니다.
        </p>
      </div>

      {/* What are Skills */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 mb-10 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-xl font-bold mb-4">스킬(Skill)이란?</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
          스킬은 지시사항의 패키지입니다 - Claude에게 특정 작업이나 워크플로우를 처리하는
          방법을 가르치는 간단한 폴더입니다. 매번 대화마다 선호도, 프로세스, 도메인
          전문지식을 다시 설명하는 대신 스킬을 통해 한 번 가르치면 매번 혜택을 받을 수
          있습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { text: '프론트엔드 디자인 생성', icon: '🎨' },
            { text: '일관된 방법론으로 리서치', icon: '🔍' },
            { text: '다단계 프로세스 오케스트레이션', icon: '⚙️' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-neutral-900 rounded-xl">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          {
            title: 'Progressive Disclosure',
            desc: '3단계 시스템으로 토큰 사용을 최소화하면서 전문지식을 유지합니다.',
            color: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
          },
          {
            title: 'Composability',
            desc: 'Claude는 여러 스킬을 동시에 로드할 수 있습니다. 스킬은 다른 스킬과 함께 잘 작동해야 합니다.',
            color: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800',
          },
          {
            title: 'Portability',
            desc: '스킬은 Claude.ai, Claude Code, API 모두에서 동일하게 작동합니다.',
            color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
          },
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-xl border ${item.color}`}>
            <h3 className="font-bold text-sm mb-2">{item.title}</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Chapter Grid */}
      <h2 className="text-xl font-bold mb-6">챕터 구성</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {NAV_DATA.map((cat) => {
          const colors = CHAPTER_COLORS[cat.key];
          return (
            <Link
              key={cat.key}
              to={cat.items[0].path}
              className={`group p-5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all hover:shadow-md ${colors.bg} ${colors.darkBg}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-bold ${colors.text} ${colors.darkText}`}>
                  {CHAPTER_LABELS[cat.key]}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                {CHAPTER_DESC[cat.key]}
              </p>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                {cat.items.length}개 섹션
              </div>
            </Link>
          );
        })}
      </div>

      {/* External Resources */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-bold mb-4">외부 리소스</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: '공식 스킬 문서', url: 'https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview' },
            { label: 'GitHub 스킬 저장소', url: 'https://github.com/anthropics/skills' },
            { label: 'Anthropic 엔지니어링 블로그', url: 'https://www.anthropic.com/engineering' },
            { label: 'Claude Code 문서', url: 'https://docs.anthropic.com/en/docs/claude-code' },
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <ExternalLinkIcon className="w-4 h-4 text-neutral-400" />
              <span className="text-sm">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-10">
        Anthropic 공식 &quot;The Complete Guide to Building Skills for Claude&quot; 기반
      </div>
    </div>
  );
};

export default HomePage;
