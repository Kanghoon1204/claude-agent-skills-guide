import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import WizardProgress from './WizardProgress';
import StepBasicInfo from './steps/StepBasicInfo';
import StepTools from './steps/StepTools';
import StepInstructions from './steps/StepInstructions';
import StepReview from './steps/StepReview';

export interface WizardState {
  name: string;
  description: string;
  tools: {
    builtin: string[];
    mcp: string[];
  };
  instructions: string;
}

const INITIAL_STATE: WizardState = {
  name: '',
  description: '',
  tools: {
    builtin: ['Read', 'Write', 'Bash'],
    mcp: [],
  },
  instructions: '',
};

const STEPS = [
  { id: 1, title: '기본 정보', description: '스킬 이름과 설명' },
  { id: 2, title: '도구 선택', description: '사용할 도구 지정' },
  { id: 3, title: '지시사항', description: '스킬 동작 설명' },
  { id: 4, title: '검토 및 생성', description: 'YAML 확인 및 복사' },
];

const SkillCreatorWizard: React.FC = () => {
  const { platform, platformInfo } = usePlatform();
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return state.name.trim().length > 0 && state.description.trim().length > 0;
      case 2:
        return state.tools.builtin.length > 0 || state.tools.mcp.length > 0;
      case 3:
        return state.instructions.trim().length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  }, [currentStep, state]);

  const handleNext = () => {
    if (currentStep < 4 && canProceed) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasicInfo state={state} updateState={updateState} />;
      case 2:
        return <StepTools state={state} updateState={updateState} />;
      case 3:
        return <StepInstructions state={state} updateState={updateState} platform={platform} />;
      case 4:
        return <StepReview state={state} platform={platform} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800/50">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: platformInfo.color }}
          />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {platformInfo.name} 스킬 생성기
          </span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          단계별로 스킬을 만들어 보세요
        </h3>
      </div>

      {/* Progress */}
      <WizardProgress steps={STEPS} currentStep={currentStep} />

      {/* Content */}
      <div className="p-6">{renderStep()}</div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800/50 flex justify-between">
        <button
          onClick={currentStep === 1 ? handleReset : handlePrev}
          className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          {currentStep === 1 ? '초기화' : '이전'}
        </button>

        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              canProceed
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-slate-200 dark:bg-neutral-700 text-slate-400 dark:text-neutral-500 cursor-not-allowed'
            }`}
          >
            다음
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            처음부터 다시
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillCreatorWizard;
