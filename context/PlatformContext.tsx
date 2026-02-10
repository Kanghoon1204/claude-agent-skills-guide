import React, { createContext, useState, useCallback, useMemo } from 'react';

export type Platform = 'claude' | 'cursor' | 'codex' | 'windsurf';

export interface PlatformInfo {
  id: Platform;
  name: string;
  description: string;
  color: string;
}

export const PLATFORMS: Record<Platform, PlatformInfo> = {
  claude: {
    id: 'claude',
    name: 'Claude Code',
    description: 'Anthropic Claude Code CLI',
    color: '#D97706', // orange
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    description: 'Cursor AI Editor',
    color: '#3B82F6', // blue
  },
  codex: {
    id: 'codex',
    name: 'Codex',
    description: 'OpenAI Codex CLI',
    color: '#10B981', // green
  },
  windsurf: {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'Codeium Windsurf IDE',
    color: '#8B5CF6', // purple
  },
};

interface PlatformContextType {
  platform: Platform;
  platformInfo: PlatformInfo;
  setPlatform: (platform: Platform) => void;
}

export const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

const getInitialPlatform = (): Platform => {
  const saved = localStorage.getItem('platform') as Platform | null;
  if (saved && PLATFORMS[saved]) return saved;
  return 'claude';
};

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platform, setPlatformState] = useState<Platform>(getInitialPlatform);

  const setPlatform = useCallback((newPlatform: Platform) => {
    setPlatformState(newPlatform);
    localStorage.setItem('platform', newPlatform);
  }, []);

  const platformInfo = PLATFORMS[platform];

  const value = useMemo(
    () => ({ platform, platformInfo, setPlatform }),
    [platform, platformInfo, setPlatform]
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};
