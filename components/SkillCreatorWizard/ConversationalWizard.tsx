import React, { useState, useEffect, useRef } from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import type { Platform } from '../../context/PlatformContext';
import { PLATFORMS } from '../../context/PlatformContext';

interface Message {
  id: string;
  type: 'assistant' | 'user' | 'system';
  content: string;
  options?: QuickOption[];
  inputType?: 'text' | 'textarea' | 'tools';
  placeholder?: string;
}

interface QuickOption {
  label: string;
  value: string;
  icon?: string;
  desc?: string;
}

interface SkillData {
  name: string;
  description: string;
  tools: string[];
  instructions: string;
}

const BUILTIN_TOOLS = [
  { id: 'Read', name: 'Read', desc: '파일 읽기', icon: '📖' },
  { id: 'Write', name: 'Write', desc: '파일 쓰기', icon: '✏️' },
  { id: 'Edit', name: 'Edit', desc: '파일 편집', icon: '🔧' },
  { id: 'Bash', name: 'Bash', desc: '명령 실행', icon: '💻' },
  { id: 'Glob', name: 'Glob', desc: '파일 검색', icon: '🔍' },
  { id: 'Grep', name: 'Grep', desc: '내용 검색', icon: '📝' },
  { id: 'WebFetch', name: 'WebFetch', desc: '웹 가져오기', icon: '🌐' },
  { id: 'Task', name: 'Task', desc: '에이전트', icon: '🤖' },
];

const TOOL_PRESETS = [
  { id: 'basic', label: '기본', tools: ['Read', 'Write', 'Bash'], icon: '⭐', desc: '파일 읽기/쓰기, 명령 실행' },
  { id: 'files', label: '파일 작업', tools: ['Read', 'Write', 'Edit', 'Glob', 'Grep'], icon: '📁', desc: '파일 검색, 편집, 내용 찾기' },
  { id: 'web', label: '웹 + 파일', tools: ['Read', 'Write', 'Bash', 'WebFetch'], icon: '🌐', desc: '웹 데이터 가져오기 포함' },
  { id: 'full', label: '전체', tools: BUILTIN_TOOLS.map(t => t.id), icon: '🚀', desc: '모든 도구 사용' },
];

const SKILL_TEMPLATES: QuickOption[] = [
  { label: '코드 리뷰', value: 'code-review', icon: '🔍', desc: '코드 품질 검토' },
  { label: '문서 생성', value: 'docs-generator', icon: '📄', desc: 'README, API 문서' },
  { label: '테스트 작성', value: 'test-writer', icon: '🧪', desc: '단위 테스트 생성' },
  { label: '직접 만들기', value: 'custom', icon: '✨', desc: '나만의 스킬' },
];

const INSTRUCTION_SNIPPETS = [
  { label: '단계별 수행', content: '1. 먼저 대상을 분석합니다\n2. 문제점을 파악합니다\n3. 해결책을 제안합니다', icon: '📋' },
  { label: '결과 형식', content: '## 결과\n- 요약: ...\n- 상세: ...\n- 다음 단계: ...', icon: '📊' },
  { label: '주의사항', content: '## 주의\n- 기존 코드 스타일 유지\n- 에러 처리 필수\n- 테스트 포함', icon: '⚠️' },
];

const STEPS = [
  { id: 0, label: '시작', icon: '👋' },
  { id: 1, label: '이름', icon: '📛' },
  { id: 2, label: '설명', icon: '💬' },
  { id: 3, label: '도구', icon: '🔧' },
  { id: 4, label: '지시', icon: '📝' },
  { id: 5, label: '완료', icon: '✅' },
];

const generateYaml = (data: SkillData, platform: Platform): string => {
  if (platform === 'claude') {
    return `---
name: ${data.name}
description: ${data.description}
tools:
${data.tools.map(t => `  - ${t}`).join('\n')}
---

${data.instructions}`;
  }

  if (platform === 'cursor') {
    return `# ${data.name}

${data.description}

## Guidelines

${data.instructions}

## Preferred Tools

${data.tools.map(t => `- ${t}`).join('\n')}`;
  }

  if (platform === 'codex') {
    return `# ${data.name}

${data.description}

## Working Agreements

${data.instructions}

## Development Guidelines

${data.tools.map(t => `- Use ${t} for relevant operations`).join('\n')}`;
  }

  // windsurf
  return `# ${data.name}

${data.description}

## ALWAYS
${data.instructions.split('\n').filter(l => l.trim()).map(l => `- ${l.trim()}`).join('\n')}

## Preferred Tools
${data.tools.map(t => `- Use ${t} when applicable`).join('\n')}`;
};

