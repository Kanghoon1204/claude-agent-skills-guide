# SPEC: Claude Agent Skills Guide

> Spec-Driven Development Document
> Version: 1.0.0
> Last Updated: 2026-02-05

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Claude Agent Skills Guide |
| **유형** | 정적 클라이언트 사이드 교육용 문서 웹 앱 |
| **목적** | Anthropic 공식 가이드 기반의 Claude Agent 스킬 구축 완벽 교재 제공 |
| **주요 언어** | 한국어 (ko), 영어 (en) 구조 준비됨 |
| **백엔드** | 없음 (Pure SPA) |
| **배포 형태** | 정적 파일 호스팅 (HashRouter 기반) |

### 1.1 핵심 가치

- Anthropic 공식 "The Complete Guide to Building Skills for Claude" 문서를 한국어로 구조화하여 웹 기반으로 전달
- 코드 스킬과 비코드 스킬 모두를 아우르는 기초부터 배포까지의 완전한 학습 경로 제공
- 검색, 다크 모드, 코드 하이라이팅 등 문서 탐색 최적화 UX 제공

---

## 2. 기술 스택

### 2.1 런타임 & 프레임워크

| 기술 | 버전 | 역할 |
|------|------|------|
| React | ^19.1.1 | UI 프레임워크 |
| React DOM | ^19.1.1 | DOM 렌더링 |
| React Router DOM | ^7.8.2 | 클라이언트 사이드 라우팅 (HashRouter) |
| TypeScript | ~5.8.2 | 타입 안전성 |
| Vite | ^6.2.0 | 빌드 도구 & 개발 서버 |
| @vitejs/plugin-react | ^5.0.0 | React Fast Refresh |

### 2.2 스타일링

| 기술 | 적용 방식 | 설명 |
|------|-----------|------|
| Tailwind CSS | CDN (`cdn.tailwindcss.com`) | 유틸리티 퍼스트 CSS |
| Dark Mode | `class` 전략 | `document.documentElement`에 `dark` 클래스 토글 |
| Custom Animations | `index.html` 내 `<style>` | `fade-in`, `slide-up` 키프레임 |

### 2.3 빌드 설정

```
Target: ES2022
Module: ESNext
JSX: react-jsx
Strict Mode: true
Path Alias: @/* → ./*
Dev Server Port: 3000
Dev Server Host: 0.0.0.0
```

---

## 3. 디렉터리 구조

```
claude-agent-skills-guide/
├── index.html                 # HTML 엔트리포인트 (Tailwind CDN, 테마 초기화)
├── index.tsx                  # React 루트 렌더링
├── App.tsx                    # 라우팅 설정 (HashRouter)
├── package.json
├── tsconfig.json
├── vite.config.ts
│
├── components/                # 재사용 가능 UI 컴포넌트
│   ├── Layout.tsx             # 전체 레이아웃 셸
│   ├── TopBar.tsx             # 상단 네비게이션 바
│   ├── Sidebar.tsx            # 사이드바 네비게이션
│   ├── SearchModal.tsx        # 전문 검색 모달
│   ├── CodeBlock.tsx          # 코드 블록 (구문 강조 + 복사)
│   ├── InfoBox.tsx            # 정보 박스 (tip, warning, note 등)
│   ├── ComparisonTable.tsx    # 비교 테이블
│   └── icons/                 # SVG 아이콘 컴포넌트 (9개)
│       ├── BookIcon.tsx
│       ├── ChevronIcon.tsx
│       ├── ClipboardIcon.tsx
│       ├── ExternalLinkIcon.tsx
│       ├── GithubIcon.tsx
│       ├── MenuIcon.tsx
│       ├── MoonIcon.tsx
│       ├── SearchIcon.tsx
│       └── SunIcon.tsx
│
├── pages/                     # 페이지 컴포넌트
│   ├── HomePage.tsx           # 메인 랜딩 페이지
│   ├── SectionPage.tsx        # 동적 섹션 콘텐츠 페이지
│   └── NotFoundPage.tsx       # 404 페이지
│
├── context/                   # React Context 프로바이더
│   ├── ThemeContext.tsx        # 라이트/다크 테마 관리
│   └── LanguageContext.tsx     # 한/영 언어 관리
│
├── hooks/                     # 커스텀 훅
│   ├── useTheme.ts            # ThemeContext 소비 훅
│   └── useLanguage.ts         # LanguageContext 소비 훅
│
├── constants/                 # 상수 및 데이터
│   └── codeExamples.ts        # 코드 예제 데이터 (2,324줄)
│
├── i18n/                      # 국제화
│   └── translations.ts        # 번역 데이터 (1,133줄)
│
└── dist/                      # 빌드 출력
```

