# SPEC: Claude Agent Skills Guide

> Spec-Driven Development Document
> Version: 2.0.0
> Last Updated: 2026-02-10

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Claude Agent Skills Guide |
| **유형** | 정적 클라이언트 사이드 교육용 문서 웹 앱 |
| **목적** | Anthropic 공식 가이드 기반의 Claude Agent 스킬 구축 완벽 교재 제공 |
| **주요 언어** | 한국어 (ko) |
| **백엔드** | 없음 (Pure SPA) |
| **배포** | Vercel (https://claude-agent-skills-guide.vercel.app) |
| **저장소** | GitHub (https://github.com/Kanghoon1204/claude-agent-skills-guide) |

### 1.1 핵심 가치

- Anthropic 공식 "The Complete Guide to Building Skills for Claude" (2026.01) 문서를 한국어로 구조화
- 코드 스킬과 비코드 스킬 모두를 아우르는 기초부터 배포까지의 완전한 학습 경로 제공
- 학습 목표, Mermaid 다이어그램, 인라인 일러스트레이션을 통한 시각적 학습 지원
- 검색, 다크 모드, 목차, 읽기 진행률 등 문서 탐색 최적화 UX 제공

### 1.2 v2.0.0 주요 변경사항

| 기능 | 설명 |
|------|------|
| **학습 목표** | 각 섹션 상단에 3개의 학습 목표 표시 |
| **Mermaid 다이어그램** | 90개 이상의 시각적 다이어그램 지원 |
| **인라인 일러스트** | 4개의 핵심 개념 SVG 일러스트 |
| **챕터/섹션 일러스트** | 8개 챕터 + 25개 섹션 일러스트 |
| **블록 기반 콘텐츠** | paragraph, diagram, items, tip, warning, note, code, comparison, image 지원 |
| **브레드크럼 내비게이션** | 현재 위치 표시 및 빠른 이동 |
| **목차 (TOC)** | 긴 섹션의 빠른 탐색 지원 |
| **읽기 진행률** | 상단 프로그레스 바 |
| **스크롤 복원** | 페이지 전환 시 자동 스크롤 초기화 |
| **오디오 플레이어** | NotebookLM 음성 해설 지원 (구조 준비) |

---

## 2. 기술 스택

### 2.1 런타임 & 프레임워크

| 기술 | 버전 | 역할 |
|------|------|------|
| React | ^19.1.1 | UI 프레임워크 |
| React DOM | ^19.1.1 | DOM 렌더링 |
| React Router DOM | ^7.8.2 | 클라이언트 사이드 라우팅 (HashRouter) |
| TypeScript | ~5.8.2 | 타입 안전성 |
| Vite | ^6.4.1 | 빌드 도구 & 개발 서버 |
| Mermaid | ^11.x | 다이어그램 렌더링 |

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
```

---

## 3. 디렉터리 구조

```
claude-agent-skills-guide/
├── index.html                 # HTML 엔트리포인트
├── index.tsx                  # React 루트 렌더링
├── App.tsx                    # 라우팅 설정 (HashRouter + ScrollToTop)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── SPEC.md                    # 이 문서
│
├── components/                # 재사용 가능 UI 컴포넌트
│   ├── Layout.tsx             # 전체 레이아웃 셸
│   ├── TopBar.tsx             # 상단 네비게이션 바
│   ├── Sidebar.tsx            # 사이드바 네비게이션
│   ├── SearchModal.tsx        # 전문 검색 모달
│   ├── Breadcrumb.tsx         # 브레드크럼 내비게이션 [NEW]
│   ├── ScrollToTop.tsx        # 페이지 전환 시 스크롤 초기화 [NEW]
│   ├── TableOfContents.tsx    # 목차 컴포넌트 [NEW]
│   ├── ReadingProgress.tsx    # 읽기 진행률 표시 [NEW]
│   ├── AudioPlayer.tsx        # 음성 해설 플레이어 [NEW]
│   ├── MermaidDiagram.tsx     # Mermaid 다이어그램 렌더러 [NEW]
│   ├── ChapterIllustration.tsx # 챕터 일러스트 [NEW]
│   ├── ChapterCard.tsx        # 홈페이지 챕터 카드 [NEW]
│   ├── HeroSection.tsx        # 홈페이지 히어로 섹션 [NEW]
│   ├── CodeBlock.tsx          # 코드 블록 (구문 강조 + 복사 + 접기/펼치기)
│   ├── InfoBox.tsx            # 정보 박스 (tip, warning, note 등)
│   ├── ComparisonTable.tsx    # 비교 테이블
│   ├── Checklist.tsx          # 체크리스트 컴포넌트
│   │
│   ├── illustrations/         # SVG 일러스트레이션 [NEW]
│   │   ├── ChapterIllustrations.tsx   # 8개 챕터 일러스트
│   │   └── SectionIllustrations.tsx   # 25개 섹션 일러스트
│   │
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
│   ├── HomePage.tsx           # 메인 랜딩 페이지 (리팩토링됨)
│   ├── SectionPage.tsx        # 동적 섹션 콘텐츠 페이지 (블록 기반)
│   └── NotFoundPage.tsx       # 404 페이지
│
├── context/                   # React Context 프로바이더
│   └── ThemeContext.tsx       # 라이트/다크 테마 관리
│
├── hooks/                     # 커스텀 훅
│   └── useTheme.ts            # ThemeContext 소비 훅
│
├── constants/                 # 상수 및 데이터
│   ├── index.ts               # NAV_DATA, CHAPTER_COLORS, 유틸리티 함수
│   ├── codeExamples.ts        # 코드 예제 데이터
│   ├── diagrams.ts            # Mermaid 다이어그램 정의 [NEW]
│   └── audioTranscripts.ts    # 음성 해설 스크립트 [NEW]
│
├── i18n/                      # 국제화
│   └── translations.ts        # 콘텐츠 데이터 (287KB)
│
├── public/                    # 정적 자산
│   └── images/
│       ├── chapters/          # 챕터 일러스트 PNG
│       └── inline/            # 인라인 SVG 일러스트 [NEW]
│           ├── progressive-disclosure.svg
│           ├── skill-ecosystem.svg
│           ├── testing-flow.svg
│           └── distribution-network.svg
│
└── dist/                      # 빌드 출력
```

---

## 4. 콘텐츠 구조 스펙

### 4.1 카테고리 & 섹션 매핑

총 **8개 카테고리**, **28개 섹션**:

| # | 카테고리 키 | 한글명 | 섹션 수 | 색상 |
|---|------------|--------|---------|------|
| — | `introduction` | 소개 | 3 | Orange |
| 1 | `fundamentals` | 제1장: 기초 | 3 | Green |
| 2 | `planningAndDesign` | 제2장: 설계와 기획 | 5 | Pink |
| 3 | `testingAndIteration` | 제3장: 테스트와 반복 | 4 | Violet |
| 4 | `distributionAndSharing` | 제4장: 배포와 공유 | 5 | Blue |
| 5 | `patternsAndTroubleshooting` | 제5장: 패턴과 문제 해결 | 2 | Teal |
| 6 | `resourcesAndReferences` | 제6장: 리소스와 참고자료 | 3 | Amber |
| — | `appendices` | 부록 | 3 | Neutral |

### 4.2 섹션 데이터 모델 (v2.0)

```typescript
interface SectionContent {
  title: string;
  learningObjectives?: string[];      // [NEW] 학습 목표 (3개)
  body?: string;                      // 레거시: '\n\n'으로 문단 분리
  blocks?: ContentBlock[];            // [NEW] 블록 기반 콘텐츠
  subsections?: Subsection[];
  items?: (string | ItemWithMeta)[];
  highlights?: string[];
  comparison?: ComparisonData;
  tip?: string;
  warning?: string;
  note?: string;
  checklist?: string[];
}

// [NEW] 블록 기반 콘텐츠 구조
interface ContentBlock {
  type: 'paragraph' | 'diagram' | 'items' | 'tip' | 'warning' |
        'note' | 'good' | 'bad' | 'code' | 'comparison' | 'image';
  content?: string;           // paragraph, tip, warning, note, good, bad
  diagramId?: string;         // diagram 타입용
  codeId?: string;            // code 타입용
  items?: any[];              // items 타입용
  data?: ComparisonData;      // comparison 타입용
  src?: string;               // image 타입용
  alt?: string;               // image 타입용
  caption?: string;           // image, diagram 타입용
}

interface Subsection {
  title: string;
  body?: string;
  blocks?: ContentBlock[];    // [NEW] 서브섹션도 블록 지원
  items?: (string | ItemWithMeta)[];
  comparison?: ComparisonData;
  tip?: string;
  warning?: string;
  note?: string;
  good?: string;
  bad?: string;
  subsections?: Subsection[]; // 중첩 서브섹션
}
```

### 4.3 다이어그램 데이터 모델

```typescript
interface DiagramDefinition {
  id: string;                 // 고유 ID (블록에서 참조)
  type: string;               // 'flowchart', 'sequence', 'class' 등
  titleKo: string;            // 한글 제목
  definition: string;         // Mermaid 문법 정의
  caption?: string;           // 캡션 (선택)
}

// 섹션 키 → 다이어그램 배열
type DiagramsMap = Record<string, DiagramDefinition[]>;
```

### 4.4 학습 목표 구조

각 섹션에 3개의 학습 목표가 포함됩니다:

```typescript
learningObjectives: [
  '스킬의 정의와 핵심 개념을 이해합니다',
  '스킬과 일반 프롬프트의 차이점을 구분할 수 있습니다',
  '스킬 도입의 정량적 효과를 파악합니다',
],
```

---

## 5. 컴포넌트 스펙

### 5.1 Layout (`components/Layout.tsx`)

**역할**: 전체 앱의 레이아웃 셸

| 상태 | 타입 | 설명 |
|------|------|------|
| `sidebarOpen` | `boolean` | 사이드바 표시 여부 |
| `searchOpen` | `boolean` | 검색 모달 표시 여부 |

**렌더링 구조**:
```
<div flex h-screen>
  <ReadingProgress />
  <Sidebar />
  <div flex-col flex-1>
    <TopBar />
    <main id="main-content" overflow-y-auto>
      <Outlet />
    </main>
  </div>
  <SearchModal />
</div>
```

### 5.2 ScrollToTop (`components/ScrollToTop.tsx`) [NEW]

**역할**: 페이지 전환 시 스크롤 위치 초기화

```typescript
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [location.pathname, location.key]);

  return null;
};
```

### 5.3 MermaidDiagram (`components/MermaidDiagram.tsx`) [NEW]

**역할**: Mermaid 다이어그램 렌더링

| Props | 타입 | 설명 |
|-------|------|------|
| `definition` | `string` | Mermaid 문법 정의 |
| `title` | `string?` | 다이어그램 제목 |
| `caption` | `string?` | 캡션 |
| `diagramType` | `string?` | 다이어그램 유형 표시 |

**기능**:
- 다크모드 자동 대응 (테마 변수 적용)
- 확대 모달 지원
- 로딩 스켈레톤
- 에러 핸들링

### 5.4 Breadcrumb (`components/Breadcrumb.tsx`) [NEW]

**역할**: 현재 위치 표시 및 상위 내비게이션

```typescript
interface BreadcrumbItem {
  label: string;
  path?: string;
}
```

### 5.5 TableOfContents (`components/TableOfContents.tsx`) [NEW]

**역할**: 섹션 내 서브섹션 목차

- 3개 이상의 서브섹션이 있을 때만 표시
- 현재 보고 있는 서브섹션 하이라이트
- 클릭 시 해당 위치로 스크롤

### 5.6 CodeBlock (`components/CodeBlock.tsx`)

**역할**: 코드 블록 렌더링

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `code` | `string` | — | 코드 문자열 |
| `language` | `string` | `'text'` | 언어 |
| `title` | `string?` | — | 제목 |
| `defaultCollapsed` | `boolean` | `true` | 기본 접힘 상태 |
| `collapsedLines` | `number` | `6` | 접힌 상태에서 표시할 줄 수 |

**v2.0 변경사항**:
- 코드 접기/펼치기 기능 추가
- 펼치기 버튼 스타일 개선 (밝은 배경 + 눈에 띄는 색상)

### 5.7 AudioPlayer (`components/AudioPlayer.tsx`) [NEW]

**역할**: NotebookLM 음성 해설 재생

| Props | 타입 | 설명 |
|-------|------|------|
| `src` | `string?` | 오디오 파일 경로 |
| `title` | `string` | 제목 |
| `chapter` | `string?` | 챕터 키 (색상용) |
| `sectionKey` | `string` | 섹션 키 |
| `isPreview` | `boolean` | 프리뷰 모드 여부 |

---

## 6. 페이지 스펙

### 6.1 HomePage (`pages/HomePage.tsx`)

**URL**: `/#/home`

