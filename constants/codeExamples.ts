// =============================================================================
// codeExamples.ts
// All YAML, Bash, Markdown, and code snippets for the Claude Agent Skills Guide
// Each example includes both Korean (titleKo) and English (title) titles
// =============================================================================

export interface CodeExample {
  title: string;
  titleKo: string;
  language: 'yaml' | 'markdown' | 'bash' | 'python' | 'text';
  code: string;
}

export const CODE_EXAMPLES: Record<string, CodeExample[]> = {
  // ===========================================================================
  // 1. What Is a Skill?
  // ===========================================================================
  whatIsASkill: [
    {
      title: 'Skill Folder Structure',
      titleKo: '스킬 폴더 구조',
      language: 'text',
      code: `~/.claude/skills/
  my-skill/
    SKILL.md          # Main skill definition file
  another-skill/
    SKILL.md          # Another skill
  team-workflow/
    SKILL.md          # Team workflow skill`,
    },
    {
      title: 'Minimal SKILL.md Example',
      titleKo: '최소 SKILL.md 예제',
      language: 'markdown',
      code: `---
name: hello-world
description: A simple greeting skill that says hello
---

# Hello World Skill

When the user asks you to greet someone, respond with a friendly hello message.

## Steps
1. Identify the name from the user's request
2. Generate a warm, friendly greeting
3. Include a fun fact about the name if possible`,
    },
    {
      title: 'How Claude Discovers Skills',
      titleKo: 'Claude의 스킬 탐색 방식',
      language: 'text',
      code: `User types: /my-skill
         |
         v
Claude checks: ~/.claude/skills/my-skill/SKILL.md
         |
         v
YAML frontmatter parsed (name, description, tools, etc.)
         |
         v
Markdown body loaded as instructions
         |
         v
Claude executes the skill with the given context`,
    },
  ],

  // ===========================================================================
  // 2. Core Design Principles
  // ===========================================================================
  coreDesignPrinciples: [
    {
      title: 'Progressive Disclosure - Level 1: Minimal',
      titleKo: '점진적 공개 - 레벨 1: 최소',
      language: 'yaml',
      code: `---
name: quick-format
description: Format code according to project standards
---`,
    },
    {
      title: 'Progressive Disclosure - Level 2: Intermediate',
      titleKo: '점진적 공개 - 레벨 2: 중급',
      language: 'yaml',
      code: `---
name: code-reviewer
description: Review code for best practices and potential bugs
tools:
  - Bash
  - Read
  - Grep
  - Glob
---`,
    },
    {
      title: 'Progressive Disclosure - Level 3: Full',
      titleKo: '점진적 공개 - 레벨 3: 전체',
      language: 'yaml',
      code: `---
name: deploy-pipeline
description: Full CI/CD deployment pipeline with safety checks
tools:
  - Bash
  - Read
  - Write
  - Grep
  - Glob
  - WebFetch
  - mcp: github
  - mcp: slack-notifications
allowed_tools:
  - Bash(git *)
  - Bash(npm *)
  - Bash(docker *)
deny_tools:
  - Bash(rm -rf *)
  - Bash(sudo *)
intercept:
  - tool: Bash
    pattern: "deploy.*production"
    message: "This will deploy to production. Are you sure?"
---`,
    },
    {
      title: 'Single Responsibility Principle',
      titleKo: '단일 책임 원칙',
      language: 'markdown',
      code: `# Bad: One skill doing too many things
---
name: do-everything
description: Format, lint, test, deploy, and document code
---

# Good: Focused skills that compose well
---
name: code-formatter
description: Format code according to project style guide
---

---
name: test-runner
description: Run test suites and report results
---

---
name: deploy-service
description: Deploy services to staging or production
---`,
    },
    {
      title: 'Composability Pattern',
      titleKo: '조합 가능성 패턴',
      language: 'markdown',
      code: `# Skills can reference other skills for composition:

When running the full CI pipeline:
1. First invoke /code-formatter to clean up code style
2. Then invoke /test-runner to verify all tests pass
3. If tests pass, invoke /deploy-service to push changes
4. Finally invoke /notify-team to send status update`,
    },
  ],

  // ===========================================================================
  // 3. Use Cases
  // ===========================================================================
  useCases: [
    {
      title: 'Good Use Case Definition',
      titleKo: '좋은 사용 사례 정의',
      language: 'yaml',
      code: `---
name: api-endpoint-creator
description: >
  Creates RESTful API endpoints following the project's established patterns.
  Generates route handler, validation schema, controller logic, and tests.
  Follows OpenAPI 3.0 specification for documentation.
tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
---`,
    },
    {
      title: 'Use Case - Document Generation',
      titleKo: '사용 사례 - 문서 생성',
      language: 'yaml',
      code: `---
name: api-docs-generator
description: >
  Generate OpenAPI documentation from existing route handlers.
  Scans source files for route definitions, extracts parameters,
  request/response types, and produces a complete OpenAPI spec.
tools:
  - Read
  - Glob
  - Grep
  - Write
---`,
    },
    {
      title: 'Use Case - Workflow Automation',
      titleKo: '사용 사례 - 워크플로우 자동화',
      language: 'yaml',
      code: `---
name: pr-review-workflow
description: >
  Automated pull request review workflow. Checks code quality,
  runs tests, validates commit messages, and posts review comments.
  Integrates with GitHub via MCP for seamless PR management.
tools:
  - Bash
  - Read
  - Grep
  - Glob
  - mcp: github
---`,
    },
    {
      title: 'Use Case - Code Migration',
      titleKo: '사용 사례 - 코드 마이그레이션',
      language: 'yaml',
      code: `---
name: react-class-to-hooks
description: >
  Migrate React class components to functional components with hooks.
  Preserves component behavior, converts lifecycle methods to useEffect,
  and updates state management to useState/useReducer patterns.
tools:
  - Read
  - Write
  - Glob
  - Grep
---`,
    },
  ],

  // ===========================================================================
  // 4. Skill Categories
  // ===========================================================================
  skillCategories: [
    {
      title: 'Category: Document Creation',
      titleKo: '카테고리: 문서 생성',
      language: 'yaml',
      code: `---
name: changelog-generator
description: >
  Generate a CHANGELOG.md from git commit history.
  Groups changes by type (features, fixes, breaking changes).
  Follows Keep a Changelog format.
tools:
  - Bash
  - Read
  - Write
---

# Changelog Generator

## Instructions
1. Read git log since the last tagged release
2. Parse commit messages using conventional commit format
3. Group commits by type: feat, fix, docs, chore, breaking
4. Generate formatted CHANGELOG entry
5. Prepend to existing CHANGELOG.md

## Commit Type Mapping
- feat: Added
- fix: Fixed
- docs: Documentation
- chore: Maintenance
- BREAKING CHANGE: Breaking Changes`,
    },
    {
      title: 'Category: Workflow Automation',
      titleKo: '카테고리: 워크플로우 자동화',
      language: 'yaml',
      code: `---
name: release-workflow
description: >
  Automate the release process: version bump, changelog update,
  git tag creation, and GitHub release publication.
tools:
  - Bash
  - Read
  - Write
  - mcp: github
---

# Release Workflow

## Steps
1. Determine the next version based on conventional commits
2. Update package.json version
3. Generate changelog for this release
4. Create git commit with version bump
5. Create git tag
6. Push to remote
7. Create GitHub release with changelog as body`,
    },
    {
      title: 'Category: MCP Enhancement',
      titleKo: '카테고리: MCP 확장',
      language: 'yaml',
      code: `---
name: database-migration
description: >
  Create and apply database migrations using MCP database tools.
  Generates migration files, validates schema changes, and
  applies migrations with rollback support.
tools:
  - Read
  - Write
  - Bash
  - mcp: postgres
  - mcp: prisma
---

# Database Migration Skill

## Instructions
1. Analyze the requested schema change
2. Generate a timestamped migration file
3. Validate the migration against current schema
4. Apply migration to development database via MCP
5. Verify the migration was successful
6. Generate rollback script

## Safety Rules
- NEVER apply migrations directly to production
- Always generate a rollback script
- Validate foreign key constraints before applying`,
    },
    {
      title: 'Category: Code Quality',
      titleKo: '카테고리: 코드 품질',
      language: 'yaml',
      code: `---
name: security-audit
description: >
  Perform a security audit on the codebase. Check for common
  vulnerabilities, dependency issues, and security anti-patterns.
tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# Security Audit Skill

## Checks Performed
1. Dependency vulnerability scan (npm audit / pip audit)
2. Hard-coded secrets detection
3. SQL injection patterns
4. XSS vulnerability patterns
5. Insecure deserialization
6. Missing authentication checks
7. CORS misconfiguration

## Output Format
Generate a security report with severity levels:
- CRITICAL: Must fix before deployment
- HIGH: Should fix soon
- MEDIUM: Plan to address
- LOW: Nice to have`,
    },
  ],

  // ===========================================================================
  // 5. Technical Requirements
  // ===========================================================================
  technicalRequirements: [
    {
      title: 'Required File Structure',
      titleKo: '필수 파일 구조',
      language: 'text',
      code: `~/.claude/skills/
  <skill-name>/
    SKILL.md            # Required: Main skill definition
                        # Must contain YAML frontmatter + Markdown body

Project-level skills:
  .claude/skills/
    <skill-name>/
      SKILL.md          # Project-scoped skill definition`,
    },
    {
      title: 'YAML Frontmatter - Minimal (Required Fields Only)',
      titleKo: 'YAML 프론트매터 - 최소 (필수 필드만)',
      language: 'yaml',
      code: `---
name: my-skill
description: A brief description of what this skill does
---`,
    },
    {
      title: 'YAML Frontmatter - Full (All Fields)',
      titleKo: 'YAML 프론트매터 - 전체 (모든 필드)',
      language: 'yaml',
      code: `---
name: my-advanced-skill
description: >
  A comprehensive description that explains the skill's purpose,
  what it does, and when to use it. Multi-line descriptions
  use YAML block scalar syntax.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - WebFetch
  - WebSearch
  - mcp: github
  - mcp: slack
  - mcp: postgres
allowed_tools:
  - Bash(git *)
  - Bash(npm run *)
  - Bash(npx *)
  - Bash(docker compose *)
deny_tools:
  - Bash(rm -rf /*)
  - Bash(sudo *)
  - Bash(curl * | bash)
  - Bash(wget * | bash)
intercept:
  - tool: Bash
    pattern: "deploy.*production"
    message: "You are about to deploy to production. Please confirm."
  - tool: Write
    pattern: ".*\\.env.*"
    message: "Modifying environment files. Please confirm."
---`,
    },
    {
      title: 'Naming Rules and Conventions',
      titleKo: '명명 규칙 및 관례',
      language: 'text',
      code: `Skill Naming Rules:
  - Use kebab-case: my-skill-name (NOT mySkillName or my_skill_name)
  - Lowercase only: code-review (NOT Code-Review)
  - No spaces: api-generator (NOT api generator)
  - Descriptive: pr-review-bot (NOT prb)
  - Max recommended length: 30 characters

Good Examples:
  code-formatter
  test-runner
  deploy-staging
  api-docs-gen
  db-migration
  pr-reviewer

Bad Examples:
  MySkill          # PascalCase not allowed
  my_skill         # Underscores not recommended
  x                # Not descriptive
  do-everything    # Too vague
  format and lint  # Spaces not allowed`,
    },
    {
      title: 'Skill Installation Locations',
      titleKo: '스킬 설치 위치',
      language: 'text',
      code: `Global skills (available everywhere):
  ~/.claude/skills/<skill-name>/SKILL.md

Project skills (available in specific project):
  <project-root>/.claude/skills/<skill-name>/SKILL.md

Skill discovery priority:
  1. Project-level skills (higher priority)
  2. Global-level skills (lower priority)
  3. If both exist, project-level takes precedence`,
    },
  ],

  // ===========================================================================
  // 6. Writing Effective Skills
  // ===========================================================================
  writingEffectiveSkills: [
    {
      title: 'Good vs Bad Descriptions',
      titleKo: '좋은 설명 vs 나쁜 설명',
      language: 'yaml',
      code: `# BAD: Vague and unhelpful
---
name: helper
description: Helps with stuff
---

# BAD: Too short, no context
---
name: formatter
description: Formats code
---

# GOOD: Clear, specific, and actionable
---
name: python-formatter
description: >
  Format Python source files using Black with a line length of 88.
  Applies isort for import ordering. Checks for type hints and
  adds them where missing using monkeytype suggestions.
---

# GOOD: Explains purpose, scope, and integration
---
name: django-api-scaffold
description: >
  Scaffold a new Django REST Framework API endpoint. Creates the
  model, serializer, viewset, URL configuration, and test file.
  Follows the project's existing patterns in apps/ directory.
  Integrates with the existing authentication middleware.
---`,
    },
    {
      title: 'SKILL.md Complete Template',
      titleKo: 'SKILL.md 전체 템플릿',
      language: 'markdown',
      code: `---
name: skill-name
description: >
  Clear, concise description of what this skill does.
  Include the main use case and any important constraints.
tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
---

# Skill Title

Brief overview of the skill's purpose and value.

## When to Use
- Scenario 1 where this skill is helpful
- Scenario 2 where this skill is helpful
- Scenario 3 where this skill is helpful

## Prerequisites
- Any required tools or configurations
- Required MCP servers
- Required project structure

## Instructions

### Step 1: Gather Context
Describe what information to collect first.

### Step 2: Execute Core Logic
Describe the main operations to perform.

### Step 3: Validate Results
Describe how to verify the output is correct.

### Step 4: Report Results
Describe the expected output format.

## Examples

### Example 1: Basic Usage
\`\`\`
User: /skill-name create a new widget
Expected: Creates widget with default configuration
\`\`\`

### Example 2: Advanced Usage
\`\`\`
User: /skill-name create a new widget --with-tests --verbose
Expected: Creates widget with test files and detailed output
\`\`\`

## Troubleshooting

### Common Issue 1
**Problem**: Description of the problem
**Solution**: How to fix it

### Common Issue 2
**Problem**: Description of the problem
**Solution**: How to fix it

## Notes
- Any additional information
- Performance considerations
- Known limitations`,
    },
    {
      title: 'Writing the Examples Section',
      titleKo: '예제 섹션 작성법',
      language: 'markdown',
      code: `## Examples

### Creating a REST Endpoint
\`\`\`
User: /api-scaffold POST /users with name, email, and role fields
\`\`\`

The skill will:
1. Create \`routes/users.ts\` with POST handler
2. Create \`schemas/userCreate.ts\` with Zod validation
3. Create \`controllers/userController.ts\` with business logic
4. Create \`tests/users.test.ts\` with test cases
5. Update \`routes/index.ts\` to register the new route

### Modifying an Existing Endpoint
\`\`\`
User: /api-scaffold PATCH /users/:id add avatar_url field
\`\`\`

The skill will:
1. Update the existing route handler
2. Add the new field to the validation schema
3. Update tests to cover the new field`,
    },
    {
      title: 'Writing the Troubleshooting Section',
      titleKo: '문제 해결 섹션 작성법',
      language: 'markdown',
      code: `## Troubleshooting

### Skill Not Found
**Problem**: Claude says it cannot find the skill when you type /skill-name.
**Cause**: The SKILL.md file is not in the correct location.
**Solution**:
1. Verify the file exists: \`ls ~/.claude/skills/skill-name/SKILL.md\`
2. Check the filename is exactly \`SKILL.md\` (case-sensitive)
3. Ensure the directory name matches the skill name in frontmatter

### Tools Not Available
**Problem**: The skill fails because a required tool is not accessible.
**Cause**: Tools not listed in the frontmatter or MCP server not running.
**Solution**:
1. Add the tool to the \`tools:\` list in frontmatter
2. For MCP tools, verify the MCP server is running
3. Check \`~/.claude/mcp.json\` for MCP configuration

### YAML Parse Error
**Problem**: "Invalid frontmatter" error when loading skill.
**Cause**: YAML syntax error in the frontmatter block.
**Solution**:
1. Ensure frontmatter starts and ends with \`---\`
2. Check indentation (use spaces, not tabs)
3. Escape special characters in strings
4. Validate with an online YAML validator`,
    },
    {
      title: 'Error Handling in Skill Instructions',
      titleKo: '스킬 지시사항의 오류 처리',
      language: 'markdown',
      code: `## Error Handling

### Pre-Execution Checks
Before performing any action:
1. Verify the target directory exists
2. Check that required files are present
3. Confirm the user has appropriate permissions
4. Validate all input parameters

### During Execution
If an error occurs during execution:
1. Do NOT continue with subsequent steps
2. Report the exact error message to the user
3. Suggest possible fixes
4. Ask the user if they want to retry or abort

### Rollback Strategy
If the skill has made partial changes and encounters an error:
1. List all files that were modified
2. Offer to revert changes using git
3. If not in a git repo, keep backup copies before modifying

### Example Error Handling Pattern
\`\`\`
Before writing any files:
  - Run: git status (to ensure clean working directory)
  - If dirty: warn user and ask to proceed or stash changes

After each file operation:
  - Verify the file was written correctly
  - If verification fails: report and stop

On completion:
  - Run any validation commands (lint, typecheck, test)
  - Report results clearly
\`\`\``,
    },
    {
      title: 'Instruction Clarity Best Practices',
      titleKo: '지시사항 명확성 모범 사례',
      language: 'markdown',
      code: `## Writing Clear Instructions

### Use Imperative Mood
GOOD:
- "Read the configuration file at project root"
- "Search for all TypeScript files matching the pattern"
- "Create a new file with the generated content"

BAD:
- "You should probably read the config file"
- "It would be nice to search for TypeScript files"
- "Maybe create a new file"

### Be Specific About Paths and Patterns
GOOD:
- "Read \`./src/config/database.ts\`"
- "Search for files matching \`src/**/*.test.ts\`"
- "Write output to \`./dist/generated/\`"

BAD:
- "Read the database config"
- "Find the test files"
- "Put the output somewhere appropriate"

### Define Success Criteria
GOOD:
- "The task is complete when all tests pass and there are no lint errors"
- "Success: the generated file compiles without TypeScript errors"

BAD:
- "Make sure it works"
- "It should be fine"`,
    },
  ],

  // ===========================================================================
  // 7. Testing Areas
  // ===========================================================================
  testingAreas: [
    {
      title: 'Triggering Test Suite',
      titleKo: '트리거링 테스트 모음',
      language: 'bash',
      code: `# Test that the skill triggers correctly
# Invoke the skill and verify it loads
claude "/my-skill"

# Test with arguments
claude "/my-skill create user-service"

# Test skill discovery
ls ~/.claude/skills/my-skill/SKILL.md

# Verify YAML frontmatter is valid
claude "/my-skill" --dry-run  # If supported

# Test that the skill appears in skill list
claude --list-skills`,
    },
    {
      title: 'Functional Test Checklist',
      titleKo: '기능 테스트 체크리스트',
      language: 'markdown',
      code: `## Functional Test Checklist

### Input Validation Tests
- [ ] Skill handles missing required arguments gracefully
- [ ] Skill handles invalid input types (number vs string)
- [ ] Skill handles empty input
- [ ] Skill handles excessively long input

### Core Functionality Tests
- [ ] Skill produces expected output for standard input
- [ ] Skill handles edge cases (empty files, large files)
- [ ] All file operations complete successfully
- [ ] Generated code compiles/runs without errors

### Tool Usage Tests
- [ ] All listed tools are actually used
- [ ] No unlisted tools are attempted
- [ ] MCP tools connect and respond correctly
- [ ] Bash commands execute in the expected directory

### Integration Tests
- [ ] Skill works with existing project structure
- [ ] Generated files follow project conventions
- [ ] No conflicts with existing files
- [ ] Git state is clean after execution (if applicable)`,
    },
    {
      title: 'Performance Comparison Test',
      titleKo: '성능 비교 테스트',
      language: 'bash',
      code: `# Measure time to complete skill execution
time claude "/my-skill create user-service"

# Compare with manual execution time
# Step 1: Manually perform the same task and time it
time bash -c '
  mkdir -p src/services/user-service
  # ... manual steps ...
'

# Compare outputs
diff <(claude "/my-skill create user-service" --output-only) \\
     expected-output/

# Test with different input sizes
for size in small medium large; do
  echo "Testing with $size input..."
  time claude "/my-skill process test-data/$size/"
done`,
    },
    {
      title: 'Edge Case Testing',
      titleKo: '엣지 케이스 테스트',
      language: 'bash',
      code: `# Test with empty directory
mkdir -p /tmp/test-empty && cd /tmp/test-empty
claude "/my-skill"

# Test with no git repository
mkdir -p /tmp/test-no-git && cd /tmp/test-no-git
claude "/my-skill"

# Test with special characters in path
mkdir -p "/tmp/test dir with spaces" && cd "/tmp/test dir with spaces"
claude "/my-skill"

# Test with very large file
dd if=/dev/urandom of=/tmp/large-file bs=1M count=100
claude "/my-skill process /tmp/large-file"

# Test with read-only directory
mkdir -p /tmp/test-readonly && chmod 444 /tmp/test-readonly
claude "/my-skill" # Should fail gracefully`,
    },
  ],

  // ===========================================================================
  // 8. Skill Creator Tool
  // ===========================================================================
  skillCreatorTool: [
    {
      title: 'How to Invoke Skill Creator',
      titleKo: '스킬 크리에이터 호출 방법',
      language: 'bash',
      code: `# Use the built-in skill creator to scaffold a new skill
claude "/create-skill"

# Or with a specific name
claude "/create-skill my-new-skill"

# The skill creator will interactively ask for:
# 1. Skill name (kebab-case)
# 2. Description
# 3. Required tools
# 4. MCP integrations (if any)
# 5. Installation scope (global or project)`,
    },
    {
      title: 'Manual Skill Creation',
      titleKo: '수동 스킬 생성',
      language: 'bash',
      code: `# Step 1: Create the skill directory
mkdir -p ~/.claude/skills/my-new-skill

# Step 2: Create the SKILL.md file
cat > ~/.claude/skills/my-new-skill/SKILL.md << 'SKILLEOF'
---
name: my-new-skill
description: >
  Description of what your skill does.
  Be clear and specific.
tools:
  - Read
  - Write
  - Bash
---

# My New Skill

## Instructions
1. First, gather context about the request
2. Then, perform the core operation
3. Finally, validate and report results

## Examples
User: /my-new-skill do something
Expected: The skill does something useful
SKILLEOF

# Step 3: Verify the skill was created
ls -la ~/.claude/skills/my-new-skill/SKILL.md

# Step 4: Test the skill
claude "/my-new-skill"`,
    },
    {
      title: 'Project-Level Skill Creation',
      titleKo: '프로젝트 레벨 스킬 생성',
      language: 'bash',
      code: `# Create a project-scoped skill
mkdir -p .claude/skills/project-lint

cat > .claude/skills/project-lint/SKILL.md << 'SKILLEOF'
---
name: project-lint
description: >
  Run project-specific linting rules including ESLint,
  Prettier, and custom lint rules defined in .lintrc.
tools:
  - Bash
  - Read
  - Glob
---

# Project Linter

## Instructions
1. Detect the package manager (npm, yarn, pnpm)
2. Run the lint command defined in package.json scripts
3. Parse lint output and summarize issues by severity
4. Suggest auto-fixes for common issues

## Usage
\`\`\`
/project-lint              # Lint entire project
/project-lint src/         # Lint specific directory
/project-lint --fix        # Auto-fix issues
\`\`\`
SKILLEOF

# Add to git so team members can use it
git add .claude/skills/project-lint/SKILL.md
git commit -m "Add project-lint skill for team"`,
    },
  ],

  // ===========================================================================
  // 9. Distribution Model
  // ===========================================================================
  distributionModel: [
    {
      title: 'Installation Guide - Global Skill',
      titleKo: '설치 가이드 - 전역 스킬',
      language: 'bash',
      code: `# Installing a shared skill globally

# Option 1: Clone from a repository
git clone https://github.com/team/claude-skills.git /tmp/claude-skills
cp -r /tmp/claude-skills/my-skill ~/.claude/skills/my-skill

# Option 2: Direct download
mkdir -p ~/.claude/skills/my-skill
curl -o ~/.claude/skills/my-skill/SKILL.md \\
  https://raw.githubusercontent.com/team/claude-skills/main/my-skill/SKILL.md

# Option 3: Manual copy from a colleague
cp -r /path/to/shared/skills/my-skill ~/.claude/skills/

# Verify installation
cat ~/.claude/skills/my-skill/SKILL.md | head -10`,
    },
    {
      title: 'Installation Guide - Project Skill',
      titleKo: '설치 가이드 - 프로젝트 스킬',
      language: 'bash',
      code: `# Project-level skills are distributed with the repository

# Step 1: Skills are already in the repository
ls .claude/skills/

# Step 2: After cloning a project, skills are automatically available
git clone https://github.com/team/my-project.git
cd my-project
# Skills in .claude/skills/ are now available

# Step 3: Verify project skills
ls .claude/skills/*/SKILL.md

# Team members get skills automatically when they pull
git pull origin main`,
    },
    {
      title: 'Skill Distribution Best Practices',
      titleKo: '스킬 배포 모범 사례',
      language: 'markdown',
      code: `## Distribution Checklist

### Before Sharing a Skill
- [ ] Skill has clear, accurate description
- [ ] All required tools are listed in frontmatter
- [ ] Instructions are self-contained (no assumed context)
- [ ] Examples demonstrate common use cases
- [ ] Troubleshooting section covers known issues
- [ ] No hard-coded paths or user-specific configuration
- [ ] Tested on a clean environment

### For Project Skills
- [ ] Added to .claude/skills/ in the repository
- [ ] Included in project README or CONTRIBUTING.md
- [ ] CI/CD does not interfere with skill files
- [ ] Works with the project's tool versions

### For Global Skills
- [ ] Installation instructions are documented
- [ ] Version/update mechanism is described
- [ ] Dependencies (MCP servers, etc.) are listed
- [ ] Uninstallation instructions provided`,
    },
  ],

  // ===========================================================================
  // 10. Skill Patterns
  // ===========================================================================
  skillPatterns: [
    {
      title: 'Pattern 1: Sequential Workflow',
      titleKo: '패턴 1: 순차적 워크플로우',
      language: 'markdown',
      code: `---
name: feature-branch-workflow
description: >
  Complete feature branch workflow: create branch, implement changes,
  run tests, and prepare PR. Follows git-flow conventions.
tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# Feature Branch Workflow

Execute these steps in strict sequential order:

## Step 1: Branch Creation
1. Ensure main branch is up to date: \`git checkout main && git pull\`
2. Create feature branch: \`git checkout -b feature/<name>\`
3. Verify branch creation: \`git branch --show-current\`

## Step 2: Implementation
1. Read the requirements from the user's request
2. Identify files that need modification using Glob and Grep
3. Make the required code changes using Edit
4. Ensure code follows existing patterns (read nearby files for context)

## Step 3: Quality Assurance
1. Run linter: \`npm run lint\`
2. Run type checker: \`npm run typecheck\`
3. Run tests: \`npm run test\`
4. If any check fails, fix the issue and re-run

## Step 4: PR Preparation
1. Stage changes: \`git add -A\`
2. Create commit with conventional message
3. Push branch: \`git push -u origin feature/<name>\`
4. Report summary of changes to user

IMPORTANT: Do NOT proceed to the next step if the current step fails.
Report the failure and ask the user how to proceed.`,
    },
    {
      title: 'Pattern 2: Multi-MCP Coordination',
      titleKo: '패턴 2: 다중 MCP 조율',
      language: 'markdown',
      code: `---
name: issue-to-pr
description: >
  End-to-end issue resolution: read GitHub issue, implement fix,
  create PR, and notify team on Slack. Coordinates multiple MCP servers.
tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - mcp: github
  - mcp: slack
---

# Issue to PR Pipeline

## Phase 1: Issue Analysis (MCP: GitHub)
1. Fetch the issue details using GitHub MCP
2. Read issue title, body, labels, and comments
3. Identify the type: bug, feature, or enhancement
4. Extract acceptance criteria from the issue body

## Phase 2: Implementation (Local Tools)
1. Create a branch named after the issue: \`fix/issue-<number>\`
2. Locate relevant source files using Grep and Glob
3. Implement the fix or feature using Read, Edit, Write
4. Add or update tests as needed

## Phase 3: Validation (Local Tools)
1. Run the test suite: \`npm test\`
2. Run linting: \`npm run lint\`
3. Verify the fix addresses the acceptance criteria

## Phase 4: PR Creation (MCP: GitHub)
1. Push the branch to remote
2. Create a pull request via GitHub MCP
3. Link the PR to the original issue
4. Add appropriate labels and reviewers

## Phase 5: Notification (MCP: Slack)
1. Post a message to the team channel via Slack MCP
2. Include: issue link, PR link, and summary of changes
3. Tag relevant team members if specified in the issue`,
    },
    {
      title: 'Pattern 3: Iterative Refinement',
      titleKo: '패턴 3: 반복 개선',
      language: 'markdown',
      code: `---
name: code-optimizer
description: >
  Iteratively optimize code performance. Profiles, identifies bottlenecks,
  applies optimizations, and re-profiles until target metrics are met.
tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
---

# Iterative Code Optimizer

## Optimization Loop

### Iteration Start
1. Profile the target code: \`npm run profile -- <target>\`
2. Record baseline metrics (execution time, memory usage)

### Analysis
1. Parse profiler output to identify top 3 bottlenecks
2. For each bottleneck, determine optimization strategy:
   - Algorithm complexity reduction
   - Caching/memoization
   - Lazy evaluation
   - Batch processing
   - Data structure optimization

### Apply Optimization
1. Apply ONE optimization at a time
2. Ensure tests still pass after each change
3. Re-profile to measure improvement

### Check Convergence
1. Compare new metrics against baseline
2. If improvement > target threshold: report success
3. If improvement < 5%: try a different strategy
4. If max iterations reached: report best result achieved

### Repeat
Continue the loop until:
- Performance target is met, OR
- Maximum iterations (5) are reached, OR
- No further improvements are possible

## Output
Provide a summary table:
| Iteration | Change Made | Time Before | Time After | Improvement |
|-----------|-------------|-------------|------------|-------------|`,
    },
    {
      title: 'Pattern 4: Context-Aware Tool Selection',
      titleKo: '패턴 4: 컨텍스트 인식 도구 선택',
      language: 'markdown',
      code: `---
name: smart-test-runner
description: >
  Intelligently selects and runs the appropriate test framework
  based on project context. Supports Jest, Vitest, Pytest, Go test,
  and Cargo test.
tools:
  - Bash
  - Read
  - Glob
  - Grep
---

# Smart Test Runner

## Context Detection

### Step 1: Identify Project Type
Detect the project's language and framework by checking:
1. \`package.json\` -> Node.js project
2. \`pyproject.toml\` or \`setup.py\` -> Python project
3. \`go.mod\` -> Go project
4. \`Cargo.toml\` -> Rust project
5. \`pom.xml\` or \`build.gradle\` -> Java project

### Step 2: Identify Test Framework
Based on project type, detect the test framework:

**Node.js:**
- Check package.json for: jest, vitest, mocha, ava
- Check for config files: jest.config.*, vitest.config.*, .mocharc.*

**Python:**
- Check for: pytest, unittest, nose2
- Check for config: pytest.ini, setup.cfg [tool:pytest], pyproject.toml

**Go:**
- Built-in: \`go test\`
- Check for testify or other frameworks

**Rust:**
- Built-in: \`cargo test\`
- Check for additional test crates

### Step 3: Select Run Command
Map the detected framework to the correct command:
- Jest: \`npx jest\` or \`npm test\`
- Vitest: \`npx vitest run\`
- Pytest: \`python -m pytest\`
- Go: \`go test ./...\`
- Cargo: \`cargo test\`

### Step 4: Execute and Report
1. Run the selected test command
2. Parse the output for pass/fail counts
3. Report results in a unified format regardless of framework`,
    },
    {
      title: 'Pattern 5: Domain-Specific Intelligence',
      titleKo: '패턴 5: 도메인 특화 지능',
      language: 'markdown',
      code: `---
name: react-component-gen
description: >
  Generate React components with deep knowledge of React patterns,
  hooks, TypeScript types, and testing best practices.
  Follows project conventions automatically.
tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
---

# React Component Generator

## Domain Knowledge

### Component Patterns
This skill understands and applies these React patterns:
- **Presentational Components**: Pure UI, no state management
- **Container Components**: Data fetching and state logic
- **Compound Components**: Related components that share state
- **Higher-Order Components**: Component enhancers
- **Custom Hooks**: Reusable stateful logic

### Step 1: Analyze Project Conventions
1. Scan existing components in \`src/components/\`
2. Detect patterns:
   - File naming: PascalCase.tsx vs kebab-case.tsx
   - Export style: default export vs named export
   - Styling: CSS Modules, Tailwind, styled-components, emotion
   - State management: useState, Redux, Zustand, Jotai
   - Testing: Jest + RTL, Vitest, Cypress

### Step 2: Generate Component
Based on detected conventions, generate:
1. Component file with proper TypeScript types
2. Props interface with JSDoc comments
3. Styling file matching project's CSS approach
4. Test file with meaningful test cases
5. Storybook story file (if Storybook is detected)
6. Index file for clean exports (if pattern exists)

### Step 3: Wire Up
1. Add export to nearest index/barrel file
2. Add to Storybook config if applicable
3. Run typecheck to verify no type errors

### Type Generation Rules
- All props must have TypeScript interfaces
- Use discriminated unions for variant props
- Event handlers use React's built-in event types
- Children prop uses React.ReactNode
- Ref forwarding uses React.forwardRef with proper types

### Testing Rules
- Test rendering with default props
- Test each interactive element
- Test accessibility (aria attributes, roles)
- Test edge cases (empty data, loading states, errors)
- Use screen queries from @testing-library/react`,
    },
  ],

  // ===========================================================================
  // 11. Troubleshooting
  // ===========================================================================
  troubleshooting: [
    {
      title: 'Common YAML Errors',
      titleKo: '일반적인 YAML 오류',
      language: 'yaml',
      code: `# ERROR 1: Missing frontmatter delimiters
# BAD - no opening/closing ---
name: my-skill
description: Does something

# GOOD - proper delimiters
---
name: my-skill
description: Does something
---

# ERROR 2: Tabs instead of spaces
# BAD - using tabs for indentation
---
name: my-skill
tools:
	- Read    # <-- TAB character (invisible but causes error)
	- Write
---

# GOOD - using spaces (2-space indent recommended)
---
name: my-skill
tools:
  - Read
  - Write
---

# ERROR 3: Unescaped special characters
# BAD - colon in unquoted string
---
name: my-skill
description: Note: this will fail because of the colon
---

# GOOD - quoted string or block scalar
---
name: my-skill
description: "Note: this works because it's quoted"
---

# ALSO GOOD - block scalar avoids escaping issues
---
name: my-skill
description: >
  Note: this also works because block scalars
  handle special characters naturally.
---

# ERROR 4: Inconsistent indentation
# BAD - mixed indentation levels
---
name: my-skill
tools:
  - Read
    - Write    # <-- extra indent
---

# GOOD - consistent indentation
---
name: my-skill
tools:
  - Read
  - Write
---`,
    },
    {
      title: 'Common Naming Errors',
      titleKo: '일반적인 명명 오류',
      language: 'text',
      code: `ERROR: Skill name mismatch
  Directory: ~/.claude/skills/my-skill/
  YAML name: my_skill          # <-- underscore doesn't match hyphen
  FIX: Use the same kebab-case name in both places:
    Directory: ~/.claude/skills/my-skill/
    YAML name: my-skill

ERROR: Case sensitivity
  Directory: ~/.claude/skills/MySkill/
  YAML name: myskill
  FIX: Use lowercase kebab-case everywhere:
    Directory: ~/.claude/skills/my-skill/
    YAML name: my-skill

ERROR: Spaces in directory name
  Directory: ~/.claude/skills/my skill/    # <-- space in name
  FIX: Use hyphens instead of spaces:
    Directory: ~/.claude/skills/my-skill/

ERROR: Missing SKILL.md
  Directory: ~/.claude/skills/my-skill/
  File: ~/.claude/skills/my-skill/skill.md  # <-- lowercase 's'
  FIX: File must be named exactly SKILL.md (uppercase):
    File: ~/.claude/skills/my-skill/SKILL.md

ERROR: Skill file at wrong level
  Path: ~/.claude/skills/SKILL.md           # <-- not in subdirectory
  FIX: Must be in its own directory:
    Path: ~/.claude/skills/my-skill/SKILL.md`,
    },
    {
      title: 'Tool-Related Errors',
      titleKo: '도구 관련 오류',
      language: 'markdown',
      code: `## Tool Not Available Error

**Symptom**: "Tool X is not available" when running skill

**Diagnosis**:
\`\`\`yaml
# Check your frontmatter lists the tool
---
name: my-skill
tools:
  - Bash
  - Read
  # Missing: Write  <-- If you use Write in instructions, add it here
---
\`\`\`

**Fix**: Add all tools used in your instructions to the \`tools:\` list.

---

## MCP Connection Error

**Symptom**: "MCP server 'X' is not connected"

**Diagnosis**:
\`\`\`bash
# Check MCP configuration
cat ~/.claude/mcp.json

# Verify MCP server is running
# (depends on your MCP server setup)
\`\`\`

**Fix**:
1. Ensure the MCP server is configured in \`~/.claude/mcp.json\`
2. Start the MCP server before invoking the skill
3. Verify the MCP server name matches exactly

---

## Bash Command Blocked

**Symptom**: "Command blocked by deny_tools policy"

**Diagnosis**: Your \`deny_tools\` list is blocking a needed command

**Fix**: Review and adjust the \`deny_tools\` patterns:
\`\`\`yaml
deny_tools:
  - Bash(rm -rf /*)     # Be specific - don't use overly broad patterns
  - Bash(sudo *)
\`\`\``,
    },
    {
      title: 'Debugging Skill Loading',
      titleKo: '스킬 로딩 디버깅',
      language: 'bash',
      code: `# Step 1: Verify file exists and is readable
ls -la ~/.claude/skills/my-skill/SKILL.md

# Step 2: Check file contents
cat ~/.claude/skills/my-skill/SKILL.md

# Step 3: Validate YAML frontmatter (extract and check)
# Extract frontmatter between --- delimiters
sed -n '/^---$/,/^---$/p' ~/.claude/skills/my-skill/SKILL.md

# Step 4: Check for hidden characters
file ~/.claude/skills/my-skill/SKILL.md
# Should show: UTF-8 Unicode text

# Step 5: Check for BOM (Byte Order Mark)
hexdump -C ~/.claude/skills/my-skill/SKILL.md | head -1
# Should NOT start with: ef bb bf

# Step 6: Check file permissions
stat ~/.claude/skills/my-skill/SKILL.md
# Should be readable: -rw-r--r-- or similar

# Step 7: List all installed skills
ls -la ~/.claude/skills/*/SKILL.md 2>/dev/null
ls -la .claude/skills/*/SKILL.md 2>/dev/null`,
    },
  ],

  // ===========================================================================
  // 12. YAML Reference
  // ===========================================================================
  yamlReference: [
    {
      title: 'Required Fields',
      titleKo: '필수 필드',
      language: 'yaml',
      code: `---
# REQUIRED: Unique identifier for the skill
# - Must be kebab-case
# - Must match the directory name
# - Lowercase letters, numbers, and hyphens only
name: my-skill-name

# REQUIRED: Human-readable description
# - Used by Claude to understand when to suggest the skill
# - Should clearly explain what the skill does
# - Can be single-line or multi-line (using > or |)
description: A clear description of what this skill does
---`,
    },
    {
      title: 'Optional Field: tools',
      titleKo: '선택 필드: tools',
      language: 'yaml',
      code: `---
name: example-tools
description: Demonstrating tools field

# OPTIONAL: List of tools the skill needs access to
# Built-in tools:
tools:
  - Read          # Read file contents
  - Write         # Write/create files
  - Edit          # Edit existing files (find and replace)
  - Bash          # Execute shell commands
  - Glob          # Find files by pattern
  - Grep          # Search file contents
  - WebFetch      # Fetch URL contents
  - WebSearch     # Search the web
  - NotebookEdit  # Edit Jupyter notebooks

  # MCP (Model Context Protocol) tools:
  - mcp: github          # GitHub integration
  - mcp: slack           # Slack integration
  - mcp: postgres        # PostgreSQL database
  - mcp: filesystem      # Extended filesystem ops
  - mcp: puppeteer       # Browser automation
  - mcp: custom-server   # Any custom MCP server
---`,
    },
    {
      title: 'Optional Field: allowed_tools',
      titleKo: '선택 필드: allowed_tools',
      language: 'yaml',
      code: `---
name: example-allowed
description: Demonstrating allowed_tools field

tools:
  - Bash
  - Read
  - Write

# OPTIONAL: Whitelist specific tool invocations
# Uses glob-style patterns
# If specified, ONLY these patterns are permitted
allowed_tools:
  # Git commands only
  - Bash(git *)

  # Package manager commands
  - Bash(npm *)
  - Bash(yarn *)
  - Bash(pnpm *)

  # Specific build commands
  - Bash(npx tsc *)
  - Bash(npx eslint *)

  # Docker commands
  - Bash(docker build *)
  - Bash(docker compose *)

  # Read/write only in specific directories
  - Read(src/*)
  - Write(src/generated/*)
---`,
    },
    {
      title: 'Optional Field: deny_tools',
      titleKo: '선택 필드: deny_tools',
      language: 'yaml',
      code: `---
name: example-deny
description: Demonstrating deny_tools field

tools:
  - Bash
  - Read
  - Write

# OPTIONAL: Blacklist specific tool invocations
# Patterns that should be blocked for safety
# deny_tools takes precedence over allowed_tools
deny_tools:
  # Dangerous filesystem operations
  - Bash(rm -rf /*)
  - Bash(rm -rf ~*)
  - Bash(chmod -R 777 *)

  # Privilege escalation
  - Bash(sudo *)
  - Bash(su *)

  # Dangerous downloads
  - Bash(curl * | bash)
  - Bash(curl * | sh)
  - Bash(wget * | bash)
  - Bash(wget * | sh)

  # Protect sensitive files
  - Read(*.env)
  - Read(*credentials*)
  - Read(*secret*)
  - Write(*.env)
  - Write(*credentials*)

  # Prevent force pushes
  - Bash(git push --force*)
  - Bash(git push -f *)
---`,
    },
    {
      title: 'Optional Field: intercept',
      titleKo: '선택 필드: intercept',
      language: 'yaml',
      code: `---
name: example-intercept
description: Demonstrating intercept field

tools:
  - Bash
  - Write

# OPTIONAL: Require user confirmation for specific operations
# Matches tool usage against patterns and prompts the user
intercept:
  # Confirm before deploying
  - tool: Bash
    pattern: "deploy.*"
    message: "This will trigger a deployment. Are you sure you want to proceed?"

  # Confirm before modifying production config
  - tool: Write
    pattern: ".*production.*\\.config.*"
    message: "You are about to modify a production configuration file. Please confirm."

  # Confirm before running database commands
  - tool: Bash
    pattern: ".*DROP TABLE.*"
    message: "WARNING: This will drop a database table. This action is irreversible."

  # Confirm before publishing packages
  - tool: Bash
    pattern: "npm publish.*"
    message: "This will publish the package to npm. Please verify the version is correct."

  # Confirm before modifying CI/CD
  - tool: Write
    pattern: ".*\\.github/workflows/.*"
    message: "Modifying GitHub Actions workflow. Changes will affect CI/CD pipeline."
---`,
    },
    {
      title: 'Security Notes for YAML Configuration',
      titleKo: 'YAML 설정 보안 주의사항',
      language: 'yaml',
      code: `# SECURITY BEST PRACTICES FOR SKILL YAML CONFIGURATION

# 1. Always deny dangerous system commands
deny_tools:
  - Bash(rm -rf /*)
  - Bash(sudo *)
  - Bash(chmod 777 *)
  - Bash(curl * | bash)

# 2. Protect sensitive files from being read or written
deny_tools:
  - Read(.env*)
  - Read(*secret*)
  - Read(*credential*)
  - Read(*password*)
  - Read(id_rsa*)
  - Write(.env*)
  - Write(*secret*)

# 3. Use intercept for irreversible operations
intercept:
  - tool: Bash
    pattern: "git push.*--force.*"
    message: "Force push detected. This can rewrite history. Confirm?"
  - tool: Bash
    pattern: "DROP.*"
    message: "Database DROP operation detected. This is irreversible. Confirm?"

# 4. Scope tools to minimum required
# BAD: Give access to everything
tools:
  - Bash
  - Read
  - Write

# GOOD: Limit to what's needed
tools:
  - Read
  - Grep
  - Glob
allowed_tools:
  - Read(src/*)
  - Grep(src/*)

# 5. Never store secrets in SKILL.md
# BAD:
# description: Uses API key abc123xyz to connect
# GOOD:
# description: Uses API key from environment variable API_KEY`,
    },
    {
      title: 'Complete YAML Reference Card',
      titleKo: '전체 YAML 참조 카드',
      language: 'yaml',
      code: `---
# ============================================
# COMPLETE YAML FRONTMATTER REFERENCE
# ============================================

# REQUIRED FIELDS
# ----------------
name: skill-name                    # string, kebab-case, matches directory
description: >                      # string, clear purpose statement
  Multi-line description using
  YAML block scalar syntax.

# OPTIONAL FIELDS
# ----------------
tools:                              # list of tool identifiers
  - Read                            # Built-in: read files
  - Write                           # Built-in: write files
  - Edit                            # Built-in: edit files
  - Bash                            # Built-in: shell commands
  - Glob                            # Built-in: file patterns
  - Grep                            # Built-in: content search
  - WebFetch                        # Built-in: fetch URLs
  - WebSearch                       # Built-in: web search
  - NotebookEdit                    # Built-in: Jupyter notebooks
  - mcp: server-name               # MCP: external server

allowed_tools:                      # list of allowed patterns
  - ToolName(glob-pattern)          # Whitelist specific uses

deny_tools:                         # list of denied patterns
  - ToolName(glob-pattern)          # Blacklist specific uses

intercept:                          # list of confirmation rules
  - tool: ToolName                  # Which tool to intercept
    pattern: "regex-pattern"        # When to intercept
    message: "Confirmation prompt"  # What to ask the user
---`,
    },
  ],

  // ===========================================================================
  // 13. Complete Examples
  // ===========================================================================
  completeExamples: [
    {
      title: 'Complete Example: PR Review Bot',
      titleKo: '완전한 예제: PR 리뷰 봇',
      language: 'markdown',
      code: `---
name: pr-review-bot
description: >
  Comprehensive pull request review bot. Analyzes code changes for
  quality, security, performance, and adherence to project standards.
  Posts structured review comments via GitHub MCP integration.
tools:
  - Bash
  - Read
  - Grep
  - Glob
  - mcp: github
deny_tools:
  - Bash(git push*)
  - Bash(git merge*)
  - Bash(git rebase*)
intercept:
  - tool: mcp: github
    pattern: ".*approve.*"
    message: "You are about to approve this PR. Please confirm."
---

# PR Review Bot

Perform a thorough code review of a pull request with structured feedback.

## When to Use
- When a team member requests a code review
- As part of the CI/CD pipeline for automated review
- When you want a second opinion on your own code

## Prerequisites
- GitHub MCP server must be running and configured
- Repository must be cloned locally with the PR branch available

## Review Process

### Phase 1: Context Gathering
1. Fetch PR details via GitHub MCP (title, body, labels, author)
2. Get the list of changed files
3. Read the PR description for intent and scope
4. Check if there are linked issues

### Phase 2: Code Analysis
For each changed file, analyze:

#### Correctness
- Logic errors or bugs
- Missing null/undefined checks
- Incorrect error handling
- Race conditions in async code

#### Security
- SQL injection vulnerabilities
- XSS attack vectors
- Hardcoded secrets or credentials
- Insecure dependencies
- Missing input validation

#### Performance
- N+1 query patterns
- Unnecessary re-renders (React)
- Missing memoization for expensive computations
- Large bundle impact from new imports

#### Style & Standards
- Naming conventions
- Code organization
- Documentation completeness
- Test coverage for new code

### Phase 3: Review Summary
Generate a structured review with:

\`\`\`
## Review Summary

**Overall Assessment**: [APPROVE | REQUEST_CHANGES | COMMENT]

### Critical Issues (Must Fix)
- [ ] Issue 1 with file path and line number
- [ ] Issue 2 with file path and line number

### Suggestions (Nice to Have)
- [ ] Suggestion 1
- [ ] Suggestion 2

### Positive Notes
- Good use of X pattern in file Y
- Clean separation of concerns in Z

### Test Coverage
- New code has X% test coverage
- Missing tests for: [list of untested scenarios]
\`\`\`

### Phase 4: Post Review
1. Post the review summary as a PR comment via GitHub MCP
2. Add inline comments on specific lines where issues were found
3. Set the review status (approve, request changes, or comment)

## Examples

### Basic Review
\`\`\`
User: /pr-review-bot review PR #42
\`\`\`

### Review with Focus Area
\`\`\`
User: /pr-review-bot review PR #42 --focus security
\`\`\`

## Troubleshooting

### GitHub MCP Not Connected
**Problem**: Cannot fetch PR data
**Solution**: Ensure GitHub MCP is configured in ~/.claude/mcp.json and the token has repo access

### Too Many Changed Files
**Problem**: PR has 50+ changed files, review is slow
**Solution**: Focus on the most critical files first. Prioritize: security-sensitive files, core logic, API boundaries`,
    },
    {
      title: 'Complete Example: Database Migration Generator',
      titleKo: '완전한 예제: 데이터베이스 마이그레이션 생성기',
      language: 'markdown',
      code: `---
name: db-migrate
description: >
  Generate and manage database migrations. Supports creating new migrations,
  validating schema changes, generating rollback scripts, and applying
  migrations to development databases. Works with Prisma, Knex, and
  raw SQL migration frameworks.
tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
allowed_tools:
  - Bash(npx prisma *)
  - Bash(npx knex *)
  - Bash(psql *)
  - Bash(mysql *)
  - Bash(sqlite3 *)
deny_tools:
  - Bash(* --production *)
  - Bash(* DROP DATABASE *)
intercept:
  - tool: Bash
    pattern: ".*migrate.*deploy.*"
    message: "About to apply migration. This will modify the database schema. Confirm?"
  - tool: Bash
    pattern: ".*DROP TABLE.*"
    message: "WARNING: DROP TABLE detected. This is destructive. Confirm?"
---

# Database Migration Generator

## When to Use
- Adding new tables or columns to the database
- Modifying existing schema (rename, alter types)
- Creating indexes for performance
- Setting up foreign key relationships
- Generating seed data scripts

## Prerequisites
- Database client installed (psql, mysql, or sqlite3)
- Migration framework configured (Prisma, Knex, or raw SQL)
- Development database running and accessible

## Instructions

### Step 1: Detect Migration Framework
1. Check for \`prisma/schema.prisma\` -> Prisma
2. Check for \`knexfile.js\` or \`knexfile.ts\` -> Knex
3. Check for \`migrations/\` directory with SQL files -> Raw SQL
4. If none found, ask user which framework to use

### Step 2: Analyze Requested Change
Parse the user's request to determine:
- Table(s) affected
- Column(s) to add/modify/remove
- Data types and constraints
- Index requirements
- Foreign key relationships

### Step 3: Generate Migration

#### For Prisma
1. Update \`prisma/schema.prisma\` with new model/fields
2. Run \`npx prisma migrate dev --name <descriptive-name>\`
3. Verify generated SQL migration file

#### For Knex
1. Run \`npx knex migrate:make <descriptive-name>\`
2. Fill in the \`up\` and \`down\` functions
3. Ensure \`down\` properly reverses all \`up\` changes

#### For Raw SQL
1. Create timestamped migration file: \`YYYYMMDDHHMMSS_<name>.sql\`
2. Write forward migration SQL
3. Create matching rollback file: \`YYYYMMDDHHMMSS_<name>_rollback.sql\`

### Step 4: Validate
1. Check migration syntax
2. Verify rollback script reverses all changes
3. Run migration on development database
4. Verify schema state matches expectations

### Step 5: Report
Output:
- Migration file path(s)
- SQL statements that will be executed
- Rollback instructions
- Any warnings about data loss

## Safety Rules
1. NEVER apply migrations to production databases
2. ALWAYS generate rollback scripts
3. ALWAYS verify foreign key constraints won't break existing data
4. Warn if migration involves dropping columns/tables (data loss)
5. Validate that NOT NULL columns have defaults for existing rows

## Examples

### Add a new table
\`\`\`
User: /db-migrate create users table with id, email, name, created_at
\`\`\`

### Add a column
\`\`\`
User: /db-migrate add avatar_url column to users table
\`\`\`

### Create an index
\`\`\`
User: /db-migrate add unique index on users.email
\`\`\``,
    },
    {
      title: 'Complete Example: Component Generator',
      titleKo: '완전한 예제: 컴포넌트 생성기',
      language: 'markdown',
      code: `---
name: component-gen
description: >
  Generate React/Vue/Svelte components based on project conventions.
  Auto-detects framework, styling approach, and testing setup.
  Creates component, styles, tests, and storybook files.
tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
---

# Component Generator

## When to Use
- Creating new UI components
- Scaffolding component boilerplate
- Ensuring new components follow team conventions

## Instructions

### Step 1: Detect Project Setup
1. **Framework Detection**:
   - \`package.json\` has \`react\` -> React
   - \`package.json\` has \`vue\` -> Vue
   - \`package.json\` has \`svelte\` -> Svelte

2. **Language Detection**:
   - \`tsconfig.json\` exists -> TypeScript
   - Otherwise -> JavaScript

3. **Styling Detection**:
   - \`tailwind.config.*\` -> Tailwind CSS
   - \`*.module.css\` files exist -> CSS Modules
   - \`styled-components\` in package.json -> Styled Components
   - \`@emotion\` in package.json -> Emotion

4. **Testing Detection**:
   - \`jest.config.*\` -> Jest
   - \`vitest.config.*\` -> Vitest
   - \`@testing-library/react\` -> React Testing Library

5. **Storybook Detection**:
   - \`.storybook/\` directory exists -> Storybook available

### Step 2: Scan Existing Components
1. Read 2-3 existing components to learn patterns:
   - File naming convention
   - Import ordering
   - Props typing style
   - Export convention (default vs named)
   - Hook usage patterns
   - Comment style

### Step 3: Generate Files

#### Component File (\`ComponentName.tsx\`)
\`\`\`tsx
import React from 'react';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  /** Description of the prop */
  propName: string;
}

export function ComponentName({ propName }: ComponentNameProps) {
  return (
    <div className={styles.container}>
      {propName}
    </div>
  );
}
\`\`\`

#### Test File (\`ComponentName.test.tsx\`)
\`\`\`tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName propName="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
\`\`\`

#### Story File (\`ComponentName.stories.tsx\`)
\`\`\`tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    propName: 'Hello World',
  },
};
\`\`\`

### Step 4: Register Component
1. Add export to the nearest barrel file (index.ts)
2. Verify TypeScript compilation passes

## Examples

### Basic Component
\`\`\`
User: /component-gen Button with label, onClick, and variant props
\`\`\`

### Component with Complex Props
\`\`\`
User: /component-gen DataTable with columns config, data array, sorting, and pagination
\`\`\`

## Troubleshooting

### Framework Not Detected
**Problem**: "Could not detect framework"
**Solution**: Ensure package.json is in the project root and lists the framework

### Style Mismatch
**Problem**: Generated styles don't match project
**Solution**: Run /component-gen with --style flag to override detection`,
    },
    {
      title: 'Complete Example: Monorepo Task Runner',
      titleKo: '완전한 예제: 모노레포 태스크 러너',
      language: 'markdown',
      code: `---
name: mono-run
description: >
  Smart task runner for monorepo projects. Detects affected packages
  from git changes, resolves dependency order, and runs tasks
  (build, test, lint) only on affected packages in correct order.
  Supports npm workspaces, yarn workspaces, pnpm workspaces, and Turborepo.
tools:
  - Bash
  - Read
  - Glob
  - Grep
allowed_tools:
  - Bash(npm *)
  - Bash(yarn *)
  - Bash(pnpm *)
  - Bash(npx turbo *)
  - Bash(git *)
  - Bash(node *)
deny_tools:
  - Bash(rm -rf *)
  - Bash(sudo *)
---

# Monorepo Task Runner

## When to Use
- Running tests only for packages affected by recent changes
- Building packages in correct dependency order
- Checking which packages are affected by a PR

## Instructions

### Step 1: Detect Monorepo Tool
1. \`turbo.json\` -> Turborepo
2. \`pnpm-workspace.yaml\` -> pnpm workspaces
3. \`package.json\` with \`workspaces\` field -> npm/yarn workspaces
4. \`lerna.json\` -> Lerna

### Step 2: Find Affected Packages
1. Get changed files: \`git diff --name-only main...HEAD\`
2. Map changed files to packages based on workspace configuration
3. Include packages that depend on changed packages (transitive)

### Step 3: Resolve Execution Order
1. Build dependency graph from package.json dependencies
2. Topologically sort packages
3. Identify packages that can run in parallel

### Step 4: Execute Task
For the requested task (build/test/lint):
1. Run on each affected package in dependency order
2. If a package fails, stop and report (unless --continue flag)
3. Collect results from all packages

### Step 5: Report Results
\`\`\`
Monorepo Task Summary
=====================
Task: test
Affected packages: 5 of 12
Duration: 45s

Results:
  @app/core         PASS  (12s)
  @app/utils        PASS  (3s)
  @app/api          PASS  (18s)
  @app/web          PASS  (8s)
  @app/mobile       FAIL  (4s)  <- 2 test failures

Failed: @app/mobile
  - src/auth.test.ts: Expected token to be valid
  - src/api.test.ts: Timeout waiting for response
\`\`\`

## Examples
\`\`\`
User: /mono-run test            # Test affected packages
User: /mono-run build           # Build affected packages
User: /mono-run lint --all      # Lint all packages
User: /mono-run test @app/core  # Test specific package
\`\`\``,
    },
  ],
};