---

## 4. 라우팅 스펙

### 4.1 라우터 타입

- **HashRouter** 사용 (`react-router-dom`)
- URL 형식: `/#/home`, `/#/sections/what-are-skills`
- 서버 설정 없이 정적 호스팅 가능

### 4.2 라우트 테이블

| 경로 | 컴포넌트 | 동작 |
|------|----------|------|
| `/` | — | `/home`으로 리다이렉트 (`Navigate replace`) |
| `/home` | `HomePage` | 메인 랜딩 페이지 |
| `/sections/:id` | `SectionPage` | 동적 섹션 콘텐츠 렌더링 |
| `*` | `NotFoundPage` | 404 폴백 |

### 4.3 경로 변환 규칙

`pathToKey()` 함수로 URL kebab-case를 camelCase 키로 변환:

```
/sections/what-are-skills  →  whatAreSkills
/sections/core-design-principles  →  coreDesignPrinciples
/sections/mcp-and-skills  →  mcpAndSkills
```

### 4.4 레이아웃 구조

```
<ThemeProvider>
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>     ← 공통 레이아웃 셸
        <Route index />                          ← 리다이렉트
        <Route path="home" />                    ← 홈
        <Route path="sections/:id" />            ← 섹션
        <Route path="*" />                       ← 404
      </Route>
    </Routes>
  </HashRouter>
</ThemeProvider>
```

---

## 5. 콘텐츠 구조 스펙

### 5.1 카테고리 & 섹션 매핑

총 **8개 카테고리**, **28개 섹션**:

| # | 카테고리 키 | 한글명 | 섹션 수 |
|---|------------|--------|---------|
| — | `introduction` | 소개 | 3 |
| 1 | `fundamentals` | 제1장: 기초 | 3 |
| 2 | `planningAndDesign` | 제2장: 설계와 기획 | 5 |
| 3 | `testingAndIteration` | 제3장: 테스트와 반복 | 4 |
| 4 | `distributionAndSharing` | 제4장: 배포와 공유 | 5 |
| 5 | `patternsAndTroubleshooting` | 제5장: 패턴과 문제 해결 | 2 |
| 6 | `resourcesAndReferences` | 제6장: 리소스와 참고자료 | 3 |
| — | `appendices` | 부록 | 3 |

### 5.2 섹션 데이터 모델

```typescript
interface SectionContent {
  title: string;
  body?: string;                          // '\n\n'으로 문단 분리
  subsections?: Subsection[];
  items?: (string | ItemWithMeta)[];
  highlights?: string[];
  comparison?: ComparisonData;
  tip?: string;
  warning?: string;
  note?: string;
  checklist?: string[];
}

interface Subsection {
  title: string;
  body?: string;
  items?: (string | ItemWithMeta)[];
  comparison?: ComparisonData;
  tip?: string;
  warning?: string;
  note?: string;
  good?: string;
  bad?: string;
}

interface ItemWithMeta {
  label: string;
  desc?: string;
  url?: string;
}

interface ComparisonData {
  headers: string[];
  rows: string[][];
}
```

### 5.3 코드 예제 데이터 모델

```typescript
interface CodeExample {
  title: string;        // 영문 제목
  titleKo: string;      // 한글 제목
  language: 'yaml' | 'markdown' | 'bash' | 'python' | 'text';
  code: string;
}

// 섹션 키 → 코드 예제 배열
type CodeExamplesMap = Record<string, CodeExample[]>;
```