**섹션 구성**:

1. **HeroSection**
   - 뱃지: "Complete Guide"
   - 제목: "Claude Agent Skills Guide"
   - 설명: 가이드 소개
   - CTA 버튼: "시작하기" → 첫 섹션으로 이동

2. **ChapterCard 그리드** (2열)
   - 8개 카테고리 카드
   - 챕터 색상 + 일러스트
   - 섹션 수 표시

3. **외부 리소스**
   - 공식 문서, GitHub, 블로그 링크

### 6.2 SectionPage (`pages/SectionPage.tsx`)

**URL**: `/#/sections/:id`

**렌더링 순서**:
```
1. Breadcrumb (브레드크럼 내비게이션)
2. ChapterIllustration (첫 섹션일 때만)
3. 카테고리 뱃지
4. 제목 (h1)
5. LearningObjectives (학습 목표 박스) [NEW]
6. SectionIllustration (첫 섹션 아닐 때)
7. AudioPlayer (음성 해설)
8. Body (본문) 또는 Blocks (블록 기반)
9. TableOfContents (목차)
10. Subsections (서브섹션들)
    - 블록 기반 또는 레거시 렌더링
11. Diagrams (Mermaid 다이어그램)
12. CodeExamples (코드 예제)
13. Prev/Next Navigation (이전/다음 링크)
```

