import React, { useState, useRef, useEffect } from 'react';
import { AUDIO_TRANSCRIPTS } from '../constants/audioTranscripts';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  chapter?: string;
  sectionKey?: string;
  isPreview?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title = '미리 듣기',
  chapter,
  sectionKey,
  isPreview = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();

  const transcript = sectionKey ? AUDIO_TRANSCRIPTS[sectionKey] : null;

  // High-frequency time update using requestAnimationFrame for smooth sync
  useEffect(() => {
    const updateTime = () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        setCurrentTime(audio.currentTime);
        animationRef.current = requestAnimationFrame(updateTime);
      }
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
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

  const seekToTime = (timeStr: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    const [minutes, seconds] = timeStr.split(':').map(Number);
    const time = minutes * 60 + seconds;
    audio.currentTime = time;
    setCurrentTime(time);

    if (!isPlaying) {
      togglePlay();
    }
  };

  const handleSpeedChange = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newRate = speeds[nextIndex];

    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
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
      <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/40 dark:via-purple-950/30 dark:to-fuchsia-950/20 rounded-2xl p-6 mb-8 border border-violet-200 dark:border-violet-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base font-bold text-violet-800 dark:text-violet-200">
                미리 듣기
              </span>
              <span className="text-xs px-2 py-0.5 bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300 rounded-full font-medium">
                준비 중
              </span>
            </div>
            <p className="text-sm text-violet-600 dark:text-violet-400">
              본문을 읽기 전에 들을 수 있는 음성 해설이 곧 추가됩니다
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No audio source and not preview mode
  if (!src) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/40 dark:via-purple-950/30 dark:to-fuchsia-950/20 rounded-2xl mb-8 border border-violet-200 dark:border-violet-800 shadow-lg overflow-hidden">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Main Player */}
      <div className="p-6">
        <div className="flex items-start gap-5">
          {/* Album Art / Visualizer */}
          <div className="relative flex-shrink-0">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-xl ${isPlaying ? 'animate-pulse' : ''}`}>
              {/* Sound wave animation when playing */}
              {isPlaying ? (
                <div className="flex items-end gap-1 h-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-white rounded-full animate-bounce"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.5s'
                      }}
                    />
                  ))}
                </div>
              ) : (
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </div>
            {/* Circular progress */}
            <svg className="absolute inset-0 w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeOpacity="0.3"
              />
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - progress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Info and Controls */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-violet-900 dark:text-violet-100">
                    {title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-violet-200 dark:bg-violet-800 text-violet-600 dark:text-violet-400 rounded-full">
                    본문 읽기 전 추천
                  </span>
                </div>
                {transcript && (
                  <p className="text-sm text-violet-600 dark:text-violet-400">
                    {transcript.summary}
                  </p>
                )}
              </div>
              <span className="text-xs font-medium text-violet-500 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/50 px-2 py-1 rounded-full whitespace-nowrap">
                {transcript?.duration || formatTime(duration)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="relative h-2 bg-violet-200 dark:bg-violet-800 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-violet-500 dark:text-violet-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Skip back */}
              <button
                onClick={() => skip(-10)}
                className="p-2 rounded-full hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors text-violet-600 dark:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                title="10초 뒤로"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                disabled={hasError || isLoading}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-violet-950 ${
                  hasError
                    ? 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed'
                    : 'bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white hover:shadow-xl hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip forward */}
              <button
                onClick={() => skip(10)}
                className="p-2 rounded-full hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors text-violet-600 dark:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                title="10초 앞으로"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                </svg>
              </button>

              <div className="flex-1" />

              {/* Speed control */}
              <button
                onClick={handleSpeedChange}
                className="px-3 py-1.5 rounded-full bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-300 dark:hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {playbackRate}x
              </button>

              {/* Transcript toggle */}
              {transcript && (
                <button
                  onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isTranscriptOpen
                      ? 'bg-violet-500 text-white'
                      : 'bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-300 dark:hover:bg-violet-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  대본
                  <svg className={`w-4 h-4 transition-transform ${isTranscriptOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {hasError && (
              <p className="text-xs text-red-500 mt-2">
                음성 파일을 로드할 수 없습니다
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Transcript */}
      {transcript && isTranscriptOpen && (
        <div className="border-t border-violet-200 dark:border-violet-800">
          <div className="p-6 bg-white/40 dark:bg-neutral-900/40">
            <h4 className="text-sm font-bold text-violet-800 dark:text-violet-200 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              전체 대본
            </h4>
            <div className="space-y-3">
              {transcript.segments.map((segment, index) => (
                <button
                  key={index}
                  onClick={() => seekToTime(segment.time)}
                  className="w-full text-left p-3 rounded-xl transition-all bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0 bg-violet-200 dark:bg-violet-800 text-violet-600 dark:text-violet-400">
                      {segment.time}
                    </span>
                    <p className="text-sm leading-relaxed">{segment.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
