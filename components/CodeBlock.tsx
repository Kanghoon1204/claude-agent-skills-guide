import React, { useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'text', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightYaml = (line: string): React.ReactNode => {
    if (line.startsWith('#')) return <span className="text-neutral-500">{line}</span>;
    if (line.startsWith('---')) return <span className="text-yellow-400">{line}</span>;
    const match = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.*)/);
    if (match) {
      return (
        <>
          {match[1]}
          <span className="text-sky-400">{match[2]}</span>
          <span className="text-neutral-400">{match[3]}</span>
          <span className="text-green-400">{match[4]}</span>
        </>
      );
    }
    if (line.trim().startsWith('-')) {
      return <span className="text-orange-400">{line}</span>;
    }
    return line;
  };

  const highlightMarkdown = (line: string): React.ReactNode => {
    if (line.startsWith('#')) return <span className="text-sky-400 font-bold">{line}</span>;
    if (line.startsWith('```')) return <span className="text-green-400">{line}</span>;
    if (line.trim().startsWith('-')) return <span className="text-orange-400">{line}</span>;
    if (line.trim().match(/^\d+\./)) return <span className="text-violet-400">{line}</span>;
    return line;
  };

  const highlightBash = (line: string): React.ReactNode => {
    if (line.startsWith('#')) return <span className="text-neutral-500">{line}</span>;
    if (line.match(/^[A-Z_]+=/) || line.startsWith('export ')) return <span className="text-green-400">{line}</span>;
    const parts = line.match(/^(\s*)([\w./\\-]+)(.*)/);
    if (parts) {
      return (
        <>
          {parts[1]}
          <span className="text-sky-400">{parts[2]}</span>
          <span className="text-neutral-300">{parts[3]}</span>
        </>
      );
    }
    return line;
  };

  const highlightLine = (line: string): React.ReactNode => {
    switch (language) {
      case 'yaml': return highlightYaml(line);
      case 'markdown': return highlightMarkdown(line);
      case 'bash': return highlightBash(line);
      default: return line;
    }
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 my-4 animate-fade-in">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 uppercase">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <span className="text-xs text-green-500">Copied!</span>
              ) : (
                <ClipboardIcon className="w-4 h-4 text-neutral-400" />
              )}
            </button>
          </div>
        </div>
      )}
      {!title && (
        <div className="flex items-center justify-end px-4 py-1.5 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            {copied ? (
              <span className="text-xs text-green-500">Copied!</span>
            ) : (
              <ClipboardIcon className="w-4 h-4 text-neutral-400" />
            )}
          </button>
        </div>
      )}
      <pre className="bg-neutral-900 dark:bg-neutral-950 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="text-neutral-300">
              {highlightLine(line)}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
