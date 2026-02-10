import React, { useState, useMemo } from 'react';
import type { WizardState } from '../index';
import type { Platform } from '../../../context/PlatformContext';
import { PLATFORMS } from '../../../context/PlatformContext';

interface StepReviewProps {
  state: WizardState;
  platform: Platform;
}

const generateClaudeYaml = (state: WizardState): string => {
  const tools = [...state.tools.builtin];
  const mcpTools = state.tools.mcp.map((t) => `mcp: ${t}`);

  return `---
name: ${state.name}
description: ${state.description}
tools:
${tools.map((t) => `  - ${t}`).join('\n')}
${mcpTools.length > 0 ? mcpTools.map((t) => `  - ${t}`).join('\n') : ''}
---

${state.instructions}
`;
};

const generateCursorRules = (state: WizardState): string => {
  return `# ${state.name}

${state.description}

## Available Tools
${state.tools.builtin.map((t) => `- ${t}`).join('\n')}
${state.tools.mcp.length > 0 ? `\n## MCP Integrations\n${state.tools.mcp.map((t) => `- ${t}`).join('\n')}` : ''}

## Instructions

${state.instructions}
`;
};

const generateCodexAgents = (state: WizardState): string => {
  return `# AGENTS.md - ${state.name}

## Description
${state.description}

## Capabilities
${state.tools.builtin.map((t) => `- ${t}`).join('\n')}

## Instructions

${state.instructions}
`;
};

const generateWindsurfConfig = (state: WizardState): string => {
  return `# Windsurf Configuration: ${state.name}

description: "${state.description}"

tools:
${state.tools.builtin.map((t) => `  - name: ${t}`).join('\n')}

instructions: |
${state.instructions.split('\n').map((line) => `  ${line}`).join('\n')}
`;
};

const GENERATORS: Record<Platform, (state: WizardState) => string> = {
  claude: generateClaudeYaml,
  cursor: generateCursorRules,
  codex: generateCodexAgents,
  windsurf: generateWindsurfConfig,
};

const FILE_NAMES: Record<Platform, string> = {
  claude: 'SKILL.md',
  cursor: '.cursorrules',
  codex: 'AGENTS.md',
  windsurf: 'windsurf.yaml',
};

const StepReview: React.FC<StepReviewProps> = ({ state, platform }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(platform);

  const generatedCode = useMemo(() => {
    const generator = GENERATORS[selectedPlatform];
    return generator(state);
  }, [state, selectedPlatform]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = FILE_NAMES[selectedPlatform];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          스킬 완성!
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          생성된 스킬 파일을 확인하고 복사하세요. 플랫폼별로 다른 형식을 제공합니다.
        </p>
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-neutral-800 rounded-lg">
        {(Object.keys(PLATFORMS) as Platform[]).map((p) => {
          const info = PLATFORMS[p];
          const isSelected = p === selectedPlatform;
          return (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                isSelected
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {info.name}
            </button>
          );
        })}
      </div>

      {/* File Name */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">파일명:</span>
        <code className="px-2 py-1 text-sm bg-slate-100 dark:bg-neutral-800 rounded">
          {FILE_NAMES[selectedPlatform]}
        </code>
      </div>

      {/* Code Preview */}
      <div className="relative">
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-slate-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-slate-300 dark:hover:bg-neutral-600'
            }`}
          >
            {copied ? '복사됨!' : '복사'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-medium bg-slate-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors"
          >
            다운로드
          </button>
        </div>
        <pre className="p-4 pt-12 bg-slate-900 dark:bg-neutral-950 text-slate-100 rounded-lg overflow-x-auto text-sm font-mono max-h-96">
          <code>{generatedCode}</code>
        </pre>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">스킬 이름</div>
          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
            {state.name}
          </div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">내장 도구</div>
          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {state.tools.builtin.length}개
          </div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">MCP 도구</div>
          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {state.tools.mcp.length}개
          </div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">지시사항</div>
          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {state.instructions.length}자
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-green-800 dark:text-green-200">
            <strong>다음 단계:</strong> 생성된 파일을 프로젝트 루트에 저장하세요.
            {selectedPlatform === 'claude' && ' ~/.claude/skills/ 폴더에 저장하면 전역 스킬로 사용할 수 있습니다.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepReview;
