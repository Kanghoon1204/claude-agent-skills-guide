import React from 'react';
import type { WizardState } from '../index';

interface StepBasicInfoProps {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

const StepBasicInfo: React.FC<StepBasicInfoProps> = ({ state, updateState }) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          기본 정보 입력
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          스킬의 이름과 설명을 입력하세요. 이 정보는 Claude가 스킬을 인식하고 언제 사용할지 결정하는 데 사용됩니다.
        </p>
      </div>

      <div>
        <label
          htmlFor="skill-name"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
        >
          스킬 이름 <span className="text-red-500">*</span>
        </label>
        <input
          id="skill-name"
          type="text"
          value={state.name}
          onChange={(e) => updateState({ name: e.target.value })}
          placeholder="예: code-review, meeting-notes, api-docs"
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          영문 소문자, 숫자, 하이픈만 사용 (예: my-skill-name)
        </p>
      </div>

      <div>
        <label
          htmlFor="skill-description"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
        >
          설명 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="skill-description"
          value={state.description}
          onChange={(e) => updateState({ description: e.target.value })}
          placeholder="예: 코드 리뷰를 수행하고 피드백을 제공하는 스킬입니다."
          rows={3}
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Claude가 이 스킬을 언제 사용해야 하는지 알 수 있도록 명확하게 작성하세요.
        </p>
      </div>

      {/* Preview */}
      {state.name && (
        <div className="p-4 bg-slate-50 dark:bg-neutral-900 rounded-lg border border-slate-200 dark:border-neutral-700">
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
            미리보기
          </div>
          <code className="text-sm text-orange-600 dark:text-orange-400">
            {state.name || 'skill-name'}
          </code>
          {state.description && (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {state.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StepBasicInfo;
