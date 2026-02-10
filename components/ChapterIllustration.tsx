import React from 'react';
import { CHAPTER_COLORS } from '../constants';
import { translations } from '../i18n/translations';
import { CHAPTER_ILLUSTRATIONS_SVG } from './illustrations/ChapterIllustrations';

interface ChapterIllustrationProps {
  chapter: string;
  className?: string;
}

const ChapterIllustration: React.FC<ChapterIllustrationProps> = ({ chapter, className = '' }) => {
  const IllustrationComponent = CHAPTER_ILLUSTRATIONS_SVG[chapter];
  const colors = CHAPTER_COLORS[chapter];
  const chapterTitle = translations.nav[chapter];

  if (!IllustrationComponent) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* SVG illustration container */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg">
        <IllustrationComponent className="w-full h-auto" />

        {/* Chapter title badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-sm font-bold px-3 py-1.5 rounded-full shadow-md
            bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm
            ${colors?.text} ${colors?.darkText}`}>
            {chapterTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChapterIllustration;
