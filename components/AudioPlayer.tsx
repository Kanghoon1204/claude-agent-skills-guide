import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  chapter?: string;
  isPreview?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title = '음성 해설',
  chapter,
  isPreview = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      audio.play().then(() => {
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Preview mode - show placeholder when no audio file
  if (isPreview && !src) {
    return (
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl p-4 mb-6 border border-violet-200 dark:border-violet-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                NotebookLM 음성 해설
              </span>
              <span className="text-xs px-2 py-0.5 bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300 rounded-full">
                준비 중
              </span>
            </div>
            <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">
              이 섹션의 음성 해설이 곧 추가될 예정입니다
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No audio source and not preview mode
  if (!src) return null;

  return (
    <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl p-4 mb-6 border border-violet-200 dark:border-violet-800">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={hasError || isLoading}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            hasError
              ? 'bg-neutral-200 dark:bg-neutral-700 cursor-not-allowed'
              : 'bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-500 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress and Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-violet-700 dark:text-violet-300 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              {title}
            </span>
            <span className="text-xs text-violet-600 dark:text-violet-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-violet-200 dark:bg-violet-800 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-violet-500
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:hover:bg-violet-600"
            />
          </div>

          {hasError && (
            <p className="text-xs text-red-500 mt-1">
              음성 파일을 로드할 수 없습니다
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
