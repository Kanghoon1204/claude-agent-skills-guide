import { Platform } from '../context/PlatformContext';

// Platform-specific terminology mappings
const PLATFORM_TERMS: Record<Platform, {
  name: string;
  fullName: string;
  skillFile: string;
  skillFolder: string;
  globalPath: string;
  projectPath: string;
  webInterface: string;
}> = {
  claude: {
    name: 'Claude',
    fullName: 'Claude Code',
    skillFile: 'SKILL.md',
    skillFolder: '.claude/skills',
    globalPath: '~/.claude/skills/<name>/SKILL.md',
    projectPath: '.claude/skills/<name>/SKILL.md',
    webInterface: 'Claude.ai > 설정 > Capabilities > Skills',
  },
  cursor: {
    name: 'Cursor',
    fullName: 'Cursor AI',
    skillFile: '.cursorrules',
    skillFolder: '.cursor',
    globalPath: '~/.cursor/rules/<name>.mdc',
    projectPath: '.cursorrules 또는 .cursor/rules/<name>.mdc',
    webInterface: 'Cursor 설정 > Rules',
  },
  codex: {
    name: 'Codex',
    fullName: 'OpenAI Codex CLI',
    skillFile: 'AGENTS.md',
    skillFolder: '.codex',
    globalPath: '~/.codex/agents/<name>/AGENTS.md',
    projectPath: '.codex/agents/<name>/AGENTS.md',
    webInterface: 'Codex CLI 설정',
  },
  windsurf: {
    name: 'Windsurf',
    fullName: 'Windsurf IDE',
    skillFile: '.windsurfrules',
    skillFolder: '.windsurf',
    globalPath: '~/.windsurf/rules/<name>.md',
    projectPath: '.windsurfrules 또는 .windsurf/rules/<name>.md',
    webInterface: 'Windsurf 설정 > AI Rules',
  },
};

/**
 * Replace Claude-specific text with platform-appropriate text
 */
export function replacePlatformText(text: string, platform: Platform): string {
  const terms = PLATFORM_TERMS[platform];

  let result = text;

  // Skip replacement for claude platform (original content)
  if (platform === 'claude') {
    return result;
  }

  // Replace specific patterns
  const replacements: [RegExp, string][] = [
    // File and path names
    [/SKILL\.md/g, terms.skillFile],
    [/\.claude\/skills/g, terms.skillFolder],
    [/~\/\.claude\/skills\/<name>\/SKILL\.md/g, terms.globalPath],
    [/\.claude\/skills\/<name>\/SKILL\.md/g, terms.projectPath],

    // Product names (be careful with order)
    [/Claude Code/g, terms.fullName],
    [/Claude\.ai/g, terms.webInterface.split(' >')[0]],
    [/Claude한테/g, `${terms.name}한테`],
    [/Claude가/g, `${terms.name}가`],
    [/Claude를/g, `${terms.name}를`],
    [/Claude의/g, `${terms.name}의`],
    [/Claude에게/g, `${terms.name}에게`],
    [/Claude에서/g, `${terms.name}에서`],
    [/Claude와/g, `${terms.name}와`],
    [/Claude는/g, `${terms.name}는`],
    [/Claude 환경/g, `${terms.name} 환경`],
    [/Claude 스킬/g, `${terms.name} 스킬`],

    // Generic Claude mentions (last, to catch remaining)
    [/\bClaude\b(?![\.\-])/g, terms.name],
  ];

  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

/**
 * Get platform-specific terms
 */
export function getPlatformTerms(platform: Platform) {
  return PLATFORM_TERMS[platform];
}

/**
 * Deep replace platform text in an object (for content objects)
 */
export function deepReplacePlatformText<T>(obj: T, platform: Platform): T {
  if (typeof obj === 'string') {
    return replacePlatformText(obj, platform) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepReplacePlatformText(item, platform)) as T;
  }

  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      result[key] = deepReplacePlatformText((obj as any)[key], platform);
    }
    return result as T;
  }

  return obj;
}