### 5.4 네비게이션 데이터 모델

```typescript
interface NavItem {
  key: string;     // camelCase 섹션 키 (예: 'whatAreSkills')
  path: string;    // URL 경로 (예: '/sections/what-are-skills')
}

interface NavCategory {
  key: string;         // 카테고리 키 (예: 'introduction')
  items: NavItem[];    // 해당 카테고리의 섹션 목록
}

// 전역 네비게이션 데이터
const NAV_DATA: NavCategory[];
```

### 5.5 챕터 색상 시스템

```typescript
interface ChapterColor {
  bg: string;        // 라이트 배경 (예: 'bg-orange-50')
  text: string;      // 라이트 텍스트 (예: 'text-orange-700')
  darkBg: string;    // 다크 배경 (예: 'dark:bg-orange-950/30')
  darkText: string;  // 다크 텍스트 (예: 'dark:text-orange-300')
  accent: string;    // 액센트 색상 (예: 'bg-orange-600')
}

const CHAPTER_COLORS: Record<string, ChapterColor> = {
  introduction:                // Orange
  fundamentals:                // Green
  planningAndDesign:           // Pink
  testingAndIteration:         // Violet
  distributionAndSharing:      // Blue
  patternsAndTroubleshooting:  // Teal
  resourcesAndReferences:      // Amber
  appendices:                  // Neutral
};
```

---

## 6. 컴포넌트 스펙

### 6.1 Layout (`components/Layout.tsx`)

**역할**: 전체 앱의 레이아웃 셸

| Props | 없음 (라우터 Outlet 사용) |
|-------|--------------------------|
| **상태** | `sidebarOpen: boolean`, `searchOpen: boolean` |
| **키보드 단축키** | `Cmd/Ctrl + K` → 검색 모달 토글 |

**렌더링 구조**:
```
<div flex h-screen>
  <Sidebar />
  <div flex-col flex-1>
    <TopBar />
    <main>
      <Outlet />   ← 페이지 컴포넌트 렌더링 위치
    </main>
  </div>
  <SearchModal />
</div>
```

### 6.2 TopBar (`components/TopBar.tsx`)

**역할**: 상단 고정 네비게이션 바

| Props | 타입 | 설명 |
|-------|------|------|
| `onMenuClick` | `() => void` | 사이드바 토글 콜백 |
| `onSearchClick` | `() => void` | 검색 모달 오픈 콜백 |

**포함 요소**:
- 햄버거 메뉴 버튼 (모바일 전용)
- 사이트 로고 & 제목
- 검색 입력 바 (`Cmd+K` 표시)
- 테마 토글 (Sun/Moon 아이콘)
- GitHub 외부 링크

### 6.3 Sidebar (`components/Sidebar.tsx`)

**역할**: 좌측 계층형 네비게이션

| Props | 타입 | 설명 |
|-------|------|------|
| `isOpen` | `boolean` | 사이드바 표시 여부 (모바일) |
| `onClose` | `() => void` | 사이드바 닫기 콜백 |

**동작 스펙**:
- 카테고리별 펼침/접힘 토글 (ChevronIcon 회전)
- 챕터 번호 뱃지 표시 (`Ch.1`, `Ch.2`, ...)
- 현재 활성 섹션 하이라이팅 (챕터 색상 적용)
- 모바일: 오버레이로 표시, 외부 클릭 시 닫힘
- 데스크탑: 항상 표시 (`md:` 브레이크포인트)

### 6.4 SearchModal (`components/SearchModal.tsx`)

**역할**: 전문 검색 모달

| Props | 타입 | 설명 |
|-------|------|------|
| `isOpen` | `boolean` | 모달 표시 여부 |
| `onClose` | `() => void` | 모달 닫기 콜백 |

**검색 범위**:
1. 섹션 제목 (`translations.sections[key]`)
2. 본문 텍스트 (`content.body`)
3. 서브섹션 제목 (`subsection.title`)
4. 서브섹션 본문 (`subsection.body`)
5. 아이템 텍스트 (`content.items`)

