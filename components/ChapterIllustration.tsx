import React from 'react';
import { CHAPTER_ILLUSTRATIONS, CHAPTER_COLORS } from '../constants';
import { translations } from '../i18n/translations';

interface ChapterIllustrationProps {
  chapter: string;
  className?: string;
}

const ChapterIllustration: React.FC<ChapterIllustrationProps> = ({ chapter, className = '' }) => {
  const imagePath = CHAPTER_ILLUSTRATIONS[chapter];
  const colors = CHAPTER_COLORS[chapter];
  const chapterTitle = translations.nav[chapter];

  if (!imagePath) return null;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Image container with aspect ratio */}
      <div className="relative aspect-[16/9] max-h-48 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
        <img
          src={imagePath}
          alt={`${chapterTitle} illustration`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Gradient overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Chapter title overlay (optional, can be removed if not needed) */}
      {/*
      <div className="absolute bottom-3 left-3">
        <span className={`text-sm font-bold px-2 py-1 rounded ${colors?.bg} ${colors?.text} ${colors?.darkBg} ${colors?.darkText}`}>
          {chapterTitle}
        </span>
      </div>
      */}
    </div>
  );
};

export default ChapterIllustration;
