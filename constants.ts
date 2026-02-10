export interface NavItem {
  key: string;
  path: string;
}

export interface NavCategory {
  key: string;
  items: NavItem[];
}

export const NAV_DATA: NavCategory[] = [
  {
    key: 'introduction',
    items: [
      { key: 'whatAreSkills', path: '/sections/what-are-skills' },
      { key: 'whoIsThisFor', path: '/sections/who-is-this-for' },
      { key: 'twoPaths', path: '/sections/two-paths' },
    ],
  },
  {
    key: 'fundamentals',
    items: [
      { key: 'whatIsASkill', path: '/sections/what-is-a-skill' },
      { key: 'coreDesignPrinciples', path: '/sections/core-design-principles' },
      { key: 'mcpAndSkills', path: '/sections/mcp-and-skills' },
    ],
  },
  {
    key: 'planningAndDesign',
    items: [
      { key: 'useCases', path: '/sections/use-cases' },
      { key: 'skillCategories', path: '/sections/skill-categories' },
      { key: 'successCriteria', path: '/sections/success-criteria' },
      { key: 'technicalRequirements', path: '/sections/technical-requirements' },
      { key: 'writingEffectiveSkills', path: '/sections/writing-effective-skills' },
    ],
  },
  {
    key: 'testingAndIteration',
    items: [
      { key: 'testingApproaches', path: '/sections/testing-approaches' },
      { key: 'testingAreas', path: '/sections/testing-areas' },
      { key: 'skillCreatorTool', path: '/sections/skill-creator-tool' },
      { key: 'iterationFeedback', path: '/sections/iteration-feedback' },
    ],
  },
  {
    key: 'distributionAndSharing',
    items: [
      { key: 'distributionModel', path: '/sections/distribution-model' },
      { key: 'openStandard', path: '/sections/open-standard' },
      { key: 'skillsViaApi', path: '/sections/skills-via-api' },
      { key: 'recommendedApproach', path: '/sections/recommended-approach' },
      { key: 'positioningYourSkill', path: '/sections/positioning-your-skill' },
    ],
  },
  {
    key: 'patternsAndTroubleshooting',
    items: [
      { key: 'skillPatterns', path: '/sections/skill-patterns' },
      { key: 'troubleshooting', path: '/sections/troubleshooting' },
    ],
  },
  {
    key: 'resourcesAndReferences',
    items: [
      { key: 'officialDocs', path: '/sections/official-docs' },
      { key: 'exampleSkills', path: '/sections/example-skills' },
      { key: 'toolsAndUtilities', path: '/sections/tools-and-utilities' },
    ],
  },
  {
    key: 'appendices',
    items: [
      { key: 'quickChecklist', path: '/sections/quick-checklist' },
      { key: 'yamlReference', path: '/sections/yaml-reference' },
      { key: 'completeExamples', path: '/sections/complete-examples' },
      { key: 'technicalSpec', path: '/sections/technical-spec' },
    ],
  },
];

export const CHAPTER_COLORS: Record<string, { bg: string; text: string; darkBg: string; darkText: string; accent: string }> = {
  introduction: { bg: 'bg-orange-50', text: 'text-orange-700', darkBg: 'dark:bg-orange-950/30', darkText: 'dark:text-orange-300', accent: 'orange' },
  fundamentals: { bg: 'bg-green-50', text: 'text-green-700', darkBg: 'dark:bg-green-950/30', darkText: 'dark:text-green-300', accent: 'green' },
  planningAndDesign: { bg: 'bg-pink-50', text: 'text-pink-700', darkBg: 'dark:bg-pink-950/30', darkText: 'dark:text-pink-300', accent: 'pink' },
  testingAndIteration: { bg: 'bg-violet-50', text: 'text-violet-700', darkBg: 'dark:bg-violet-950/30', darkText: 'dark:text-violet-300', accent: 'violet' },
  distributionAndSharing: { bg: 'bg-blue-50', text: 'text-blue-700', darkBg: 'dark:bg-blue-950/30', darkText: 'dark:text-blue-300', accent: 'blue' },
  patternsAndTroubleshooting: { bg: 'bg-teal-50', text: 'text-teal-700', darkBg: 'dark:bg-teal-950/30', darkText: 'dark:text-teal-300', accent: 'teal' },
  resourcesAndReferences: { bg: 'bg-amber-50', text: 'text-amber-700', darkBg: 'dark:bg-amber-950/30', darkText: 'dark:text-amber-300', accent: 'amber' },
  appendices: { bg: 'bg-neutral-100', text: 'text-neutral-700', darkBg: 'dark:bg-neutral-800', darkText: 'dark:text-neutral-300', accent: 'neutral' },
};

export function getAllSections(): NavItem[] {
  return NAV_DATA.flatMap(cat => cat.items);
}

export function findCategoryForSection(sectionKey: string): string | undefined {
  for (const cat of NAV_DATA) {
    if (cat.items.some(item => item.key === sectionKey)) return cat.key;
  }
  return undefined;
}

