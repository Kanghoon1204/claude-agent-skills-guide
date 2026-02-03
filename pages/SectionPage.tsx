import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { translations } from '../i18n/translations';
import { NAV_DATA, CHAPTER_COLORS, pathToKey, findCategoryForSection, getAllSections } from '../constants';
import { CODE_EXAMPLES } from '../constants/codeExamples';
import CodeBlock from '../components/CodeBlock';
import InfoBox from '../components/InfoBox';
import ComparisonTable from '../components/ComparisonTable';

const SectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const sectionKey = id ? pathToKey(`/sections/${id}`) : '';
  const categoryKey = findCategoryForSection(sectionKey);
  const colors = categoryKey ? CHAPTER_COLORS[categoryKey] : CHAPTER_COLORS.introduction;
  const content = (translations.content as any)?.[sectionKey];
  const codeExamples = CODE_EXAMPLES[sectionKey] || [];

  // Prev / Next navigation
  const allSections = getAllSections();
  const currentIdx = allSections.findIndex(s => s.key === sectionKey);
  const prevSection = currentIdx > 0 ? allSections[currentIdx - 1] : null;
  const nextSection = currentIdx < allSections.length - 1 ? allSections[currentIdx + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

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
          <Link to="/home" className="inline-block mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg">
            홈으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
      {/* Chapter badge */}
      {categoryKey && (
        <span className={`inline-block text-xs font-bold px-2 py-1 rounded-lg mb-4 ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
          {translations.nav[categoryKey]}
        </span>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-6">{content.title}</h1>

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

      {/* Subsections */}
      {content.subsections && content.subsections.map((sub: any, i: number) => (
        <div key={i} className="mb-8">
          <h2 className="text-xl font-bold mb-3 mt-8 pb-2 border-b border-neutral-200 dark:border-neutral-700">
            {sub.title}
          </h2>
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
                  <div>
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
          )}
          {sub.tip && <InfoBox type="tip" title="팁">{sub.tip}</InfoBox>}
          {sub.warning && <InfoBox type="warning" title="주의">{sub.warning}</InfoBox>}
          {sub.note && <InfoBox type="note" title="참고">{sub.note}</InfoBox>}
          {sub.good && <InfoBox type="good" title="좋은 예">{sub.good}</InfoBox>}
          {sub.bad && <InfoBox type="bad" title="나쁜 예">{sub.bad}</InfoBox>}
          {sub.comparison && (
            <ComparisonTable headers={sub.comparison.headers} rows={sub.comparison.rows} />
          )}
        </div>
      ))}

      {/* Items (bullet list) */}
      {content.items && !content.subsections && (
        <ul className="space-y-3 my-6">
          {content.items.map((item: any, i: number) => (
            <li key={i} className="flex gap-3 text-sm p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
              <span className={`font-mono text-xs font-bold mt-0.5 ${colors.text} ${colors.darkText}`}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                {typeof item === 'string' ? (
                  <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                ) : (
                  <>
                    <span className="font-semibold block">{item.label}</span>
                    {item.desc && <span className="text-neutral-500 dark:text-neutral-400 text-xs">{item.desc}</span>}
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
        <div className="space-y-2 my-6">
          {content.checklist.map((item: string, i: number) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded accent-orange-600" />
              <span className="text-sm">{item}</span>
            </label>
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
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <span>&#8592;</span>
            <span>{translations.sections[prevSection.key] || prevSection.key}</span>
          </Link>
        ) : <div />}
        {nextSection ? (
          <Link
            to={nextSection.path}
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
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
