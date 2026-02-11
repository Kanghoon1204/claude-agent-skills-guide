import React from 'react';
import { usePlatform } from '../hooks/usePlatform';
import { Platform } from '../context/PlatformContext';

interface DocLink {
  title: string;
  url: string;
  description: string;
}

interface PlatformDocsContent {
  main: DocLink;
  related: DocLink[];
}

const PLATFORM_DOCS: Record<Platform, PlatformDocsContent> = {
  claude: {
    main: {
      title: 'Claude Code Skills 공식 가이드',
      url: 'https://code.claude.com/docs/en/skills',
      description: '스킬 생성, 구조, 프론트매터, 고급 패턴까지 모든 것을 다루는 공식 문서',
    },
    related: [
      {
        title: 'Agent Skills 오픈 표준',
        url: 'https://agentskills.io',
        description: 'Claude Code가 따르는 오픈 스킬 표준 (다른 플랫폼과 호환)',
      },
      {
        title: 'GitHub: anthropics/skills',
        url: 'https://github.com/anthropics/skills',
        description: 'Anthropic 공식 스킬 저장소 - skill-creator, 예제 스킬 포함',
      },
      {
        title: 'Memory (CLAUDE.md)',
        url: 'https://code.claude.com/docs/en/memory',
        description: '프로젝트별 메모리 파일로 컨텍스트 유지하기',
      },
      {
        title: 'Hooks',
        url: 'https://code.claude.com/docs/en/hooks',
        description: '스킬과 함께 사용할 수 있는 자동화 훅',
      },
    ],
  },
  codex: {
    main: {
      title: 'Codex Skills 공식 가이드',
      url: 'https://developers.openai.com/codex/skills',
      description: '스킬 생성, $skill-creator, 스킬 구조에 대한 공식 문서',
    },
    related: [
      {
        title: 'AGENTS.md 가이드',
        url: 'https://developers.openai.com/codex/guides/agents-md',
        description: '프로젝트 루트에 두는 에이전트 지시사항 파일',
      },
      {
        title: 'GitHub: openai/skills',
        url: 'https://github.com/openai/skills',
        description: 'OpenAI 공식 스킬 카탈로그',
      },
      {
        title: 'Codex CLI 슬래시 명령어',
        url: 'https://developers.openai.com/codex/cli/slash-commands',
        description: '/init, /compact 등 내장 명령어 안내',
      },
      {
        title: 'Codex Changelog',
        url: 'https://developers.openai.com/codex/changelog',
        description: '최신 업데이트 및 새로운 기능',
      },
    ],
  },
  cursor: {
    main: {
      title: 'Cursor Rules for AI',
      url: 'https://cursor.com/docs',
      description: '.cursorrules와 .cursor/rules/ 파일로 AI 행동 커스터마이징',
    },
    related: [
      {
        title: 'Cursor Rules Directory',
        url: 'https://cursor.directory',
        description: '커뮤니티가 공유하는 Cursor 규칙 모음',
      },
      {
        title: 'Cursor Changelog',
        url: 'https://cursor.com/changelog',
        description: '/Generate Cursor Rules (v0.49+) 등 최신 기능 확인',
      },
      {
        title: 'Agent Mode',
        url: 'https://cursor.com/docs',
        description: 'Cursor Agent 모드 사용법',
      },
    ],
  },
  windsurf: {
    main: {
      title: 'Windsurf Workflows',
      url: 'https://docs.windsurf.com/windsurf/cascade/workflows',
      description: '반복 작업을 자동화하는 워크플로우 생성 및 사용법',
    },
    related: [
      {
        title: 'Cascade Memories',
        url: 'https://docs.windsurf.com/windsurf/cascade/memories',
        description: 'Cascade가 자동으로 저장하는 컨텍스트 메모리',
      },
      {
        title: 'Windsurf Rules Directory',
        url: 'https://windsurf.com/editor/directory',
        description: '커뮤니티가 공유하는 Windsurf 규칙 모음',
      },
      {
        title: 'Windsurf Best Practices',
        url: 'https://github.com/kamusis/windsurf_best_practice',
        description: 'Windsurf 사용 팁과 베스트 프랙티스',
      },
    ],
  },
  antigravity: {
    main: {
      title: 'Antigravity Skills Codelab',
      url: 'https://codelabs.developers.google.com/getting-started-with-antigravity-skills',
      description: 'Google Antigravity IDE에서 스킬 시작하기',
    },
    related: [
      {
        title: 'Agent Skills 오픈 표준',
        url: 'https://agentskills.io',
        description: 'Antigravity가 따르는 오픈 스킬 표준',
      },
      {
        title: 'Gemini API',
        url: 'https://ai.google.dev/docs',
        description: 'Antigravity의 기반이 되는 Gemini AI 문서',
      },
    ],
  },
};

const PlatformDocs: React.FC = () => {
  const { platform, platformInfo } = usePlatform();
  const docs = PLATFORM_DOCS[platform];

  return (
    <div className="my-8">
      <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {platformInfo.name} 공식 문서
      </h4>

      {/* Main Documentation */}
      <a
        href={docs.main.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-opacity-50 transition-all mb-4 group"
        style={{ borderColor: platformInfo.color }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: platformInfo.color }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                {docs.main.title}
              </span>
              <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {docs.main.description}
            </p>
          </div>
        </div>
      </a>

      {/* Related Documentation */}
      {docs.related.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {docs.related.map((doc, i) => (
            <a
              key={i}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline">
                  {doc.title}
                </span>
                <svg className="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {doc.description}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformDocs;