export function pathToKey(path: string): string {
  const slug = path.replace('/sections/', '');
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// Map of chapter keys to their first section (for displaying chapter illustrations)
export const CHAPTER_FIRST_SECTIONS: Record<string, string> = {
  introduction: 'whatAreSkills',
  fundamentals: 'whatIsASkill',
  planningAndDesign: 'useCases',
  testingAndIteration: 'testingApproaches',
  distributionAndSharing: 'distributionModel',
  patternsAndTroubleshooting: 'skillPatterns',
  resourcesAndReferences: 'officialDocs',
  appendices: 'quickChecklist',
};

// Chapter illustration image paths
export const CHAPTER_ILLUSTRATIONS: Record<string, string> = {
  introduction: '/images/chapters/cover.png',
  fundamentals: '/images/chapters/fundamentals.png',
  planningAndDesign: '/images/chapters/planning-and-design.png',
  testingAndIteration: '/images/chapters/testing-and-iteration.png',
  distributionAndSharing: '/images/chapters/distribution-and-sharing.png',
  patternsAndTroubleshooting: '/images/chapters/patterns-and-troubleshooting.png',
  resourcesAndReferences: '/images/chapters/resources-and-references.png',
};

// Section audio files (Korean TTS voice-over)
export const SECTION_AUDIO: Record<string, { src: string; title: string }> = {
  // 소개
  whatAreSkills: { src: '/audio/ko/what-are-skills.m4a', title: '스킬이란? - 음성 해설' },
  whoIsThisFor: { src: '/audio/ko/who-is-this-for.m4a', title: '누구를 위한 가이드인가 - 음성 해설' },
  twoPaths: { src: '/audio/ko/two-paths.m4a', title: '두 가지 경로 - 음성 해설' },
  // 제1장: 기초
  whatIsASkill: { src: '/audio/ko/what-is-a-skill.m4a', title: '스킬의 구조 - 음성 해설' },
  coreDesignPrinciples: { src: '/audio/ko/core-design-principles.m4a', title: '핵심 설계 원칙 - 음성 해설' },
  mcpAndSkills: { src: '/audio/ko/mcp-and-skills.m4a', title: 'MCP와 스킬 - 음성 해설' },
  // 제2장: 설계와 기획
  useCases: { src: '/audio/ko/use-cases.m4a', title: '사용 사례 - 음성 해설' },
  skillCategories: { src: '/audio/ko/skill-categories.m4a', title: '스킬 카테고리 - 음성 해설' },
  successCriteria: { src: '/audio/ko/success-criteria.m4a', title: '성공 기준 - 음성 해설' },
  technicalRequirements: { src: '/audio/ko/technical-requirements.m4a', title: '기술 요구사항 - 음성 해설' },
  writingEffectiveSkills: { src: '/audio/ko/writing-effective-skills.m4a', title: '효과적인 스킬 작성법 - 음성 해설' },
  // 제3장: 테스트와 반복
  testingApproaches: { src: '/audio/ko/testing-approaches.m4a', title: '테스트 접근법 - 음성 해설' },
  testingAreas: { src: '/audio/ko/testing-areas.m4a', title: '테스트 영역 - 음성 해설' },
  skillCreatorTool: { src: '/audio/ko/skill-creator-tool.m4a', title: '스킬 크리에이터 도구 - 음성 해설' },
  iterationFeedback: { src: '/audio/ko/iteration-feedback.m4a', title: '반복과 피드백 - 음성 해설' },
  // 제4장: 배포와 공유
  distributionModel: { src: '/audio/ko/distribution-model.m4a', title: '배포 모델 - 음성 해설' },
  openStandard: { src: '/audio/ko/open-standard.m4a', title: '오픈 스탠다드 - 음성 해설' },
  skillsViaApi: { src: '/audio/ko/skills-via-api.m4a', title: 'API를 통한 스킬 - 음성 해설' },
  recommendedApproach: { src: '/audio/ko/recommended-approach.m4a', title: '권장 접근법 - 음성 해설' },
  positioningYourSkill: { src: '/audio/ko/positioning-your-skill.m4a', title: '스킬 포지셔닝 - 음성 해설' },
  // 제5장: 패턴과 문제 해결
  skillPatterns: { src: '/audio/ko/skill-patterns.m4a', title: '스킬 패턴 - 음성 해설' },
  troubleshooting: { src: '/audio/ko/troubleshooting.m4a', title: '문제 해결 - 음성 해설' },
  // 제6장: 리소스와 참고자료
  officialDocs: { src: '/audio/ko/official-docs.m4a', title: '공식 문서 - 음성 해설' },
  exampleSkills: { src: '/audio/ko/example-skills.m4a', title: '예제 스킬 - 음성 해설' },
  toolsAndUtilities: { src: '/audio/ko/tools-and-utilities.m4a', title: '도구 및 유틸리티 - 음성 해설' },
  // 부록
  quickChecklist: { src: '/audio/ko/quick-checklist.m4a', title: '빠른 체크리스트 - 음성 해설' },
  yamlReference: { src: '/audio/ko/yaml-reference.m4a', title: 'YAML 레퍼런스 - 음성 해설' },
  completeExamples: { src: '/audio/ko/complete-examples.m4a', title: '완전한 예제 - 음성 해설' },
  technicalSpec: { src: '/audio/ko/technical-spec.m4a', title: '기술 문서 (SPEC) - 음성 해설' },
};

// Check if audio preview mode is enabled (shows placeholder for sections without audio)
export const AUDIO_PREVIEW_MODE = false;
