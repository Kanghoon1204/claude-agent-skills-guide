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
