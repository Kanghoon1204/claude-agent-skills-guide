import React from 'react';
import type { WizardState } from '../index';
import type { Platform } from '../../../context/PlatformContext';

interface StepInstructionsProps {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  platform: Platform;
}

const TEMPLATES: Record<string, { title: string; content: string }> = {
  codeReview: {
    title: '코드 리뷰',
    content: `# 코드 리뷰 지침

## 목표
변경된 코드를 리뷰하고 품질 향상을 위한 피드백을 제공합니다.

## 리뷰 항목
1. **코드 품질**: 가독성, 유지보수성 확인
2. **버그 가능성**: 잠재적 오류나 엣지 케이스 검토
3. **성능**: 비효율적인 패턴이나 성능 이슈 확인
4. **보안**: 보안 취약점 검토

## 출력 형식
각 파일별로 발견된 이슈와 개선 제안을 마크다운 형식으로 정리합니다.`,
  },
  documentation: {
    title: '문서 생성',
    content: `# 문서 생성 지침

## 목표
코드를 분석하여 README, API 문서 등을 자동으로 생성합니다.

## 포함 항목
1. **개요**: 프로젝트 설명
2. **설치 방법**: 의존성 및 설치 단계
3. **사용 방법**: 기본 사용 예시
4. **API 레퍼런스**: 함수/클래스 설명

## 스타일
명확하고 간결한 기술 문서 스타일을 유지합니다.`,
  },
  testing: {
    title: '테스트 작성',
    content: `# 테스트 작성 지침

## 목표
기존 코드에 대한 단위 테스트를 생성합니다.

## 테스트 커버리지
1. **정상 케이스**: 예상되는 입력에 대한 테스트
2. **엣지 케이스**: 경계값, 빈 입력 등
3. **에러 케이스**: 잘못된 입력 처리 확인

## 프레임워크
프로젝트에서 사용 중인 테스트 프레임워크를 감지하여 적용합니다.`,
  },
};

const StepInstructions: React.FC<StepInstructionsProps> = ({ state, updateState, platform }) => {
  const applyTemplate = (templateKey: string) => {
    const template = TEMPLATES[templateKey];
    if (template) {
      updateState({ instructions: template.content });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          지시사항 작성
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          스킬이 어떻게 동작해야 하는지 상세하게 설명하세요. 마크다운 형식을 사용할 수 있습니다.
        </p>
      </div>

      {/* Templates */}
      <div>
        <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          템플릿으로 시작하기
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TEMPLATES).map(([key, template]) => (
            <button
              key={key}
              onClick={() => applyTemplate(key)}
              className="px-3 py-1.5 text-xs font-medium border border-slate-300 dark:border-neutral-600 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {template.title}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div>
        <label
          htmlFor="instructions"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
        >
          지시사항 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="instructions"
          value={state.instructions}
          onChange={(e) => updateState({ instructions: e.target.value })}
          placeholder={`# ${state.name || '스킬 이름'}\n\n## 목표\n이 스킬이 수행할 작업을 설명하세요.\n\n## 단계\n1. 첫 번째 단계\n2. 두 번째 단계\n\n## 출력 형식\n결과물의 형식을 정의하세요.`}
          rows={12}
          className="w-full px-3 py-2 text-sm font-mono border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
        <div className="mt-1 flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>마크다운 형식 지원</span>
          <span>{state.instructions.length}자</span>
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>팁:</strong> 좋은 지시사항은 목표, 단계, 출력 형식을 명확하게 정의합니다.
            예시를 포함하면 더욱 효과적입니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepInstructions;
