import React from 'react';
import { usePlatform } from '../hooks/usePlatform';
import { Platform } from '../context/PlatformContext';
import CodeBlock from './CodeBlock';
import InfoBox from './InfoBox';

interface PlatformGuideContent {
  title: string;
  available: boolean;
  tool?: string;
  description?: string;
  steps?: string[];
  command?: string;
  examplePrompt?: string;
  exampleResponse?: string;
  tips?: string[];
  limitations?: string[];
  docUrl?: string;
}

const PLATFORM_GUIDES: Record<Platform, PlatformGuideContent> = {
  claude: {
    title: 'Claude Code skill-creator',
    available: true,
    tool: 'skill-creator 스킬',
    description: 'Claude Code에 내장된 공식 스킬 생성 도구입니다. 자연어로 원하는 스킬을 설명하면 올바른 형식의 SKILL.md 파일을 자동으로 생성해줍니다.',
    steps: [
      'Claude Code를 실행합니다',
      '아래 예시처럼 skill-creator를 호출합니다',
      '질문에 답변하며 스킬을 정의합니다',
      '생성된 SKILL.md를 검토하고 저장합니다',
    ],
    examplePrompt: 'Help me build a skill using skill-creator. I want a skill that reviews my code for security vulnerabilities.',
    exampleResponse: `I'll help you create a security review skill. Let me ask a few questions:

1. What languages/frameworks should this focus on?
2. Should it check for specific vulnerability types (OWASP Top 10, etc.)?
3. Do you want it to suggest fixes or just identify issues?

Based on your answers, I'll generate a SKILL.md file...`,
    tips: [
      '기존 스킬을 리뷰하려면: "Review this skill and suggest improvements"',
      '스킬을 개선하려면: "Use the issues in this chat to improve the skill"',
      '간단한 스킬부터 시작해서 점진적으로 복잡하게 만드세요',
    ],
    docUrl: 'https://docs.anthropic.com/en/docs/claude-code/skills',
  },
  codex: {
    title: 'Codex $skill-creator',
    available: true,
    tool: '$skill-creator + /init',
    description: 'Codex CLI에는 시스템 스킬로 $skill-creator가 내장되어 있습니다. 또한 /init 명령으로 AGENTS.md 스캐폴드를 생성할 수 있습니다.',
    steps: [
      'Codex CLI를 실행합니다',
      '채팅에서 $skill-creator를 입력합니다',
      '프롬프트에 따라 스킬을 정의합니다',
      '생성된 SKILL.md 또는 AGENTS.md를 저장합니다',
    ],
    command: '$skill-creator',
    examplePrompt: '$skill-creator\n\n나는 코드 리뷰를 자동화하는 스킬을 만들고 싶어. PR이 올라오면 보안 취약점과 성능 이슈를 체크해줬으면 해.',
    exampleResponse: `스킬을 만들어 드리겠습니다. 몇 가지 질문이 있습니다:

1. 어떤 언어를 주로 사용하시나요?
2. 특정 보안 규칙(OWASP 등)을 적용할까요?
3. GitHub Actions와 연동이 필요한가요?

답변을 바탕으로 SKILL.md를 생성하겠습니다...`,
    tips: [
      '/init 명령으로 프로젝트에 AGENTS.md 스캐폴드를 생성할 수 있습니다',
      '$skill-installer로 스킬 카탈로그에서 기존 스킬을 설치할 수 있습니다',
      '스킬은 ~/.codex/skills/ 또는 프로젝트의 .codex/skills/에 저장됩니다',
    ],
    docUrl: 'https://developers.openai.com/codex/skills',
  },
  cursor: {
    title: 'Cursor /Generate Cursor Rules',
    available: true,
    tool: '/Generate Cursor Rules (v0.49+)',
    description: 'Cursor v0.49부터 추가된 기능입니다. Agent 모드에서 코드베이스를 분석하여 맞춤형 규칙을 자동으로 생성합니다.',
    steps: [
      'Cursor를 열고 Agent 모드를 활성화합니다',
      '채팅창에 /Generate Cursor Rules를 입력합니다',
      'Cursor가 코드베이스를 분석하고 규칙을 생성합니다',
      '생성된 규칙을 .cursorrules 또는 .cursor/rules/에 저장합니다',
    ],
    command: '/Generate Cursor Rules',
    examplePrompt: '/Generate Cursor Rules\n\n이 React 프로젝트에 맞는 코딩 규칙을 생성해줘.',
    exampleResponse: `코드베이스를 분석하고 있습니다...

다음 규칙들을 생성했습니다:
- TypeScript strict mode 사용
- React hooks 네이밍 컨벤션
- 컴포넌트 파일 구조
- API 호출 패턴
- 에러 핸들링 가이드라인

.cursor/rules/react-conventions.mdc에 저장할까요?`,
    tips: [
      'Claude 3.7 thinking 모델을 사용하면 더 좋은 결과를 얻을 수 있습니다',
      '생성된 규칙이 완벽하지 않을 수 있으니 검토 후 수정하세요',
      '규칙을 업데이트하려면 Agent에게 "규칙 파일을 수정해줘"라고 요청하세요',
    ],
    docUrl: 'https://docs.cursor.com/context/rules-for-ai',
  },
  windsurf: {
    title: 'Windsurf Cascade 워크플로우 생성',
    available: true,
    tool: 'Cascade에게 요청',
    description: 'Windsurf는 전용 명령어가 아닌 Cascade AI에게 직접 요청하여 워크플로우를 생성합니다. CLI 작업이 포함된 워크플로우에 특히 효과적입니다.',
    steps: [
      'Windsurf에서 Cascade 채팅을 엽니다',
      '"Help me create a workflow for..."라고 요청합니다',
      'Cascade가 워크플로우를 생성합니다',
      '.windsurf/workflows/에 저장합니다',
    ],
    examplePrompt: 'Help me create a workflow for deploying my Next.js app to Vercel. Include build verification and rollback steps.',
    exampleResponse: `워크플로우를 생성하겠습니다:

# deploy-to-vercel

## Steps
1. Run tests: \`npm run test\`
2. Build verification: \`npm run build\`
3. Deploy: \`vercel --prod\`
4. Health check: verify deployment URL
5. On failure: \`vercel rollback\`

.windsurf/workflows/deploy-to-vercel.md에 저장할까요?`,
    tips: [
      'Memories는 규칙 생성 도구가 아닙니다 - Cascade가 대화 중 컨텍스트를 자동 저장하는 기능입니다',
      '규칙(Rules)은 .windsurf/rules/에, 워크플로우는 .windsurf/workflows/에 저장됩니다',
      'CLI 도구를 사용하는 반복 작업에 워크플로우가 특히 유용합니다',
    ],
    limitations: [
      '전용 규칙 생성 명령어가 없습니다',
      'Rules와 Workflows는 별개의 개념입니다',
    ],
    docUrl: 'https://docs.windsurf.com/windsurf/cascade/workflows',
  },
  antigravity: {
    title: 'Antigravity 수동 생성',
    available: false,
    tool: '없음 (수동 생성)',
    description: 'Antigravity는 아직 내장 스킬 생성 도구가 없습니다. 아래 위저드를 사용하거나 SKILL.md를 직접 작성해야 합니다.',
    steps: [
      '이 페이지의 스킬 생성 위저드를 사용합니다',
      '또는 SKILL.md 템플릿을 복사하여 수정합니다',
      '.agent/skills/<name>/SKILL.md 경로에 저장합니다',
      '전역 스킬은 ~/.gemini/antigravity/skills/에 저장합니다',
    ],
    tips: [
      '아래 위저드에서 Antigravity 탭을 선택하면 올바른 형식으로 생성됩니다',
      'Claude Code의 SKILL.md 형식과 호환됩니다 (YAML frontmatter 사용)',
      'Agent Skills 오픈 표준을 따르므로 다른 플랫폼 스킬을 참고할 수 있습니다',
    ],
    docUrl: 'https://antigravity.google/docs/skills',
  },
};