**블록 렌더링 함수**:
```typescript
const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case 'paragraph': return <p>{block.content}</p>;
    case 'diagram': return <MermaidDiagram {...diagram} />;
    case 'items': return <ItemList items={block.items} />;
    case 'tip': return <InfoBox type="tip">{block.content}</InfoBox>;
    case 'warning': return <InfoBox type="warning">{block.content}</InfoBox>;
    case 'code': return <CodeBlock {...code} />;
    case 'comparison': return <ComparisonTable {...block.data} />;
    case 'image': return <img src={block.src} alt={block.alt} />;
    // ...
  }
};
```

---

## 7. 일러스트레이션 시스템

### 7.1 챕터 일러스트

**위치**: `components/illustrations/ChapterIllustrations.tsx`

| 컴포넌트 | 챕터 | 색상 | 모티프 |
|----------|------|------|--------|
| `IntroductionIllustration` | 소개 | Orange | 원형 그라데이션 |
| `FundamentalsIllustration` | 기초 | Green | 쌓인 블록 |
| `PlanningIllustration` | 설계 | Pink | 청사진 그리드 |
| `TestingIllustration` | 테스트 | Violet | 동심원 + 체크 |
| `DistributionIllustration` | 배포 | Blue | 허브 네트워크 |
| `PatternsIllustration` | 패턴 | Teal | 퍼즐 조각 |
| `ResourcesIllustration` | 리소스 | Amber | 책 스택 |
| `AppendicesIllustration` | 부록 | Neutral | 클립보드 |