**검색 결과 데이터**:
```typescript
interface SearchResult {
  key: string;              // 섹션 키
  path: string;             // URL 경로
  sectionTitle: string;     // 섹션 제목
  categoryKey: string;      // 카테고리 키
  categoryLabel: string;    // 카테고리 라벨
  matchContext?: string;    // 매치 컨텍스트 (±20~40자)
}
```

**키보드 인터랙션**:
| 키 | 동작 |
|----|------|
| `↑` / `↓` | 결과 목록 탐색 |
| `Enter` | 선택된 결과로 이동 |
| `Escape` | 모달 닫기 |
| `Cmd/Ctrl + K` | 모달 토글 |

**UI 구성**:
- 백드롭: `bg-black/50 backdrop-blur-sm`
- 검색 입력: 상단 고정, SearchIcon + ESC kbd
- 결과 목록: 최대 높이 320px 스크롤, 카테고리 색상 뱃지 표시
- 푸터: 키보드 단축키 안내 (`↑↓ 이동`, `Enter 선택`, `ESC 닫기`)

### 6.5 CodeBlock (`components/CodeBlock.tsx`)

**역할**: 코드 블록 렌더링 (구문 강조 + 클립보드 복사)

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `code` | `string` | — | 코드 문자열 |
| `language` | `string` | `'text'` | 언어 (`yaml`, `markdown`, `bash`, `python`, `text`) |
| `title` | `string?` | — | 코드 블록 제목 |

**구문 강조 규칙**:

