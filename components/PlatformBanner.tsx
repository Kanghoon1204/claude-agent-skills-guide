import React from 'react';
import { usePlatform } from '../hooks/usePlatform';
import { Platform, PLATFORMS } from '../context/PlatformContext';

const PlatformBanner: React.FC = () => {
  const { platform, setPlatform } = usePlatform();

  const platformButtons: { id: Platform; icon: string; label: string }[] = [
    { id: 'claude', icon: '🟠', label: 'Claude' },
    { id: 'cursor', icon: '🔵', label: 'Cursor' },
    { id: 'codex', icon: '🟢', label: 'Codex' },
    { id: 'windsurf', icon: '🟣', label: 'Windsurf' },
    { id: 'antigravity', icon: '🔴', label: 'Antigravity' },
  ];

  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-neutral-800 dark:to-neutral-850 border border-slate-200 dark:border-neutral-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            플랫폼 선택
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            (코드 예제가 바뀝니다)
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {platformButtons.map((p) => {
            const isSelected = platform === p.id;
            const info = PLATFORMS[p.id];
            return (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isSelected
                    ? 'text-white shadow-md scale-105'
                    : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-600 border border-slate-200 dark:border-neutral-600'
                  }
                `}
                style={isSelected ? { backgroundColor: info.color } : undefined}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
                {isSelected && <span className="ml-1">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformBanner;
