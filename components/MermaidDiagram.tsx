import React, { useEffect, useRef, useState, useId, useCallback } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '../hooks/useTheme';

interface MermaidDiagramProps {
  definition: string;
  title?: string;
  caption?: string;
  diagramType?: string;
}

// 테마 변수 상수
const THEME_VARIABLES = {
  dark: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#f5f5f5',
    primaryBorderColor: '#525252',
    lineColor: '#737373',
    secondaryColor: '#262626',
    tertiaryColor: '#171717',
    background: '#171717',
    mainBkg: '#262626',
    nodeBorder: '#525252',
    clusterBkg: '#1a1a1a',
    titleColor: '#f5f5f5',
    edgeLabelBackground: '#262626',
    nodeTextColor: '#f5f5f5',
    textColor: '#f5f5f5',
    labelTextColor: '#f5f5f5',
    clusterBorder: '#525252',
    defaultLinkColor: '#737373',
  },
  light: {
    primaryColor: '#f97316',
    primaryTextColor: '#171717',
    primaryBorderColor: '#d4d4d4',
    lineColor: '#a3a3a3',
    secondaryColor: '#f8fafc',
    tertiaryColor: '#f1f5f9',
    background: '#ffffff',
    mainBkg: '#fff7ed',
    nodeBorder: '#d4d4d4',
    clusterBkg: '#f8fafc',
    titleColor: '#171717',
    edgeLabelBackground: '#f8fafc',
    nodeTextColor: '#171717',
    textColor: '#171717',
    labelTextColor: '#171717',
    clusterBorder: '#d4d4d4',
    defaultLinkColor: '#a3a3a3',
  },
} as const;

// 다이어그램 렌더링 설정
const DIAGRAM_CONFIG = {
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  fontSize: 14,
  securityLevel: 'loose' as const,
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis' as const,
    padding: 30,
    nodeSpacing: 80,
    rankSpacing: 80,
    defaultRenderer: 'elk' as const,
    diagramPadding: 20,
  },
  sequence: {
    useMaxWidth: false,
    boxMargin: 15,
    mirrorActors: false,
    actorMargin: 80,
    messageMargin: 40,
  },
};

// 다크모드 SVG 후처리 함수
const processDarkModeSvg = (svg: string): string => {
  return svg
    .replace(/style="([^"]*)color:\s*[^;"]+(;?)/gi, 'style="$1color: #f5f5f5$2')
    .replace(/style="([^"]*)fill:\s*[^;"]+(;?)/gi, 'style="$1fill: #f5f5f5$2')
    .replace(/<span([^>]*)style="([^"]*)"([^>]*)>/gi, '<span$1style="$2; color: #f5f5f5 !important;"$3>')
    .replace(/<span([^>]*)(?!style)>/gi, '<span$1 style="color: #f5f5f5 !important;">');
};

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  definition,
  title,
  caption,
  diagramType,
}) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const uniqueId = useId();
  const diagramId = `mermaid${uniqueId.replace(/:/g, '-')}`;

  const openModal = useCallback(() => setIsExpanded(true), []);
  const closeModal = useCallback(() => setIsExpanded(false), []);

  // ESC key to close modal
  useEffect(() => {
    if (!isExpanded) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isExpanded, closeModal]);

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      setIsLoading(true);
      setError(null);

      const isDark = theme === 'dark';
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        themeVariables: isDark ? THEME_VARIABLES.dark : THEME_VARIABLES.light,
        ...DIAGRAM_CONFIG,
      });

      try {
        const { svg } = await mermaid.render(diagramId, definition);
        if (!cancelled) {
          const processedSvg = isDark ? processDarkModeSvg(svg) : svg;
          setSvgContent(processedSvg);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '다이어그램 렌더링 실패');
          setIsLoading(false);
        }
        const errorElement = document.getElementById(`d${diagramId}`);
        if (errorElement) errorElement.remove();
      }
    };

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [definition, theme, diagramId]);

  return (
    <>
      <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 my-4 animate-fade-in">
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {title || '다이어그램'}
          </span>
          <div className="flex items-center gap-2">
            {diagramType && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 uppercase">
                {diagramType}
              </span>
            )}
            {!isLoading && !error && (
              <button
                onClick={openModal}
                className="text-[10px] px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                title="확대 보기"
              >
                🔍 확대
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 flex justify-center items-center min-h-[200px]">
          {isLoading && (
            <div className="w-full">
              {/* Skeleton loader */}
              <div className="animate-pulse space-y-4">
                <div className="flex justify-center gap-4">
                  <div className="h-12 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                  <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                  <div className="h-12 w-28 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                </div>
                <div className="flex justify-center">
                  <div className="h-1 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
                </div>
                <div className="flex justify-center gap-4">
                  <div className="h-10 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                  <div className="h-10 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-neutral-400 dark:text-neutral-500">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                다이어그램 로딩 중...
              </div>
            </div>
          )}
          {error && (
            <div className="text-sm text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 w-full">
              <div className="font-semibold mb-1">다이어그램 렌더링 오류</div>
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{error}</pre>
            </div>
          )}
          {!isLoading && !error && (
            <div
              ref={containerRef}
              onClick={openModal}
              className="mermaid-container w-full cursor-zoom-in [&>svg]:mx-auto [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-[400px]"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>

        {caption && (
          <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center italic">
              {caption}
            </p>
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white dark:bg-neutral-900 rounded-2xl max-w-[95vw] max-h-[95vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 rounded-t-2xl">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {title || '다이어그램'}
              </span>
              <button
                onClick={closeModal}
                className="px-3 py-1 text-sm rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                ✕ 닫기
              </button>
            </div>
            <div
              className="mermaid-container p-8 [&>svg]:mx-auto [&>svg]:max-w-none [&>svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
            {caption && (
              <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700 rounded-b-2xl">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center italic">
                  {caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MermaidDiagram;