const PlatformGuide: React.FC = () => {
  const { platform, platformInfo } = usePlatform();
  const guide = PLATFORM_GUIDES[platform];

  return (
    <div className="my-8 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ backgroundColor: `${platformInfo.color}15` }}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: platformInfo.color }}
        >
          {platformInfo.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
            {guide.title}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            {guide.available ? (
              <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                내장 도구 사용 가능
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                수동 생성 필요
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-6">
        {/* Description */}
        <p className="text-neutral-700 dark:text-neutral-300">
          {guide.description}
        </p>

        {/* Command (if available) */}
        {guide.command && (
          <div>
            <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2">명령어</h4>
            <code className="block px-4 py-3 bg-neutral-900 dark:bg-neutral-950 text-green-400 rounded-lg font-mono text-sm">
              {guide.command}
            </code>
          </div>
        )}

        {/* Steps */}
        {guide.steps && (
          <div>
            <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-3">사용 방법</h4>
            <ol className="space-y-2">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: platformInfo.color }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Example */}
        {guide.examplePrompt && (
          <div>
            <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-3">사용 예시</h4>
            <div className="space-y-3">
              <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                <div className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  사용자 입력
                </div>
                <pre className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap font-mono">
                  {guide.examplePrompt}
                </pre>
              </div>

              {guide.exampleResponse && (
                <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  <div className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    AI 응답 (예시)
                  </div>
                  <pre className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap font-mono">
                    {guide.exampleResponse}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips */}
        {guide.tips && guide.tips.length > 0 && (
          <InfoBox type="tip" title="팁">
            <ul className="space-y-1">
              {guide.tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </InfoBox>
        )}

        {/* Limitations */}
        {guide.limitations && guide.limitations.length > 0 && (
          <InfoBox type="warning" title="제한사항">
            <ul className="space-y-1">
              {guide.limitations.map((lim, i) => (
                <li key={i}>• {lim}</li>
              ))}
            </ul>
          </InfoBox>
        )}

        {/* Documentation Link */}
        {guide.docUrl && (
          <a
            href={guide.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            style={{ color: platformInfo.color }}
          >
            공식 문서 보기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default PlatformGuide;