### 7.2 섹션 일러스트

**위치**: `components/illustrations/SectionIllustrations.tsx`

25개의 섹션별 SVG 컴포넌트. 각 챕터의 테마 색상을 사용하며 추상적인 형태로 개념을 표현.

### 7.3 인라인 일러스트

**위치**: `public/images/inline/`

| 파일 | 사용 섹션 | 설명 |
|------|----------|------|
| `progressive-disclosure.svg` | 핵심 설계 원칙 | 3-Tier 토큰 최적화 |
| `skill-ecosystem.svg` | 스킬이란? | Claude 환경 이식성 |
| `testing-flow.svg` | 테스트 영역 | 3단계 테스트 흐름 |
| `distribution-network.svg` | 배포 모델 | 배포 채널 네트워크 |

---

## 8. 다이어그램 시스템

### 8.1 Mermaid 지원 다이어그램 유형

| 유형 | 용도 | 예시 |
|------|------|------|
| `flowchart` | 프로세스 흐름 | 스킬 로딩 과정 |
| `sequence` | 상호작용 시퀀스 | API 호출 순서 |
| `graph` | 관계도 | 컴포넌트 의존성 |
| `classDiagram` | 구조 다이어그램 | 데이터 모델 |

### 8.2 다이어그램 정의 예시

