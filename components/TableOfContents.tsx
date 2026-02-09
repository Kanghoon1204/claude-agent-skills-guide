import React, { useState, useEffect, useCallback } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

// Intersection Observer 설정 상수
const OBSERVER_OPTIONS = { rootMargin: '-80px 0px -80% 0px' };

// 목차 아이템 버튼 컴포넌트 - 중복 제거
interface TOCItemButtonProps {
  item: TOCItem;
  isActive: boolean;
  onClick: () => void;
}

const TOCItemButton: React.FC<TOCItemButtonProps> = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      block w-full text-left text-sm py-1.5 px-2 rounded transition-colors
      ${item.level > 1 ? 'pl-4' : ''}
      ${isActive
        ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 font-medium'
        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700'
      }
    `}
  >
    {item.title}
  </button>
);

// 목차 리스트 컴포넌트
interface TOCListProps {
  items: TOCItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}

const TOCList: React.FC<TOCListProps> = ({ items, activeId, onItemClick }) => (
  <ul className="space-y-1">
    {items.map((item) => (
      <li key={item.id}>
        <TOCItemButton
          item={item}
          isActive={activeId === item.id}
          onClick={() => onItemClick(item.id)}
        />
      </li>
    ))}
  </ul>
);

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, OBSERVER_OPTIONS);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsExpanded(false);
    }
  }, []);

  const closeMobileMenu = useCallback(() => setIsExpanded(false), []);
  const toggleMobileMenu = useCallback(() => setIsExpanded(prev => !prev), []);

  if (items.length < 2) return null;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed bottom-4 right-4 z-40 xl:hidden w-12 h-12 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
        aria-label="목차 열기"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop TOC - fixed on right */}
      <nav className="hidden xl:block fixed right-8 top-24 w-56 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
          목차
        </div>
        <TOCList items={items} activeId={activeId} onItemClick={scrollTo} />
      </nav>

      {/* Mobile TOC panel */}
      <nav
        className={`
          xl:hidden fixed z-50 bg-white dark:bg-neutral-800 shadow-xl rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 max-h-[70vh] overflow-y-auto
          transition-all duration-300
          ${isExpanded ? 'bottom-20 right-4 left-4 sm:left-auto sm:w-72' : 'hidden'}
        `}
      >
        <div className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
          목차
        </div>
        <TOCList items={items} activeId={activeId} onItemClick={scrollTo} />
      </nav>
    </>
  );
};

export default TableOfContents;
