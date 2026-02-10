import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import type { Platform } from '../../context/PlatformContext';
import { PLATFORMS } from '../../context/PlatformContext';

// ============================================================
// Types
// ============================================================

interface Answer {
  questionId: string;
  value: string | string[];
}

interface QuestionOption {
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: QuestionOption[];
  multiSelect?: boolean;
  isTextInput?: boolean;
  placeholder?: string;
  questionId?: string;
  hint?: string;
  required?: boolean;
  maxLength?: number;
}

// Flow step counts for accurate progress
const FLOW_STEPS: Record<string, number> = {
  'code-review': 5,   // useCase, languages, reviewFocus, reviewOutput, skillName
  'commit': 6,        // useCase, languages, commitConvention, includeScope, includeIssue, includeBody, skillName
  'test': 5,          // useCase, languages, testFramework, testCases, mockStrategy, skillName
  'docs': 4,          // useCase, languages, docTypes, docStyle, skillName
  'bugfix': 4,        // useCase, languages, debugApproach, skillName
  'refactor': 4,      // useCase, languages, refactorScope, skillName
  'custom': 5,        // useCase, customDescription, customSteps, customOutput, skillName
};

// ============================================================
// Question Definitions - Context-Aware Questions
// ============================================================

const USE_CASES: QuestionOption[] = [
  { label: '코드 리뷰', value: 'code-review', icon: '🔍', description: '변경사항을 검토하고 피드백 받기' },
  { label: '커밋 메시지', value: 'commit', icon: '📝', description: '일관된 형식의 커밋 메시지 작성' },
  { label: '테스트 작성', value: 'test', icon: '🧪', description: '함수/컴포넌트 테스트 코드 생성' },
  { label: '문서화', value: 'docs', icon: '📄', description: 'README, API 문서, 주석 작성' },
  { label: '버그 수정', value: 'bugfix', icon: '🐛', description: '에러 분석하고 해결책 찾기' },
  { label: '리팩토링', value: 'refactor', icon: '♻️', description: '코드 구조 개선 및 정리' },
  { label: '직접 정의', value: 'custom', icon: '✨', description: '나만의 워크플로우 만들기' },
];

const LANGUAGES: QuestionOption[] = [
  { label: 'TypeScript', value: 'typescript', icon: '📘' },
  { label: 'JavaScript', value: 'javascript', icon: '💛' },
  { label: 'React', value: 'react', icon: '⚛️' },
  { label: 'Python', value: 'python', icon: '🐍' },
  { label: 'Node.js', value: 'node', icon: '💚' },
  { label: 'Go', value: 'go', icon: '🔵' },
  { label: 'Java', value: 'java', icon: '☕' },
  { label: 'Rust', value: 'rust', icon: '🦀' },
];

// Code Review specific questions
const REVIEW_FOCUS: QuestionOption[] = [
  { label: '보안 취약점', value: 'security', icon: '🔒', description: 'SQL 인젝션, XSS 등' },
  { label: '성능 이슈', value: 'performance', icon: '⚡', description: '불필요한 연산, 메모리 누수' },
  { label: '가독성', value: 'readability', icon: '📖', description: '네이밍, 구조, 복잡도' },
  { label: '에러 처리', value: 'error-handling', icon: '🚨', description: 'try-catch, 예외 상황' },
  { label: '타입 안정성', value: 'types', icon: '🔷', description: 'any 사용, 타입 정의' },
  { label: '테스트 가능성', value: 'testability', icon: '✅', description: '의존성 주입, 모듈화' },
];

const REVIEW_OUTPUT: QuestionOption[] = [
  { label: '체크리스트', value: 'checklist', icon: '✅', description: '빠르게 확인할 수 있는 형태' },
  { label: '상세 설명', value: 'detailed', icon: '📝', description: '각 이슈에 대한 자세한 설명' },
  { label: '코드 수정 제안', value: 'code-suggestion', icon: '💻', description: '바로 적용할 수 있는 코드' },
];

// Commit specific questions
const COMMIT_CONVENTIONS: QuestionOption[] = [
  { label: 'Conventional Commits', value: 'conventional', icon: '📋', description: 'feat:, fix:, docs: 형식' },
  { label: 'Gitmoji', value: 'gitmoji', icon: '😀', description: '이모지로 타입 표현' },
  { label: '간단한 형식', value: 'simple', icon: '✏️', description: '자유로운 형식' },
];

const YES_NO: QuestionOption[] = [
  { label: '네', value: 'yes', icon: '✅' },
  { label: '아니요', value: 'no', icon: '❌' },
];

// Test specific questions
const TEST_FRAMEWORKS: QuestionOption[] = [
  { label: 'Jest', value: 'jest', icon: '🃏' },
  { label: 'Vitest', value: 'vitest', icon: '⚡' },
  { label: 'Pytest', value: 'pytest', icon: '🐍' },
  { label: 'Mocha/Chai', value: 'mocha', icon: '☕' },
  { label: 'React Testing Library', value: 'rtl', icon: '⚛️' },
  { label: '기타', value: 'other', icon: '📦' },
];

const TEST_CASES: QuestionOption[] = [
  { label: '정상 케이스', value: 'happy', icon: '✅', description: '기본 동작 확인' },
  { label: '에러 케이스', value: 'error', icon: '❌', description: '예외 상황 처리' },
  { label: '엣지 케이스', value: 'edge', icon: '📐', description: '경계값, 특수 상황' },
  { label: 'null/undefined', value: 'null', icon: '∅', description: '빈 값 처리' },
];

// Docs specific questions
const DOC_TYPES: QuestionOption[] = [
  { label: 'README', value: 'readme', icon: '📖', description: '프로젝트 소개 문서' },
  { label: 'API 문서', value: 'api', icon: '🔌', description: '엔드포인트, 요청/응답' },
  { label: 'JSDoc/TSDoc', value: 'jsdoc', icon: '💬', description: '함수 주석' },
  { label: '변경 로그', value: 'changelog', icon: '📋', description: 'CHANGELOG.md' },
];

const DOC_STYLE: QuestionOption[] = [
  { label: '간결하게', value: 'concise', icon: '✂️', description: '핵심만 빠르게' },
  { label: '상세하게', value: 'detailed', icon: '📚', description: '예시와 설명 포함' },
  { label: '기술적으로', value: 'technical', icon: '🔧', description: '표준 형식 준수' },
];

// ============================================================
// Utility Functions
// ============================================================

// Validate skill name
function validateSkillName(name: string): { valid: boolean; error?: string } {
  if (!name.trim()) {
    return { valid: false, error: '스킬 이름을 입력해주세요.' };
  }
  if (name.length > 50) {
    return { valid: false, error: '스킬 이름은 50자 이하로 입력해주세요.' };
  }
  if (!/^[a-zA-Z0-9가-힣_-]+$/.test(name.trim())) {
    return { valid: false, error: '스킬 이름에는 문자, 숫자, 하이픈(-), 밑줄(_)만 사용할 수 있습니다.' };
  }
  return { valid: true };
}

// Sanitize skill name for file name
function sanitizeSkillName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9가-힣_-]/g, '');
}

// ============================================================
// Skill Generation Logic
// ============================================================