```typescript
{
  id: 'progressive-disclosure',
  type: 'flowchart',
  titleKo: 'Progressive Disclosure 3-Tier',
  definition: `
    flowchart LR
      A[YAML<br/>50-100 토큰] --> B[SKILL.md<br/>500-1000 토큰]
      B --> C[references/<br/>5000+ 토큰]
  `,
  caption: '필요한 순간에 필요한 만큼만 로드'
}
```

### 8.3 다크모드 대응

MermaidDiagram 컴포넌트가 테마 변경을 감지하고 다이어그램을 재렌더링:

```typescript
const THEME_VARIABLES = {
  dark: {
    primaryColor: '#3b82f6',
    background: '#171717',
    nodeTextColor: '#f5f5f5',
    // ...
  },
  light: {
    primaryColor: '#f97316',
    background: '#ffffff',
    nodeTextColor: '#171717',
    // ...
  },
};
```

---

## 9. 라우팅 스펙

### 9.1 라우터 구조

```typescript
<ThemeProvider>
  <HashRouter>
    <ScrollToTop />  {/* [NEW] 스크롤 초기화 */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="sections/:id" element={<SectionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
</ThemeProvider>
```

### 9.2 라우트 테이블

| 경로 | 컴포넌트 | 동작 |
|------|----------|------|
| `/` | — | `/home`으로 리다이렉트 |
| `/home` | `HomePage` | 메인 랜딩 페이지 |
| `/sections/:id` | `SectionPage` | 동적 섹션 콘텐츠 |
| `*` | `NotFoundPage` | 404 폴백 |

---

## 10. 상태 관리 스펙

### 10.1 ThemeContext

