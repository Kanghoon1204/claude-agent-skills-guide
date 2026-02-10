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

const SKILL_TEMPLATES: QuickOption[] = [
  { label: '코드 리뷰', value: 'code-review', icon: '🔍' },
  { label: '문서 생성', value: 'docs-generator', icon: '📄' },
  { label: '테스트 작성', value: 'test-writer', icon: '🧪' },
  { label: '직접 입력', value: 'custom', icon: '✨' },
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
        `안녕하세요! 👋 ${platformInfo.name} 스킬을 함께 만들어볼까요?\n\n어떤 종류의 스킬을 만들고 싶으세요?`,
        SKILL_TEMPLATES
      );
    }, 500);
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
    }, 600);
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

  const handleToolsSubmit = () => {
    addUserMessage(`선택한 도구: ${selectedTools.join(', ')}`);
    setSkillData(prev => ({ ...prev, tools: selectedTools }));
    setCurrentStep(4);

    setTimeout(() => {
      addAssistantMessage(
        '좋아요! 마지막으로, 이 스킬이 어떻게 동작해야 하는지 설명해주세요.\n\n예를 들어:\n- 어떤 순서로 작업하나요?\n- 어떤 형식으로 결과를 보여줄까요?\n- 주의할 점이 있나요?',
        undefined,
        'textarea',
        '스킬의 동작 방식을 설명하세요...\n\n예:\n1. 먼저 코드를 분석합니다\n2. 문제점을 찾아냅니다\n3. 개선 방안을 제안합니다'
      );
    }, 300);
  };

  const processStep = (value: string) => {
    switch (currentStep) {
      case 0: // Template selection
        if (value === 'custom') {
          setCurrentStep(1);
          setTimeout(() => {
            addAssistantMessage(
              '직접 만드시는군요! 멋져요 ✨\n\n스킬의 이름을 정해주세요. 영문 소문자와 하이픈(-)을 사용하면 좋아요.',
              undefined,
              'text',
              '예: code-review, api-docs, test-helper'
            );
          }, 300);
        } else {
          // Pre-fill based on template
          const templates: Record<string, Partial<SkillData>> = {
            'code-review': {
              name: 'code-review',
              description: '코드를 리뷰하고 개선 사항을 제안하는 스킬',
              instructions: '# 코드 리뷰 가이드\n\n1. 변경된 파일을 분석합니다\n2. 코드 품질, 버그 가능성, 성능을 검토합니다\n3. 구체적인 개선 제안을 제공합니다',
            },
            'docs-generator': {
              name: 'docs-generator',
              description: '코드를 분석하여 문서를 자동 생성하는 스킬',
              instructions: '# 문서 생성 가이드\n\n1. 코드 구조를 분석합니다\n2. 함수, 클래스, API 엔드포인트를 문서화합니다\n3. 사용 예시를 포함합니다',
            },
            'test-writer': {
              name: 'test-writer',
              description: '코드에 대한 테스트를 자동 작성하는 스킬',
              instructions: '# 테스트 작성 가이드\n\n1. 테스트 대상 코드를 분석합니다\n2. 정상/엣지/에러 케이스를 식별합니다\n3. 프로젝트의 테스트 프레임워크에 맞게 작성합니다',
            },
          };

          const template = templates[value];
          if (template) {
            setSkillData(prev => ({ ...prev, ...template }));
            setCurrentStep(3);
            setTimeout(() => {
              addAssistantMessage(
                `${value === 'code-review' ? '🔍 코드 리뷰' : value === 'docs-generator' ? '📄 문서 생성' : '🧪 테스트 작성'} 템플릿을 선택했어요!\n\n이 스킬에서 사용할 도구를 선택해주세요. 체크박스를 클릭하고 "완료" 버튼을 누르세요.`,
                undefined,
                'tools'
              );
            }, 300);
          }
        }
        break;

      case 1: // Name input
        setSkillData(prev => ({ ...prev, name: value.toLowerCase().replace(/\s+/g, '-') }));
        setCurrentStep(2);
        setTimeout(() => {
          addAssistantMessage(
            `"${value}" 좋은 이름이에요! 👍\n\n이 스킬이 무엇을 하는지 한 문장으로 설명해주세요.`,
            undefined,
            'text',
            '예: 코드를 리뷰하고 개선 사항을 제안합니다'
          );
        }, 300);
        break;

      case 2: // Description input
        setSkillData(prev => ({ ...prev, description: value }));
        setCurrentStep(3);
        setTimeout(() => {
          addAssistantMessage(
            '이해했어요! 🎯\n\n이제 스킬에서 사용할 도구를 선택해주세요. 필요한 것만 선택하면 더 효율적이에요.',
            undefined,
            'tools'
          );
        }, 300);
        break;

      case 4: // Instructions input
        setSkillData(prev => ({ ...prev, instructions: value }));
        setCurrentStep(5);
        setShowPreview(true);
        setTimeout(() => {
          addAssistantMessage(
            '완성됐어요! 🎉\n\n아래에서 생성된 스킬 파일을 확인하고 복사하세요. 플랫폼 탭을 클릭하면 다른 형식도 볼 수 있어요.'
          );
        }, 300);
        break;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateYaml(skillData, platform));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep(0);
    setSkillData({ name: '', description: '', tools: [], instructions: '' });
    setSelectedTools(['Read', 'Write', 'Bash']);
    setShowPreview(false);
    setInputValue('');

    setTimeout(() => {
      addAssistantMessage(
        `다시 시작해볼까요? 👋\n\n어떤 종류의 스킬을 만들고 싶으세요?`,
        SKILL_TEMPLATES
      );
    }, 500);
  };

  const currentMessage = messages[messages.length - 1];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-neutral-700 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                스킬 생성 도우미
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                대화하면서 {platformInfo.name} 스킬을 만들어요
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            처음부터
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-neutral-900/50">
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

        {/* Quick Options */}
        {currentMessage?.options && !isTyping && (
          <div className="flex flex-wrap gap-2 pl-2">
            {currentMessage.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleQuickOption(opt)}
                className="px-3 py-2 text-sm font-medium bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-full hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors shadow-sm"
              >
                {opt.icon && <span className="mr-1">{opt.icon}</span>}
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Tools Selection */}
        {currentMessage?.inputType === 'tools' && !isTyping && (
          <div className="space-y-3 pl-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 shadow-sm'
                        : 'border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{tool.icon}</span>
                      <span className={`text-sm font-medium ${isSelected ? 'text-orange-700 dark:text-orange-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
                        {tool.name}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 pl-6">
                      {tool.desc}
                    </p>
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleToolsSubmit}
              disabled={selectedTools.length === 0}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedTools.length > 0
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-slate-200 dark:bg-neutral-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              {selectedTools.length}개 도구 선택 완료
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
      {currentMessage?.inputType && !currentMessage.options && !isTyping && currentStep !== 5 && (
        <form onSubmit={handleTextSubmit} className="p-4 border-t border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          {currentMessage.inputType === 'textarea' ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentMessage.placeholder}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none mb-2"
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentMessage.placeholder}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
            />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                inputValue.trim()
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-slate-200 dark:bg-neutral-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              보내기
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
              const isSelected = p === platform;
              return (
                <button
                  key={p}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
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
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {copied ? '복사됨!' : '복사'}
              </button>
            </div>
            <pre className="p-4 pt-10 bg-slate-900 text-slate-100 text-sm font-mono overflow-x-auto max-h-64">
              <code>{generateYaml(skillData, platform)}</code>
            </pre>
          </div>

          {/* Next Steps */}
          <div className="p-4 bg-green-50 dark:bg-green-950/30 border-t border-green-200 dark:border-green-900">
            <div className="flex gap-2 text-sm text-green-800 dark:text-green-200">
              <span>✅</span>
              <span>
                파일을 복사해서 프로젝트에 저장하세요!
                {platform === 'claude' && ' (~/.claude/skills/ 폴더에 저장하면 전역 스킬로 사용 가능)'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalWizard;