function generateSkillFromAnswers(answers: Answer[], platform: Platform): { yaml: string; name: string; description: string } {
  const getAnswer = (id: string): string | string[] | undefined => {
    return answers.find(a => a.questionId === id)?.value;
  };

  const useCase = getAnswer('useCase') as string;
  const languages = (getAnswer('languages') as string[]) || [];
  const rawSkillName = (getAnswer('skillName') as string) || useCase || 'my-skill';
  const skillName = sanitizeSkillName(rawSkillName);

  // Build tools based on use case (using Set to avoid duplicates)
  const toolsSet = new Set<string>(['Read']);

  if (['code-review', 'bugfix', 'refactor', 'test'].includes(useCase)) {
    toolsSet.add('Edit');
    toolsSet.add('Glob');
    toolsSet.add('Grep');
  }
  if (['commit', 'docs'].includes(useCase)) {
    toolsSet.add('Write');
    toolsSet.add('Bash');
  }
  if (useCase === 'bugfix') {
    toolsSet.add('Bash');
    toolsSet.add('LSP');
  }
  if (useCase === 'test') {
    toolsSet.add('Write');
  }

  const tools = Array.from(toolsSet);

  // Build description
  let description = '';
  switch (useCase) {
    case 'code-review':
      description = '코드 변경사항을 검토하고 개선점을 제안합니다.';
      break;
    case 'commit':
      description = '변경사항을 분석하여 커밋 메시지를 작성합니다.';
      break;
    case 'test':
      description = '함수와 컴포넌트에 대한 테스트 코드를 생성합니다.';
      break;
    case 'docs':
      description = '코드에 대한 문서를 자동으로 생성합니다.';
      break;
    case 'bugfix':
      description = '에러를 분석하고 수정 방법을 제안합니다.';
      break;
    case 'refactor':
      description = '코드 구조를 개선하고 정리합니다.';
      break;
    default:
      description = ((getAnswer('customDescription') as string) || '사용자 정의 스킬').slice(0, 100);
  }

  // Build instructions based on answers
  const instructions: string[] = [];

  // Language context
  if (languages.length > 0) {
    const langNames = languages.map(l => LANGUAGES.find(lang => lang.value === l)?.label || l);
    instructions.push(`## 기술 스택\n\n이 프로젝트는 **${langNames.join(', ')}**를 사용합니다.\n\n해당 언어/프레임워크의 베스트 프랙티스와 관용적인 코드 스타일을 따릅니다.`);
  }

  // Use case specific instructions
  switch (useCase) {
    case 'code-review': {
      const focusAreas = (getAnswer('reviewFocus') as string[]) || [];
      const outputFormat = getAnswer('reviewOutput') as string;

      instructions.push('## 코드 리뷰 프로세스\n\n1. 변경된 파일 목록을 확인합니다.\n2. 각 파일의 변경 내용을 분석합니다.\n3. 아래 기준에 따라 리뷰합니다.\n4. 결과를 지정된 형식으로 정리합니다.');

      if (focusAreas.length > 0) {
        instructions.push('## 리뷰 기준');

        focusAreas.forEach(area => {
          switch (area) {
            case 'security':
              instructions.push(`### 🔒 보안 취약점\n\n- **SQL 인젝션**: 사용자 입력이 쿼리에 직접 삽입되는지 확인\n- **XSS (Cross-Site Scripting)**: 사용자 입력이 HTML에 이스케이프 없이 삽입되는지 확인\n- **CSRF**: 상태 변경 요청에 CSRF 토큰이 있는지 확인\n- **인증/인가**: 민감한 작업에 적절한 권한 검사가 있는지 확인\n- **비밀 노출**: API 키, 비밀번호가 코드에 하드코딩되어 있는지 확인`);
              break;
            case 'performance':
              instructions.push(`### ⚡ 성능 이슈\n\n- **불필요한 연산**: 루프 내에서 반복되는 계산이 있는지 확인\n- **N+1 쿼리**: 루프 내에서 DB 쿼리가 발생하는지 확인\n- **메모리 누수**: 이벤트 리스너, 타이머가 정리되는지 확인\n- **번들 크기**: 불필요한 의존성이 추가되었는지 확인\n- **캐싱**: 반복적인 계산에 메모이제이션이 적용되었는지 확인`);
              break;
            case 'readability':
              instructions.push(`### 📖 가독성\n\n- **네이밍**: 변수, 함수, 클래스 이름이 의도를 명확히 표현하는지 확인\n- **함수 크기**: 함수가 한 가지 일만 하고 적절한 크기인지 확인\n- **주석**: 복잡한 로직에 설명이 있는지, 불필요한 주석은 없는지 확인\n- **코드 구조**: 관련 코드가 적절히 그룹화되어 있는지 확인`);
              break;
            case 'error-handling':
              instructions.push(`### 🚨 에러 처리\n\n- **try-catch**: 예외가 발생할 수 있는 코드가 적절히 감싸져 있는지 확인\n- **에러 메시지**: 에러 메시지가 디버깅에 도움이 되는지 확인\n- **사용자 피드백**: 사용자에게 적절한 에러 메시지가 표시되는지 확인\n- **에러 복구**: 가능한 경우 에러에서 복구하는 로직이 있는지 확인`);
              break;
            case 'types':
              instructions.push(`### 🔷 타입 안정성\n\n- **any 사용**: \`any\` 타입 사용을 최소화했는지 확인\n- **타입 정의**: 인터페이스와 타입이 적절히 정의되어 있는지 확인\n- **null 처리**: null/undefined 케이스가 처리되어 있는지 확인\n- **타입 가드**: 런타임 타입 체크가 필요한 곳에 타입 가드가 있는지 확인`);
              break;
            case 'testability':
              instructions.push(`### ✅ 테스트 가능성\n\n- **의존성 주입**: 외부 의존성이 주입 가능한 구조인지 확인\n- **순수 함수**: 비즈니스 로직이 순수 함수로 분리되어 있는지 확인\n- **모듈화**: 테스트하기 어려운 큰 함수가 없는지 확인`);
              break;
          }
        });
      }

      instructions.push('## 출력 형식');
      if (outputFormat === 'checklist') {
        instructions.push('리뷰 결과를 체크리스트 형태로 간결하게 정리합니다:\n\n```\n## 리뷰 결과\n\n### 통과\n- ✅ 보안: 주요 취약점 없음\n- ✅ 타입: 적절한 타입 정의\n\n### 주의 (권장사항)\n- ⚠️ 성능: line 45 - 루프 내 불필요한 객체 생성 (영향: 낮음)\n\n### 수정 필요\n- ❌ 에러 처리: line 78 - API 호출에 try-catch 누락\n```');
      } else if (outputFormat === 'code-suggestion') {
        instructions.push('문제가 있는 코드와 수정된 코드를 함께 제시합니다:\n\n```\n## 리뷰 결과\n\n### 1. 에러 처리 누락 (line 78)\n\n**문제점:** API 호출 시 에러 처리가 없습니다.\n\n**현재 코드:**\n```typescript\nconst data = await fetchData();\n```\n\n**수정 제안:**\n```typescript\ntry {\n  const data = await fetchData();\n} catch (error) {\n  console.error("데이터 로딩 실패:", error);\n  throw error;\n}\n```\n```');
      } else {
        instructions.push('각 이슈에 대해 상세히 설명합니다:\n\n```\n## 리뷰 결과\n\n### 이슈 1: 에러 처리 누락\n\n- **위치:** src/api/user.ts:78\n- **심각도:** 높음\n- **문제:** fetchData() 호출에 에러 처리가 없어 예외 발생 시 앱이 크래시될 수 있습니다.\n- **해결 방법:** try-catch로 감싸고 적절한 에러 핸들링을 추가하세요.\n- **예시:** (코드 예시 제공)\n```');
      }
      break;
    }

    case 'commit': {
      const convention = getAnswer('commitConvention') as string;
      const includeScope = getAnswer('includeScope') === 'yes';
      const includeIssue = getAnswer('includeIssue') === 'yes';
      const includeBody = getAnswer('includeBody') === 'yes';

      instructions.push('## 커밋 메시지 작성 프로세스\n\n1. `git diff --staged` 또는 변경사항을 분석합니다.\n2. 변경의 목적과 범위를 파악합니다.\n3. 아래 형식에 맞춰 커밋 메시지를 작성합니다.');

      if (convention === 'conventional') {
        let format = includeScope ? '<type>(<scope>): <subject>' : '<type>: <subject>';
        if (includeBody) {
          format += '\n\n<body>';
        }
        if (includeIssue) {
          format += includeBody ? '\n\n<footer>' : '\n\n<footer>';
        }

        instructions.push(`## Conventional Commits 형식\n\n\`\`\`\n${format}\n\`\`\``);

        instructions.push('### 타입 정의\n\n| 타입 | 설명 | 예시 |\n|------|------|------|\n| feat | 새로운 기능 추가 | feat: 로그인 기능 추가 |\n| fix | 버그 수정 | fix: 로그인 버튼 클릭 안되는 문제 수정 |\n| docs | 문서 변경 | docs: README 업데이트 |\n| style | 코드 포맷팅 (동작 변경 없음) | style: 들여쓰기 수정 |\n| refactor | 리팩토링 (기능 변경 없음) | refactor: 로그인 로직 분리 |\n| test | 테스트 추가/수정 | test: 로그인 테스트 추가 |\n| chore | 빌드, 설정 변경 | chore: eslint 설정 추가 |');

        if (includeScope) {
          instructions.push('### 스코프\n\n변경된 모듈이나 기능 영역을 괄호 안에 명시합니다.\n\n예:\n- `feat(auth): 소셜 로그인 추가`\n- `fix(ui): 버튼 스타일 수정`');
        }
      } else if (convention === 'gitmoji') {
        instructions.push('## Gitmoji 형식\n\n| 이모지 | 의미 | 예시 |\n|--------|------|------|\n| ✨ | 새 기능 | ✨ 로그인 기능 추가 |\n| 🐛 | 버그 수정 | 🐛 로그인 버그 수정 |\n| 📝 | 문서 | 📝 README 업데이트 |\n| 💄 | UI/스타일 | 💄 버튼 디자인 변경 |\n| ♻️ | 리팩토링 | ♻️ 로그인 로직 개선 |\n| 🧪 | 테스트 | 🧪 로그인 테스트 추가 |\n| 🔧 | 설정 | 🔧 ESLint 설정 추가 |\n| 🔥 | 삭제 | 🔥 미사용 코드 제거 |');
      } else {
        instructions.push('## 커밋 메시지 형식\n\n간결하고 명확하게 변경 내용을 설명합니다.\n\n예:\n- `로그인 기능 추가`\n- `버튼 클릭 버그 수정`\n- `README 업데이트`');
      }

      if (includeIssue) {
        instructions.push('### 이슈 연결\n\n관련 이슈가 있으면 커밋 메시지 끝에 연결합니다.\n\n- `feat: 로그인 기능 추가 (#123)`\n- `fix: 버그 수정 (Closes #456)`\n- `Refs #789` (참조만 할 경우)');
      }

      instructions.push('### 작성 원칙\n\n- **제목**: 50자 이내, 현재형/명령문으로 작성 ("추가" O, "추가함" X)\n- **본문**: 72자에서 줄바꿈, "무엇을"보다 "왜" 변경했는지 설명\n- **언어**: 한글 또는 영어 중 프로젝트 컨벤션에 맞춰 일관성 유지');
      break;
    }

    case 'test': {
      const framework = getAnswer('testFramework') as string;
      const testCases = (getAnswer('testCases') as string[]) || [];
      const mockStrategy = getAnswer('mockStrategy') as string;

      instructions.push('## 테스트 작성 프로세스\n\n1. 테스트 대상 함수/컴포넌트를 분석합니다.\n2. 입력과 예상 출력을 정의합니다.\n3. 아래 기준에 따라 테스트 케이스를 작성합니다.');

      if (framework && framework !== 'other') {
        const frameworkInfo = TEST_FRAMEWORKS.find(f => f.value === framework);
        instructions.push(`## 프레임워크: ${frameworkInfo?.icon} ${frameworkInfo?.label}`);

        if (framework === 'jest' || framework === 'vitest') {
          instructions.push('### 테스트 구조\n\n```javascript\nimport { describe, it, expect, beforeEach, vi } from "vitest"; // 또는 jest\n\ndescribe("함수/컴포넌트명", () => {\n  beforeEach(() => {\n    // 각 테스트 전 초기화\n  });\n\n  describe("기능/메서드명", () => {\n    it("정상적인 입력에 대해 예상 결과를 반환한다", () => {\n      // Arrange (준비)\n      const input = "test";\n      \n      // Act (실행)\n      const result = targetFunction(input);\n      \n      // Assert (검증)\n      expect(result).toBe("expected");\n    });\n  });\n});\n```');
        } else if (framework === 'pytest') {
          instructions.push('### 테스트 구조\n\n```python\nimport pytest\nfrom module import target_function\n\nclass TestTargetFunction:\n    """target_function 테스트\"\"\"\n    \n    def test_정상입력_예상결과(self):\n        # Arrange (준비)\n        input_data = "test"\n        \n        # Act (실행)\n        result = target_function(input_data)\n        \n        # Assert (검증)\n        assert result == "expected"\n    \n    def test_예외상황_에러발생(self):\n        with pytest.raises(ValueError):\n            target_function(None)\n```');
        } else if (framework === 'rtl') {
          instructions.push('### React Testing Library 구조\n\n```typescript\nimport { render, screen, fireEvent, waitFor } from "@testing-library/react";\nimport { MyComponent } from "./MyComponent";\n\ndescribe("MyComponent", () => {\n  it("버튼 클릭 시 텍스트가 변경된다", async () => {\n    // Arrange\n    render(<MyComponent />);\n    \n    // Act\n    fireEvent.click(screen.getByRole("button", { name: /클릭/i }));\n    \n    // Assert\n    await waitFor(() => {\n      expect(screen.getByText("변경됨")).toBeInTheDocument();\n    });\n  });\n});\n```');
        }
      }

      if (testCases.length > 0) {
        instructions.push('## 필수 테스트 케이스');

        testCases.forEach(tc => {
          switch (tc) {
            case 'happy':
              instructions.push('### ✅ 정상 케이스 (Happy Path)\n\n- 유효한 입력에 대한 예상 결과 확인\n- 기본 사용 시나리오 검증\n- 반환값의 타입과 구조 확인');
              break;
            case 'error':
              instructions.push('### ❌ 에러 케이스\n\n- 잘못된 입력에 대한 에러 발생 확인\n- 에러 메시지 내용 검증\n- 에러 타입 확인 (TypeError, ValueError 등)');
              break;
            case 'edge':
              instructions.push('### 📐 엣지 케이스\n\n- 빈 배열, 빈 문자열 처리\n- 최대/최소 경계값\n- 특수 문자, 유니코드 입력\n- 매우 큰 입력값');
              break;
            case 'null':
              instructions.push('### ∅ null/undefined 처리\n\n- null 입력 시 동작 확인\n- undefined 입력 시 동작 확인\n- 선택적 파라미터 생략 시 동작');
              break;
          }
        });
      }

      if (mockStrategy === 'minimal') {
        instructions.push('## Mock 전략: 최소한\n\n- 외부 API, DB 등 실제 호출이 어려운 의존성만 모킹\n- 가능하면 실제 구현 사용\n- 통합 테스트 성격으로 작성');
      } else if (mockStrategy === 'full') {
        instructions.push('## Mock 전략: 완전 격리\n\n- 모든 외부 의존성 모킹\n- 테스트 대상만 순수하게 테스트\n- 빠른 실행과 결정적(deterministic) 결과 보장');
      }

      instructions.push('## 테스트 작성 원칙\n\n1. **명확한 테스트 이름**: `test_로그인_올바른비밀번호_성공` 형식으로 의도 명시\n2. **AAA 패턴**: Arrange(준비) → Act(실행) → Assert(검증)\n3. **독립성**: 각 테스트는 다른 테스트에 의존하지 않음\n4. **한 가지만 테스트**: 하나의 테스트에서 하나의 동작만 검증');
      break;
    }

    case 'docs': {
      const docTypes = (getAnswer('docTypes') as string[]) || [];
      const docStyle = getAnswer('docStyle') as string;

      instructions.push('## 문서화 프로세스\n\n1. 대상 코드/프로젝트를 분석합니다.\n2. 아래 가이드에 따라 문서를 작성합니다.\n3. 예시 코드가 실제로 동작하는지 확인합니다.');

      if (docStyle === 'concise') {
        instructions.push('## 스타일: 간결하게\n\n- 핵심 정보만 포함\n- 불필요한 설명 생략\n- 코드 예시는 최소한으로\n- 바쁜 개발자를 위한 빠른 참조 형식');
      } else if (docStyle === 'detailed') {
        instructions.push('## 스타일: 상세하게\n\n- 모든 옵션과 파라미터 설명\n- 다양한 사용 예시 포함\n- 주의사항과 팁 추가\n- 초보자도 따라할 수 있는 수준');
      } else if (docStyle === 'technical') {
        instructions.push('## 스타일: 기술적\n\n- 표준 형식 (OpenAPI, JSDoc 등) 준수\n- 타입 정보 명시\n- 기계 판독 가능한 형식 우선\n- API 문서 자동 생성 도구 호환');
      }

      docTypes.forEach(dt => {
        switch (dt) {
          case 'readme':
            instructions.push('## README 구조\n\n```markdown\n# 프로젝트명\n\n> 한 줄 설명\n\n## 특징\n\n- 특징 1\n- 특징 2\n\n## 설치\n\n```bash\nnpm install package-name\n```\n\n## 사용법\n\n```javascript\nimport { func } from "package-name";\n\nfunc();\n```\n\n## API\n\n### `functionName(param)`\n\n설명...\n\n## 기여\n\n1. Fork\n2. 브랜치 생성\n3. PR 제출\n\n## 라이선스\n\nMIT\n```');
            break;
          case 'api':
            instructions.push('## API 문서 구조\n\n각 엔드포인트마다:\n\n```markdown\n## `POST /api/users`\n\n사용자를 생성합니다.\n\n### 요청\n\n**Headers:**\n- `Authorization`: Bearer {token}\n- `Content-Type`: application/json\n\n**Body:**\n```json\n{\n  "name": "string",\n  "email": "string"\n}\n```\n\n### 응답\n\n**성공 (201)**\n```json\n{\n  "id": 1,\n  "name": "홍길동",\n  "email": "hong@example.com"\n}\n```\n\n**에러**\n- `400 Bad Request`: 잘못된 요청 형식\n- `401 Unauthorized`: 인증 필요\n- `409 Conflict`: 이미 존재하는 이메일\n```');
            break;
          case 'jsdoc':
            instructions.push('## JSDoc/TSDoc 형식\n\n```typescript\n/**\n * 사용자 정보를 조회합니다.\n *\n * @param id - 사용자 ID\n * @param options - 조회 옵션\n * @param options.includeDeleted - 삭제된 사용자 포함 여부\n * @returns 사용자 정보 객체\n * @throws {NotFoundError} 사용자가 존재하지 않을 때\n *\n * @example\n * ```typescript\n * const user = await getUser(1);\n * console.log(user.name); // "홍길동"\n * ```\n */\nexport async function getUser(\n  id: number,\n  options?: GetUserOptions\n): Promise<User> {\n  // ...\n}\n```');
            break;
          case 'changelog':
            instructions.push('## CHANGELOG 형식\n\n[Keep a Changelog](https://keepachangelog.com) 형식을 따릅니다:\n\n```markdown\n# Changelog\n\n## [Unreleased]\n\n### Added\n- 새로운 기능\n\n## [1.2.0] - 2024-01-15\n\n### Added\n- 사용자 프로필 기능 추가\n- 다크 모드 지원\n\n### Changed\n- 로그인 UI 개선\n- 성능 최적화\n\n### Fixed\n- 로그인 버그 수정\n- 메모리 누수 해결\n\n### Deprecated\n- 구버전 API 지원 중단 예정\n\n### Removed\n- 레거시 컴포넌트 제거\n\n### Security\n- XSS 취약점 패치\n```');
            break;
        }
      });
      break;
    }

    case 'bugfix': {
      const debugApproach = getAnswer('debugApproach') as string;

      instructions.push('## 버그 수정 프로세스');

      instructions.push('### 1단계: 문제 파악\n\n- 에러 메시지와 스택 트레이스를 주의 깊게 읽습니다.\n- 문제가 발생하는 정확한 조건을 파악합니다.\n- 영향 범위(어떤 기능, 어떤 사용자)를 확인합니다.\n- 재현 가능한 최소 케이스를 만듭니다.');

      instructions.push('### 2단계: 원인 분석\n\n- 관련 코드 파일을 탐색합니다.\n- 최근 변경사항 (git log, git blame)을 확인합니다.\n- 로그와 디버그 정보를 수집합니다.\n- 가설을 세우고 검증합니다.');

      instructions.push('### 3단계: 해결\n\n- 근본 원인을 해결합니다 (증상만 가리지 않습니다).\n- 여러 해결책이 있으면 장단점을 설명합니다.\n- 부작용이 없는지 검토합니다.\n- 관련 테스트를 추가합니다.');

      instructions.push('### 4단계: 검증\n\n- 원래 문제가 해결되었는지 확인합니다.\n- 관련 기능이 정상 동작하는지 확인합니다 (회귀 테스트).\n- 엣지 케이스에서도 문제가 없는지 확인합니다.');

      if (debugApproach === 'systematic') {
        instructions.push('### 디버깅 접근법: 체계적\n\n1. **이분 탐색**: 문제 범위를 절반씩 좁혀갑니다.\n2. **로그 추가**: 의심되는 지점에 로그를 추가합니다.\n3. **단계별 확인**: 각 단계에서 예상대로 동작하는지 확인합니다.\n4. **최소 재현**: 문제를 재현하는 가장 작은 코드를 만듭니다.');
      } else if (debugApproach === 'intuitive') {
        instructions.push('### 디버깅 접근법: 직관적\n\n1. **경험 활용**: 비슷한 문제를 해결했던 경험을 떠올립니다.\n2. **패턴 인식**: 흔한 버그 패턴인지 확인합니다.\n3. **빠른 가설**: 가장 가능성 높은 원인부터 확인합니다.');
      }
      break;
    }

    case 'refactor': {
      const refactorScope = getAnswer('refactorScope') as string;

      instructions.push('## 리팩토링 원칙\n\n- **동작 변경 금지**: 기능은 그대로, 구조만 개선합니다.\n- **점진적 개선**: 작은 단위로 나눠서 진행합니다.\n- **테스트 우선**: 리팩토링 전 테스트가 통과하는지 확인합니다.\n- **각 단계 커밋**: 작은 변경마다 커밋하여 롤백 가능하게 합니다.');

      instructions.push('## 리팩토링 대상 식별\n\n### 코드 스멜 (Code Smell)\n\n| 문제 | 해결책 |\n|------|--------|\n| 중복 코드 | 함수/클래스로 추출 |\n| 긴 함수 | 작은 함수로 분리 |\n| 긴 파라미터 목록 | 객체로 그룹화 |\n| 복잡한 조건문 | 가드 클로즈, 전략 패턴 |\n| 매직 넘버 | 상수로 추출 |\n| 강한 결합 | 의존성 주입 |');

      if (refactorScope === 'function') {
        instructions.push('### 범위: 함수 레벨\n\n개별 함수의 가독성과 단일 책임을 개선합니다.\n\n1. 함수가 한 가지 일만 하도록 분리\n2. 의미 있는 이름으로 변경\n3. 파라미터 수 최소화\n4. 중첩 깊이 줄이기 (가드 클로즈 활용)');
      } else if (refactorScope === 'module') {
        instructions.push('### 범위: 모듈 레벨\n\n파일/모듈 간 책임 분리와 의존성을 정리합니다.\n\n1. 관련 기능을 같은 모듈로 그룹화\n2. 순환 의존성 제거\n3. 공개 API 최소화\n4. 인터페이스로 결합도 낮추기');
      } else if (refactorScope === 'architecture') {
        instructions.push('### 범위: 아키텍처 레벨\n\n레이어 분리, 패턴 적용 등 구조적 개선을 진행합니다.\n\n1. 레이어 분리 (프레젠테이션, 비즈니스, 데이터)\n2. 디자인 패턴 적용\n3. 도메인 모델 정제\n4. 확장 가능한 구조로 개선');
      }
      break;
    }

    case 'custom': {
      const customDesc = getAnswer('customDescription') as string;
      const customSteps = getAnswer('customSteps') as string;
      const customOutput = getAnswer('customOutput') as string;

      if (customDesc) {
        instructions.push(`## 목적\n\n${customDesc}`);
      }
      if (customSteps) {
        instructions.push(`## 수행 단계\n\n${customSteps}`);
      }
      if (customOutput) {
        instructions.push(`## 출력 형식\n\n${customOutput}`);
      }
      break;
    }
  }

  // Build YAML/content based on platform
  const toolsYaml = tools.map(t => `  - ${t}`).join('\n');
  const instructionsText = instructions.join('\n\n');

  let yaml = '';
  if (platform === 'cursor') {
    yaml = `# ${skillName}

${description}

${instructionsText}`;
  } else if (platform === 'windsurf') {
    yaml = `# ${skillName}

${description}

${instructionsText}`;
  } else if (platform === 'codex') {
    yaml = `# ${skillName}

${description}

${instructionsText}`;
  } else {
    // Claude Code format (YAML frontmatter)
    yaml = `---
description: ${description}
tools:
${toolsYaml}
---

# ${skillName}

${instructionsText}`;
  }

  return { yaml, name: skillName, description };
}

