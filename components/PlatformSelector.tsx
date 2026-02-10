import React, { useState, useRef, useEffect } from 'react';
import { usePlatform } from '../hooks/usePlatform';
import { Platform, PLATFORMS } from '../context/PlatformContext';
import { ChevronIcon } from './icons/ChevronIcon';

const PlatformIcon: React.FC<{ platform: Platform; className?: string }> = ({ platform, className = 'w-4 h-4' }) => {
  const icons: Record<Platform, React.ReactNode> = {
    claude: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    cursor: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z"/>
      </svg>
    ),
    codex: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    windsurf: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17h18M5 12l7-7 7 7M12 5v12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return <>{icons[platform]}</>;
};

const PlatformSelector: React.FC = () => {
  const { platform, platformInfo, setPlatform } = usePlatform();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newPlatform: Platform) => {
    setPlatform(newPlatform);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-neutral-600 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
        aria-label="플랫폼 선택"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <PlatformIcon platform={platform} className="w-4 h-4" />
        <span className="hidden sm:inline">{platformInfo.name}</span>
        <ChevronIcon className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-slate-200 dark:border-neutral-700 py-1 z-50"
          role="listbox"
          aria-label="플랫폼 목록"
        >
          {(Object.keys(PLATFORMS) as Platform[]).map((p) => {
            const info = PLATFORMS[p];
            const isSelected = p === platform;
            return (
              <button
                key={p}
                onClick={() => handleSelect(p)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-100 dark:hover:bg-neutral-700 transition-colors ${
                  isSelected ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300' : ''
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <span
                  className="w-5 h-5 flex items-center justify-center rounded"
                  style={{ color: info.color }}
                >
                  <PlatformIcon platform={p} className="w-4 h-4" />
                </span>
                <div className="flex-1">
                  <div className="font-medium">{info.name}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">{info.description}</div>
                </div>
                {isSelected && (
                  <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;
