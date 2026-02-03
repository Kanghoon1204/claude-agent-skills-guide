import React from 'react';

interface InfoBoxProps {
  type: 'tip' | 'warning' | 'note' | 'example' | 'good' | 'bad';
  title?: string;
  children: React.ReactNode;
}

const CONFIG = {
  tip: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-300 dark:border-emerald-700',
    icon: '💡',
    defaultTitle: { ko: '팁', en: 'Tip' },
    titleColor: 'text-emerald-700 dark:text-emerald-300',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-300 dark:border-amber-700',
    icon: '⚠️',
    defaultTitle: { ko: '주의', en: 'Warning' },
    titleColor: 'text-amber-700 dark:text-amber-300',
  },
  note: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-300 dark:border-blue-700',
    icon: 'ℹ️',
    defaultTitle: { ko: '참고', en: 'Note' },
    titleColor: 'text-blue-700 dark:text-blue-300',
  },
  example: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-300 dark:border-violet-700',
    icon: '📋',
    defaultTitle: { ko: '예제', en: 'Example' },
    titleColor: 'text-violet-700 dark:text-violet-300',
  },
  good: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-400 dark:border-green-700',
    icon: '✅',
    defaultTitle: { ko: '좋은 예', en: 'Good' },
    titleColor: 'text-green-700 dark:text-green-300',
  },
  bad: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-400 dark:border-red-700',
    icon: '❌',
    defaultTitle: { ko: '나쁜 예', en: 'Bad' },
    titleColor: 'text-red-700 dark:text-red-300',
  },
};

const InfoBox: React.FC<InfoBoxProps> = ({ type, title, children }) => {
  const c = CONFIG[type];

  return (
    <div className={`rounded-xl border-l-4 ${c.border} ${c.bg} p-4 my-4`}>
      {title && (
        <div className={`flex items-center gap-2 font-semibold text-sm mb-2 ${c.titleColor}`}>
          <span>{c.icon}</span>
          <span>{title}</span>
        </div>
      )}
      <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
