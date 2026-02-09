// =============================================================================
// diagrams.ts
// Mermaid.js 다이어그램 정의 — 섹션별 시각적 보조 자료
// =============================================================================

export type MermaidDiagramType =
  | 'flowchart'
  | 'sequence'
  | 'classDiagram'
  | 'stateDiagram'
  | 'pie'
  | 'mindmap'
  | 'block-beta';

export interface DiagramDefinition {
  id: string;
  titleKo: string;
  title: string;
  type: MermaidDiagramType;
  definition: string;
  caption?: string;
}

export const DIAGRAMS: Record<string, DiagramDefinition[]> = {

  // ===========================================================================
  // 소개
  // ===========================================================================

  whatAreSkills: [
    {
      id: 'skill-value-flow',
      titleKo: '스킬 적용 전후 비교',
      title: 'Before vs After Skills',
      type: 'flowchart',
      definition: `flowchart LR
  subgraph before["스킬 미사용"]
    direction TB
    B1["매번 수동 지시"] --> B2["15회+ 메시지 교환"]
    B2 --> B3["API 호출 실패 3회"]
    B3 --> B4["토큰 ~12,000 소비"]
  end

  subgraph after["스킬 사용"]
    direction TB
    A1["자동 워크플로우"] --> A2["2회 확인만"]
    A2 --> A3["API 실패 0회"]
    A3 --> A4["토큰 ~6,000 소비"]
  end

  before -- "스킬 도입" --> after`,
      caption: '스킬 도입 전후의 워크플로우 효율성 비교',
    },
    {
      id: 'skill-core-values',
      titleKo: '스킬의 5가지 핵심 가치',
      title: 'Five Core Values of Skills',
      type: 'flowchart',
      definition: `flowchart TD
  S["스킬 Skill"] --> R["재사용성"]
  S --> C["일관성"]
  S --> SH["공유 가능성"]
  S --> E["확장성"]
  S --> P["이식성"]

  R --- R1["한 번 작성, 무한 재사용"]
  C --- C1["동일한 품질과 형식 보장"]
  SH --- SH1["팀 공유 및 워크스페이스 배포"]
  E --- E1["MCP 서버와 결합"]
  P --- P1["Claude.ai / Code / API 호환"]`,
      caption: '스킬이 제공하는 5가지 핵심 가치',
    },
  ],

  whoIsThisFor: [
    {
      id: 'target-audience',
      titleKo: '대상 독자별 학습 경로',
      title: 'Target Audience Learning Paths',
      type: 'flowchart',
      definition: `flowchart LR
  G["📚 Claude Skills Guide"]

  subgraph DEV["🔧 개발자"]
    direction TB
    D1["MCP 서버 구축"]
    D2["코드 기반 스킬"]
    D3["Bash, Read, Write"]
  end

  subgraph PWR["⚡ 파워 유저"]
    direction TB
    PU1["코드 없는 스킬"]
    PU2["문서 / 리서치"]
    PU3["분석 워크플로우"]
  end

  subgraph TEAM["👥 팀"]
    direction TB
    T1["워크스페이스 배포"]
    T2["자동 업데이트"]
    T3["중앙 관리"]
  end

  G --> DEV
  G --> PWR
  G --> TEAM

  style G fill:#fff7ed,stroke:#f97316,stroke-width:3px
  style DEV fill:#dbeafe,stroke:#3b82f6
  style PWR fill:#dcfce7,stroke:#16a34a
  style TEAM fill:#fdf4ff,stroke:#a855f7`,
      caption: '세 가지 대상 독자와 각각의 학습 방향',
    },
  ],

  twoPaths: [
    {
      id: 'two-paths-comparison',
      titleKo: '두 가지 스킬 개발 경로',
      title: 'Two Skill Development Paths',
      type: 'flowchart',
      definition: `flowchart LR
  Start["스킬 개발 시작"] --> Q{"외부 서비스<br/>연동 필요?"}

  Q -- "아니오" --> P1["경로 1: 독립형 스킬"]
  Q -- "예" --> P2["경로 2: MCP 강화 스킬"]

  P1 --> T1["내장 도구만 사용"]
  T1 --> T1a["Read / Write / Bash"]
  T1 --> T1b["Glob / Grep / WebFetch"]

  P2 --> T2["MCP 서버 + 내장 도구"]
  T2 --> T2a["GitHub / Slack / DB"]
  T2 --> T2b["MCP = 주방, 스킬 = 레시피"]

  T1a --> SAME["동일한 SKILL.md 형식"]
  T1b --> SAME
  T2a --> SAME
  T2b --> SAME`,
      caption: '외부 서비스 연동 여부에 따른 두 가지 개발 경로',
    },
  ],

  // ===========================================================================
  // 제1장: 기초
  // ===========================================================================

  whatIsASkill: [
    {
      id: 'skill-folder-structure',
      titleKo: '스킬 폴더 구조',
      title: 'Skill Folder Structure',
      type: 'flowchart',
      definition: `flowchart TD
  ROOT["my-skill/"] --> SKILL["SKILL.md<br/>필수 - 핵심 지시사항"]
  ROOT --> SCRIPTS["scripts/<br/>선택 - 실행 스크립트"]
  ROOT --> REFS["references/<br/>선택 - 참고 문서"]
  ROOT --> ASSETS["assets/<br/>선택 - 템플릿, 리소스"]

  SKILL --> Y["YAML 프론트매터<br/>name, description, tools"]
  SKILL --> M["마크다운 본문<br/>워크플로우 지시사항"]

  style SKILL fill:#fff7ed,stroke:#f97316,stroke-width:2px
  style ROOT fill:#f1f5f9,stroke:#64748b`,
      caption: '스킬 폴더의 기본 구성과 SKILL.md의 두 가지 구성 요소',
    },
    {
      id: 'skill-loading-flow',
      titleKo: '스킬 로딩 프로세스',
      title: 'Skill Loading Process',
      type: 'flowchart',
      definition: `flowchart LR
  U["사용자 요청"] --> C["Claude가 스킬 탐색"]
  C --> Y["YAML 프론트매터 로드<br/>항상 시스템 프롬프트에"]
  Y --> R{"관련성<br/>판단"}
  R -- "관련 있음" --> B["마크다운 본문 로드"]
  R -- "관련 없음" --> S["스킵"]
  B --> E["도구와 함께 실행"]
  E --> RES["결과 반환"]`,
      caption: '사용자 요청부터 결과 반환까지의 스킬 로딩 흐름',
    },
  ],

  coreDesignPrinciples: [
    {
      id: 'progressive-disclosure',
      titleKo: 'Progressive Disclosure 3단계',
      title: 'Progressive Disclosure Stages',
      type: 'flowchart',
      definition: `flowchart TD
  subgraph L1["1단계: YAML 프론트매터"]
    direction LR
    Y1["name + description"]
    Y2["항상 로드됨"]
    Y3["최소 토큰"]
  end

  subgraph L2["2단계: SKILL.md 본문"]
    direction LR
    M1["핵심 지시사항"]
    M2["관련 시 로드"]
    M3["적정 토큰"]
  end

  subgraph L3["3단계: 외부 파일"]
    direction LR
    F1["references/ scripts/"]
    F2["필요 시 로드"]
    F3["추가 토큰"]
  end

  L1 --> L2 --> L3

  style L1 fill:#dcfce7,stroke:#16a34a
  style L2 fill:#fff7ed,stroke:#f97316
  style L3 fill:#fef2f2,stroke:#ef4444`,
      caption: '토큰 사용을 최소화하는 3단계 점진적 공개 시스템',
    },
    {
      id: 'portability-platforms',
      titleKo: '플랫폼 이식성',
      title: 'Platform Portability',
      type: 'flowchart',
      definition: `flowchart LR
  SKILL["SKILL.md<br/>동일한 파일"] --> C1["Claude.ai"]
  SKILL --> C2["Claude Code"]
  SKILL --> C3["API"]
  SKILL --> C4["기타 AI 플랫폼"]

  C1 --> R["동일한 결과"]
  C2 --> R
  C3 --> R
  C4 --> R`,
      caption: '하나의 스킬 파일이 모든 플랫폼에서 동일하게 동작',
    },
  ],

  mcpAndSkills: [
    {
      id: 'mcp-skill-relationship',
      titleKo: 'MCP와 스킬의 관계: 주방 비유',
      title: 'MCP-Skill Relationship: Kitchen Metaphor',
      type: 'flowchart',
      definition: `flowchart LR
  subgraph MCP["MCP = 전문 주방"]
    direction TB
    M1["도구 접근"]
    M2["실시간 데이터"]
    M3["외부 서비스 연결"]
  end

  subgraph SKILL["스킬 = 레시피"]
    direction TB
    S1["워크플로우 단계"]
    S2["베스트 프랙티스"]
    S3["도메인 지식"]
  end

  MCP --> RESULT
  SKILL --> RESULT

  RESULT["사용자 가치<br/>복잡한 작업 자동 완수"]

  style MCP fill:#dbeafe,stroke:#3b82f6
  style SKILL fill:#fff7ed,stroke:#f97316`,
      caption: 'MCP(연결성)와 스킬(지식)이 합쳐져 완전한 자동화를 실현',
    },
    {
      id: 'mcp-execution-sequence',
      titleKo: 'MCP 스킬 실행 시퀀스',
      title: 'MCP Skill Execution Sequence',
      type: 'sequence',
      definition: `sequenceDiagram
  participant U as 사용자
  participant C as Claude
  participant S as 스킬
  participant M as MCP 서버

  U->>C: 작업 요청
  C->>S: 스킬 활성화
  S->>C: 워크플로우 지시사항 제공
  C->>M: MCP 도구 호출
  M-->>C: 결과 반환
  C->>S: 다음 단계 확인
  S->>C: 검증 규칙 적용
  C-->>U: 최종 결과`,
      caption: '사용자 요청 → 스킬 활성화 → MCP 도구 호출 → 결과 반환의 시퀀스',
    },
  ],

  // ===========================================================================
  // 제2장: 설계와 기획
  // ===========================================================================

  useCases: [
    {
      id: 'use-case-evaluation',
      titleKo: '유스케이스 평가 의사결정 트리',
      title: 'Use Case Evaluation Decision Tree',
      type: 'flowchart',
      definition: `flowchart LR
  START["🎯 유스케이스"] --> Q1{"반복성?"}
  Q1 -- "✗" --> SKIP["불필요"]
  Q1 -- "✓" --> Q2{"구체성?"}
  Q2 -- "✗" --> REFINE["구체화"]
  Q2 -- "✓" --> Q3{"측정가능?"}
  Q3 -- "✗" --> METRIC["기준 정의"]
  Q3 -- "✓" --> Q4{"독립성?"}
  Q4 -- "✗" --> DECOMPOSE["분해"]
  Q4 -- "✓" --> GOOD["✅ 구축!"]

  style GOOD fill:#dcfce7,stroke:#16a34a
  style SKIP fill:#fef2f2,stroke:#ef4444
  style REFINE fill:#fef9c3,stroke:#ca8a04
  style METRIC fill:#fef9c3,stroke:#ca8a04
  style DECOMPOSE fill:#fef9c3,stroke:#ca8a04`,
      caption: '반복성, 구체성, 측정 가능성, 독립성의 4가지 기준으로 평가',
    },
  ],

  skillCategories: [
    {
      id: 'skill-category-decision',
      titleKo: '스킬 카테고리 선택 흐름도',
      title: 'Skill Category Selection Flow',
      type: 'flowchart',
      definition: `flowchart TD
  Q["어떤 작업을<br/>자동화하고 싶은가?"]

  Q --> C1["문서/에셋 생성"]
  Q --> C2["워크플로우 자동화"]
  Q --> C3["MCP 통합 강화"]

  C1 --> C1a["PDF / DOCX / PPTX"]
  C1 --> C1b["템플릿 + 품질 검증"]
  C1 --> C1c["출력 형식 표준화"]

  C2 --> C2a["순차적 다단계 프로세스"]
  C2 --> C2b["검증 게이트"]
  C2 --> C2c["에러 핸들링"]

  C3 --> C3a["외부 서비스 오케스트레이션"]
  C3 --> C3b["도메인 지식 내장"]
  C3 --> C3c["복잡한 API 워크플로우"]

  style C1 fill:#dbeafe,stroke:#3b82f6
  style C2 fill:#dcfce7,stroke:#16a34a
  style C3 fill:#fdf4ff,stroke:#a855f7`,
      caption: '자동화 목표에 따른 3가지 스킬 카테고리 분류',
    },
  ],

  successCriteria: [
    {
      id: 'success-metrics',
      titleKo: '성공 기준: 정량적 vs 정성적 메트릭',
      title: 'Success Criteria: Quantitative vs Qualitative',
      type: 'flowchart',
      definition: `flowchart TD
  SC["성공 기준"] --> QN["정량적 메트릭"]
  SC --> QL["정성적 메트릭"]

  QN --> QN1["트리거 정확도 > 90%"]
  QN --> QN2["도구 효율성<br/>N회 이하 호출"]
  QN --> QN3["API 성공률<br/>실패 0회"]
  QN --> QN4["토큰 소비 감소"]

  QL --> QL1["자율성<br/>추가 프롬프트 불필요"]
  QL --> QL2["정확성<br/>오류 없는 실행"]
  QL --> QL3["일관성<br/>재현 가능한 결과"]

  style QN fill:#dbeafe,stroke:#3b82f6
  style QL fill:#dcfce7,stroke:#16a34a`,
      caption: '스킬 성공을 측정하는 정량적/정성적 메트릭 체계',
    },
  ],

  technicalRequirements: [
    {
      id: 'validation-state-machine',
      titleKo: '스킬 유효성 검증 흐름',
      title: 'Skill Validation Flow',
      type: 'flowchart',
      definition: `flowchart TD
  INPUT["스킬 폴더"] --> V1{"SKILL.md<br/>파일 존재?"}
  V1 -- "아니오" --> F1["파일명 확인<br/>대문자 SKILL.md 필수"]
  V1 -- "예" --> V2{"YAML 구문<br/>유효한가?"}
  V2 -- "아니오" --> F2["--- 구분자,<br/>들여쓰기 확인"]
  V2 -- "예" --> V3{"name 필드<br/>kebab-case?"}
  V3 -- "아니오" --> F3["소문자, 하이픈만<br/>사용 가능"]
  V3 -- "예" --> V4{"description<br/>명확한가?"}
  V4 -- "아니오" --> F4["WHAT + WHEN<br/>패턴으로 작성"]
  V4 -- "예" --> PASS["유효성 통과!"]

  style PASS fill:#dcfce7,stroke:#16a34a
  style F1 fill:#fef2f2,stroke:#ef4444
  style F2 fill:#fef2f2,stroke:#ef4444
  style F3 fill:#fef2f2,stroke:#ef4444
  style F4 fill:#fef2f2,stroke:#ef4444`,
      caption: '스킬 파일의 필수 기술 요구사항 검증 단계',
    },
  ],

  writingEffectiveSkills: [
    {
      id: 'skillmd-structure',
      titleKo: 'SKILL.md 권장 문서 구조',
      title: 'Recommended SKILL.md Structure',
      type: 'flowchart',
      definition: `flowchart TD
  DOC["SKILL.md"] --> S1["YAML 프론트매터<br/>name, description, tools"]
  DOC --> S2["# 제목 및 개요"]
  DOC --> S3["## 워크플로우<br/>단계별 지시사항"]
  DOC --> S4["## 요구사항<br/>입력/출력 사양"]
  DOC --> S5["## 에러 핸들링<br/>실패 시 대응"]
  DOC --> S6["## 예제<br/>사용 시나리오"]
  DOC --> S7["## 문제 해결<br/>일반적 이슈"]

  S1 ~~~ S2 ~~~ S3 ~~~ S4 ~~~ S5 ~~~ S6 ~~~ S7

  style S1 fill:#fff7ed,stroke:#f97316
  style S3 fill:#dbeafe,stroke:#3b82f6`,
      caption: 'SKILL.md 파일의 7가지 권장 섹션 구성',
    },
  ],

  // ===========================================================================
  // 제3장: 테스트와 반복
  // ===========================================================================

  testingApproaches: [
    {
      id: 'testing-strategy-decision',
      titleKo: '테스트 전략 선택 가이드',
      title: 'Testing Strategy Decision Guide',
      type: 'flowchart',
      definition: `flowchart TD
  Q["배포 규모는?"] --> S{"소규모<br/>개인/소팀"}
  Q --> M{"중규모<br/>내부 사용"}
  Q --> L{"대규모<br/>프로덕션"}

  S --> S1["수동 테스트<br/>Claude.ai에서 직접"]
  M --> M1["스크립트 테스트<br/>Claude Code로 자동화"]
  L --> L1["프로그래밍 테스트<br/>API로 체계적 검증"]

  S1 --> ITER["반복 개선 사이클"]
  M1 --> ITER
  L1 --> ITER`,
      caption: '배포 규모에 따른 테스트 전략 선택',
    },
    {
      id: 'iteration-cycle',
      titleKo: '반복적 테스트 개선 사이클',
      title: 'Iterative Test Improvement Cycle',
      type: 'sequence',
      definition: `sequenceDiagram
  participant D as 개발자
  participant C as Claude
  participant S as 스킬

  D->>C: 단일 어려운 작업 시도
  C->>S: 스킬 실행
  S-->>C: 결과 반환
  C-->>D: 결과 확인

  Note over D: 성공? 스킬로 추출

  D->>S: 스킬 개선
  D->>C: 추가 테스트 케이스
  C->>S: 확장된 스킬 실행
  S-->>C: 검증 결과
  C-->>D: 최종 확인`,
      caption: '단일 작업 성공 → 스킬 추출 → 테스트 확장의 반복 사이클',
    },
  ],

  testingAreas: [
    {
      id: 'three-testing-areas',
      titleKo: '3가지 테스트 영역',
      title: 'Three Testing Areas',
      type: 'flowchart',
      definition: `flowchart TD
  TEST["테스트"] --> TR["트리거 테스트"]
  TEST --> FN["기능 테스트"]
  TEST --> PF["성능 비교"]

  TR --> TR1["명시적 트리거<br/>정확한 슬래시 명령"]
  TR --> TR2["패러프레이즈 트리거<br/>다른 표현으로"]
  TR --> TR3["네거티브 테스트<br/>트리거되지 않아야 할 때"]

  FN --> FN1["출력 유효성<br/>결과물 품질 확인"]
  FN --> FN2["API 성공률<br/>호출 실패 없음"]
  FN --> FN3["에러 핸들링<br/>예외 상황 대응"]

  PF --> PF1["스킬 미사용 메트릭"]
  PF --> PF2["스킬 사용 메트릭"]
  PF --> PF3["개선율 측정"]

  style TR fill:#dbeafe,stroke:#3b82f6
  style FN fill:#dcfce7,stroke:#16a34a
  style PF fill:#fdf4ff,stroke:#a855f7`,
      caption: '트리거, 기능, 성능의 세 가지 테스트 영역과 세부 항목',
    },
  ],

  skillCreatorTool: [
    {
      id: 'skill-creator-workflow',
      titleKo: 'skill-creator 워크플로우',
      title: 'skill-creator Workflow',
      type: 'flowchart',
      definition: `flowchart LR
  INPUT["자연어 설명<br/>입력"] --> GEN["생성<br/>Generate"]
  GEN --> REV["검토<br/>Review"]
  REV --> IMP["개선<br/>Improve"]
  IMP --> VAL{"검증<br/>통과?"}
  VAL -- "아니오" --> REV
  VAL -- "예" --> OUT["프로덕션 준비<br/>완료 스킬"]

  style INPUT fill:#f1f5f9,stroke:#64748b
  style OUT fill:#dcfce7,stroke:#16a34a`,
      caption: 'skill-creator의 생성 → 검토 → 개선 → 검증 반복 워크플로우',
    },
  ],

  iterationFeedback: [
    {
      id: 'feedback-signals',
      titleKo: '피드백 신호 분류 및 대응',
      title: 'Feedback Signal Classification',
      type: 'flowchart',
      definition: `flowchart TD
  USE["스킬 사용 중"] --> SIG{"어떤 문제가<br/>감지되었는가?"}

  SIG --> UT["과소 트리거<br/>Undertriggering"]
  SIG --> OT["과잉 트리거<br/>Overtriggering"]
  SIG --> EX["실행 문제<br/>Execution Issues"]

  UT --> UT1["증상: 스킬이 활성화되지 않음"]
  UT1 --> UT2["해결: description 강화<br/>키워드 추가"]

  OT --> OT1["증상: 관련 없는 요청에 활성화"]
  OT1 --> OT2["해결: 네거티브 트리거 추가<br/>범위 제한"]

  EX --> EX1["증상: 결과 품질 낮음"]
  EX1 --> EX2["해결: 지시사항 명확화<br/>에러 핸들링 추가"]

  UT2 --> RETEST["재테스트"]
  OT2 --> RETEST
  EX2 --> RETEST

  style UT fill:#fef9c3,stroke:#ca8a04
  style OT fill:#fee2e2,stroke:#ef4444
  style EX fill:#dbeafe,stroke:#3b82f6`,
      caption: '세 가지 피드백 신호의 증상 진단 및 해결 방법',
    },
  ],

  // ===========================================================================
  // 제4장: 배포와 공유
  // ===========================================================================

  distributionModel: [
    {
      id: 'distribution-decision',
      titleKo: '배포 모델 선택 가이드',
      title: 'Distribution Model Decision Guide',
      type: 'flowchart',
      definition: `flowchart TD
  Q["배포 대상은?"] --> IND{"개인 사용자"}
  Q --> ORG{"조직 전체"}

  IND --> I1["GitHub clone 또는<br/>ZIP 다운로드"]
  I1 --> I2{"어디서 사용?"}
  I2 -- "Claude.ai" --> I3["Settings > Skills<br/>ZIP 업로드"]
  I2 -- "Claude Code" --> I4["~/.claude/skills/<br/>또는 .claude/skills/"]

  ORG --> O1["관리자 패널에서<br/>워크스페이스 배포"]
  O1 --> O2["자동 업데이트"]
  O1 --> O3["중앙 관리"]

  style IND fill:#dbeafe,stroke:#3b82f6
  style ORG fill:#dcfce7,stroke:#16a34a`,
      caption: '개인 vs 조직 배포 모델의 선택과 설치 경로',
    },
  ],

  openStandard: [
    {
      id: 'open-standard-portability',
      titleKo: '오픈 스탠다드 이식성',
      title: 'Open Standard Portability',
      type: 'flowchart',
      definition: `flowchart LR
  subgraph TECH["표준 기술 스택"]
    direction TB
    YAML["YAML<br/>메타데이터"]
    MD["Markdown<br/>지시사항"]
    FS["파일시스템<br/>배포"]
  end

  TECH --> SKILL["SKILL.md"]

  SKILL --> P1["Claude.ai"]
  SKILL --> P2["Claude Code"]
  SKILL --> P3["API"]
  SKILL --> P4["기타 플랫폼"]

  style TECH fill:#f1f5f9,stroke:#64748b
  style SKILL fill:#fff7ed,stroke:#f97316`,
      caption: 'YAML + Markdown + 파일시스템의 표준 기술로 모든 플랫폼 지원',
    },
  ],

  skillsViaApi: [
    {
      id: 'api-decision-tree',
      titleKo: 'API vs UI 사용 결정 트리',
      title: 'API vs UI Decision Tree',
      type: 'flowchart',
      definition: `flowchart TD
  Q["스킬을 어떻게<br/>사용할 것인가?"] --> Q1{"인터랙티브<br/>수동 사용?"}
  Q1 -- "예" --> UI["Claude.ai /<br/>Claude Code"]
  Q1 -- "아니오" --> Q2{"프로그래밍<br/>자동화?"}
  Q2 -- "예" --> API["API 사용"]
  Q2 -- "아니오" --> UI

  API --> A1["버전 관리"]
  API --> A2["대규모 배포"]
  API --> A3["CI/CD 통합"]

  style UI fill:#dbeafe,stroke:#3b82f6
  style API fill:#dcfce7,stroke:#16a34a`,
      caption: '사용 시나리오에 따른 API와 UI 인터페이스 선택',
    },
    {
      id: 'api-execution-sequence',
      titleKo: 'API를 통한 스킬 실행 시퀀스',
      title: 'Skill Execution via API',
      type: 'sequence',
      definition: `sequenceDiagram
  participant App as 애플리케이션
  participant API as Anthropic API
  participant Con as 컨테이너
  participant S as 스킬

  App->>API: POST /v1/messages (container.skills)
  API->>Con: 컨테이너 생성
  Con->>S: 스킬 로드
  S-->>Con: 지시사항 적용
  Con->>Con: 작업 실행
  Con-->>API: 결과 반환
  API-->>App: 응답`,
      caption: '애플리케이션 → API → 컨테이너 → 스킬의 프로그래밍적 실행 흐름',
    },
  ],

  recommendedApproach: [
    {
      id: 'distribution-strategy',
      titleKo: '권장 배포 전략 3단계',
      title: 'Recommended Distribution Strategy',
      type: 'flowchart',
      definition: `flowchart LR
  S1["1. GitHub 호스팅<br/>소스 코드 공개"] --> S2["2. MCP 문서 연동<br/>컨텍스트 설정"]
  S2 --> S3["3. 설치 가이드 작성<br/>사용자 온보딩"]

  S3 --> G1["다운로드<br/>git clone / ZIP"]
  S3 --> G2["설치<br/>Claude.ai / 로컬"]
  S3 --> G3["활성화<br/>토글 + MCP 확인"]
  S3 --> G4["테스트<br/>트리거 문구 실행"]

  style S1 fill:#dbeafe,stroke:#3b82f6
  style S2 fill:#dcfce7,stroke:#16a34a
  style S3 fill:#fff7ed,stroke:#f97316`,
      caption: 'GitHub 호스팅 → 문서 연동 → 설치 가이드의 3단계 배포 전략',
    },
  ],

  positioningYourSkill: [
    {
      id: 'positioning-framework',
      titleKo: '기능 중심 → 결과 중심 전환',
      title: 'Feature-Centric to Outcome-Centric',
      type: 'flowchart',
      definition: `flowchart LR
  subgraph BAD["기능 중심 메시징"]
    direction TB
    B1["도구 나열"]
    B2["형식 설명"]
    B3["기술 구조"]
  end

  TRANSFORM["결과 중심으로<br/>전환"]

  subgraph GOOD["결과 중심 메시징"]
    direction TB
    G1["속도 향상"]
    G2["효율성 개선"]
    G3["자동화 달성"]
  end

  BAD --> TRANSFORM --> GOOD

  GOOD --> FINAL["MCP 접근성 +<br/>스킬 전문지식 =<br/>AI 기반 자동화"]

  style BAD fill:#fef2f2,stroke:#ef4444
  style GOOD fill:#dcfce7,stroke:#16a34a
  style FINAL fill:#fff7ed,stroke:#f97316`,
      caption: '기능 나열에서 결과 중심으로의 메시징 전환 프레임워크',
    },
  ],

  // ===========================================================================
  // 제5장: 패턴과 문제 해결
  // ===========================================================================

  skillPatterns: [
    {
      id: 'pattern-selection',
      titleKo: '5가지 스킬 패턴 선택 가이드',
      title: 'Five Skill Patterns Selection Guide',
      type: 'flowchart',
      definition: `flowchart TD
  Q["워크플로우 특성은?"] --> Q1{"순차적<br/>단계가 있는가?"}
  Q1 -- "예" --> P1["패턴 1<br/>순차적 워크플로우"]
  Q1 -- "아니오" --> Q2{"여러 외부<br/>서비스 연동?"}
  Q2 -- "예" --> P2["패턴 2<br/>멀티 MCP 조정"]
  Q2 -- "아니오" --> Q3{"품질 반복<br/>개선 필요?"}
  Q3 -- "예" --> P3["패턴 3<br/>반복적 개선"]
  Q3 -- "아니오" --> Q4{"조건부 도구<br/>선택 필요?"}
  Q4 -- "예" --> P4["패턴 4<br/>컨텍스트 인식 선택"]
  Q4 -- "아니오" --> P5["패턴 5<br/>도메인 특화 지능"]

  style P1 fill:#dbeafe,stroke:#3b82f6
  style P2 fill:#dcfce7,stroke:#16a34a
  style P3 fill:#fdf4ff,stroke:#a855f7
  style P4 fill:#fff7ed,stroke:#f97316
  style P5 fill:#fef9c3,stroke:#ca8a04`,
      caption: '워크플로우 특성에 따른 5가지 패턴 선택 의사결정 트리',
    },
    {
      id: 'sequential-pattern',
      titleKo: '패턴 1: 순차적 워크플로우',
      title: 'Pattern 1: Sequential Workflow',
      type: 'sequence',
      definition: `sequenceDiagram
  participant U as 사용자
  participant C as Claude
  participant T1 as 도구 1
  participant T2 as 도구 2
  participant T3 as 도구 3

  U->>C: 작업 요청
  C->>T1: Step 1 실행
  T1-->>C: 결과 1
  C->>C: 검증
  C->>T2: Step 2 실행
  T2-->>C: 결과 2
  C->>C: 검증
  C->>T3: Step 3 실행
  T3-->>C: 결과 3
  C-->>U: 최종 결과`,
      caption: '단계별 순차 실행과 각 단계의 검증을 포함하는 패턴',
    },
    {
      id: 'multi-mcp-pattern',
      titleKo: '패턴 2: 다중 MCP 조율',
      title: 'Pattern 2: Multi-MCP Coordination',
      type: 'flowchart',
      definition: `flowchart LR
  subgraph P1["Phase 1"]
    F["Figma MCP<br/>에셋 추출"]
  end
  subgraph P2["Phase 2"]
    D["Drive MCP<br/>에셋 저장"]
  end
  subgraph P3["Phase 3"]
    L["Linear MCP<br/>작업 생성"]
  end
  subgraph P4["Phase 4"]
    S["Slack MCP<br/>알림 전송"]
  end
  P1 --> P2 --> P3 --> P4

  style P1 fill:#dbeafe,stroke:#3b82f6
  style P2 fill:#dcfce7,stroke:#16a34a
  style P3 fill:#fdf4ff,stroke:#a855f7
  style P4 fill:#fff7ed,stroke:#f97316`,
      caption: '여러 MCP 서비스를 순차적으로 조율하는 디자인-개발 핸드오프 예시',
    },
    {
      id: 'iterative-pattern',
      titleKo: '패턴 3: 반복적 개선 사이클',
      title: 'Pattern 3: Iterative Refinement',
      type: 'flowchart',
      definition: `flowchart LR
  START["초기 생성"] --> CHECK{"품질 기준?"}
  CHECK -- "미충족" --> ANALYZE["이슈 식별"]
  ANALYZE --> IMPROVE["개선"]
  IMPROVE --> CHECK
  CHECK -- "충족" --> DONE["✅ 완료"]

  style START fill:#f1f5f9,stroke:#64748b
  style DONE fill:#dcfce7,stroke:#16a34a
  style ANALYZE fill:#fef9c3,stroke:#ca8a04`,
      caption: '생성 → 검증 → 분석 → 개선의 품질 반복 사이클',
    },
    {
      id: 'context-aware-pattern',
      titleKo: '패턴 4: 컨텍스트 인식 도구 선택',
      title: 'Pattern 4: Context-Aware Tool Selection',
      type: 'flowchart',
      definition: `flowchart TD
  FILE["파일 분석"] --> Q{"파일 유형?"}
  Q -- ">10MB" --> CLOUD["☁️ 클라우드 MCP"]
  Q -- "협업 문서" --> DOC["📝 Notion/Docs MCP"]
  Q -- "코드 파일" --> GIT["🔧 GitHub MCP"]
  Q -- "임시 파일" --> LOCAL["💾 로컬 저장"]

  style CLOUD fill:#dbeafe,stroke:#3b82f6
  style DOC fill:#dcfce7,stroke:#16a34a
  style GIT fill:#fdf4ff,stroke:#a855f7
  style LOCAL fill:#f1f5f9,stroke:#64748b`,
      caption: '파일 유형과 컨텍스트에 따라 적절한 도구를 자동 선택',
    },
    {
      id: 'domain-specific-pattern',
      titleKo: '패턴 5: 도메인 특화 지능',
      title: 'Pattern 5: Domain-Specific Intelligence',
      type: 'flowchart',
      definition: `flowchart TD
  REQ["결제 요청"] --> COMP{"컴플라이언스<br/>체크"}
  COMP --> C1["제재 리스트"]
  COMP --> C2["관할권 검증"]
  COMP --> C3["리스크 평가"]
  C1 & C2 & C3 --> PASS{"통과?"}
  PASS -- "예" --> PROC["결제 처리<br/>+ 사기 검증"]
  PASS -- "아니오" --> FLAG["리뷰 플래그<br/>+ 케이스 생성"]
  PROC --> AUDIT["감사 추적"]
  FLAG --> AUDIT

  style COMP fill:#dbeafe,stroke:#3b82f6
  style PROC fill:#dcfce7,stroke:#16a34a
  style FLAG fill:#fef9c3,stroke:#ca8a04
  style AUDIT fill:#f1f5f9,stroke:#64748b`,
      caption: '금융 컴플라이언스가 내장된 결제 처리 워크플로우',
    },
  ],

  troubleshooting: [
    {
      id: 'troubleshooting-flowchart',
      titleKo: '문제 진단 플로우차트',
      title: 'Troubleshooting Flowchart',
      type: 'flowchart',
      definition: `flowchart TD
  START["문제 발생"] --> Q1{"SKILL.md<br/>업로드 성공?"}
  Q1 -- "아니오" --> F1["파일명: SKILL.md 대문자<br/>YAML --- 구분자 확인"]
  Q1 -- "예" --> Q2{"스킬 목록에<br/>표시되는가?"}
  Q2 -- "아니오" --> F2["name: kebab-case<br/>소문자와 하이픈만"]
  Q2 -- "예" --> Q3{"정상적으로<br/>트리거되는가?"}
  Q3 -- "트리거 안 됨" --> F3["description 강화<br/>키워드 추가"]
  Q3 -- "과잉 트리거" --> F4["네거티브 트리거<br/>범위 제한"]
  Q3 -- "정상" --> Q4{"지시사항이<br/>올바르게 실행?"}
  Q4 -- "아니오" --> F5["지시사항 명확화<br/>검증 스크립트 추가"]
  Q4 -- "예" --> Q5{"MCP<br/>연결 문제?"}
  Q5 -- "예" --> F6["MCP 설정 확인<br/>인증 갱신"]
  Q5 -- "아니오" --> OK["정상 동작!"]

  style OK fill:#dcfce7,stroke:#16a34a
  style F1 fill:#fef2f2,stroke:#ef4444
  style F2 fill:#fef2f2,stroke:#ef4444
  style F3 fill:#fef9c3,stroke:#ca8a04
  style F4 fill:#fef9c3,stroke:#ca8a04
  style F5 fill:#fef9c3,stroke:#ca8a04
  style F6 fill:#dbeafe,stroke:#3b82f6`,
      caption: '6가지 일반적 문제를 체계적으로 진단하는 플로우차트',
    },
  ],

  // ===========================================================================
  // 제6장: 리소스와 참고자료
  // ===========================================================================

  officialDocs: [
    {
      id: 'resource-map',
      titleKo: '공식 리소스 구조',
      title: 'Official Resource Map',
      type: 'flowchart',
      definition: `flowchart TD
  CENTER["Claude Skills<br/>공식 리소스"] --> API["API Reference<br/>구현 세부사항"]
  CENTER --> MCP["MCP Documentation<br/>통합 가이드"]
  CENTER --> GH["GitHub Repository<br/>예제 & 템플릿"]
  CENTER --> BLOG["Research & Blog<br/>원칙 & 패턴"]

  API --> API1["엔드포인트 명세"]
  MCP --> MCP1["서버 설정 가이드"]
  GH --> GH1["공식 스킬 예제"]
  BLOG --> BLOG1["Building Effective Agents"]

  style CENTER fill:#fff7ed,stroke:#f97316`,
      caption: '공식 문서, MCP, GitHub, 블로그로 구성된 리소스 구조',
    },
  ],

  exampleSkills: [
    {
      id: 'example-categories',
      titleKo: '예제 스킬 카테고리',
      title: 'Example Skill Categories',
      type: 'flowchart',
      definition: `flowchart TD
  REPO["공식 스킬 저장소"] --> DOC["문서 생성 스킬"]
  REPO --> EX["패턴 예제 스킬"]
  REPO --> PARTNER["파트너 스킬"]

  DOC --> DOC1["PDF"]
  DOC --> DOC2["DOCX"]
  DOC --> DOC3["PPTX"]
  DOC --> DOC4["XLSX"]

  EX --> EX1["순차 워크플로우"]
  EX --> EX2["멀티 MCP"]
  EX --> EX3["반복 개선"]

  PARTNER --> P1["Asana"]
  PARTNER --> P2["Canva"]
  PARTNER --> P3["Figma"]
  PARTNER --> P4["Sentry"]
  PARTNER --> P5["Zapier"]

  style DOC fill:#dbeafe,stroke:#3b82f6
  style EX fill:#dcfce7,stroke:#16a34a
  style PARTNER fill:#fdf4ff,stroke:#a855f7`,
      caption: '문서 생성, 패턴 예제, 파트너 스킬의 세 가지 카테고리',
    },
  ],

  toolsAndUtilities: [
    {
      id: 'tools-workflow',
      titleKo: 'skill-creator 도구 활용 흐름',
      title: 'skill-creator Tool Workflow',
      type: 'flowchart',
      definition: `flowchart LR
  DESC["자연어 설명"] --> CREATE["skill-creator<br/>생성"]
  CREATE --> REVIEW["구조 검토<br/>이슈 식별"]
  REVIEW --> VALIDATE["유효성 검증<br/>트리거, 엣지케이스"]
  VALIDATE --> IMPROVE["피드백 기반<br/>개선"]
  IMPROVE --> OUTPUT["프로덕션 준비<br/>스킬 완성"]

  style DESC fill:#f1f5f9,stroke:#64748b
  style OUTPUT fill:#dcfce7,stroke:#16a34a`,
      caption: '자연어 입력부터 프로덕션 준비 스킬까지의 도구 활용 흐름',
    },
  ],

  // ===========================================================================
  // 부록
  // ===========================================================================

  quickChecklist: [
    {
      id: 'checklist-phases',
      titleKo: '스킬 개발 단계별 체크리스트',
      title: 'Skill Development Phase Checklist',
      type: 'flowchart',
      definition: `flowchart TD
  subgraph P1["사전 준비"]
    direction TB
    C1["유스케이스 정의"]
    C2["필요 도구 식별"]
    C3["가이드 리뷰"]
    C4["폴더 구조 계획"]
  end

  subgraph P2["개발"]
    direction TB
    C5["파일 구조 생성"]
    C6["YAML 작성"]
    C7["description 최적화"]
    C8["에러 핸들링"]
  end

  subgraph P3["테스트"]
    direction TB
    C9["트리거 테스트"]
    C10["기능 테스트"]
    C11["성능 비교"]
    C12["엣지케이스"]
  end

  subgraph P4["배포"]
    direction TB
    C13["패키징"]
    C14["업로드/설치"]
    C15["실환경 테스트"]
    C16["피드백 모니터링"]
  end

  P1 --> P2 --> P3 --> P4

  style P1 fill:#dbeafe,stroke:#3b82f6
  style P2 fill:#dcfce7,stroke:#16a34a
  style P3 fill:#fdf4ff,stroke:#a855f7
  style P4 fill:#fff7ed,stroke:#f97316`,
      caption: '사전 준비 → 개발 → 테스트 → 배포의 4단계 체크리스트',
    },
  ],

  yamlReference: [
    {
      id: 'yaml-structure',
      titleKo: 'YAML 프론트매터 구조',
      title: 'YAML Frontmatter Structure',
      type: 'flowchart',
      definition: `flowchart TD
  YAML["YAML 프론트매터"] --> REQ["필수 필드"]
  YAML --> OPT["선택 필드"]

  REQ --> R1["name<br/>kebab-case, 소문자"]
  REQ --> R2["description<br/>WHAT + WHEN 패턴"]

  OPT --> O1["license<br/>라이선스 유형"]
  OPT --> O2["allowed-tools<br/>허용 도구 목록"]
  OPT --> O3["metadata.*"]

  O3 --> M1["author"]
  O3 --> M2["version"]
  O3 --> M3["mcp-server"]
  O3 --> M4["category"]
  O3 --> M5["tags"]

  style REQ fill:#dcfce7,stroke:#16a34a
  style OPT fill:#dbeafe,stroke:#3b82f6`,
      caption: 'YAML 프론트매터의 필수 필드와 선택 필드 구조',
    },
  ],

  completeExamples: [
    {
      id: 'example-usage-flow',
      titleKo: '예제 활용 프로세스',
      title: 'Example Usage Process',
      type: 'flowchart',
      definition: `flowchart LR
  FIND["예제 탐색<br/>GitHub 저장소"] --> CLONE["복제<br/>git clone"]
  CLONE --> STUDY["분석<br/>구조 이해"]
  STUDY --> CUSTOM["커스터마이즈<br/>요구사항 반영"]
  CUSTOM --> TEST["테스트<br/>검증"]
  TEST --> DEPLOY["배포<br/>공유"]

  style FIND fill:#f1f5f9,stroke:#64748b
  style DEPLOY fill:#dcfce7,stroke:#16a34a`,
      caption: '공식 예제를 활용한 탐색 → 복제 → 분석 → 커스터마이즈 → 배포 프로세스',
    },
  ],
};
