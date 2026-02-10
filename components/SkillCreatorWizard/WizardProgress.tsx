import React from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface WizardProgressProps {
  steps: Step[];
  currentStep: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="px-6 py-4 border-b border-slate-200 dark:border-neutral-700">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-200 dark:bg-neutral-700 text-slate-500 dark:text-neutral-400'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <div className="mt-2 text-center hidden sm:block">
                  <div
                    className={`text-xs font-medium ${
                      isActive
                        ? 'text-orange-600 dark:text-orange-400'
                        : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-slate-500 dark:text-neutral-400'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>

              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors ${
                    isCompleted ? 'bg-green-500' : 'bg-slate-200 dark:bg-neutral-700'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: Show current step title */}
      <div className="mt-3 text-center sm:hidden">
        <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
          {steps[currentStep - 1].title}
        </div>
        <div className="text-xs text-slate-500 dark:text-neutral-400">
          {steps[currentStep - 1].description}
        </div>
      </div>
    </div>
  );
};

export default WizardProgress;