```typescript
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

**초기화 우선순위**:
1. `localStorage.getItem('theme')`
2. `window.matchMedia('(prefers-color-scheme: dark)')`
3. 폴백: `'light'`

### 10.2 로컬 상태

| 컴포넌트 | 상태 | 설명 |
|----------|------|------|
| Layout | `sidebarOpen`, `searchOpen` | UI 상태 |
| MermaidDiagram | `isExpanded`, `isLoading`, `error` | 다이어그램 상태 |
| CodeBlock | `copied`, `isExpanded` | 코드 블록 상태 |
| AudioPlayer | `isPlaying`, `currentTime`, `duration` | 오디오 상태 |

---

## 11. UI/UX 스펙

### 11.1 반응형 브레이크포인트

| 구간 | 사이드바 | 레이아웃 |
|------|---------|----------|
| 모바일 (`< md`) | 오버레이 | 풀 너비 |
| 데스크탑 (`≥ md`) | 항상 표시 | 사이드바 제외 |

### 11.2 키보드 단축키

| 단축키 | 동작 |
|--------|------|
| `Cmd/Ctrl + K` | 검색 모달 토글 |
| `↑` / `↓` | 검색 결과 탐색 |
| `Enter` | 선택된 결과로 이동 |
| `Escape` | 모달 닫기 |

### 11.3 애니메이션

| 이름 | 적용 | 동작 |
|------|------|------|
| `animate-fade-in` | 페이지, 카드 | opacity + translateY |
| `animate-slide-up` | 히어로 섹션 | opacity + translateY |
| `animate-pulse` | 로딩 스켈레톤 | opacity 펄스 |

### 11.4 다크 모드 색상

| 요소 | 라이트 | 다크 |
|------|--------|------|
| 배경 | `bg-slate-50` | `bg-neutral-900` |
| 카드 | `bg-white` | `bg-neutral-800` |
| 텍스트 | `text-neutral-800` | `text-neutral-200` |
| 테두리 | `border-neutral-200` | `border-neutral-700` |
| 학습목표 | `bg-orange-50` | `bg-orange-950/30` |

---

## 12. 빌드 & 배포 스펙

### 12.1 NPM 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 (포트 3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 프리뷰 |

### 12.2 배포

| 플랫폼 | URL | 설정 |
|--------|-----|------|
| Vercel | https://claude-agent-skills-guide.vercel.app | 자동 배포 |
| GitHub | https://github.com/Kanghoon1204/claude-agent-skills-guide | 소스 코드 |

### 12.3 빌드 출력 크기

```
dist/index.html          ~6 KB
dist/assets/index.js     ~1.28 MB (gzip: ~381 KB)
```

---

## 13. 접근성

| 항목 | 구현 |
|------|------|
| ARIA 라벨 | 모든 인터랙티브 요소 |
| 시맨틱 HTML | `main`, `nav`, `article`, `section` |
| 키보드 내비게이션 | 검색, 목차, 코드 블록 |
| 포커스 스타일 | `focus:ring-2 focus:ring-orange-500` |
| 다크 모드 | 고대비 색상 조합 |
| 스크롤 복원 | 페이지 전환 시 자동 |

---

## 14. 파일 인벤토리

### 14.1 컴포넌트 (21개)

| 분류 | 파일 |
|------|------|
| 레이아웃 | Layout, TopBar, Sidebar, Breadcrumb |
| 내비게이션 | ScrollToTop, TableOfContents, ReadingProgress |
| 콘텐츠 | CodeBlock, InfoBox, ComparisonTable, Checklist |
| 미디어 | MermaidDiagram, AudioPlayer |
| 일러스트 | ChapterIllustration, SectionIllustrations, ChapterIllustrations |
| 홈페이지 | HeroSection, ChapterCard |
| 모달 | SearchModal |
| 아이콘 | 9개 SVG 아이콘 |

### 14.2 상수 파일 (4개)

| 파일 | 내용 |
|------|------|
| `constants/index.ts` | NAV_DATA, CHAPTER_COLORS, 유틸리티 함수 |
| `constants/codeExamples.ts` | 코드 예제 데이터 |
| `constants/diagrams.ts` | Mermaid 다이어그램 정의 |
| `constants/audioTranscripts.ts` | 음성 해설 스크립트 |

### 14.3 콘텐츠 통계

| 항목 | 수량 |
|------|------|
| 섹션 | 28개 |
| 다이어그램 | 90개+ |
| 코드 예제 | 50개+ |
| 인라인 일러스트 | 4개 |
| 섹션 일러스트 | 25개 |
| 챕터 일러스트 | 8개 |

---

## 15. 제약 사항 & 기술 부채

### 15.1 현재 제약 사항

| 항목 | 상태 |
|------|------|
| 영어 콘텐츠 | 미구현 |
| Tailwind 번들링 | CDN 의존 |
| 검색 | 단순 `includes` 매칭 |
| 체크리스트 | 비영속 (페이지 이동 시 초기화) |
| SSR/SEO | 미지원 (CSR + HashRouter) |
| 테스트 | 미작성 |

### 15.2 향후 개선 가능 영역

- Tailwind CSS PostCSS 빌드 전환
- 퍼지 검색 (fuse.js) 도입
- 체크리스트 localStorage 영속화
- Vitest + React Testing Library 테스트 추가
- NotebookLM 음성 파일 추가
- 영어 콘텐츠 완성

---

## 16. 버전 히스토리

| 버전 | 날짜 | 주요 변경 |
|------|------|----------|
| 1.0.0 | 2026-02-05 | 초기 릴리스 |
| 2.0.0 | 2026-02-10 | 학습 목표, 다이어그램, 일러스트, 블록 기반 콘텐츠, UI 개선 |

---

*이 문서는 프로젝트의 구조와 스펙을 정의합니다. 코드 변경 시 이 문서도 함께 업데이트해야 합니다.*
