import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { translations } from '../i18n/translations';
import { NAV_DATA, CHAPTER_COLORS, pathToKey, findCategoryForSection, getAllSections, CHAPTER_FIRST_SECTIONS, SECTION_AUDIO, AUDIO_PREVIEW_MODE } from '../constants';
import { CODE_EXAMPLES } from '../constants/codeExamples';
import { DIAGRAMS } from '../constants/diagrams';
import CodeBlock from '../components/CodeBlock';
import MermaidDiagram from '../components/MermaidDiagram';
import InfoBox from '../components/InfoBox';
import ComparisonTable from '../components/ComparisonTable';
import Checklist from '../components/Checklist';
import TableOfContents from '../components/TableOfContents';
import ChapterIllustration from '../components/ChapterIllustration';
import { SECTION_ILLUSTRATIONS } from '../components/illustrations/SectionIllustrations';
import AudioPlayer from '../components/AudioPlayer';
import Breadcrumb from '../components/Breadcrumb';

// Block type definitions for new content structure
interface ContentBlock {
  type: 'paragraph' | 'diagram' | 'items' | 'tip' | 'warning' | 'note' | 'good' | 'bad' | 'code' | 'comparison' | 'image';
  content?: string;
  diagramId?: string;
  codeId?: string;
  items?: any[];
  data?: any;
  src?: string;
  alt?: string;
  caption?: string;
}

const SectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const sectionKey = id ? pathToKey(`/sections/${id}`) : '';
  const categoryKey = findCategoryForSection(sectionKey);
  const colors = categoryKey ? CHAPTER_COLORS[categoryKey] : CHAPTER_COLORS.introduction;
  const content = (translations.content as any)?.[sectionKey];
  const codeExamples = CODE_EXAMPLES[sectionKey] || [];
  const diagrams = DIAGRAMS[sectionKey] || [];

  // Check if this is the first section of a chapter (for illustration display)
  const isFirstSectionOfChapter = categoryKey && CHAPTER_FIRST_SECTIONS[categoryKey] === sectionKey;

  // Block renderer for new content structure
  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return block.content?.split('\n\n').map((para, i) => (
          <p key={`${index}-${i}`} className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            {para}
          </p>
        ));

      case 'diagram':
        const diagram = diagrams.find((d: any) => d.id === block.diagramId) ||
                       DIAGRAMS[sectionKey]?.find((d: any) => d.id === block.diagramId);
        return diagram ? (
          <div key={index} className="my-6">
            <MermaidDiagram
              definition={diagram.definition}
              title={diagram.titleKo}
              caption={diagram.caption || block.caption}
              diagramType={diagram.type}
            />
          </div>
        ) : null;

      case 'items':
        return (
          <ul key={index} className="space-y-2 my-4">
            {block.items?.map((item: any, k: number) => (
              <li key={k} className="flex gap-2 text-sm">
                <span className="text-neutral-400 mt-1">&#x2022;</span>
                <div className="flex-1">
                  {typeof item === 'string' ? (
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  ) : (
                    <>
                      <span className="font-semibold">{item.label}</span>
                      {item.desc && <span className="text-neutral-500 dark:text-neutral-400"> - {item.desc}</span>}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        );

      case 'tip':
        return <InfoBox key={index} type="tip" title="팁">{block.content}</InfoBox>;
      case 'warning':
        return <InfoBox key={index} type="warning" title="주의">{block.content}</InfoBox>;
      case 'note':
        return <InfoBox key={index} type="note" title="참고">{block.content}</InfoBox>;
      case 'good':
        return <InfoBox key={index} type="good" title="좋은 예">{block.content}</InfoBox>;
      case 'bad':
        return <InfoBox key={index} type="bad" title="나쁜 예">{block.content}</InfoBox>;

      case 'code':
        const code = codeExamples.find((c: any) => c.id === block.codeId) ||
                    CODE_EXAMPLES[sectionKey]?.find((c: any) => c.id === block.codeId);
        return code ? (
          <div key={index} className="my-6">
            <CodeBlock code={code.code} language={code.language} title={code.titleKo} />
          </div>
        ) : null;

      case 'comparison':
        return block.data ? (
          <ComparisonTable key={index} headers={block.data.headers} rows={block.data.rows} />
        ) : null;

      case 'image':
        return (
          <figure key={index} className="my-6">
            <img
              src={block.src}
              alt={block.alt || ''}
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700"
            />
            {block.caption && (
              <figcaption className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      default:
        return null;
    }
  };

  // Prev / Next navigation
  const allSections = getAllSections();
  const currentIdx = allSections.findIndex(s => s.key === sectionKey);
  const prevSection = currentIdx > 0 ? allSections[currentIdx - 1] : null;
  const nextSection = currentIdx < allSections.length - 1 ? allSections[currentIdx + 1] : null;

  // Generate TOC items from subsections
  const tocItems = React.useMemo(() => {
    if (!content?.subsections) return [];
    return content.subsections.map((sub: any, i: number) => ({
      id: `section-${i}`,
      title: sub.title,
      level: 1,
    }));
  }, [content]);

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4 text-neutral-400">
            콘텐츠 준비 중
          </h1>
          <p className="text-neutral-500">
            섹션: {sectionKey}
          </p>
          <Link to="/home" className="inline-block mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            홈으로
          </Link>
        </div>
      </div>
    );
  }

  // Build breadcrumb items
  const breadcrumbItems = React.useMemo(() => {
    const items = [];
    if (categoryKey) {
      items.push({
        label: translations.nav[categoryKey],
        path: undefined, // Chapter page doesn't exist, so no link
      });
    }
    items.push({
      label: content?.title || sectionKey,
    });
    return items;
  }, [categoryKey, content?.title, sectionKey]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Chapter Illustration (only for first section of each chapter) */}
      {isFirstSectionOfChapter && categoryKey && (
        <ChapterIllustration chapter={categoryKey} className="mb-6" />
      )}

      {/* Chapter badge */}
      {categoryKey && (
        <span className={`inline-block text-xs font-bold px-2 py-1 rounded-lg mb-4 ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
          {translations.nav[categoryKey]}
        </span>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-6">{content.title}</h1>

      {/* Learning Objectives */}
      {content.learningObjectives && content.learningObjectives.length > 0 && (
        <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200 dark:border-orange-800/50">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            <h3 className="text-sm font-bold text-orange-800 dark:text-orange-300">학습 목표</h3>
          </div>
          <ul className="space-y-2">
            {content.learningObjectives.map((objective: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 text-orange-500 dark:text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section Illustration (only if NOT first section of chapter - to avoid duplicate with ChapterIllustration) */}
      {SECTION_ILLUSTRATIONS[sectionKey] && !isFirstSectionOfChapter && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm">
          {React.createElement(SECTION_ILLUSTRATIONS[sectionKey], { className: 'w-full h-auto' })}
        </div>
      )}

      {/* Audio Player (NotebookLM Voice-over) */}
      {(SECTION_AUDIO[sectionKey] || AUDIO_PREVIEW_MODE) && (
        <AudioPlayer
          src={SECTION_AUDIO[sectionKey]?.src}
          title={SECTION_AUDIO[sectionKey]?.title || `${content.title} - 음성 해설`}
          chapter={categoryKey}
          sectionKey={sectionKey}
          isPreview={AUDIO_PREVIEW_MODE && !SECTION_AUDIO[sectionKey]}
        />
      )}

      {/* Body */}
      {content.body && (
        <div className="prose-like space-y-4 mb-8">
          {content.body.split('\n\n').map((para: string, i: number) => (
            <p key={i} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Table of Contents - shows on all screens, component handles responsive */}
      {tocItems.length >= 3 && (
        <TableOfContents items={tocItems} />
      )}

      {/* Subsections */}
      {content.subsections && content.subsections.map((sub: any, i: number) => (
        <div key={i} className="mb-8">
          <h2
            id={`section-${i}`}
            className="text-xl font-bold mb-3 mt-8 pb-2 border-b border-neutral-200 dark:border-neutral-700 scroll-mt-20"
          >
            {sub.title}
          </h2>

          {/* New block-based rendering (if blocks field exists) */}
          {sub.blocks ? (
            <div className="space-y-2">
              {sub.blocks.map((block: ContentBlock, idx: number) => renderBlock(block, idx))}
            </div>
          ) : (
            /* Legacy rendering (backward compatibility) */
            <>
              {sub.body && sub.body.split('\n\n').map((para: string, j: number) => (
                <p key={j} className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
              {sub.items && (
                <ul className="space-y-2 my-4">
                  {sub.items.map((item: any, k: number) => (
                    <li key={k} className="flex gap-2 text-sm">
                      <span className="text-neutral-400 mt-1">&#x2022;</span>
                      <div className="flex-1">
                        {typeof item === 'string' ? (
                          <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                        ) : (
                          <>
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1"
                              >
                                {item.label}
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                              </a>
                            ) : (
                              <span className="font-semibold">{item.label}</span>
                            )}
                            {item.desc && <span className="text-neutral-500 dark:text-neutral-400"> - {item.desc}</span>}
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {sub.tip && <InfoBox type="tip" title="팁">{sub.tip}</InfoBox>}
              {sub.warning && <InfoBox type="warning" title="주의">{sub.warning}</InfoBox>}
              {sub.note && <InfoBox type="note" title="참고">{sub.note}</InfoBox>}
              {sub.good && <InfoBox type="good" title="좋은 예">{sub.good}</InfoBox>}
              {sub.bad && <InfoBox type="bad" title="나쁜 예">{sub.bad}</InfoBox>}
              {sub.comparison && (
                <ComparisonTable headers={sub.comparison.headers} rows={sub.comparison.rows} />
              )}
            </>
          )}
        </div>
      ))}

      {/* Items (bullet list) */}
      {content.items && !content.subsections && (
        <ul className="space-y-3 my-6">
          {content.items.map((item: any, i: number) => (
            <li key={i} className="flex gap-3 text-sm p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
              <span className={`font-mono text-xs font-bold mt-0.5 ${colors.text} ${colors.darkText}`}>{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                {typeof item === 'string' ? (
                  <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                ) : (
                  <>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1 mb-1"
                      >
                        {item.label}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    ) : (
                      <span className="font-semibold block">{item.label}</span>
                    )}
                    {item.desc && <span className="text-neutral-500 dark:text-neutral-400 text-xs block">{item.desc}</span>}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Highlights */}
      {content.highlights && (
        <InfoBox type="tip" title="핵심 포인트">
          <ul className="space-y-1">
            {content.highlights.map((h: string, i: number) => (
              <li key={i}>&#x2022; {h}</li>
            ))}
          </ul>
        </InfoBox>
      )}

      {/* Comparison table */}
      {content.comparison && (
        <ComparisonTable headers={content.comparison.headers} rows={content.comparison.rows} />
      )}

      {/* Tips / Warnings / Notes */}
      {content.tip && <InfoBox type="tip" title="팁">{content.tip}</InfoBox>}
      {content.warning && <InfoBox type="warning" title="주의">{content.warning}</InfoBox>}
      {content.note && <InfoBox type="note" title="참고">{content.note}</InfoBox>}

      {/* Checklist */}
      {content.checklist && (
        <Checklist sectionKey={sectionKey} items={content.checklist} />
      )}

      {/* Diagrams */}
      {diagrams.length > 0 && (
        <div className="mt-8">
          {diagrams.map((diagram, i) => (
            <MermaidDiagram
              key={`${sectionKey}-${diagram.id}-${i}`}
              definition={diagram.definition}
              title={diagram.titleKo}
              caption={diagram.caption}
              diagramType={diagram.type}
            />
          ))}
        </div>
      )}

      {/* Code Examples */}
      {codeExamples.length > 0 && (
        <div className="mt-8">
          {codeExamples.map((ex, i) => (
            <CodeBlock
              key={i}
              code={ex.code}
              language={ex.language}
              title={ex.titleKo}
            />
          ))}
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div className="flex justify-between items-center mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        {prevSection ? (
          <Link
            to={prevSection.path}
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <span>&#8592;</span>
            <span>{translations.sections[prevSection.key] || prevSection.key}</span>
          </Link>
        ) : <div />}
        {nextSection ? (
          <Link
            to={nextSection.path}
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <span>{translations.sections[nextSection.key] || nextSection.key}</span>
            <span>&#8594;</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

export default SectionPage;
