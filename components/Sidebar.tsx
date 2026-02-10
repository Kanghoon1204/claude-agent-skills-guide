import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_DATA, CHAPTER_COLORS, pathToKey, findCategoryForSection } from '../constants';
import { translations } from '../i18n/translations';
import { ChevronIcon } from './icons/ChevronIcon';
import { BookIcon } from './icons/BookIcon';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const CHAPTER_NUMBERS: Record<string, string> = {
  introduction: '',
  fundamentals: 'Ch.1',
  planningAndDesign: 'Ch.2',
  testingAndIteration: 'Ch.3',
  distributionAndSharing: 'Ch.4',
  patternsAndTroubleshooting: 'Ch.5',
  resourcesAndReferences: 'Ch.6',
  appendices: '',
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    introduction: true,
    fundamentals: true,
  });

  // Auto-expand category containing current section
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/sections/')) {
      const sectionKey = pathToKey(path);
      const categoryKey = findCategoryForSection(sectionKey);
      if (categoryKey) {
        setExpandedCategories(prev =>
          prev[categoryKey] ? prev : { ...prev, [categoryKey]: true }
        );
      }
    }
  }, [location.pathname]);

  const toggleCategory = (key: string) => {
    setExpandedCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full bg-slate-100 dark:bg-neutral-800 border-r border-slate-200 dark:border-neutral-700 overflow-y-auto transition-all duration-300 ${
          isOpen ? 'w-72' : 'w-0 md:w-72'
        }`}
      >
        <div className="min-w-[18rem] p-4">
          <NavLink
            to="/home"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isActive
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'
                  : 'hover:bg-slate-200 dark:hover:bg-neutral-700'
              }`
            }
          >
            <BookIcon className="w-4 h-4" />
            <span className="text-sm font-medium">홈</span>
          </NavLink>

          <div className="border-t border-slate-200 dark:border-neutral-700 pt-2">
            {NAV_DATA.map((category) => {
              const isExpanded = expandedCategories[category.key] ?? false;
              const colors = CHAPTER_COLORS[category.key];
              const chNum = CHAPTER_NUMBERS[category.key];

              return (
                <div key={category.key} className="mb-1">
                  <button
                    onClick={() => toggleCategory(category.key)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <div className="flex items-center gap-2">
                      {chNum && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
                          {chNum}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-left">
                        {translations.nav[category.key] || category.key}
                      </span>
                    </div>
                    <ChevronIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {category.items.map((item) => (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block pl-8 pr-3 py-1.5 ml-2 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            isActive
                              ? `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} font-medium`
                              : 'text-neutral-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
                          }`
                        }
                      >
                        {translations.sections[item.key] || item.key}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