| 언어 | 하이라이팅 패턴 |
|------|-----------------|
| **YAML** | 주석(`#`) → gray, 구분자(`---`) → yellow, 키 → sky, 값 → green, 리스트(`-`) → orange |
| **Markdown** | 헤딩(`#`) → sky bold, 코드펜스(`` ``` ``) → green, 리스트(`-`) → orange, 숫자 리스트 → violet |
| **Bash** | 주석(`#`) → gray, 환경변수/export → green, 명령어 → sky |
| **Python/Text** | 하이라이팅 없음 |

**클립보드 동작**:
- `navigator.clipboard.writeText()` 사용
- 복사 후 "Copied!" 텍스트 2초 표시 후 아이콘 복원

### 6.6 InfoBox (`components/InfoBox.tsx`)

**역할**: 타입별 정보 박스

| Props | 타입 | 설명 |
|-------|------|------|
| `type` | `'tip' \| 'warning' \| 'note' \| 'example' \| 'good' \| 'bad'` | 박스 유형 |
| `title` | `string?` | 제목 (선택) |
| `children` | `ReactNode` | 내용 |

**타입별 스타일 매핑**:

| 타입 | 아이콘 | 색상 계열 | 기본 제목 |
|------|--------|-----------|-----------|
| `tip` | 💡 | Emerald | 팁 |
| `warning` | ⚠️ | Amber | 주의 |
| `note` | ℹ️ | Blue | 참고 |
| `example` | 📋 | Violet | 예제 |
| `good` | ✅ | Green | 좋은 예 |
| `bad` | ❌ | Red | 나쁜 예 |

공통: `border-l-4`, `rounded-xl`, 다크 모드 대응

### 6.7 ComparisonTable (`components/ComparisonTable.tsx`)

**역할**: 비교 테이블 렌더링

| Props | 타입 | 설명 |
|-------|------|------|
| `headers` | `string[]` | 테이블 헤더 |
| `rows` | `string[][]` | 테이블 데이터 행 |

---

## 7. 페이지 스펙

### 7.1 HomePage (`pages/HomePage.tsx`)

**URL**: `/#/home`

**섹션 구성** (위에서 아래로):

1. **Hero 섹션**
   - 뱃지: "6개 챕터 + 3개 부록"
   - 제목: "Claude 에이전트 스킬 가이드"
   - 설명: 가이드 소개 텍스트

2. **스킬이란? 카드**
   - 스킬 개념 설명
   - 3개 활용 예시 그리드 (디자인 생성, 리서치, 오케스트레이션)

3. **핵심 설계 원칙 그리드** (3열)
   - Progressive Disclosure (Green)
   - Composability (Violet)
   - Portability (Blue)

4. **챕터 구성 그리드** (2열)
   - 8개 카테고리 카드 (챕터 색상 적용)
   - 각 카드: 챕터명, 설명, 섹션 수
   - 클릭 시 해당 챕터 첫 번째 섹션으로 이동

5. **외부 리소스** (2열)
   - 공식 스킬 문서 (`docs.anthropic.com`)
   - GitHub 스킬 저장소 (`github.com/anthropics/skills`)
   - Anthropic 엔지니어링 블로그 (`anthropic.com/engineering`)
   - Claude Code 문서 (`docs.anthropic.com`)

6. **푸터**
   - 출처 표기

### 7.2 SectionPage (`pages/SectionPage.tsx`)

**URL**: `/#/sections/:id`

**동작**:
1. URL 파라미터 `id`를 `pathToKey()`로 변환하여 섹션 키 획득
2. `findCategoryForSection()`으로 카테고리 판별 → 색상 스키마 결정
3. `translations.content[sectionKey]`에서 콘텐츠 로드
4. `CODE_EXAMPLES[sectionKey]`에서 코드 예제 로드
5. 페이지 진입 시 스크롤 위치 초기화 (`scrollTo top smooth`)

**렌더링 순서**:
```
1. 카테고리 뱃지 (챕터 색상)
2. 제목 (h1)
3. 본문 (body → '\n\n' 분리 → <p> 태그)
4. 서브섹션 반복 렌더링:
   a. 서브섹션 제목 (h2, border-bottom)
   b. 서브섹션 본문
   c. 아이템 리스트 (bullet, 링크 지원)
   d. InfoBox (tip, warning, note, good, bad)
   e. ComparisonTable
5. 아이템 리스트 (서브섹션 없을 때)
6. 하이라이트 (핵심 포인트 InfoBox)
7. 비교 테이블
8. 전역 InfoBox (tip, warning, note)
9. 체크리스트 (체크박스 인터랙션)
10. 코드 예제 (CodeBlock 컴포넌트)
11. 이전/다음 네비게이션 (border-top 구분)
```

**콘텐츠 부재 시**:
- "콘텐츠 준비 중" 메시지 + 홈 링크 버튼

### 7.3 NotFoundPage (`pages/NotFoundPage.tsx`)

**URL**: `/#/*` (매칭되지 않는 모든 경로)

- 404 에러 표시
- 홈으로 이동 링크

---

## 8. 상태 관리 스펙

### 8.1 ThemeContext

```typescript
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

**초기화 우선순위**:
1. `localStorage.getItem('theme')` → `'light'` 또는 `'dark'`
2. `window.matchMedia('(prefers-color-scheme: dark)').matches` → 시스템 설정
3. 폴백: `'light'`

**사이드 이펙트**:
- `theme` 변경 시 `document.documentElement.classList`에 `dark` 추가/제거
- `localStorage.setItem('theme', theme)` 호출

**FOUC 방지**: `index.html` 내 인라인 스크립트로 초기 테마 클래스 즉시 적용

### 8.2 LanguageContext

```typescript
type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}
```

**초기화 우선순위**:
1. `localStorage.getItem('language')` → `'ko'` 또는 `'en'`
2. `navigator.language.startsWith('ko')` → 브라우저 언어
3. 폴백: `'en'`

**사이드 이펙트**:
- `document.documentElement.lang` 속성 업데이트
- `localStorage.setItem('language', lang)` 호출

**현재 상태**: 한국어 콘텐츠만 완전 구현됨. 영어 콘텐츠는 구조만 존재.

### 8.3 로컬 상태

| 컴포넌트 | 상태 | 타입 | 설명 |
|----------|------|------|------|
| Layout | `sidebarOpen` | `boolean` | 사이드바 표시 여부 |
| Layout | `searchOpen` | `boolean` | 검색 모달 표시 여부 |
| SearchModal | `query` | `string` | 검색어 |
| SearchModal | `results` | `SearchResult[]` | 검색 결과 |
| SearchModal | `selectedIndex` | `number` | 현재 선택된 결과 인덱스 |
| CodeBlock | `copied` | `boolean` | 복사 완료 상태 (2초 타이머) |
| Sidebar | `expanded` | `Record<string, boolean>` | 카테고리별 펼침 상태 |

---

## 9. 유틸리티 함수 스펙

### 9.1 `getAllSections(): NavItem[]`

모든 카테고리의 섹션을 순서대로 평탄화하여 반환. 이전/다음 네비게이션에 사용.

### 9.2 `findCategoryForSection(sectionKey: string): string | undefined`

섹션 키가 속한 카테고리 키를 반환. 색상 스키마 결정에 사용.

### 9.3 `pathToKey(path: string): string`

URL 경로를 camelCase 섹션 키로 변환:
- `/sections/` 접두사 제거
- kebab-case → camelCase 변환
- 예: `what-are-skills` → `whatAreSkills`

---

## 10. UI/UX 스펙

### 10.1 반응형 브레이크포인트

| 구간 | 사이드바 | 상단 바 | 콘텐츠 |
|------|---------|---------|--------|
| 모바일 (`< md`) | 오버레이 (토글) | 햄버거 메뉴 표시 | 풀 너비 |
| 데스크탑 (`≥ md`) | 항상 표시 | 햄버거 메뉴 숨김 | 사이드바 제외 영역 |

### 10.2 키보드 단축키

| 단축키 | 동작 | 범위 |
|--------|------|------|
| `Cmd/Ctrl + K` | 검색 모달 토글 | 전역 |
| `↑` / `↓` | 검색 결과 탐색 | 검색 모달 내 |
| `Enter` | 선택된 결과로 이동 | 검색 모달 내 |
| `Escape` | 검색 모달 닫기 | 검색 모달 내 |

### 10.3 애니메이션

| 이름 | 적용 대상 | 동작 |
|------|----------|------|
| `animate-fade-in` | SectionPage, CodeBlock | opacity 0→1 + translateY 8px→0, 0.3s ease-out |
| `animate-slide-up` | HomePage | opacity 0→1 + translateY 16px→0, 0.4s ease-out |

### 10.4 다크 모드 대응

모든 컴포넌트에 `dark:` 접두사 Tailwind 클래스 쌍으로 대응:

| 요소 | 라이트 | 다크 |
|------|--------|------|
| 배경 (앱) | `bg-slate-50` | `bg-neutral-900` |
| 텍스트 (주) | `text-neutral-800` | `text-neutral-200` |
| 카드 배경 | `bg-white` | `bg-neutral-800` |
| 테두리 | `border-neutral-200` | `border-neutral-700` |
| 코드 배경 | `bg-neutral-900` | `bg-neutral-950` |

### 10.5 스크롤바 커스터마이징

- 너비: 6px
- 트랙: 투명
- 썸: 라이트 `#a1a1aa`, 다크 `#52525b`
- 모서리: 3px 라운드

