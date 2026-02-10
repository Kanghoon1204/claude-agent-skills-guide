import React from 'react';
import { Link } from 'react-router-dom';
import { CHAPTER_COLORS } from '../constants';
import { CHAPTER_ILLUSTRATIONS_SVG } from './illustrations/ChapterIllustrations';

interface ChapterCardProps {
  chapterKey: string;
  label: string;
  description: string;
  sectionCount: number;
  path: string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapterKey,
  label,
  description,
  sectionCount,
  path,
}) => {
  const colors = CHAPTER_COLORS[chapterKey];
  const IllustrationComponent = CHAPTER_ILLUSTRATIONS_SVG[chapterKey];

  return (
    <Link
      to={path}
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700
        hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300
        hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${colors.bg} ${colors.darkBg}`}
    >
      {/* Illustration */}
      <div className="relative h-40 overflow-hidden">
        {IllustrationComponent && (
          <IllustrationComponent className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-neutral-900/80 to-transparent" />

        {/* Chapter badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold
          bg-white/90 dark:bg-neutral-800/90 ${colors.text} ${colors.darkText} shadow-sm`}>
          {label}
        </div>

        {/* Section count */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium
          bg-white/90 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-400 shadow-sm">
          {sectionCount}개 섹션
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Hover indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100
          transition-opacity duration-300 text-neutral-500 dark:text-neutral-400">
          <span>자세히 보기</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className={`absolute bottom-0 right-0 w-16 h-16 opacity-20
        ${colors.bg.replace('bg-', 'bg-')} rounded-tl-full`} />
    </Link>
  );
};

export default ChapterCard;
