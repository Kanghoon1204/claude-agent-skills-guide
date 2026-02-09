import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_DATA, CHAPTER_COLORS } from '../constants';
import { translations } from '../i18n/translations';
import { CODE_EXAMPLES } from '../constants/codeExamples';
import { SearchIcon } from './icons/SearchIcon';

// 검색 컨텍스트 설정 상수
const SEARCH_CONFIG = {
  CONTEXT_BEFORE: 20,  // 매칭 위치 앞 문자 수
  CONTEXT_AFTER: 40,   // 매칭 위치 뒤 문자 수
  MAX_ITEM_LENGTH: 60, // 아이템 최대 표시 길이
} as const;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  key: string;
  path: string;
  sectionTitle: string;
  categoryKey: string;
  categoryLabel: string;
  matchContext?: string;
}

// 텍스트에서 검색어 주변 컨텍스트 추출
function extractContext(text: string, queryIndex: number, queryLength: number): string {
  const start = Math.max(0, queryIndex - SEARCH_CONFIG.CONTEXT_BEFORE);
  const end = Math.min(text.length, queryIndex + queryLength + SEARCH_CONFIG.CONTEXT_AFTER);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < text.length ? '...' : '';
  return prefix + text.slice(start, end).trim() + suffix;
}

// 텍스트를 최대 길이로 자르기
function truncateText(text: string, maxLength: number = SEARCH_CONFIG.MAX_ITEM_LENGTH): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function searchSections(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const category of NAV_DATA) {
    const categoryLabel = translations.nav[category.key] || category.key;
    for (const item of category.items) {
      const sectionTitle = translations.sections[item.key] || item.key;
      const content = (translations.content as any)?.[item.key];

      let matched = false;
      let matchContext = '';

      // Match against section title
      if (sectionTitle.toLowerCase().includes(lowerQuery)) {
        matched = true;
        matchContext = sectionTitle;
      }

      // Match against content body
      if (!matched && content?.body) {
        const bodyLower = content.body.toLowerCase();
        const idx = bodyLower.indexOf(lowerQuery);
        if (idx !== -1) {
          matched = true;
          matchContext = extractContext(content.body, idx, query.length);
        }
      }

      // Match against subsection titles and bodies
      if (!matched && content?.subsections) {
        for (const sub of content.subsections) {
          if (sub.title?.toLowerCase().includes(lowerQuery)) {
            matched = true;
            matchContext = sub.title;
            break;
          }
          if (sub.body) {
            const subBodyLower = sub.body.toLowerCase();
            const idx = subBodyLower.indexOf(lowerQuery);
            if (idx !== -1) {
              matched = true;
              matchContext = extractContext(sub.body, idx, query.length);
              break;
            }
          }
        }
      }

      // Match against items
      if (!matched && content?.items) {
        for (const it of content.items) {
          const text = typeof it === 'string' ? it : `${it.label} ${it.desc || ''}`;
          if (text.toLowerCase().includes(lowerQuery)) {
            matched = true;
            matchContext = truncateText(text);
            break;
          }
        }
      }

      // Match against code examples
      if (!matched) {
        const codeExamples = CODE_EXAMPLES[item.key] || [];
        for (const ex of codeExamples) {
          const titleMatch = (ex.titleKo || ex.title || '').toLowerCase().includes(lowerQuery);
          const codeMatch = ex.code.toLowerCase().includes(lowerQuery);
          if (titleMatch || codeMatch) {
            matched = true;
            matchContext = `📝 코드: ${ex.titleKo || ex.title}`;
            break;
          }
        }
      }

      if (matched) {
        results.push({
          key: item.key,
          path: item.path,
          sectionTitle,
          categoryKey: category.key,
          categoryLabel,
          matchContext: matchContext !== sectionTitle ? matchContext : undefined,
        });
      }
    }
  }

  return results;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(searchSections(query));
    setSelectedIndex(0);
  }, [query]);

  const goToResult = useCallback((result: SearchResult) => {
    navigate(result.path);
    onClose();
  }, [navigate, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      goToResult(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [results, selectedIndex, goToResult, onClose]);

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
          <SearchIcon className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="섹션 검색..."
            className="flex-1 bg-transparent text-sm outline-none placeholder-neutral-400"
          />
          <kbd className="px-2 py-0.5 text-[10px] text-neutral-400 bg-neutral-100 dark:bg-neutral-700 rounded">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="px-4 py-8 text-center text-sm text-neutral-400">
              검색어를 입력하세요
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-neutral-400">
              &quot;{query}&quot;에 대한 결과가 없습니다
            </div>
          ) : (
            <ul>
              {results.map((result, i) => {
                const colors = CHAPTER_COLORS[result.categoryKey];
                return (
                  <li key={result.key}>
                    <button
                      onClick={() => goToResult(result)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                        i === selectedIndex
                          ? 'bg-orange-50 dark:bg-orange-900/20'
                          : 'hover:bg-slate-50 dark:hover:bg-neutral-700/50'
                      }`}
                    >
                      <span className={`flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
                        {result.categoryLabel.slice(0, 6)}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{result.sectionTitle}</div>
                        {result.matchContext && (
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                            {result.matchContext}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="flex items-center gap-4 px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 text-[10px] text-neutral-400">
            <span><kbd className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded">↑↓</kbd> 이동</span>
            <span><kbd className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded">Enter</kbd> 선택</span>
            <span><kbd className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded">ESC</kbd> 닫기</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