const ConversationalWizard: React.FC = () => {
  const { platform, platformInfo } = usePlatform();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>(['Read', 'Write', 'Bash']);
  const [skillData, setSkillData] = useState<SkillData>({
    name: '',
    description: '',
    tools: [],
    instructions: '',
  });
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPreviewPlatform, setSelectedPreviewPlatform] = useState<Platform>(platform);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addAssistantMessage(
        `어떤 스킬을 만들까요? 🎯`,
        SKILL_TEMPLATES
      );
    }, 300);
  }, []);

  const addAssistantMessage = (content: string, options?: QuickOption[], inputType?: 'text' | 'textarea' | 'tools', placeholder?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        content,
        options,
        inputType,
        placeholder,
      }]);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 400);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      type: 'user',
      content,
    }]);
  };

  const handleQuickOption = (option: QuickOption) => {
    addUserMessage(`${option.icon || ''} ${option.label}`);
    processStep(option.value);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    processStep(inputValue);
    setInputValue('');
  };

  const handlePresetSelect = (preset: typeof TOOL_PRESETS[0]) => {
    setSelectedTools(preset.tools);
  };

  const handleToolsSubmit = () => {
    addUserMessage(`🔧 ${selectedTools.length}개 도구 선택`);
    setSkillData(prev => ({ ...prev, tools: selectedTools }));
    setCurrentStep(4);

    setTimeout(() => {
      addAssistantMessage(
        '마지막! 스킬이 어떻게 동작할지 적어주세요 ✍️',
        undefined,
        'textarea',
        '예시:\n1. 코드를 분석합니다\n2. 문제점을 찾습니다\n3. 개선안을 제안합니다'
      );
    }, 300);
  };

  const handleSnippetClick = (snippet: typeof INSTRUCTION_SNIPPETS[0]) => {
    setInputValue(prev => prev ? `${prev}\n\n${snippet.content}` : snippet.content);
    inputRef.current?.focus();
  };

  const handleBack = () => {
    if (currentStep <= 0) return;

    // Remove last two messages (user + assistant)
    setMessages(prev => prev.slice(0, -2));

    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);

    // Re-ask the previous question
    setTimeout(() => {
      switch (prevStep) {
        case 0:
          addAssistantMessage('어떤 스킬을 만들까요? 🎯', SKILL_TEMPLATES);
          break;
        case 1:
          addAssistantMessage(
            '스킬 이름을 정해주세요 📛',
            undefined,
            'text',
            '예: code-review, api-docs'
          );
          break;
        case 2:
          addAssistantMessage(
            '한 문장으로 설명해주세요 💬',
            undefined,
            'text',
            '예: 코드를 리뷰하고 개선점을 제안합니다'
          );
          break;
        case 3:
          addAssistantMessage('사용할 도구를 선택하세요 🔧', undefined, 'tools');
          break;
        case 4:
          addAssistantMessage(
            '마지막! 스킬이 어떻게 동작할지 적어주세요 ✍️',
            undefined,
            'textarea',
            '예시:\n1. 코드를 분석합니다\n2. 문제점을 찾습니다\n3. 개선안을 제안합니다'
          );
          break;
      }
    }, 200);
  };

  const processStep = (value: string) => {
    switch (currentStep) {
      case 0: // Template selection
        if (value === 'custom') {
          setCurrentStep(1);
          setTimeout(() => {
            addAssistantMessage(
              '스킬 이름을 정해주세요 📛',
              undefined,
              'text',
              '예: code-review, api-docs'
            );
          }, 300);
        } else {
          // Pre-fill based on template
          const templates: Record<string, Partial<SkillData>> = {
            'code-review': {
              name: 'code-review',
              description: '코드를 리뷰하고 개선 사항을 제안하는 스킬',
              instructions: '# 코드 리뷰\n\n1. 변경된 파일을 분석합니다\n2. 코드 품질, 버그 가능성, 성능을 검토합니다\n3. 구체적인 개선 제안을 제공합니다',
            },
            'docs-generator': {
              name: 'docs-generator',
              description: '코드를 분석하여 문서를 자동 생성하는 스킬',
              instructions: '# 문서 생성\n\n1. 코드 구조를 분석합니다\n2. 함수, 클래스, API 엔드포인트를 문서화합니다\n3. 사용 예시를 포함합니다',
            },
            'test-writer': {
              name: 'test-writer',
              description: '코드에 대한 테스트를 자동 작성하는 스킬',
              instructions: '# 테스트 작성\n\n1. 테스트 대상 코드를 분석합니다\n2. 정상/엣지/에러 케이스를 식별합니다\n3. 프로젝트의 테스트 프레임워크에 맞게 작성합니다',
            },
          };

          const template = templates[value];
          if (template) {
            setSkillData(prev => ({ ...prev, ...template }));
            setCurrentStep(3);
            setTimeout(() => {
              addAssistantMessage('사용할 도구를 선택하세요 🔧', undefined, 'tools');
            }, 300);
          }
        }
        break;

      case 1: // Name input
        setSkillData(prev => ({ ...prev, name: value.toLowerCase().replace(/\s+/g, '-') }));
        setCurrentStep(2);
        setTimeout(() => {
          addAssistantMessage(
            '한 문장으로 설명해주세요 💬',
            undefined,
            'text',
            '예: 코드를 리뷰하고 개선점을 제안합니다'
          );
        }, 300);
        break;

      case 2: // Description input
        setSkillData(prev => ({ ...prev, description: value }));
        setCurrentStep(3);
        setTimeout(() => {
          addAssistantMessage('사용할 도구를 선택하세요 🔧', undefined, 'tools');
        }, 300);
        break;

      case 4: // Instructions input
        setSkillData(prev => ({ ...prev, instructions: value }));
        setCurrentStep(5);
        setShowPreview(true);
        setTimeout(() => {
          addAssistantMessage('완성! 🎉 아래에서 복사하세요');
        }, 300);
        break;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateYaml(skillData, selectedPreviewPlatform));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleDownload = () => {
    const fileNames: Record<Platform, string> = {
      claude: 'SKILL.md',
      cursor: '.cursorrules',
      codex: 'AGENTS.md',
      windsurf: '.windsurfrules',
    };
    const blob = new Blob([generateYaml(skillData, selectedPreviewPlatform)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNames[selectedPreviewPlatform];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep(0);
    setSkillData({ name: '', description: '', tools: [], instructions: '' });
    setSelectedTools(['Read', 'Write', 'Bash']);
    setShowPreview(false);
    setInputValue('');

    setTimeout(() => {
      addAssistantMessage('어떤 스킬을 만들까요? 🎯', SKILL_TEMPLATES);
    }, 300);
  };

  const currentMessage = messages[messages.length - 1];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden shadow-lg">
      {/* Header with Progress */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-neutral-700 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                스킬 생성 도우미
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentStep > 0 && currentStep < 5 && (
              <button
                onClick={handleBack}
                className="px-2 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex items-center gap-1"
              >
                ← 이전
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-2 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              처음부터
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-1">
          {STEPS.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            return (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md scale-110'
                      : isComplete
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 dark:bg-neutral-700 text-neutral-500'
                  }`}
                  title={step.label}
                >
                  {isComplete ? '✓' : step.icon}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 rounded ${
                      isComplete ? 'bg-green-500' : 'bg-slate-200 dark:bg-neutral-700'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[350px] overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-neutral-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                msg.type === 'user'
                  ? 'bg-orange-600 text-white rounded-br-md'
                  : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-md shadow-sm border border-slate-200 dark:border-neutral-700'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {/* Quick Options - Improved Layout */}
        {currentMessage?.options && !isTyping && (
          <div className="grid grid-cols-2 gap-2 pl-2">
            {currentMessage.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleQuickOption(opt)}
                className="p-3 text-left bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl hover:border-orange-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{opt.icon}</span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    {opt.label}
                  </span>
                </div>
                {opt.desc && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-7">
                    {opt.desc}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Tools Selection - Improved */}
        {currentMessage?.inputType === 'tools' && !isTyping && (
          <div className="space-y-4 pl-2">
            {/* Quick Presets */}
            <div>
              <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                빠른 선택
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TOOL_PRESETS.map((preset) => {
                  const isActive = JSON.stringify(selectedTools.sort()) === JSON.stringify(preset.tools.sort());
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset)}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        isActive
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30'
                          : 'border-slate-200 dark:border-neutral-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{preset.icon}</span>
                        <span className="text-xs font-medium">{preset.label}</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-0.5 pl-5">{preset.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Individual Tools */}
            <div>
              <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                개별 선택 ({selectedTools.length}개)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BUILTIN_TOOLS.map((tool) => {
                  const isSelected = selectedTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSelectedTools(prev =>
                          prev.includes(tool.id)
                            ? prev.filter(t => t !== tool.id)
                            : [...prev, tool.id]
                        );
                      }}
                      className={`px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                          : 'border-slate-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:border-orange-300'
                      }`}
                    >
                      {tool.icon} {tool.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleToolsSubmit}
              disabled={selectedTools.length === 0}
              className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                selectedTools.length > 0
                  ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                  : 'bg-slate-200 dark:bg-neutral-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              계속하기 →
            </button>
          </div>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-200 dark:border-neutral-700">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {currentMessage?.inputType && currentMessage.inputType !== 'tools' && !currentMessage.options && !isTyping && currentStep !== 5 && (
        <form onSubmit={handleTextSubmit} className="p-4 border-t border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          {currentMessage.inputType === 'textarea' ? (
            <>
              {/* Instruction Snippets */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {INSTRUCTION_SNIPPETS.map((snippet) => (
                  <button
                    key={snippet.label}
                    type="button"
                    onClick={() => handleSnippetClick(snippet)}
                    className="px-2 py-1 text-xs bg-slate-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {snippet.icon} {snippet.label}
                  </button>
                ))}
              </div>
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentMessage.placeholder}
                rows={4}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none mb-2"
              />
            </>
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentMessage.placeholder}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
            />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
                inputValue.trim()
                  ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                  : 'bg-slate-200 dark:bg-neutral-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              계속 →
            </button>
          </div>
        </form>
      )}

      {/* Preview Panel */}
      {showPreview && (
        <div className="border-t border-slate-200 dark:border-neutral-700">
          {/* Platform Tabs */}
          <div className="flex border-b border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800/50">
            {(Object.keys(PLATFORMS) as Platform[]).map((p) => {
              const info = PLATFORMS[p];
              const isSelected = p === selectedPreviewPlatform;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPreviewPlatform(p)}
                  className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-b-2 border-orange-500'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  {info.name}
                </button>
              );
            })}
          </div>

          {/* Code Preview */}
          <div className="relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs font-medium bg-slate-600 text-white rounded-md hover:bg-slate-500 transition-colors"
              >
                다운로드
              </button>
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-orange-600 text-white hover:bg-orange-500'
                }`}
              >
                {copied ? '✓ 복사됨!' : '📋 복사'}
              </button>
            </div>
            <pre className="p-4 pt-12 bg-slate-900 text-slate-100 text-sm font-mono overflow-x-auto max-h-56">
              <code>{generateYaml(skillData, selectedPreviewPlatform)}</code>
            </pre>
          </div>

          {/* Next Steps */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-t border-green-200 dark:border-green-900">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  스킬 생성 완료!
                </div>
                <div className="text-xs text-green-700 dark:text-green-300">
                  {selectedPreviewPlatform === 'claude' && '~/.claude/skills/ 폴더에 저장하면 전역 스킬로 사용할 수 있어요'}
                  {selectedPreviewPlatform === 'cursor' && '프로젝트 루트에 .cursorrules 파일로 저장하세요'}
                  {selectedPreviewPlatform === 'codex' && '프로젝트 루트에 AGENTS.md 파일로 저장하세요'}
                  {selectedPreviewPlatform === 'windsurf' && '프로젝트 루트에 .windsurfrules 파일로 저장하세요'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalWizard;
