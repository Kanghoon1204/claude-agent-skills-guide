import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import SearchModal from './SearchModal';
import ReadingProgress from './ReadingProgress';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <ReadingProgress />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onSearchClick={openSearch}
        />
        <main id="main-content" className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
};

export default Layout;
