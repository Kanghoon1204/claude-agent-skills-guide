import React from 'react';
import type { WizardState } from '../index';

interface StepToolsProps {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

const BUILTIN_TOOLS = [
  { id: 'Bash', name: 'Bash', desc: '셸 명령 실행' },
  { id: 'Read', name: 'Read', desc: '파일 읽기' },
  { id: 'Write', name: 'Write', desc: '파일 쓰기' },
  { id: 'Edit', name: 'Edit', desc: '파일 편집' },
  { id: 'Glob', name: 'Glob', desc: '파일 검색 (패턴)' },
  { id: 'Grep', name: 'Grep', desc: '내용 검색' },
  { id: 'WebFetch', name: 'WebFetch', desc: '웹 페이지 가져오기' },
  { id: 'WebSearch', name: 'WebSearch', desc: '웹 검색' },
  { id: 'TodoWrite', name: 'TodoWrite', desc: '할 일 목록 관리' },
  { id: 'Task', name: 'Task', desc: '에이전트 실행' },
];

const MCP_EXAMPLES = [
  { id: 'github', name: 'GitHub', desc: 'GitHub API 연동' },
  { id: 'slack', name: 'Slack', desc: 'Slack 메시지 전송' },
  { id: 'notion', name: 'Notion', desc: 'Notion 페이지 관리' },
  { id: 'linear', name: 'Linear', desc: '이슈 트래킹' },
];

const StepTools: React.FC<StepToolsProps> = ({ state, updateState }) => {
  const toggleBuiltinTool = (toolId: string) => {
    const current = state.tools.builtin;
    const updated = current.includes(toolId)
      ? current.filter((t) => t !== toolId)
      : [...current, toolId];
    updateState({ tools: { ...state.tools, builtin: updated } });
  };

  const toggleMcpTool = (toolId: string) => {
    const current = state.tools.mcp;
    const updated = current.includes(toolId)
      ? current.filter((t) => t !== toolId)
      : [...current, toolId];
    updateState({ tools: { ...state.tools, mcp: updated } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          도구 선택
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          스킬에서 사용할 도구를 선택하세요. 필요한 도구만 선택하면 보안과 성능이 향상됩니다.
        </p>
      </div>

      {/* Built-in Tools */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            내장 도구
          </span>
          <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-neutral-700 text-slate-600 dark:text-neutral-400 rounded">
            {state.tools.builtin.length}개 선택
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {BUILTIN_TOOLS.map((tool) => {
            const isSelected = state.tools.builtin.includes(tool.id);
            return (
              <button
                key={tool.id}
                onClick={() => toggleBuiltinTool(tool.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30'
                    : 'border-slate-200 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isSelected
                        ? 'bg-orange-600 border-orange-600'
                        : 'border-slate-300 dark:border-neutral-600'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-orange-700 dark:text-orange-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
                    {tool.name}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 pl-6">
                  {tool.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* MCP Tools */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            MCP 도구 (선택사항)
          </span>
          <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-neutral-700 text-slate-600 dark:text-neutral-400 rounded">
            {state.tools.mcp.length}개 선택
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MCP_EXAMPLES.map((tool) => {
            const isSelected = state.tools.mcp.includes(tool.id);
            return (
              <button
                key={tool.id}
                onClick={() => toggleMcpTool(tool.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-slate-300 dark:border-neutral-600'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
                    {tool.name}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 pl-6">
                  {tool.desc}
                </p>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          MCP 도구는 외부 서비스와 연동하기 위한 것입니다. 사전에 MCP 서버 설정이 필요합니다.
        </p>
      </div>
    </div>
  );
};

export default StepTools;
