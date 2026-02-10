import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { MenuIcon } from './icons/MenuIcon';
import { SearchIcon } from './icons/SearchIcon';
import { GithubIcon } from './icons/GithubIcon';
import PlatformSelector from './PlatformSelector';

interface TopBarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick, onSearchClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-slate-100/80 dark:bg-neutral-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-neutral-700">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
          aria-label="메뉴 열기"
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        <Link to="/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-sm hidden sm:inline">
            Claude Skills Guide
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <PlatformSelector />

        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 rounded-lg border border-slate-300 dark:border-neutral-600 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
          aria-label="검색"
        >
          <SearchIcon className="w-4 h-4" />
          <span className="hidden sm:inline">검색</span>
          <kbd className="hidden sm:inline ml-1 px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-neutral-700 rounded">⌘K</kbd>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
          aria-label="테마 전환"
        >
          {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </button>

        <a
          href="https://github.com/anthropics/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
          aria-label="GitHub"
        >
          <GithubIcon className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};

export default TopBar;
