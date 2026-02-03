// =============================================================================
// translations.ts
// 한국어 전용 콘텐츠 — Anthropic 공식 "The Complete Guide to Building Skills
// for Claude" (2026.01) 기반으로 작성
// =============================================================================

export const translations: {
  nav: Record<string, string>;
  sections: Record<string, string>;
  content: Record<string, any>;
} = {
  // ===========================================================================
  // 네비게이션 카테고리명
  // ===========================================================================
  nav: {
    introduction: '소개',
    fundamentals: '제1장: 기초',
    planningAndDesign: '제2장: 설계와 기획',
    testingAndIteration: '제3장: 테스트와 반복',
    distributionAndSharing: '제4장: 배포와 공유',
    patternsAndTroubleshooting: '제5장: 패턴과 문제 해결',
    resourcesAndReferences: '제6장: 리소스와 참고자료',
    appendices: '부록',
  },

  // ===========================================================================
  // 섹션명
  // ===========================================================================
  sections: {
    whatAreSkills: '스킬이란?',
    whoIsThisFor: '누구를 위한 가이드인가',
    twoPaths: '두 가지 경로',
    whatIsASkill: '스킬의 구조',
    coreDesignPrinciples: '핵심 설계 원칙',
    mcpAndSkills: 'MCP와 스킬',
    useCases: '사용 사례',
    skillCategories: '스킬 카테고리',
    successCriteria: '성공 기준',
    technicalRequirements: '기술 요구사항',
    writingEffectiveSkills: '효과적인 스킬 작성법',
    testingApproaches: '테스트 접근법',
    testingAreas: '테스트 영역',
    skillCreatorTool: '스킬 크리에이터 도구',
    iterationFeedback: '반복과 피드백',
    distributionModel: '배포 모델',
    openStandard: '오픈 스탠다드',
    skillsViaApi: 'API를 통한 스킬',
    recommendedApproach: '권장 접근법',
    positioningYourSkill: '스킬 포지셔닝',
    skillPatterns: '스킬 패턴',
    troubleshooting: '문제 해결',
    officialDocs: '공식 문서',
    exampleSkills: '예제 스킬',
    toolsAndUtilities: '도구 및 유틸리티',
    quickChecklist: '빠른 체크리스트',
    yamlReference: 'YAML 레퍼런스',
    completeExamples: '완전한 예제',
  },

  // ===========================================================================
  // 섹션별 본문 콘텐츠
  // ===========================================================================
  content: {

    // =========================================================================
    // 소개
    // =========================================================================

    whatAreSkills: {
      title: '스킬이란?',
      body: '스킬(Skill)은 지시사항의 패키지입니다. Claude에게 특정 작업이나 워크플로우를 처리하는 방법을 가르치는 간단한 폴더로, 매번 대화마다 선호도, 프로세스, 도메인 전문지식을 다시 설명하는 대신 스킬을 통해 한 번 가르치면 매번 일관된 결과를 얻을 수 있습니다.\n\n스킬은 반복 가능한 워크플로우에 강력한 위력을 발휘합니다. 프론트엔드 디자인 생성, 일관된 방법론으로 리서치 수행, 문서 작성, 다단계 프로세스 오케스트레이션 등 다양한 작업을 스킬로 자동화할 수 있습니다.\n\nMCP 서버가 있다면 상위 2~3개 워크플로우를 파악하고 15~30분 안에 기능하는 스킬을 구축하고 테스트할 수 있습니다.',
      subsections: [
        {
          title: '스킬의 핵심 가치',
          body: '스킬은 반복적인 작업을 자동화하고, 팀의 전문지식을 코드화하며, 일관된 품질의 결과물을 보장합니다.',
          items: [
            { label: '재사용성', desc: '한 번 작성하면 무한히 재사용할 수 있습니다.' },
            { label: '일관성', desc: '매번 동일한 품질과 형식의 결과를 보장합니다.' },
            { label: '공유 가능성', desc: '팀원들과 쉽게 공유하고 협업할 수 있습니다. 조직 관리자는 워크스페이스 전체에 배포할 수 있습니다.' },
            { label: '확장성', desc: 'MCP 서버와 결합하여 외부 도구까지 활용할 수 있습니다.' },
            { label: '이식성', desc: 'Claude.ai, Claude Code, API 등 모든 Claude 환경에서 동일하게 동작합니다.' },
          ],
        },
        {
          title: '스킬 vs 일반 프롬프트',
          body: '일반 프롬프트는 매번 작성해야 하지만, 스킬은 한 번 정의하면 자동으로 또는 슬래시 명령어로 즉시 호출됩니다. 또한 스킬은 도구 접근 권한, 보안 규칙, 프로그레시브 디스클로저 등을 YAML로 선언적으로 관리할 수 있습니다.',
          comparison: {
            headers: ['항목', '일반 프롬프트', '스킬'],
            rows: [
              ['재사용', '매번 복사-붙여넣기', '자동 로드 또는 / 명령어'],
              ['도구 제어', '불가능', 'YAML로 선언적 관리'],
              ['보안', '수동 관리', 'allowed_tools, deny_tools 규칙'],
              ['공유', '텍스트 복사', '폴더/Git으로 배포'],
              ['토큰 효율', '매번 전체 설명', '프로그레시브 디스클로저로 최적화'],
            ],
          },
        },
        {
          title: '스킬 사용 전후 비교',
          body: '스킬의 효과를 보여주는 대표적인 예시입니다. 아래 수치는 공식 가이드 Testing 챕터에서 제시하는 참고 사례이며, 실제 결과는 스킬의 복잡도와 사용 환경에 따라 다를 수 있습니다.',
          comparison: {
            headers: ['지표', '스킬 미사용', '스킬 사용'],
            rows: [
              ['워크플로우 실행', '매번 수동 지시', '자동 워크플로우 실행'],
              ['사용자 메시지 횟수', '15회 이상 주고받기', '2회 확인 질문만'],
              ['API 호출 실패', '3회 (재시도 필요)', '0회'],
              ['토큰 소비', '~12,000', '~6,000'],
            ],
          },
          note: '이 수치는 특정 테스트 시나리오의 예시입니다. 모든 스킬에 동일하게 적용되는 보편적 수치가 아닙니다.',
        },
      ],
    },

    whoIsThisFor: {
      title: '누구를 위한 가이드인가',
      body: '이 가이드는 Claude 스킬을 처음 접하는 사람부터 고급 패턴을 활용하려는 개발자까지 모든 수준의 사용자를 위해 설계되었습니다. 스킬을 만들기 위해 반드시 프로그래밍 경험이 필요하지는 않습니다.',
      subsections: [
        {
          title: '대상 독자',
          body: '공식 가이드에서는 세 가지 대상 독자를 명시합니다.',
          items: [
            { label: '개발자 (Developers)', desc: 'MCP 서버를 구축하고, 코드 기반 스킬을 통해 개발 워크플로우를 자동화하고 싶은 분. Bash, Read, Write 등 코드 도구를 활용하는 스킬을 구축합니다.' },
            { label: '파워 유저 (Power users)', desc: 'MCP 서버를 직접 만들지는 않지만, 기존 도구를 활용한 코드 없는 스킬을 만들고 싶은 분. 문서 작성, 리서치 프레임워크, 분석 워크플로우 등을 스킬로 구축합니다.' },
            { label: '팀 (Teams)', desc: '팀 전체의 워크플로우를 표준화하고 효율을 높이고 싶은 조직. 관리자가 워크스페이스 전체에 스킬을 배포할 수 있으며 (2025년 12월 18일 출시), 자동 업데이트와 중앙 관리가 가능합니다.' },
          ],
        },
        {
          title: '가이드 구성',
          body: '이 가이드는 6개 챕터와 3개 부록으로 구성되어 있습니다.',
          items: [
            { label: '제1장: 기초', desc: '스킬의 구조, 핵심 설계 원칙, MCP와의 관계를 이해합니다.' },
            { label: '제2장: 설계와 기획', desc: '유스 케이스 정의, 기술 요구사항, YAML 프론트매터, 효과적인 지시사항 작성까지의 전 과정을 다룹니다.' },
            { label: '제3장: 테스트와 반복', desc: '수동/스크립트/API 테스트 방법과 피드백 기반 반복 개선을 배웁니다.' },
            { label: '제4장: 배포와 공유', desc: '배포 모델, 오픈 스탠다드, API 연동, 포지셔닝 전략을 다룹니다.' },
            { label: '제5장: 패턴과 문제 해결', desc: '검증된 5가지 패턴과 일반적인 문제 해결법을 다룹니다.' },
            { label: '제6장: 리소스', desc: '공식 문서, 예제, 도구, 지원 채널을 안내합니다.' },
          ],
          tip: 'MCP 서버가 있고 상위 2~3개 워크플로우를 알고 있다면, 한 번의 세션에서 15~30분 만에 기능하는 스킬을 구축하고 테스트할 수 있습니다.',
        },
      ],
    },

    twoPaths: {
      title: '두 가지 경로',
      body: '이 가이드는 두 가지 유형의 스킬 빌더를 위해 설계되었습니다. 어떤 경로를 선택하든 동일한 SKILL.md 형식을 사용합니다.',
      subsections: [
        {
          title: '경로 1: 독립형 스킬 (Standalone Skills)',
          body: '독립형 스킬은 외부 서비스 없이 Claude의 내장 도구(Read, Write, Bash 등)만으로 동작합니다. 코드 생성, 문서 작성, 분석 프레임워크 등에 적합합니다.',
          items: [
            { label: '핵심 챕터', desc: '기초(Ch.1)와 설계 & 기획(Ch.2)에 집중' },
            { label: '도구', desc: 'Read, Write, Edit, Bash, Glob, Grep, WebFetch, WebSearch' },
            { label: '예시', desc: '코드 리뷰 스킬, 문서 생성 스킬, 분석 프레임워크 스킬' },
          ],
        },
        {
          title: '경로 2: MCP 강화 스킬 (MCP-Enhanced Skills)',
          body: 'MCP 서버를 통해 GitHub, Slack, 데이터베이스, Figma 등 외부 서비스와 연동하는 스킬입니다. 스킬과 MCP의 관계는 요리에 비유할 수 있습니다 — MCP가 주방(도구)이라면, 스킬은 레시피(지시사항)입니다.',
          items: [
            { label: '핵심 챕터', desc: 'MCP와 스킬(Ch.1) 섹션에 집중' },
            { label: 'MCP가 제공하는 것', desc: '연결성 — 외부 서비스와의 통신 채널' },
            { label: '스킬이 제공하는 것', desc: '지식 — 언제, 어떻게, 어떤 순서로 도구를 사용할지에 대한 가이드' },
          ],
          note: '스킬 없이 MCP만 사용하면 사용자가 무엇을 할 수 있는지 모르고, 결과가 일관되지 않으며, 지원 요청이 증가합니다. 스킬을 추가하면 사전 구축된 워크플로우, 일관된 사용 방식, 베스트 프랙티스가 내장됩니다.',
        },
      ],
      highlights: [
        '두 유형 모두 동일한 SKILL.md 형식을 사용합니다.',
        '독립형 스킬은 기초와 설계에 집중하세요.',
        'MCP 스킬은 "MCP와 스킬" 섹션을 반드시 읽으세요.',
        '하나의 스킬에서 내장 도구와 MCP 도구를 혼합할 수 있습니다.',
      ],
    },

    // =========================================================================
    // 제1장: 기초
    // =========================================================================

    whatIsASkill: {
      title: '스킬의 구조',
      body: '스킬은 Claude에게 작업을 가르치는 폴더입니다. 핵심은 SKILL.md 파일이며, 선택적으로 스크립트, 참조 문서, 에셋 파일을 포함할 수 있습니다.',
      subsections: [
        {
          title: '폴더 구조',
          body: '스킬 폴더는 다음과 같이 구성됩니다.',
          items: [
            { label: 'SKILL.md (필수)', desc: '마크다운 + YAML 프론트매터로 작성된 지시사항 파일. 스킬의 핵심입니다.' },
            { label: 'scripts/ (선택)', desc: '실행 가능한 코드 파일을 포함합니다. 검증 스크립트, 자동화 스크립트 등을 넣습니다.' },
            { label: 'references/ (선택)', desc: '필요할 때 로드되는 참고 문서입니다. 프로그레시브 디스클로저의 3단계에 해당합니다.' },
            { label: 'assets/ (선택)', desc: '템플릿, 폰트, 아이콘 등 스킬에서 사용하는 정적 리소스입니다.' },
          ],
          warning: '스킬 폴더 안에 README.md 파일을 넣지 마세요. Claude가 스킬 지시사항과 혼동할 수 있습니다.',
        },
        {
          title: 'SKILL.md 파일 구조',
          body: 'SKILL.md는 두 부분으로 구성됩니다: 상단의 YAML 프론트매터(메타데이터)와 하단의 마크다운 본문(지시사항).',
          items: [
            { label: 'YAML 프론트매터', desc: '--- 구분자 사이에 name, description, tools 등의 메타데이터를 정의합니다. 항상 시스템 프롬프트에 로드됩니다.' },
            { label: '마크다운 본문', desc: '프론트매터 아래에 Claude가 따를 지시사항을 마크다운으로 작성합니다. 스킬이 활성화될 때 로드됩니다.' },
          ],
          note: '파일명은 반드시 SKILL.md (대문자)여야 합니다. skill.md, Skill.md 등은 인식되지 않습니다.',
        },
        {
          title: '스킬 설치 위치',
          body: '스킬은 전역(Global) 또는 프로젝트(Project) 수준으로 설치할 수 있습니다.',
          comparison: {
            headers: ['위치', '경로', '특징'],
            rows: [
              ['전역', '~/.claude/skills/<name>/SKILL.md', '모든 프로젝트에서 사용 가능'],
              ['프로젝트', '.claude/skills/<name>/SKILL.md', '해당 프로젝트에서만 사용, 우선순위 높음'],
              ['Claude.ai', '설정 > Capabilities > Skills에서 업로드', 'ZIP 파일로 업로드'],
            ],
          },
        },
      ],
    },

    coreDesignPrinciples: {
      title: '핵심 설계 원칙',
      body: '효과적인 스킬을 만들기 위한 세 가지 핵심 설계 원칙이 있습니다. 이 원칙들을 따르면 유지보수가 쉽고, 다른 스킬과 잘 조합되며, 다양한 환경에서 동작하는 스킬을 만들 수 있습니다.',
      subsections: [
        {
          title: 'Progressive Disclosure (점진적 공개)',
          body: '스킬의 내용을 3단계로 나누어 필요한 만큼만 로드합니다. 이를 통해 토큰 사용을 최소화하면서도 전문 지식을 유지합니다.',
          items: [
            { label: '1단계: YAML 프론트매터', desc: '항상 시스템 프롬프트에 로드됩니다. name과 description을 통해 Claude가 스킬의 존재와 용도를 인지합니다.' },
            { label: '2단계: SKILL.md 본문', desc: '스킬이 관련성 있다고 판단될 때 로드됩니다. 핵심 지시사항과 워크플로우 단계를 포함합니다.' },
            { label: '3단계: 연결된 파일', desc: '스킬 디렉토리 내의 추가 파일(references/, scripts/ 등)입니다. 필요할 때만 로드되어 컨텍스트를 절약합니다.' },
          ],
          tip: 'SKILL.md는 5,000단어 이하로 유지하세요. 상세한 문서는 references/ 폴더에 분리하고, SKILL.md에서 링크하세요.',
        },
        {
          title: 'Composability (조합 가능성)',
          body: 'Claude는 여러 스킬을 동시에 로드할 수 있습니다. 따라서 각 스킬은 독립적이고 다른 스킬과 함께 잘 작동해야 합니다.',
          items: [
            { label: '단일 책임 원칙', desc: '하나의 스킬은 하나의 역할만 담당합니다.' },
            { label: '명확한 경계', desc: '스킬의 입력과 출력이 분명해야 합니다.' },
            { label: '부작용 최소화', desc: '다른 스킬의 동작에 영향을 주지 않아야 합니다.' },
          ],
          good: 'code-formatter, test-runner, deploy-service 각각 독립된 스킬로 분리. 관련 기능을 "스킬 팩"으로 묶는 것도 고려할 수 있습니다.',
          bad: 'do-everything 하나의 스킬에서 포맷, 린트, 테스트, 배포를 모두 처리',
        },
        {
          title: 'Portability (이식성)',
          body: '스킬은 Claude.ai, Claude Code, API 등 모든 Claude 환경에서 동일하게 동작해야 합니다. 특정 환경에 의존하는 하드코딩된 경로나 설정을 피하세요. 스킬의 compatibility 필드를 통해 특정 플랫폼에 최적화된 스킬임을 명시할 수 있습니다.',
          items: [
            '하드코딩된 절대 경로 사용 금지',
            '환경 변수는 SKILL.md에 직접 포함하지 않기',
            '특정 OS에 의존하는 명령어 피하기',
          ],
          warning: 'SKILL.md에 API 키, 비밀번호 등 민감한 정보를 절대 포함하지 마세요.',
        },
      ],
    },

    mcpAndSkills: {
      title: 'MCP와 스킬',
      body: 'MCP(Model Context Protocol) 빌더에게 스킬은 기존 커넥터의 가치를 극대화하는 방법입니다. 스킬은 MCP 통합을 더 완전하게 만듭니다. 사용자 관점에서 MCP만 제공하는 것에 비해 스킬까지 함께 제공하면 가치 실현까지의 경로가 훨씬 빠릅니다.',
      subsections: [
        {
          title: '주방 비유: MCP와 스킬의 관계',
          body: 'MCP는 전문 주방(Kitchen) 자체이고, 스킬은 레시피(Recipe)입니다.',
          items: [
            { label: 'MCP = 전문 주방', desc: '도구, 재료, 장비에 대한 접근을 제공합니다. 외부 서비스에 연결하고, 실시간 데이터 접근과 도구 호출을 가능하게 합니다.' },
            { label: '스킬 = 레시피', desc: '무언가 가치 있는 것을 만들기 위한 단계별 지시사항입니다. 워크플로우와 베스트 프랙티스를 담고 있습니다.' },
            { label: '함께 사용', desc: '주방(MCP)과 레시피(스킬)가 합쳐져야 사용자가 매 단계를 직접 파악하지 않고도 복잡한 작업을 완수할 수 있습니다.' },
          ],
          comparison: {
            headers: ['MCP (연결성)', '스킬 (지식)'],
            rows: [
              ['서비스에 Claude를 연결 (Notion, Asana, Linear 등)', '서비스를 효과적으로 사용하는 방법을 Claude에게 가르침'],
              ['실시간 데이터 접근과 도구 호출 제공', '워크플로우와 베스트 프랙티스를 캡처'],
              ['Claude가 무엇을 할 수 있는지 정의', 'Claude가 어떻게 해야 하는지 정의'],
            ],
          },
        },
        {
          title: 'MCP 사용자에게 스킬이 중요한 이유',
          body: '스킬 없이 MCP만 사용하면 여러 문제가 발생합니다.',
          items: [
            '사용자가 MCP를 연결하지만 다음에 무엇을 해야 할지 모름',
            '"이 연동으로 X를 어떻게 하나요?" 같은 지원 티켓 증가',
            '매 대화가 처음부터 시작됨',
            '사용자마다 다르게 프롬프트하여 일관되지 않은 결과 발생',
            '실제 문제는 워크플로우 가이드인데 사용자가 커넥터를 탓함',
          ],
          tip: 'MCP 서버를 이미 보유하고 있다면, 가장 자주 사용되는 2~3개 워크플로우를 스킬로 만드세요. 스킬을 추가하면: 사전 구축된 워크플로우가 필요할 때 자동 활성화되고, 일관되고 신뢰할 수 있는 도구 사용이 가능하며, 베스트 프랙티스가 매 상호작용에 내장되고, 연동의 학습 곡선이 낮아집니다.',
        },
        {
          title: 'MCP 도구 선언 방법',
          body: 'MCP 도구를 사용하려면 YAML 프론트매터의 tools 목록에 mcp: 접두사와 함께 서버명을 추가합니다. 내장 도구와 MCP 도구를 함께 선언할 수 있습니다.',
          items: [
            { label: '내장 도구', desc: 'Read, Write, Bash, Glob, Grep 등 — 설정 불필요' },
            { label: 'MCP 도구', desc: 'mcp: github, mcp: slack, mcp: postgres 등 — MCP 서버 사전 설정 필요' },
          ],
          note: 'MCP 서버는 Claude.ai의 Settings > Extensions나 ~/.claude/mcp.json에 미리 설정되어 있어야 합니다.',
        },
      ],
    },

    // =========================================================================
    // 제2장: 설계와 기획
    // =========================================================================

    useCases: {
      title: '사용 사례',
      body: '스킬을 설계하기 전에 명확한 사용 사례를 정의해야 합니다. 2~3개의 구체적인 사용 사례를 먼저 식별하세요.',
      subsections: [
        {
          title: 'Ask yourself: 사용 사례 정의 프레임워크',
          body: '공식 가이드에서 제시하는 4가지 핵심 질문으로 사용 사례를 정의합니다.',
          items: [
            { label: '사용자가 원하는 것은?', desc: '"새 프로젝트 워크스페이스를 설정해줘" — 사용자는 결과를 설명하고, 스킬이 도구를 처리합니다.' },
            { label: '어떤 다단계 워크플로우가 필요한가?', desc: '프로젝트 생성 → 작업 생성 → 팀에 할당 → 일정 설정' },
            { label: '어떤 도구가 필요한가 (내장 또는 MCP)?', desc: 'Linear MCP의 create_project, create_task, assign_user 등' },
            { label: '어떤 도메인 지식이나 베스트 프랙티스가 내장되어야 하는가?', desc: '작업 추정 기준, 스프린트 용량 규칙, 팀 가용성 패턴' },
          ],
          note: '이 4가지 질문에 답할 수 있어야 좋은 사용 사례가 정의된 것입니다. 예시: "Sprint Planning with Linear MCP" 스킬.',
        },
        {
          title: '사용 사례 선정 기준',
          items: [
            { label: '반복성', desc: '자주 수행하는 작업일수록 스킬로 만들 가치가 큼' },
            { label: '구체성', desc: '"코드 도움" 대신 "Express.js REST API 엔드포인트 생성"처럼 구체적으로 정의' },
            { label: '측정 가능성', desc: '성공/실패를 명확히 판단할 수 있는 결과' },
            { label: '독립성', desc: '다른 스킬에 의존하지 않고 단독으로 실행 가능' },
          ],
          tip: '가장 효과적인 스킬 제작자들은 단일한 도전적 작업에 대해 반복합니다. Claude가 성공할 때까지 하나의 작업을 반복하고, 그 성공 접근법을 스킬로 추출한 다음 다양한 테스트 케이스로 확장합니다.',
        },
      ],
    },

    skillCategories: {
      title: '스킬 카테고리',
      body: '공식 가이드에서 제시하는 일반적인 스킬 사용 사례 카테고리입니다. 각 카테고리의 특징과 대표적인 예시를 이해하면 자신에게 맞는 스킬 유형을 선택하는 데 도움이 됩니다.',
      subsections: [
        {
          title: '카테고리 1: 문서 & 에셋 생성 (Document & Asset Creation)',
          body: '기존 코드나 데이터를 분석하여 문서, 프레젠테이션, 스프레드시트, 프론트엔드 디자인을 자동 생성하는 스킬입니다. 외부 도구 없이 Claude의 내장 기능만 사용합니다.',
          items: [
            { label: 'frontend-design 스킬', desc: 'Figma 에셋을 기반으로 프론트엔드 UI를 생성합니다.' },
            { label: 'docx / pptx / xlsx 스킬', desc: 'DOCX, PPTX, XLSX 형식의 문서를 자동 생성합니다.' },
            { label: 'pdf 스킬', desc: 'PDF 형식의 보고서나 문서를 생성합니다.' },
          ],
          tip: '핵심 기법: 내장된 스타일 가이드와 브랜드 기준 / 일관된 출력을 위한 템플릿 구조 / 최종 결과물 완성 전 품질 체크리스트 / 외부 도구 불필요 - Claude의 내장 기능만 활용',
        },
        {
          title: '카테고리 2: 워크플로우 자동화 (Workflow Automation)',
          body: '여러 단계로 구성된 작업을 자동화하는 스킬입니다. 순차 실행과 조건부 분기가 핵심입니다.',
          items: [
            { label: 'skill-creator 스킬', desc: '자연어 설명에서 새로운 스킬을 자동 생성하고 리뷰합니다.' },
            { label: '릴리스 워크플로우', desc: '버전 범프 → 태그 → 배포의 전체 과정을 자동화합니다.' },
            { label: 'Feature branch 워크플로우', desc: '브랜치 생성 → 구현 → 테스트 → PR 생성까지 자동화합니다.' },
          ],
          tip: '핵심 기법: 검증 게이트가 있는 단계별 워크플로우 / 공통 구조를 위한 템플릿 / 내장된 리뷰 및 개선 제안 / 반복적 개선 루프',
        },
        {
          title: '카테고리 3: MCP 강화 스킬 (MCP Enhancement)',
          body: 'MCP 서버의 기능을 워크플로우 수준으로 끌어올리는 스킬입니다. MCP가 도구를 제공하고, 스킬이 그 도구의 최적 사용법을 가르칩니다.',
          items: [
            { label: 'sentry-code-review 스킬', desc: 'Sentry MCP를 활용하여 에러를 분석하고 코드 수정을 제안합니다.' },
            { label: 'GitHub 이슈 관리', desc: 'GitHub MCP를 통해 이슈 분류, PR 리뷰, 라벨링을 자동화합니다.' },
            { label: '디자인-개발 핸드오프', desc: 'Figma MCP + Drive MCP + Linear MCP를 조합한 다중 서비스 워크플로우입니다.' },
          ],
          tip: '핵심 기법: 여러 MCP 호출을 순서대로 조율 / 도메인 전문지식 내장 / 사용자가 따로 지정할 필요 없는 컨텍스트 제공 / 일반적인 MCP 오류에 대한 에러 핸들링',
        },
      ],
    },

    successCriteria: {
      title: '성공 기준',
      body: '스킬의 성공을 측정하기 위한 명확한 기준을 정의해야 합니다. 공식 가이드에서는 정량적 지표와 정성적 지표를 함께 설정하도록 권장합니다.\n\n중요: 이 수치들은 정밀한 통과/불통과 기준이 아니라 대략적인 벤치마크(rough benchmarks)입니다. 엄밀함을 목표로 하되, 어느 정도 감각 기반 평가(vibes-based assessment) 요소가 있음을 인정해야 합니다.',
      subsections: [
        {
          title: '정량적 지표 (Quantitative Metrics)',
          items: [
            { label: '트리거 정확도 (>90%)', desc: '관련 쿼리의 90% 이상에서 스킬이 정상 트리거되어야 합니다. 측정법: 10~20개 테스트 쿼리를 실행하여 자동 로드 vs 수동 호출 비율을 추적합니다.' },
            { label: '도구 호출 효율', desc: 'X회 이하의 도구 호출로 워크플로우를 완료해야 합니다. 측정법: 스킬 사용/미사용 시 동일 작업을 비교하여 도구 호출 횟수와 총 토큰 소비량을 계산합니다.' },
            { label: 'API 호출 성공률 (0 실패)', desc: '실패한 API 호출이 0건이어야 합니다. 측정법: 테스트 실행 중 MCP 서버 로그를 모니터링하여 재시도율과 에러 코드를 추적합니다.' },
            { label: '토큰 사용량', desc: '스킬 미사용 대비 토큰 소비가 감소해야 합니다.' },
          ],
        },
        {
          title: '정성적 지표 (Qualitative Metrics)',
          items: [
            { label: '자율성', desc: '사용자가 다음 단계를 프롬프트할 필요가 없어야 합니다.' },
            { label: '정확성', desc: '수정 없이 워크플로우가 완료되어야 합니다.' },
            { label: '일관성', desc: '동일한 입력에 대해 일관된 결과가 나와야 합니다.' },
          ],
        },
        {
          title: '성공 기준 예시',
          good: '프로젝트명 "Q4 Planning"과 5개 작업 설명이 주어졌을 때, 프로젝트가 올바른 속성으로 생성되고, 5개 작업이 생성되어 프로젝트에 연결되며, API 에러가 0건이어야 한다.',
          bad: '잘 동작하면 된다.',
        },
      ],
      tip: '성공 기준은 SKILL.md의 지시사항에 명시적으로 포함하세요. Claude가 스스로 검증할 수 있는 기준이 가장 좋습니다.',
    },

    technicalRequirements: {
      title: '기술 요구사항',
      body: '스킬의 기술적 요구사항은 단순하지만 엄격합니다. 파일 구조, 명명 규칙, YAML 프론트매터 형식을 정확히 따라야 합니다.',
      subsections: [
        {
          title: '필수 규칙 (Critical Rules)',
          items: [
            { label: 'SKILL.md 명명', desc: '파일명은 정확히 SKILL.md (대소문자 구분). skill.md나 Skill.md는 인식 불가.' },
            { label: 'kebab-case 폴더명', desc: '폴더명은 소문자 kebab-case만 허용. my-cool-skill (O), My Cool Skill (X), notion_project_setup (X, 언더스코어 금지), NotionProjectSetup (X, 대문자 금지)' },
            { label: 'README.md 금지', desc: '스킬 폴더 안에 README.md를 넣지 마세요. Claude가 지시사항과 혼동합니다.' },
            { label: 'XML 태그 금지', desc: 'YAML 프론트매터에 < > 태그를 사용할 수 없습니다 (보안 제한).' },
            { label: '예약된 이름', desc: '"claude"나 "anthropic"으로 시작하는 스킬명은 사용 불가 (예약어).' },
          ],
        },
        {
          title: 'YAML 프론트매터: 최소 필수 형식',
          body: '가장 간단한 스킬은 name과 description만 있으면 됩니다. --- 구분자 사이에 작성합니다.',
          items: [
            { label: 'name (필수)', desc: 'kebab-case, 폴더명과 일치해야 함' },
            { label: 'description (필수)', desc: '스킬이 무엇을 하는지(WHAT), 언제 사용하는지(WHEN), 핵심 기능(capabilities)을 포함. 1024자 이하.' },
          ],
          warning: 'name 필드에 공백이나 대문자가 포함되면 "Invalid skill name" 에러가 발생합니다.',
        },
        {
          title: 'description 필드 작성법',
          body: 'description은 스킬에서 가장 중요한 필드입니다. Claude가 스킬을 언제 트리거할지 결정하는 핵심 정보입니다.',
          good: 'Sprint planning workspace setup for Linear. Creates projects with tasks, assigns team members, and configures sprint timelines. Use for: "set up a new project", "create sprint workspace", "initialize project with tasks".',
          bad: 'Helps with projects.',
          tip: 'description에 사용자가 실제로 사용할 트리거 문구를 포함하세요. "Use for:" 다음에 구체적인 문구를 나열하면 트리거 정확도가 높아집니다.',
        },
        {
          title: '선택 필드',
          items: [
            { label: 'license', desc: 'MIT 등 오픈소스 라이선스 지정 (선택)' },
            { label: 'compatibility', desc: '특정 플랫폼에 최적화된 스킬임을 명시 (선택)' },
            { label: 'allowed-tools', desc: '특정 도구 사용 패턴만 허용하는 화이트리스트 (선택)' },
            { label: 'metadata', desc: 'author, version, mcp-server, category, tags, documentation, support 등 사용자 정의 필드 (선택)' },
          ],
        },
      ],
    },

    writingEffectiveSkills: {
      title: '효과적인 스킬 작성법',
      body: '좋은 스킬은 명확한 구조, 구체적인 지시사항, 에러 처리, 프로그레시브 디스클로저를 갖추고 있습니다. 공식 가이드에서 권장하는 SKILL.md 본문 작성 구조와 베스트 프랙티스를 다룹니다.',
      subsections: [
        {
          title: '권장 SKILL.md 본문 구조',
          body: '공식 가이드에서 권장하는 마크다운 본문 구조입니다.',
          items: [
            { label: '# 스킬명', desc: '스킬의 이름과 한 줄 설명' },
            { label: '## Overview', desc: '스킬이 하는 일과 트리거 조건을 간결하게 설명' },
            { label: '## Workflow', desc: '단계별 실행 과정을 번호 매겨 작성. 예: Step 1: Gather requirements → Step 2: Call MCP tool → Step 3: Validate result' },
            { label: '## Requirements', desc: '필수 조건과 전제사항 명시' },
            { label: '## Error Handling', desc: '오류 발생 시 대처 방법 정의' },
            { label: '## Examples', desc: '실제 사용 예제 (기본 + 고급)' },
            { label: '## Troubleshooting', desc: '일반적인 문제 상황과 해결법' },
          ],
        },
        {
          title: 'description 필드 작성법',
          body: 'description은 스킬의 트리거링을 좌우하는 가장 중요한 필드입니다. 사용자가 실제로 입력할 법한 트리거 문구를 포함해야 합니다.',
          good: '"PayFlow payment processing for e-commerce. Use specifically for online payment workflows, not for general financial queries."',
          bad: '"Helps with projects" (너무 모호) / "Creates sophisticated multi-page documentation systems" (트리거 문구 없음) / "Implements the Project entity model with hierarchical relationships" (너무 기술적, 사용자 언어가 아님)',
          tip: 'description은 WHAT(무엇을 하는지)과 WHEN(언제 사용하는지)을 모두 포함해야 합니다. 관련 파일 타입이 있다면 그것도 언급하세요.',
        },
        {
          title: '지시사항 작성 베스트 프랙티스',
          items: [
            { label: '구체적이고 실행 가능하게', desc: '"적절히 처리하라" 대신 "create_project 호출 전에 project name이 비어있지 않은지 확인하라"' },
            { label: '에러 처리 포함', desc: '실행 전 필수 조건 검증, 실패 시 롤백 전략, 명확한 에러 메시지 출력' },
            { label: '번들된 리소스 참조', desc: '상세한 문서는 references/에 넣고 "자세한 내용은 references/api-guide.md를 참조"로 연결' },
            { label: '프로그레시브 디스클로저 활용', desc: '핵심 지시사항은 SKILL.md에, 상세 참조는 별도 파일로 분리' },
          ],
        },
        {
          title: '피해야 할 패턴',
          items: [
            { label: '지시사항이 너무 장황함', desc: '간결하게, 불릿 포인트와 번호 목록을 사용하세요. 상세 문서는 references/로 분리하세요.' },
            { label: '지시사항이 묻혀 있음', desc: '중요한 지시사항은 문서 상단에 배치하세요. ## Important 또는 ## Critical 헤더를 사용하세요.' },
            { label: '모호한 언어', desc: '"적절히 처리하라" 대신 구체적인 조건과 행동을 명시하세요.' },
          ],
          good: 'CRITICAL: create_project 호출 전에 다음을 검증하라:\n- Project name이 비어있지 않을 것\n- 최소 1명의 팀 멤버가 할당되어 있을 것\n- 시작 날짜가 과거가 아닐 것',
          bad: 'Make sure to validate things properly',
        },
        {
          title: '고급 기법: 명시적 격려',
          body: '공식 가이드에서는 Claude의 "게으름(laziness)"을 방지하기 위해 명시적 격려를 SKILL.md에 추가하는 것을 권장합니다.',
          tip: '"Performance Notes - Take your time to do this thoroughly - Quality is more important than speed - Do not skip validation steps" 같은 문구를 추가하면 Claude가 단계를 건너뛰지 않습니다. 참고: 이 기법은 SKILL.md보다 user prompt에 넣는 것이 더 효과적입니다.',
        },
      ],
    },

    // =========================================================================
    // 제3장: 테스트와 반복
    // =========================================================================

    testingApproaches: {
      title: '테스트 접근법',
      body: '스킬은 필요에 따라 다양한 수준의 엄밀도로 테스트할 수 있습니다. 소규모 팀 내부용 스킬과 수천 명의 엔터프라이즈 사용자에게 배포되는 스킬은 다른 테스트 수준이 필요합니다.',
      subsections: [
        {
          title: '3가지 테스트 수준',
          items: [
            { label: '수동 테스트 (Claude.ai)', desc: 'Claude.ai에서 직접 쿼리를 실행하고 동작을 관찰합니다. 빠른 반복이 가능하며, 별도 설정이 불필요합니다.' },
            { label: '스크립트 테스트 (Claude Code)', desc: 'Claude Code에서 자동화된 테스트 케이스를 실행합니다. 변경 사항에 대한 반복 가능한 검증이 가능합니다.' },
            { label: '프로그래매틱 테스트 (API)', desc: '스킬 API를 통해 정의된 테스트 세트에 대해 체계적으로 평가하는 테스트 스위트를 구축합니다.' },
          ],
        },
        {
          title: '핵심 원칙: 단일 작업에서 먼저 반복하라',
          body: '가장 효과적인 스킬 제작자들은 먼저 하나의 도전적인 작업에 대해 반복합니다. Claude가 성공할 때까지 반복하고, 그 성공적인 접근법을 스킬로 추출합니다. 이는 Claude의 인컨텍스트 학습을 활용하여 광범위한 테스트보다 더 빠른 신호를 얻습니다.',
          tip: '작동하는 기반이 생기면 여러 테스트 케이스로 확장하세요.',
        },
      ],
    },

    testingAreas: {
      title: '테스트 영역',
      body: '공식 가이드에서 권장하는 효과적인 스킬 테스트는 세 가지 영역을 다룹니다: 트리거링 테스트, 기능 테스트, 성능 비교.',
      subsections: [
        {
          title: '1. 트리거링 테스트 (Triggering Tests)',
          body: '목표: 스킬이 올바른 시점에 로드되는지 확인합니다.',
          items: [
            { label: '명백한 작업에 트리거됨', desc: '"ProjectHub에 새 프로젝트 워크스페이스를 설정해줘" → 트리거 되어야 함' },
            { label: '바꿔 말한 요청에도 트리거됨', desc: '"ProjectHub에 프로젝트를 만들어야 해" → 트리거 되어야 함' },
            { label: '관련 없는 주제에는 트리거 안 됨', desc: '"샌프란시스코 날씨 어때?" → 트리거 되지 않아야 함' },
          ],
        },
        {
          title: '2. 기능 테스트 (Functional Tests)',
          body: '목표: 스킬이 올바른 결과를 생성하는지 확인합니다.',
          items: [
            '유효한 출력이 생성되는가',
            'API 호출이 성공하는가',
            '에러 처리가 정상 동작하는가',
            '엣지 케이스가 처리되는가',
          ],
          note: '기능 테스트 예시: "프로젝트명 \'Q4 Planning\'과 5개 작업 설명이 주어졌을 때 → 프로젝트가 생성되고, 5개 작업이 연결되며, API 에러가 0건"',
        },
        {
          title: '3. 성능 비교 (Performance Comparison)',
          body: '목표: 스킬이 기존 방식 대비 개선되었음을 증명합니다. Define Success Criteria에서 설정한 지표를 사용하여 베이스라인을 비교합니다.',
          comparison: {
            headers: ['지표', '스킬 미사용', '스킬 사용'],
            rows: [
              ['워크플로우', '매번 사용자 지시', '자동 실행'],
              ['주고받기 횟수', '15회', '2회 확인만'],
              ['API 실패', '3회 (재시도 필요)', '0회'],
              ['토큰 소비', '~12,000', '~6,000'],
            ],
          },
        },
      ],
    },

    skillCreatorTool: {
      title: '스킬 크리에이터 도구',
      body: 'skill-creator 스킬은 Claude.ai 플러그인 디렉토리와 Claude Code에서 다운로드할 수 있는 공식 스킬 제작 도구입니다. MCP 서버가 있고 상위 2~3개 워크플로우를 알고 있다면, 한 번의 세션에서 15~30분 만에 기능하는 스킬을 구축하고 테스트할 수 있습니다.',
      subsections: [
        {
          title: '스킬 생성 (Creating Skills)',
          items: [
            '자연어 설명에서 스킬을 자동 생성',
            '올바른 형식의 SKILL.md와 프론트매터를 생성',
            '트리거 문구와 구조를 제안',
          ],
        },
        {
          title: '스킬 리뷰 (Reviewing Skills)',
          items: [
            '모호한 description, 누락된 트리거, 구조적 문제 등 일반적인 이슈를 플래그',
            '과다/과소 트리거 위험을 식별',
            '스킬의 목적에 기반한 테스트 케이스를 제안',
          ],
        },
        {
          title: '반복적 개선 (Iterative Improvement)',
          body: '스킬 사용 중 엣지 케이스나 실패를 발견하면, 그 사례를 skill-creator에게 가져가 개선할 수 있습니다.',
          tip: '"Use the issues & solution identified in this chat to improve how the skill handles [specific edge case]"와 같이 구체적으로 요청하세요.',
          note: 'skill-creator는 스킬 설계와 개선을 도와주지만, 자동화된 테스트 스위트를 실행하거나 정량적 평가 결과를 생성하지는 않습니다.',
        },
        {
          title: '사용 방법',
          body: 'Claude.ai나 Claude Code에서 다음과 같이 호출합니다:\n\n"Use the skill-creator skill to help me build a skill for [your use case]"',
        },
      ],
    },

    iterationFeedback: {
      title: '반복과 피드백',
      body: '스킬은 살아있는 문서입니다. 사용 피드백에 기반하여 반복적으로 개선해야 합니다. 공식 가이드에서는 세 가지 주요 피드백 신호와 각각의 해결 방법을 제시합니다.',
      subsections: [
        {
          title: '과소 트리거 신호 (Undertriggering)',
          body: '스킬이 관련 있는 질문에서도 로드되지 않는 경우입니다.',
          items: [
            '스킬이 로드되어야 할 때 로드되지 않음',
            '사용자가 수동으로 스킬을 활성화해야 함',
            '"언제 이 스킬을 사용하나요?" 같은 지원 질문이 들어옴',
          ],
          tip: 'description에 더 많은 디테일과 뉘앙스를 추가하세요. 특히 기술 용어를 키워드로 포함시키세요.\n\n디버깅 방법: Claude에게 "When would you use the [skill name] skill?"이라고 물어보세요. Claude가 description을 인용하므로 무엇이 누락되었는지 파악할 수 있습니다.',
        },
        {
          title: '과다 트리거 신호 (Overtriggering)',
          body: '스킬이 관련 없는 쿼리에서도 로드되는 경우입니다.',
          items: [
            '관련 없는 질문에 스킬이 로드됨',
            '사용자가 스킬을 비활성화함',
            '스킬의 목적에 대한 혼란',
          ],
          tip: '세 가지 해결법:\n\n1. 네거티브 트리거 추가: "Use for statistical modeling, regression, clustering. Do NOT use for simple data exploration (use data-viz skill instead)."\n\n2. 더 구체적으로: "Processes documents" → "Processes PDF legal documents for contract review"\n\n3. 범위 명확화: "PayFlow payment processing for e-commerce. Specifically for online payment workflows, not for general financial queries."',
        },
        {
          title: '실행 이슈 신호 (Execution Issues)',
          body: '스킬은 로드되지만 Claude가 지시사항을 따르지 않는 경우입니다.',
          items: [
            '일관되지 않은 결과',
            'API 호출 실패',
            '사용자 수정이 필요함',
          ],
          tip: '지시사항을 개선하고, 에러 처리를 추가하세요. 중요한 지시사항은 SKILL.md 상단에 ## Important 또는 ## Critical 헤더로 배치하세요.',
        },
      ],
    },

    // =========================================================================
    // 제4장: 배포와 공유
    // =========================================================================

    distributionModel: {
      title: '배포 모델',
      body: '스킬은 다양한 방법으로 배포할 수 있습니다. 2026년 1월 기준의 현재 배포 모델을 설명합니다.',
      subsections: [
        {
          title: '개인 사용자 배포',
          body: '개인이 스킬을 설치하는 방법입니다.',
          items: [
            { label: '1. 스킬 폴더 다운로드', desc: 'Git clone 또는 ZIP 다운로드로 스킬 폴더를 받습니다.' },
            { label: '2. ZIP 압축 (필요시)', desc: 'Claude.ai에 업로드할 경우 폴더를 ZIP으로 압축합니다.' },
            { label: '3. Claude.ai에 업로드', desc: 'Settings > Capabilities > Skills에서 "Upload skill"을 클릭합니다.' },
            { label: '4. 또는 Claude Code 디렉토리에 배치', desc: '~/.claude/skills/ 또는 프로젝트의 .claude/skills/에 직접 배치합니다.' },
          ],
        },
        {
          title: '조직 수준 배포',
          body: '2025년 12월 18일부터 조직 관리자가 워크스페이스 전체에 스킬을 배포할 수 있습니다.',
          items: [
            '관리자가 워크스페이스 전체에 스킬 배포 가능',
            '자동 업데이트',
            '중앙 집중 관리',
          ],
        },
        {
          title: '배포 전 확인 사항',
          items: [
            '설명이 명확하고 트리거 문구가 포함되어 있는가?',
            '필요한 모든 도구가 선언되어 있는가?',
            '하드코딩된 경로나 사용자별 설정이 없는가?',
            '깨끗한 환경에서 테스트했는가?',
            '.zip 파일로 압축했는가? (Claude.ai 업로드 시)',
          ],
        },
      ],
    },

    openStandard: {
      title: '오픈 스탠다드',
      body: 'Anthropic은 Agent Skills를 오픈 스탠다드로 공개했습니다. MCP와 마찬가지로, 스킬은 도구와 플랫폼 간에 이식 가능해야 합니다. Claude를 사용하든 다른 AI 플랫폼을 사용하든 동일한 스킬이 작동해야 합니다.',
      subsections: [
        {
          title: '오픈 스탠다드의 원칙',
          items: [
            { label: '이식성', desc: '동일한 스킬이 여러 도구와 플랫폼에서 동작해야 합니다.' },
            { label: 'compatibility 필드', desc: '특정 플랫폼에 최적화된 스킬은 compatibility 필드로 이를 명시할 수 있습니다.' },
            { label: '생태계 협력', desc: 'Anthropic은 표준에 대한 생태계 참여자들과 협업하고 있습니다.' },
          ],
        },
        {
          title: '표준 기술 스택',
          items: [
            { label: 'YAML', desc: '프론트매터 메타데이터 — 널리 사용되는 데이터 직렬화 형식' },
            { label: 'Markdown', desc: '지시사항 본문 — 가독성이 높은 문서 형식' },
            { label: '파일 시스템', desc: '배포 메커니즘 — 폴더와 파일 기반의 단순한 구조' },
          ],
        },
      ],
      highlights: [
        '별도의 빌드 과정이 필요 없습니다.',
        '표준 도구(에디터, Git)만으로 충분합니다.',
        '사람이 읽고 이해할 수 있는 형식입니다.',
        'MCP와 동일한 오픈 스탠다드 철학을 따릅니다.',
      ],
    },

    skillsViaApi: {
      title: 'API를 통한 스킬',
      body: '프로그래밍 방식의 사용 — 애플리케이션 구축, 에이전트, 자동화된 워크플로우 등 — 에는 API가 스킬 관리와 실행에 대한 직접적인 제어를 제공합니다.',
      subsections: [
        {
          title: '주요 API 기능',
          items: [
            { label: '/v1/skills 엔드포인트', desc: '스킬을 나열하고 관리하는 전용 API 엔드포인트' },
            { label: 'container.skills 파라미터', desc: 'Messages API 요청에 스킬을 추가하는 파라미터' },
            { label: '버전 관리', desc: 'Claude Console을 통한 스킬 버전 관리 및 배포' },
            { label: 'Agent SDK 통합', desc: 'Claude Agent SDK로 커스텀 에이전트를 구축할 때 스킬을 활용' },
          ],
          note: 'API에서 스킬을 사용하려면 Code Execution Tool 베타가 필요합니다. 이 도구가 보안 실행 환경을 제공합니다.',
        },
        {
          title: 'Claude.ai vs API: 언제 어떤 것을 사용할까?',
          comparison: {
            headers: ['사용 사례', '권장 플랫폼'],
            rows: [
              ['최종 사용자가 스킬과 직접 상호작용', 'Claude.ai / Claude Code'],
              ['개발 중 수동 테스트와 반복', 'Claude.ai / Claude Code'],
              ['개인 맞춤형 워크플로우', 'Claude.ai / Claude Code'],
              ['프로그래밍 방식으로 스킬 사용', 'API'],
              ['프로덕션 규모 배포', 'API'],
              ['자동화된 파이프라인과 에이전트 시스템', 'API'],
            ],
          },
        },
        {
          title: '참고 문서',
          items: [
            { label: 'Skills API Quickstart', desc: 'API를 통한 스킬 사용 시작 가이드' },
            { label: 'Create Custom Skills', desc: '커스텀 스킬 생성 API 문서' },
            { label: 'Skills in the Agent SDK', desc: 'Agent SDK에서 스킬을 활용하는 방법' },
          ],
        },
      ],
    },

    recommendedApproach: {
      title: '권장 접근법',
      body: '스킬을 공유하고 배포할 때 권장하는 단계별 접근법입니다. GitHub 호스팅, MCP 문서 연동, 설치 가이드 제공의 세 가지 핵심 단계로 구성됩니다.',
      subsections: [
        {
          title: '1. GitHub에 호스팅',
          items: [
            '오픈소스 스킬을 위한 공개 리포지토리 생성',
            '설치 방법을 포함한 명확한 README 작성 (스킬 폴더 내부가 아닌 별도의 README)',
            '사용 예제와 스크린샷 포함',
          ],
        },
        {
          title: '2. MCP 문서에 연동',
          items: [
            'MCP 문서에서 스킬로의 링크 추가',
            'MCP와 스킬을 함께 사용하는 가치 설명',
            '빠른 시작 가이드 제공',
          ],
        },
        {
          title: '3. 설치 가이드 작성',
          body: '설치 가이드에 포함할 내용:',
          items: [
            { label: '1. 스킬 다운로드', desc: 'git clone 또는 ZIP 다운로드 방법' },
            { label: '2. Claude에 설치', desc: 'Claude.ai: Settings > Skills > Upload / Claude Code: skills 디렉토리에 배치' },
            { label: '3. 스킬 활성화', desc: '해당 서비스의 스킬을 토글 + MCP 서버 연결 확인' },
            { label: '4. 테스트', desc: '"Set up a new project in [Your Service]"로 테스트' },
          ],
        },
      ],
    },

    positioningYourSkill: {
      title: '스킬 포지셔닝',
      body: '스킬의 설명이 사용자가 실제로 사용해볼지를 결정합니다. README, 문서, 마케팅에서 다음 원칙을 지키세요.',
      subsections: [
        {
          title: '결과에 초점, 기능이 아닌',
          good: '"The ProjectHub skill enables teams to set up complete project workspaces in seconds — including pages, databases, and templates — instead of spending 30 minutes on manual setup."',
          bad: '"The ProjectHub skill is a folder containing YAML frontmatter and Markdown instructions that calls our MCP server tools."',
        },
        {
          title: 'MCP + 스킬 스토리 강조',
          body: '스킬은 MCP와 결합되었을 때 가장 강력합니다. 이 스토리를 효과적으로 전달하세요.',
          tip: '"Our MCP server gives Claude access to your Linear projects. Our skills teach Claude your team\'s sprint planning workflow. Together, they enable AI-powered project management." — 이처럼 MCP(접근)와 스킬(지식)의 시너지를 강조하세요.',
        },
        {
          title: '포지셔닝 체크리스트',
          items: [
            '명확한 사용 시나리오가 있는가?',
            'MCP와의 시너지가 설명되어 있는가?',
            '전제 조건이 명시되어 있는가?',
            '스킬이 하지 못하는 것이 명시되어 있는가?',
            '결과 중심으로 설명하고 있는가?',
          ],
        },
      ],
    },

    // =========================================================================
    // 제5장: 패턴과 문제 해결
    // =========================================================================

    skillPatterns: {
      title: '스킬 패턴',
      body: '이 패턴들은 초기 도입자와 내부 팀에 의해 검증된 것으로, 일반적인 접근 방식을 나타냅니다. 규범적인 템플릿이 아닌 참고 자료입니다.\n\n스킬 접근법을 선택할 때 Home Depot 비유를 생각하세요: "문제를 가지고 왔는데 점원이 적절한 도구를 알려준다" vs "도구를 가지고 왔는데 최적의 사용법을 물어본다". 대부분의 스킬은 이 둘 중 하나에 기울어집니다.',
      subsections: [
        {
          title: '패턴 1: 순차적 워크플로우 오케스트레이션 (Sequential Workflow)',
          body: '사용자가 특정 순서로 다단계 프로세스를 필요로 할 때 사용합니다.',
          items: [
            { label: '예시: 신규 고객 온보딩', desc: '계정 생성(MCP) → 결제 설정(MCP, 검증 대기) → 구독 생성(MCP) → 환영 이메일 발송(MCP)' },
            { label: '명시적 단계 순서', desc: '각 단계를 번호로 명확히 정의' },
            { label: '단계 간 의존성', desc: '이전 단계의 결과를 다음 단계에서 활용' },
            { label: '각 단계별 검증', desc: '다음으로 넘어가기 전 현재 단계의 성공 확인' },
            { label: '실패 시 롤백', desc: '문제 발생 시 이전 상태로 되돌리는 방법 정의' },
          ],
        },
        {
          title: '패턴 2: 다중 MCP 조율 (Multi-MCP Coordination)',
          body: '워크플로우가 여러 서비스에 걸쳐 있을 때 사용합니다.',
          items: [
            { label: '예시: 디자인-개발 핸드오프', desc: 'Phase 1: Figma MCP로 디자인 에셋 추출 → Phase 2: Drive MCP로 에셋 저장 → Phase 3: Linear MCP로 개발 작업 생성 → Phase 4: Slack MCP로 알림 전송' },
            { label: '명확한 단계 분리', desc: '각 MCP 서비스별로 단계를 구분' },
            { label: 'MCP 간 데이터 전달', desc: '이전 MCP의 결과를 다음 MCP에 전달' },
            { label: '다음 단계 전 검증', desc: '각 서비스 호출 결과를 검증한 후 진행' },
            { label: '중앙 집중 에러 처리', desc: '어느 MCP에서든 에러가 발생하면 통합적으로 처리' },
          ],
        },
        {
          title: '패턴 3: 반복 개선 (Iterative Refinement)',
          body: '출력 품질이 반복을 통해 개선되는 경우에 사용합니다.',
          items: [
            { label: '예시: 보고서 생성', desc: '초안 생성(MCP 데이터 수집) → 품질 체크(검증 스크립트 실행) → 이슈 식별(누락 섹션, 형식 불일치, 데이터 검증 에러) → 개선(발견된 이슈 수정) → 재검증 → 품질 기준 충족 시 최종화' },
            { label: '명시적 품질 기준', desc: '언제 반복을 멈출지 정의' },
            { label: '반복적 개선', desc: '매 사이클마다 품질이 향상됨' },
            { label: '검증 스크립트', desc: '프로그래밍 방식으로 품질을 검증 (scripts/ 폴더 활용)' },
          ],
        },
        {
          title: '패턴 4: 컨텍스트 인식 도구 선택 (Context-Aware Tool Selection)',
          body: '같은 결과를 내지만 컨텍스트에 따라 다른 도구를 사용해야 할 때 적용합니다.',
          items: [
            { label: '예시: 스마트 파일 저장', desc: '파일 유형과 크기를 확인 → 결정 트리: 대용량(>10MB) → 클라우드 스토리지 MCP / 협업 문서 → Notion/Docs MCP / 코드 파일 → GitHub MCP / 임시 파일 → 로컬 저장 → 사용자에게 선택 이유 설명' },
            { label: '명확한 결정 기준', desc: '어떤 도구를 선택할지의 조건을 명확히 정의' },
            { label: '폴백 옵션', desc: '판단이 불확실한 경우의 기본 선택지' },
            { label: '선택에 대한 투명성', desc: '왜 특정 도구를 선택했는지 사용자에게 설명' },
          ],
        },
        {
          title: '패턴 5: 도메인 특화 지능 (Domain-Specific Intelligence)',
          body: '스킬이 도구 접근 이상의 전문 지식을 추가하는 경우에 사용합니다.',
          items: [
            { label: '예시: 금융 컴플라이언스 결제 처리', desc: '처리 전 컴플라이언스 체크(제재 리스트 확인, 관할권 허용 검증, 리스크 레벨 평가, 컴플라이언스 결정 문서화) → 통과 시 결제 처리(사기 검증 적용) → 미통과 시 리뷰 플래그 및 컴플라이언스 케이스 생성 → 감사 추적 기록' },
            { label: '로직에 내장된 도메인 전문성', desc: '업계 규정, 베스트 프랙티스를 지시사항에 포함' },
            { label: '행동 전 컴플라이언스', desc: '실행 전에 규칙을 검증' },
            { label: '포괄적 문서화', desc: '모든 결정과 행동을 기록' },
            { label: '명확한 거버넌스', desc: '승인 프로세스와 에스컬레이션 경로를 정의' },
          ],
        },
      ],
    },

    troubleshooting: {
      title: '문제 해결',
      body: '스킬 개발과 사용 중 자주 발생하는 문제와 해결 방법을 공식 가이드에서 제시하는 순서대로 정리합니다.',
      subsections: [
        {
          title: '스킬이 업로드되지 않음 (Skill won\'t upload)',
          body: '"Could not find SKILL.md in uploaded folder" 에러가 발생하는 경우입니다.',
          items: [
            { label: '파일명이 정확히 SKILL.md가 아님', desc: '대소문자 구분: SKILL.md만 인식. ls -la로 확인하세요.' },
            { label: 'YAML 형식 오류', desc: '--- 구분자 누락, 닫히지 않은 따옴표, 탭 사용 등. 탭 대신 스페이스를 사용하세요.' },
          ],
        },
        {
          title: '잘못된 스킬명 (Invalid skill name)',
          body: '스킬명에 공백이나 대문자가 포함된 경우입니다.',
          items: [
            { label: '잘못된 예', desc: 'name: My Cool Skill' },
            { label: '올바른 예', desc: 'name: my-cool-skill (kebab-case, 소문자만)' },
          ],
        },
        {
          title: '스킬이 트리거되지 않음 (Skill doesn\'t trigger)',
          body: '스킬이 자동으로 로드되지 않는 경우입니다.',
          items: [
            { label: 'description이 너무 일반적?', desc: '"Helps with projects"는 작동하지 않습니다.' },
            { label: '사용자 트리거 문구 포함?', desc: '사용자가 실제로 사용할 문구를 description에 포함하세요.' },
            { label: '파일 유형 언급?', desc: '해당되는 경우 파일 유형을 description에 포함하세요.' },
          ],
          tip: '디버깅: Claude에게 "When would you use the [skill name] skill?"이라고 물어보세요. Claude가 description을 인용해서 답하므로, 무엇이 누락되었는지 파악할 수 있습니다.',
        },
        {
          title: '스킬이 너무 자주 트리거됨 (Skill triggers too often)',
          body: '관련 없는 쿼리에서도 스킬이 로드되는 경우입니다.',
          items: [
            { label: '네거티브 트리거 추가', desc: '"Do NOT use for..." 문구를 description에 추가' },
            { label: '더 구체적으로', desc: '"Processes documents" → "Processes PDF legal documents for contract review"' },
            { label: '범위 명확화', desc: '"specifically for..., not for..." 패턴 사용' },
          ],
        },
        {
          title: 'MCP 연결 문제',
          body: '스킬은 로드되지만 MCP 호출이 실패하는 경우입니다.',
          items: [
            { label: '1. MCP 서버 연결 확인', desc: 'Claude.ai: Settings > Extensions에서 "Connected" 상태 확인' },
            { label: '2. 인증 확인', desc: 'API 키 유효성, 권한/스코프, OAuth 토큰 갱신 여부 확인' },
            { label: '3. MCP 독립 테스트', desc: '스킬 없이 직접 Claude에게 MCP 도구를 요청하여 테스트. 실패하면 MCP 자체 문제.' },
            { label: '4. 도구명 확인', desc: '스킬이 참조하는 MCP 도구명이 정확한지, 대소문자가 맞는지 확인' },
          ],
        },
        {
          title: '지시사항이 따라지지 않음 (Instructions not followed)',
          body: '스킬은 로드되지만 Claude가 지시사항을 제대로 따르지 않는 경우입니다.',
          items: [
            { label: '지시사항이 너무 장황', desc: '간결하게 유지. 불릿 포인트와 번호 목록을 사용. 상세 참조는 references/로 분리.' },
            { label: '지시사항이 묻혀 있음', desc: '중요한 지시사항은 문서 상단에 배치. ## Important 헤더 사용. 핵심 포인트를 반복.' },
            { label: '모호한 언어', desc: '"Make sure to validate things properly" → 구체적인 검증 조건을 명시.' },
            { label: '모델 게으름', desc: '"Performance Notes - Take your time - Quality is more important than speed - Do not skip validation steps" 추가.' },
          ],
          note: '고급 기법: 중요한 검증에는 프로그래밍 방식의 체크를 번들하세요. 코드는 결정적이지만 언어 해석은 그렇지 않습니다. scripts/ 폴더에 검증 스크립트를 넣고 SKILL.md에서 참조하세요.',
        },
        {
          title: '컨텍스트 크기 문제 (Large context issues)',
          body: '스킬이 느려지거나 응답 품질이 저하되는 경우입니다.',
          items: [
            { label: 'SKILL.md 크기 최적화', desc: '상세 문서는 references/로 이동. 인라인 대신 링크 참조. SKILL.md는 5,000단어 이하로 유지.' },
            { label: '활성화된 스킬 수 줄이기', desc: '20~50개 이상 동시 활성화 시 성능 저하. 선택적 활성화를 권장. 관련 기능을 "스킬 팩"으로 묶기.' },
          ],
        },
      ],
    },

    // =========================================================================
    // 제6장: 리소스와 참고자료
    // =========================================================================

    officialDocs: {
      title: '공식 문서',
      body: '처음 스킬을 만든다면 Best Practices Guide로 시작하고, 필요에 따라 API 문서를 참조하세요.',
      subsections: [
        {
          title: 'Anthropic 공식 리소스',
          items: [
            { label: 'Best Practices Guide', desc: '스킬 작성을 위한 모범 사례 가이드' },
            { label: 'Skills Documentation', desc: '공식 스킬 문서 (구조, 프론트매터 등)' },
            { label: 'API Reference', desc: 'Claude API 레퍼런스 (Skills API 포함)' },
            { label: 'MCP Documentation', desc: 'Model Context Protocol 사양 및 구현 가이드' },
          ],
        },
        {
          title: '블로그 포스트',
          items: [
            { label: 'Introducing Agent Skills', desc: '에이전트 스킬 소개 공식 블로그' },
            { label: 'Equipping Agents for the Real World', desc: '실세계 에이전트 장착 - 엔지니어링 블로그' },
            { label: 'Skills Explained', desc: '스킬 개념 상세 설명' },
            { label: 'How to Create Skills for Claude', desc: 'Claude 스킬 생성 방법 가이드' },
            { label: 'Building Skills for Claude Code', desc: 'Claude Code용 스킬 구축 가이드' },
            { label: 'Improving Frontend Design through Skills', desc: '스킬을 통한 프론트엔드 디자인 개선 사례' },
          ],
        },
      ],
    },

    exampleSkills: {
      title: '예제 스킬',
      body: '공식 스킬 리포지토리와 파트너 스킬 디렉토리에서 참고할 수 있는 예제들입니다.',
      subsections: [
        {
          title: '공식 스킬 리포지토리',
          body: 'GitHub: anthropics/skills — Anthropic이 만든 커스터마이즈 가능한 스킬이 포함되어 있습니다.',
          items: [
            { label: 'Document Skills', desc: 'PDF, DOCX, PPTX, XLSX 생성 스킬' },
            { label: 'Example Skills', desc: '다양한 워크플로우 패턴을 보여주는 예제 스킬' },
          ],
        },
        {
          title: '파트너 스킬 디렉토리 (Partner Skills Directory)',
          body: '다양한 파트너사가 제공하는 스킬을 확인할 수 있습니다.',
          items: [
            { label: 'Asana', desc: '프로젝트 관리 자동화 스킬' },
            { label: 'Canva', desc: '디자인 생성 및 편집 스킬' },
            { label: 'Figma', desc: 'UI/UX 디자인 워크플로우 스킬' },
            { label: 'Sentry', desc: '에러 분석 및 코드 리뷰 스킬' },
            { label: 'Zapier', desc: '워크플로우 자동화 연동 스킬' },
          ],
          tip: '이 리포지토리들은 최신 상태를 유지합니다. 클론한 후 사용 사례에 맞게 수정하여 템플릿으로 활용하세요.',
        },
      ],
    },

    toolsAndUtilities: {
      title: '도구 및 유틸리티',
      body: '스킬 개발에 도움이 되는 공식 도구와 지원 채널입니다.',
      subsections: [
        {
          title: 'skill-creator 스킬',
          items: [
            'Claude.ai와 Claude Code에 내장되어 있음',
            '자연어 설명에서 스킬을 자동 생성',
            '기존 스킬을 리뷰하고 개선 사항을 추천',
            '"Help me build a skill using skill-creator"로 사용',
          ],
        },
        {
          title: '검증 (Validation)',
          items: [
            'skill-creator로 스킬을 평가할 수 있음',
            '"Review this skill and suggest improvements"로 리뷰 요청',
            '구조적 문제, 누락된 트리거, 모호한 description을 식별',
          ],
        },
        {
          title: '지원 채널',
          items: [
            { label: '기술 질문', desc: 'Claude Developers Discord 커뮤니티 포럼' },
            { label: '버그 리포트', desc: 'GitHub Issues: anthropics/skills/issues' },
            { label: '버그 리포트 포함 내용', desc: '스킬명, 에러 메시지, 재현 단계를 포함하세요' },
          ],
        },
      ],
    },

    // =========================================================================
    // 부록
    // =========================================================================

    quickChecklist: {
      title: '빠른 체크리스트',
      body: '이 체크리스트를 사용하여 스킬을 업로드 전후에 검증하세요. 빠른 시작을 원하면 skill-creator를 사용하여 초안을 생성한 후 이 목록으로 확인하세요.',
      subsections: [
        {
          title: '시작 전',
          items: [
            '2~3개의 구체적인 사용 사례를 식별했는가',
            '필요한 도구(내장 또는 MCP)를 식별했는가',
            '이 가이드와 예제 스킬을 검토했는가',
            '폴더 구조를 계획했는가',
          ],
        },
        {
          title: '개발 중',
          items: [
            '폴더명이 kebab-case이고 SKILL.md 파일이 존재하는가',
            'YAML 프론트매터에 --- 구분자가 있는가',
            'name 필드가 kebab-case이고 공백/대문자가 없는가',
            'description이 WHAT과 WHEN을 포함하는가',
            '어디에도 XML 태그(< >)가 없는가',
            '지시사항이 명확하고 실행 가능한가',
            '에러 처리가 포함되어 있는가',
            '예제가 제공되어 있는가',
            '참조 문서가 명확히 연결되어 있는가',
          ],
        },
      ],
      checklist: [
        '명확한 트리거 작업에서 트리거되는가 (트리거링 테스트)',
        '바꿔 말한 요청에서도 트리거되는가 (트리거링 테스트)',
        '관련 없는 주제에서는 트리거되지 않는가 (트리거링 테스트)',
        '기능 테스트를 통과하는가',
        '도구 연동이 정상 동작하는가 (해당 시)',
        '.zip 파일로 압축했는가 (Claude.ai 업로드 시)',
        '실제 대화에서 테스트했는가 (업로드 후)',
        '과소/과다 트리거를 모니터링하고 있는가',
        '사용자 피드백을 수집하고 있는가',
        'description과 지시사항을 반복적으로 개선하고 있는가',
        '메타데이터의 버전을 업데이트했는가',
      ],
    },

    yamlReference: {
      title: 'YAML 레퍼런스',
      body: 'SKILL.md의 YAML 프론트매터에서 사용할 수 있는 모든 필드와 규칙을 정리합니다.',
      subsections: [
        {
          title: '필수 필드',
          body: '가장 기본적인 스킬은 두 개의 필드만 필요합니다.',
          items: [
            { label: 'name', desc: 'kebab-case 고유 식별자. 폴더명과 반드시 일치. "claude"/"anthropic" 접두사 사용 불가.' },
            { label: 'description', desc: 'WHAT(무엇을 하는지) + WHEN(언제 사용하는지) + 트리거 문구를 포함. 1024자 이하.' },
          ],
        },
        {
          title: '모든 선택 필드',
          body: '공식 가이드에서 제시하는 전체 선택 필드 목록입니다.',
          items: [
            { label: 'license', desc: 'MIT 등 오픈소스 라이선스 (선택)' },
            { label: 'allowed-tools', desc: '도구 사용 패턴 화이트리스트. 예: "Bash(python:*) Bash(npm:*) WebFetch"' },
            { label: 'metadata.author', desc: '스킬 제작자/회사 이름' },
            { label: 'metadata.version', desc: '스킬 버전 (예: 1.0.0)' },
            { label: 'metadata.mcp-server', desc: '연결할 MCP 서버명' },
            { label: 'metadata.category', desc: '스킬 카테고리 (예: productivity)' },
            { label: 'metadata.tags', desc: '검색 태그 목록 (예: [project-management, automation])' },
            { label: 'metadata.documentation', desc: '외부 문서 URL' },
            { label: 'metadata.support', desc: '지원 이메일 또는 URL' },
          ],
        },
        {
          title: '보안 노트',
          body: 'YAML 프론트매터에서 허용되는 것과 금지되는 것을 구분합니다.',
          items: [
            { label: '허용', desc: '모든 표준 YAML 타입 (문자열, 숫자, 불리언, 리스트, 객체), 사용자 정의 metadata 필드, 최대 1024자 description' },
            { label: '금지', desc: 'XML 꺾쇠 괄호 (< >) — 보안 제한, YAML 내 코드 실행 (안전한 YAML 파싱 사용), "claude" 또는 "anthropic" 접두사 스킬명 (예약어)' },
          ],
          warning: 'YAML에 API 키, 비밀번호 등 민감한 정보를 절대 포함하지 마세요.',
        },
      ],
    },

    completeExamples: {
      title: '완전한 예제',
      body: '이 가이드에서 다룬 패턴을 실제로 구현한 프로덕션 레디 스킬들입니다. 공식 리포지토리에서 전체 코드를 확인할 수 있습니다.',
      subsections: [
        {
          title: 'Document Skills — 문서 생성 스킬',
          body: 'PDF, DOCX, PPTX, XLSX 형식의 문서를 자동 생성하는 스킬 모음입니다. 프로그레시브 디스클로저와 에러 처리의 모범 사례를 보여줍니다.',
          items: [
            { label: 'pdf 스킬', desc: 'PDF 보고서 자동 생성. 데이터 수집 → 레이아웃 → 렌더링 워크플로우.' },
            { label: 'docx 스킬', desc: 'DOCX 문서 생성. 템플릿 기반의 일관된 포맷.' },
            { label: 'pptx 스킬', desc: 'PPTX 프레젠테이션 생성. 슬라이드 레이아웃과 디자인 지침 포함.' },
            { label: 'xlsx 스킬', desc: 'XLSX 스프레드시트 생성. 차트와 수식 자동 구성.' },
          ],
        },
        {
          title: 'Example Skills — 워크플로우 패턴',
          body: '다양한 워크플로우 패턴을 보여주는 예제 스킬 모음입니다. 이 가이드의 5가지 패턴(순차적 워크플로우, 다중 MCP 조율, 반복 개선, 컨텍스트 인식 도구 선택, 도메인 특화 지능)을 실제로 구현한 예제를 포함합니다.',
        },
        {
          title: 'Partner Skills Directory — 파트너 스킬',
          body: 'Asana, Canva, Figma, Sentry, Zapier 등 다양한 파트너사가 제공하는 스킬을 확인할 수 있습니다.',
          items: [
            '각 파트너사의 MCP 서버와 최적으로 연동되는 스킬',
            '실제 프로덕션 환경에서 검증된 워크플로우',
            '클론 후 사용 사례에 맞게 커스터마이즈 가능',
          ],
          tip: '이 리포지토리들은 최신 상태를 유지합니다. 클론하여 사용 사례에 맞게 수정하고, 템플릿으로 활용하세요.',
        },
      ],
      note: '전체 소스 코드는 GitHub anthropics/skills 리포지토리에서 확인할 수 있습니다.',
    },
  },
};