// ============================================================
// LocalStorage helpers
// ============================================================

const STORAGE_KEY = 'skill-wizard-draft';

function saveDraft(answers: Answer[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers,
      timestamp: Date.now(),
    }));
  } catch {
    // localStorage not available, ignore
  }
}

function loadDraft(): Answer[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      // Only restore if less than 1 hour old
      if (Date.now() - data.timestamp < 60 * 60 * 1000) {
        return data.answers;
      }
    }
  } catch {
    // localStorage not available, ignore
  }
  return null;
}

function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage not available, ignore
  }
}

// ============================================================
// Main Component
// ============================================================

const ConversationalWizard: React.FC = () => {
  const { platform, platformInfo } = usePlatform();
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [textInput, setTextInput] = useState('');
  const [textError, setTextError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [selectedPreviewPlatform, setSelectedPreviewPlatform] = useState<Platform>(platform);
  const [showDraftRestore, setShowDraftRestore] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get answer helper
  const getAnswer = useCallback((id: string): string | string[] | undefined => {
    return answers.find(a => a.questionId === id)?.value;
  }, [answers]);

  // Progress calculation based on use case
  const progress = useMemo(() => {
    const useCase = getAnswer('useCase') as string;
    const totalSteps = FLOW_STEPS[useCase] || 5;
    const currentStep = Math.min(answers.length, totalSteps);
    return { current: currentStep, total: totalSteps, percent: (currentStep / totalSteps) * 100 };
  }, [answers, getAnswer]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input after new question
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  // Check for draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft && draft.length > 0) {
      setShowDraftRestore(true);
    }
  }, []);

  // Initialize first question
  useEffect(() => {
    if (messages.length === 0 && !showDraftRestore) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: '어떤 작업을 자동화하고 싶으신가요?',
          hint: '반복적으로 하는 작업이나, 매번 같은 설명을 해야 하는 상황을 떠올려보세요.',
          options: USE_CASES,
          questionId: 'useCase',
          required: true,
        },
      ]);
    }
  }, [messages.length, showDraftRestore]);

  // Save draft when answers change
  useEffect(() => {
    if (answers.length > 0 && !isComplete) {
      saveDraft(answers);
    }
  }, [answers, isComplete]);

  // Restore draft
  const handleRestoreDraft = useCallback(() => {
    const draft = loadDraft();
    if (draft) {
      setAnswers(draft);
      setShowDraftRestore(false);

      // Rebuild messages from draft
      const msgs: Message[] = [{
        id: '1',
        type: 'bot',
        content: '이전에 작성하던 스킬을 이어서 만들어요!',
        hint: '질문에 답하면서 맞춤 스킬을 만들어보세요.',
      }];

      draft.forEach(a => {
        msgs.push({
          id: `user-${a.questionId}`,
          type: 'user',
          content: Array.isArray(a.value) ? a.value.join(', ') : a.value,
        });
      });

      setMessages(msgs);

      // Get next question
      const lastAnswer = draft[draft.length - 1];
      setTimeout(() => {
        const nextQ = getNextQuestion(lastAnswer.questionId, Array.isArray(lastAnswer.value) ? lastAnswer.value[0] : lastAnswer.value, draft);
        if (nextQ) {
          setMessages(prev => [...prev, nextQ]);
        }
      }, 100);
    }
  }, []);

  const handleDismissDraft = useCallback(() => {
    clearDraft();
    setShowDraftRestore(false);
    setMessages([{
      id: '1',
      type: 'bot',
      content: '어떤 작업을 자동화하고 싶으신가요?',
      hint: '반복적으로 하는 작업이나, 매번 같은 설명을 해야 하는 상황을 떠올려보세요.',
      options: USE_CASES,
      questionId: 'useCase',
      required: true,
    }]);
  }, []);

  // Handle single option selection
  const handleSelect = useCallback((questionId: string, value: string, label: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: label,
    };

    const newAnswers = [...answers.filter(a => a.questionId !== questionId), { questionId, value }];
    setMessages(prev => [...prev, userMsg]);
    setAnswers(newAnswers);

    setTimeout(() => {
      const nextQuestion = getNextQuestion(questionId, value, newAnswers);
      if (nextQuestion) {
        setMessages(prev => [...prev, nextQuestion]);
      } else {
        finishWizard();
      }
    }, 300);
  }, [answers]);

  // Handle multi-select confirmation
  const handleMultiSelectConfirm = useCallback((questionId: string) => {
    if (selectedMulti.length === 0) return;

    const lastMsg = messages[messages.length - 1];
    const labels = selectedMulti.map(v =>
      lastMsg.options?.find(o => o.value === v)?.label || v
    );

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: labels.join(', '),
    };

    const newAnswers = [...answers.filter(a => a.questionId !== questionId), { questionId, value: selectedMulti }];
    setMessages(prev => [...prev, userMsg]);
    setAnswers(newAnswers);

    const values = [...selectedMulti];
    setSelectedMulti([]);

    setTimeout(() => {
      const nextQuestion = getNextQuestion(questionId, values[0], newAnswers);
      if (nextQuestion) {
        setMessages(prev => [...prev, nextQuestion]);
      } else {
        finishWizard();
      }
    }, 300);
  }, [messages, selectedMulti, answers]);

  // Handle multi-select skip
  const handleMultiSelectSkip = useCallback((questionId: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: '(건너뜀)',
    };

    const newAnswers = [...answers.filter(a => a.questionId !== questionId), { questionId, value: [] }];
    setMessages(prev => [...prev, userMsg]);
    setAnswers(newAnswers);
    setSelectedMulti([]);

    setTimeout(() => {
      const nextQuestion = getNextQuestion(questionId, '', newAnswers);
      if (nextQuestion) {
        setMessages(prev => [...prev, nextQuestion]);
      } else {
        finishWizard();
      }
    }, 300);
  }, [answers]);

  // Handle text input submission
  const handleTextSubmit = useCallback(() => {
    if (!textInput.trim()) return;

    const lastMsg = messages[messages.length - 1];
    const questionId = lastMsg.questionId || '';

    // Validate skill name
    if (questionId === 'skillName') {
      const validation = validateSkillName(textInput);
      if (!validation.valid) {
        setTextError(validation.error || '잘못된 입력입니다.');
        return;
      }
    }

    setTextError(null);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: textInput,
    };

    const newAnswers = [...answers.filter(a => a.questionId !== questionId), { questionId, value: textInput }];
    setMessages(prev => [...prev, userMsg]);
    setAnswers(newAnswers);

    const value = textInput;
    setTextInput('');

    setTimeout(() => {
      const nextQuestion = getNextQuestion(questionId, value, newAnswers);
      if (nextQuestion) {
        setMessages(prev => [...prev, nextQuestion]);
      } else {
        finishWizard();
      }
    }, 300);
  }, [textInput, messages, answers]);

  // Get next question based on current answers
  const getNextQuestion = useCallback((currentId: string, currentValue: string, currentAnswers: Answer[]): Message | null => {
    const getAns = (id: string) => currentAnswers.find(a => a.questionId === id)?.value;
    const useCase = (getAns('useCase') as string) || (currentId === 'useCase' ? currentValue : '');

    switch (currentId) {
      case 'useCase':
        if (currentValue === 'custom') {
          return {
            id: `q-${Date.now()}`,
            type: 'bot',
            content: '어떤 작업을 자동화하고 싶은지 설명해주세요.',
            hint: '예: "PR 올리기 전 체크리스트 확인", "API 응답을 특정 형식으로 변환"',
            isTextInput: true,
            placeholder: '자동화하고 싶은 작업을 설명하세요...',
            questionId: 'customDescription',
            required: true,
            maxLength: 500,
          };
        }
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '주로 사용하는 언어나 프레임워크는요?',
          hint: '선택하지 않아도 괜찮아요. 스킬에 기술 스택 정보가 추가됩니다.',
          options: LANGUAGES,
          multiSelect: true,
          questionId: 'languages',
        };

      case 'languages':
        switch (useCase) {
          case 'code-review':
            return {
              id: `q-${Date.now()}`,
              type: 'bot',
              content: '코드 리뷰할 때 어떤 점을 중점적으로 봐야 할까요?',
              hint: '프로젝트에서 중요하게 생각하는 부분을 선택하세요.',
              options: REVIEW_FOCUS,
              multiSelect: true,
              questionId: 'reviewFocus',
              required: true,
            };
          case 'commit':
            return {
              id: `q-${Date.now()}`,
              type: 'bot',
              content: '어떤 커밋 메시지 형식을 사용하시나요?',
              hint: '팀에서 정한 컨벤션이 있다면 선택하세요.',
              options: COMMIT_CONVENTIONS,
              questionId: 'commitConvention',
              required: true,
            };
          case 'test':
            return {
              id: `q-${Date.now()}`,
              type: 'bot',
              content: '어떤 테스트 프레임워크를 사용하시나요?',
              options: TEST_FRAMEWORKS,
              questionId: 'testFramework',
              required: true,
            };
          case 'docs':
            return {
              id: `q-${Date.now()}`,
              type: 'bot',
              content: '주로 어떤 문서를 작성하시나요?',
              options: DOC_TYPES,
              multiSelect: true,
              questionId: 'docTypes',
              required: true,
            };
          case 'bugfix':
            return {
              id: `q-${Date.now()}`,
              type: 'bot',
              content: '디버깅할 때 선호하는 접근 방식이 있나요?',
              options: [
                { label: '체계적으로', value: 'systematic', icon: '🔬', description: '로그 추가, 이분 탐색' },
                { label: '직관적으로', value: 'intuitive', icon: '💡', description: '경험 기반 추측' },
                { label: '상황에 따라', value: 'flexible', icon: '🔄', description: '유연하게 대응' },
              ],
              questionId: 'debugApproach',
              required: true,
            };
          case 'refactor':
            return {
              id: `q-${Date.now()}`,
              type: 'bot',
              content: '어느 수준의 리팩토링을 원하시나요?',
              options: [
                { label: '함수 레벨', value: 'function', icon: '🔧', description: '개별 함수 개선' },
                { label: '모듈 레벨', value: 'module', icon: '📦', description: '파일 간 정리' },
                { label: '아키텍처 레벨', value: 'architecture', icon: '🏗️', description: '구조적 개선' },
              ],
              questionId: 'refactorScope',
              required: true,
            };
          default:
            return null;
        }

      case 'reviewFocus':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '리뷰 결과를 어떤 형식으로 받고 싶으신가요?',
          options: REVIEW_OUTPUT,
          questionId: 'reviewOutput',
          required: true,
        };
      case 'reviewOutput':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '마지막으로, 이 스킬의 이름을 지어주세요!',
          hint: '영문, 숫자, 하이픈(-)만 사용. 예: code-review',
          isTextInput: true,
          placeholder: 'code-review',
          questionId: 'skillName',
          required: true,
          maxLength: 50,
        };

      case 'commitConvention':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '커밋에 스코프를 포함하시나요?',
          hint: '예: feat(auth): 로그인 기능 추가',
          options: YES_NO,
          questionId: 'includeScope',
        };
      case 'includeScope':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '이슈 번호를 커밋에 연결하시나요?',
          hint: '예: feat: 로그인 기능 (#123)',
          options: YES_NO,
          questionId: 'includeIssue',
        };
      case 'includeIssue':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '커밋 본문(body)을 작성하시나요?',
          hint: '변경 이유나 상세 설명을 추가합니다.',
          options: YES_NO,
          questionId: 'includeBody',
        };
      case 'includeBody':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '스킬 이름을 지어주세요!',
          hint: '영문, 숫자, 하이픈(-)만 사용. 예: commit-message',
          isTextInput: true,
          placeholder: 'commit-message',
          questionId: 'skillName',
          required: true,
          maxLength: 50,
        };

      case 'testFramework':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '어떤 케이스들을 테스트에 포함해야 할까요?',
          options: TEST_CASES,
          multiSelect: true,
          questionId: 'testCases',
        };
      case 'testCases':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: 'Mock은 어떻게 사용하시나요?',
          options: [
            { label: '최소한만', value: 'minimal', icon: '🎯', description: '외부 의존성만 모킹' },
            { label: '적극적으로', value: 'full', icon: '🔒', description: '완전 격리된 단위 테스트' },
            { label: '상황에 따라', value: 'flexible', icon: '🔄', description: '유연하게 결정' },
          ],
          questionId: 'mockStrategy',
        };
      case 'mockStrategy':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '스킬 이름을 지어주세요!',
          hint: '영문, 숫자, 하이픈(-)만 사용. 예: test-writer',
          isTextInput: true,
          placeholder: 'test-writer',
          questionId: 'skillName',
          required: true,
          maxLength: 50,
        };

      case 'docTypes':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '문서 스타일은 어떻게 할까요?',
          options: DOC_STYLE,
          questionId: 'docStyle',
        };
      case 'docStyle':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '스킬 이름을 지어주세요!',
          hint: '영문, 숫자, 하이픈(-)만 사용. 예: docs-generator',
          isTextInput: true,
          placeholder: 'docs-generator',
          questionId: 'skillName',
          required: true,
          maxLength: 50,
        };

      case 'debugApproach':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '스킬 이름을 지어주세요!',
          hint: '영문, 숫자, 하이픈(-)만 사용. 예: bug-fixer',
          isTextInput: true,
          placeholder: 'bug-fixer',
          questionId: 'skillName',
          required: true,
          maxLength: 50,
        };

      case 'refactorScope':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '스킬 이름을 지어주세요!',
          hint: '영문, 숫자, 하이픈(-)만 사용. 예: refactoring',
          isTextInput: true,
          placeholder: 'refactoring',
          questionId: 'skillName',
          required: true,
          maxLength: 50,
        };

      case 'customDescription':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: 'AI가 어떤 단계로 작업을 수행해야 하나요?',
          hint: '번호를 매겨서 순서대로 작성하면 좋아요.',
          isTextInput: true,
          placeholder: '1. 코드를 분석합니다\n2. 문제점을 찾습니다\n3. 해결책을 제안합니다',
          questionId: 'customSteps',
          maxLength: 1000,
        };
      case 'customSteps':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '결과물은 어떤 형식으로 받고 싶으신가요?',
          isTextInput: true,
          placeholder: '마크다운 표 형식으로, 또는 체크리스트 형태로...',
          questionId: 'customOutput',
          maxLength: 500,
        };
      case 'customOutput':
        return {
          id: `q-${Date.now()}`,
          type: 'bot',
          content: '스킬 이름을 지어주세요!',
          hint: '영문, 숫자, 하이픈(-)만 사용. 예: my-skill',
          isTextInput: true,
          placeholder: 'my-skill',
          questionId: 'skillName',
          required: true,
          maxLength: 50,
        };

      case 'skillName':
        return null;

      default:
        return null;
    }
  }, []);

  // Finish wizard
  const finishWizard = useCallback(() => {
    setIsComplete(true);
    setShowPreview(true);
    clearDraft();
    setMessages(prev => [...prev, {
      id: `complete-${Date.now()}`,
      type: 'bot',
      content: '스킬이 완성되었습니다! 아래에서 복사하거나 다운로드하세요.',
    }]);
  }, []);

  // Generated skill
  const generatedSkill = useMemo(() => {
    if (!isComplete) return null;
    return generateSkillFromAnswers(answers, selectedPreviewPlatform);
  }, [isComplete, answers, selectedPreviewPlatform]);

  // Copy to clipboard with error handling
  const handleCopy = useCallback(async () => {
    if (!generatedSkill) return;

    try {
      await navigator.clipboard.writeText(generatedSkill.yaml);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = generatedSkill.yaml;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopyError(true);
        setTimeout(() => setCopyError(false), 2000);
      }
    }
  }, [generatedSkill]);

  // Download file
  const handleDownload = useCallback(() => {
    if (!generatedSkill) return;

    const fileNames: Record<Platform, string> = {
      claude: `${generatedSkill.name}.md`,
      cursor: '.cursorrules',
      codex: 'AGENTS.md',
      windsurf: '.windsurfrules',
    };

    const blob = new Blob([generatedSkill.yaml], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNames[selectedPreviewPlatform];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generatedSkill, selectedPreviewPlatform]);

  // Reset wizard
  const handleReset = useCallback(() => {
    setMessages([]);
    setAnswers([]);
    setTextInput('');
    setTextError(null);
    setIsComplete(false);
    setShowPreview(false);
    setSelectedMulti([]);
    clearDraft();

    setTimeout(() => {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: '어떤 작업을 자동화하고 싶으신가요?',
          hint: '반복적으로 하는 작업이나, 매번 같은 설명을 해야 하는 상황을 떠올려보세요.',
          options: USE_CASES,
          questionId: 'useCase',
          required: true,
        },
      ]);
    }, 100);
  }, []);

  // Current message for determining input type
  const lastBotMessage = useMemo(() => {
    return [...messages].reverse().find(m => m.type === 'bot');
  }, [messages]);

  // Draft restore UI
  if (showDraftRestore) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden shadow-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            작성하던 스킬이 있어요
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            이전에 작성하던 스킬을 이어서 만들까요?
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleDismissDraft}
              className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              새로 시작
            </button>
            <button
              onClick={handleRestoreDraft}
              className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              이어서 만들기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-neutral-700 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md"
              role="img"
              aria-label="스킬 생성기 아이콘"
            >
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">스킬 생성 가이드</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                질문에 답하면서 맞춤 스킬을 만들어보세요
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: platformInfo.color }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {platformInfo.name}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-2.5 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors border border-slate-200 dark:border-neutral-600 rounded-md hover:bg-slate-100 dark:hover:bg-neutral-700"
              aria-label="처음부터 다시 시작"
            >
              다시 시작
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 flex items-center gap-2" role="progressbar" aria-valuenow={progress.current} aria-valuemin={0} aria-valuemax={progress.total}>
          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <span className="text-xs text-neutral-500" aria-hidden="true">{progress.current}/{progress.total}</span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="h-[420px] overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-neutral-900/50"
        role="log"
        aria-label="대화 내역"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'bot' ? (
              <div className="max-w-[90%] space-y-3">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-200 dark:border-neutral-700">
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-line font-medium">
                    {message.content}
                  </p>
                  {message.hint && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      💡 {message.hint}
                    </p>
                  )}
                </div>

                {/* Single Select Options */}
                {message.options && !message.multiSelect && !isComplete && message === lastBotMessage && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="선택 옵션">
                    {message.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(message.questionId!, opt.value, `${opt.icon || ''} ${opt.label}`)}
                        className="group flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md transition-all text-left focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                      >
                        {opt.icon && <span className="text-xl flex-shrink-0" aria-hidden="true">{opt.icon}</span>}
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                            {opt.label}
                          </div>
                          {opt.description && (
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2">
                              {opt.description}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Multi Select Options */}
                {message.options && message.multiSelect && !isComplete && message === lastBotMessage && (
                  <div className="space-y-3" role="group" aria-label="복수 선택 옵션">
                    <div className="flex flex-wrap gap-2">
                      {message.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSelectedMulti(prev =>
                              prev.includes(opt.value)
                                ? prev.filter(v => v !== opt.value)
                                : [...prev, opt.value]
                            );
                          }}
                          className={`flex items-center gap-2 px-3 py-2 border rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                            selectedMulti.includes(opt.value)
                              ? 'bg-violet-100 dark:bg-violet-900/50 border-violet-400 dark:border-violet-600 shadow-sm'
                              : 'bg-white dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 hover:border-violet-300'
                          }`}
                          aria-pressed={selectedMulti.includes(opt.value)}
                        >
                          {opt.icon && <span className="text-lg" aria-hidden="true">{opt.icon}</span>}
                          <span className="text-sm font-medium">{opt.label}</span>
                          {selectedMulti.includes(opt.value) && (
                            <span className="text-violet-600 dark:text-violet-400 text-sm" aria-hidden="true">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {!message.required && (
                        <button
                          onClick={() => handleMultiSelectSkip(message.questionId!)}
                          className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                        >
                          건너뛰기
                        </button>
                      )}
                      <button
                        onClick={() => handleMultiSelectConfirm(message.questionId!)}
                        disabled={selectedMulti.length === 0 && message.required}
                        className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {selectedMulti.length > 0 ? `선택 완료 (${selectedMulti.length}개) →` : '선택해주세요'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Text Input */}
                {message.isTextInput && !isComplete && message === lastBotMessage && (
                  <div className="space-y-2">
                    {message.placeholder?.includes('\n') ? (
                      <textarea
                        value={textInput}
                        onChange={(e) => {
                          setTextInput(e.target.value);
                          setTextError(null);
                        }}
                        placeholder={message.placeholder}
                        rows={4}
                        maxLength={message.maxLength}
                        className={`w-full px-4 py-3 bg-white dark:bg-neutral-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none ${
                          textError ? 'border-red-400' : 'border-slate-200 dark:border-neutral-700'
                        }`}
                        aria-invalid={!!textError}
                        aria-describedby={textError ? 'text-error' : undefined}
                      />
                    ) : (
                      <input
                        ref={inputRef}
                        type="text"
                        value={textInput}
                        onChange={(e) => {
                          setTextInput(e.target.value);
                          setTextError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleTextSubmit();
                          }
                        }}
                        placeholder={message.placeholder}
                        maxLength={message.maxLength}
                        className={`w-full px-4 py-3 bg-white dark:bg-neutral-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          textError ? 'border-red-400' : 'border-slate-200 dark:border-neutral-700'
                        }`}
                        aria-invalid={!!textError}
                        aria-describedby={textError ? 'text-error' : undefined}
                      />
                    )}
                    {textError && (
                      <p id="text-error" className="text-xs text-red-500" role="alert">
                        ⚠️ {textError}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-400">
                        {message.maxLength && `${textInput.length}/${message.maxLength} | `}Enter로 제출
                      </span>
                      <button
                        onClick={handleTextSubmit}
                        disabled={!textInput.trim()}
                        className="px-5 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        계속 →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-[75%] bg-violet-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                <p className="text-sm">{message.content}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Preview Panel */}
      {isComplete && generatedSkill && showPreview && (
        <div className="border-t border-slate-200 dark:border-neutral-700">
          {/* Success Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
              <span className="text-xl" role="img" aria-label="완료">🎉</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-green-800 dark:text-green-200">
                &ldquo;{generatedSkill.name}&rdquo; 스킬 완성!
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">
                {generatedSkill.description}
              </div>
            </div>
          </div>

          {/* Platform Tabs */}
          <div className="flex border-b border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800/50" role="tablist" aria-label="플랫폼 선택">
            {(Object.keys(PLATFORMS) as Platform[]).map((p) => {
              const info = PLATFORMS[p];
              const isSelected = p === selectedPreviewPlatform;
              return (
                <button
                  key={p}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedPreviewPlatform(p)}
                  className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-b-2 border-violet-500'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  {info.name}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="px-4 py-3 bg-slate-100 dark:bg-neutral-800 border-b border-slate-200 dark:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <code className="text-xs font-mono text-violet-600 dark:text-violet-400 break-all">
              {selectedPreviewPlatform === 'claude' && `.claude/skills/${generatedSkill.name}/SKILL.md`}
              {selectedPreviewPlatform === 'cursor' && '.cursorrules'}
              {selectedPreviewPlatform === 'codex' && 'AGENTS.md'}
              {selectedPreviewPlatform === 'windsurf' && '.windsurfrules'}
            </code>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs font-medium bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                aria-label="파일 다운로드"
              >
                💾 다운로드
              </button>
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  copied
                    ? 'bg-green-600 text-white'
                    : copyError
                    ? 'bg-red-600 text-white'
                    : 'bg-violet-600 text-white hover:bg-violet-500'
                }`}
                aria-label="클립보드에 복사"
              >
                {copied ? '✓ 복사됨!' : copyError ? '✗ 복사 실패' : '📋 복사'}
              </button>
            </div>
          </div>

          {/* Code Preview */}
          <pre className="p-4 bg-slate-900 text-slate-100 text-sm font-mono overflow-x-auto max-h-64">
            <code>{generatedSkill.yaml}</code>
          </pre>

          {/* Usage Guide */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-t border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <span className="text-lg" aria-hidden="true">💡</span>
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-medium mb-1">사용 방법</p>
                <p className="text-amber-700 dark:text-amber-300 text-xs">
                  {selectedPreviewPlatform === 'claude' && (
                    <>프로젝트 폴더 내 <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">.claude/skills/{generatedSkill.name}/SKILL.md</code>로 저장하세요. Claude Code에서 <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">/{generatedSkill.name}</code>으로 실행할 수 있습니다.</>
                  )}
                  {selectedPreviewPlatform === 'cursor' && (
                    <>프로젝트 루트에 <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">.cursorrules</code> 파일로 저장하면 Cursor가 자동으로 인식합니다.</>
                  )}
                  {selectedPreviewPlatform === 'codex' && (
                    <>프로젝트 루트에 <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">AGENTS.md</code> 파일로 저장하면 Codex가 자동으로 인식합니다.</>
                  )}
                  {selectedPreviewPlatform === 'windsurf' && (
                    <>프로젝트 루트에 <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">.windsurfrules</code> 파일로 저장하면 Windsurf가 자동으로 인식합니다.</>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Start Over */}
          <div className="p-4 border-t border-slate-200 dark:border-neutral-700">
            <button
              onClick={handleReset}
              className="w-full py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              🔄 다른 스킬 만들기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalWizard;