// =============================================================================
// Helper: Get all examples for a section as a flat array
// =============================================================================
export function getExamplesForSection(sectionKey: string): CodeExample[] {
  return CODE_EXAMPLES[sectionKey] ?? [];
}

// =============================================================================
// Helper: Get a specific example by section key and index
// =============================================================================
export function getExample(sectionKey: string, index: number): CodeExample | undefined {
  const examples = CODE_EXAMPLES[sectionKey];
  if (!examples || index < 0 || index >= examples.length) {
    return undefined;
  }
  return examples[index];
}

// =============================================================================
// Helper: Get all section keys
// =============================================================================
export function getAllSectionKeys(): string[] {
  return Object.keys(CODE_EXAMPLES);
}

// =============================================================================
// Helper: Get total count of all examples
// =============================================================================
export function getTotalExampleCount(): number {
  return Object.values(CODE_EXAMPLES).reduce(
    (total, examples) => total + examples.length,
    0
  );
}

// =============================================================================
// Helper: Search examples by title (supports both English and Korean)
// =============================================================================
export function searchExamples(query: string): CodeExample[] {
  const lowerQuery = query.toLowerCase();
  const results: CodeExample[] = [];

  for (const examples of Object.values(CODE_EXAMPLES)) {
    for (const example of examples) {
      if (
        example.title.toLowerCase().includes(lowerQuery) ||
        example.titleKo.includes(query)
      ) {
        results.push(example);
      }
    }
  }

  return results;
}

// =============================================================================
// Helper: Get examples filtered by language
// =============================================================================
export function getExamplesByLanguage(
  language: CodeExample['language']
): CodeExample[] {
  const results: CodeExample[] = [];

  for (const examples of Object.values(CODE_EXAMPLES)) {
    for (const example of examples) {
      if (example.language === language) {
        results.push(example);
      }
    }
  }

  return results;
}