### 10.6 접근성

| 항목 | 구현 |
|------|------|
| ARIA 라벨 | 버튼에 `aria-label` 속성 |
| 시맨틱 HTML | `<main>`, `<nav>`, `<button>`, `<ul>`, `<li>` |
| 키보드 네비게이션 | 검색 모달 내 방향키 + Enter |
| 다크 모드 | 고대비 색상 조합 |
| 포커스 관리 | 검색 모달 오픈 시 입력 필드 자동 포커스 |

---

## 11. 빌드 & 배포 스펙

### 11.1 NPM 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | Vite 개발 서버 (포트 3000, HMR 활성) |
| `npm run build` | 프로덕션 빌드 → `dist/` 출력 |
| `npm run preview` | 프로덕션 빌드 프리뷰 |

### 11.2 빌드 출력

```
dist/
├── index.html
└── assets/
    └── index-[hash].js
```

- Vite 번들링 + 트리 셰이킹
- 에셋 해시를 통한 캐시 버스팅
- HashRouter로 서버 설정 불필요

### 11.3 배포 호환성

HashRouter 사용으로 다음 환경에서 추가 설정 없이 배포 가능:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- 기타 정적 파일 서버

---

## 12. 외부 의존성

### 12.1 CDN 의존성

| 리소스 | URL | 용도 |
|--------|-----|------|
| Tailwind CSS | `https://cdn.tailwindcss.com` | 유틸리티 CSS 프레임워크 |

### 12.2 외부 링크 (콘텐츠 내)

| 라벨 | URL |
|------|-----|
| 공식 스킬 문서 | `https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview` |
| GitHub 스킬 저장소 | `https://github.com/anthropics/skills` |
| Anthropic 엔지니어링 블로그 | `https://www.anthropic.com/engineering` |
| Claude Code 문서 | `https://docs.anthropic.com/en/docs/claude-code` |

---

## 13. 제약 사항 & 기술 부채

### 13.1 현재 제약 사항

| 항목 | 상태 | 설명 |
|------|------|------|
| 영어 콘텐츠 | 미구현 | `LanguageContext` 구조만 존재, 실제 영어 번역 미완성 |
| Tailwind 번들링 | CDN 의존 | 프로덕션에서 CDN 의존, 빌드 타임 번들링 미적용 |
| 검색 | 클라이언트 전문 검색 | 퍼지 검색, 가중치 검색 미지원 (단순 `includes` 매칭) |
| 체크리스트 | 비영속 | 체크박스 상태가 페이지 이동 시 초기화 |
| 콘텐츠 관리 | 하드코딩 | `translations.ts`에 직접 작성, CMS 미연동 |
| 코드 하이라이팅 | 커스텀 구현 | Prism.js, highlight.js 등 전문 라이브러리 미사용 |
| SSR/SEO | 미지원 | CSR 전용, HashRouter로 SEO 제한 |
| 테스트 | 미작성 | 유닛/통합/E2E 테스트 없음 |

### 13.2 향후 개선 가능 영역

- 영어 콘텐츠 완성 및 다국어 전환 UI 추가
- Tailwind CSS를 PostCSS 빌드 파이프라인으로 전환 (트리 셰이킹)
- 검색에 퍼지 매칭 (fuse.js 등) 도입
- 체크리스트 상태 `localStorage` 영속화
- 코드 하이라이팅에 Shiki 또는 Prism.js 도입
- Vitest + React Testing Library로 테스트 추가
- 콘텐츠를 MDX 또는 외부 JSON으로 분리

---

## 14. 아이콘 컴포넌트 인벤토리

| 컴포넌트 | 파일 | 용도 |
|----------|------|------|
| `BookIcon` | `icons/BookIcon.tsx` | 네비게이션 |
| `ChevronIcon` | `icons/ChevronIcon.tsx` | 사이드바 펼침/접힘 |
| `ClipboardIcon` | `icons/ClipboardIcon.tsx` | 코드 복사 |
| `ExternalLinkIcon` | `icons/ExternalLinkIcon.tsx` | 외부 링크 표시 |
| `GithubIcon` | `icons/GithubIcon.tsx` | GitHub 링크 |
| `MenuIcon` | `icons/MenuIcon.tsx` | 모바일 메뉴 |
| `MoonIcon` | `icons/MoonIcon.tsx` | 다크 모드 토글 |
| `SearchIcon` | `icons/SearchIcon.tsx` | 검색 |
| `SunIcon` | `icons/SunIcon.tsx` | 라이트 모드 토글 |

모든 아이콘은 SVG 기반 React FC 컴포넌트로, `className` props를 통해 크기/색상 커스터마이징 가능.

---

## 15. 보안 고려사항

| 영역 | 대응 |
|------|------|
| XSS | 외부 링크에 `rel="noopener noreferrer"` 적용, 사용자 입력 없음 |
| 의존성 | 최소 의존성 (React, React Router만), 공급망 위험 낮음 |
| 데이터 | 민감 데이터 없음, 모든 콘텐츠 공개 |
| localStorage | 테마, 언어 설정만 저장, 민감 정보 미포함 |
| 외부 리소스 | Tailwind CDN만 사용, HTTPS 강제 |
