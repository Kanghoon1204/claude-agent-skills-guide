// =============================================================================
// codeExamples.ts
// All YAML, Bash, Markdown, and code snippets for the Claude Agent Skills Guide
// Each example includes both Korean (titleKo) and English (title) titles
// =============================================================================

export interface CodeExample {
  id?: string;
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
      id: 'folder-structure',
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
      id: 'minimal-skillmd',
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
    {
      title: 'Pattern 6: Circuit Breaker',
      titleKo: '패턴 6: Circuit Breaker (장애 격리)',
      language: 'python',
      code: `# scripts/circuit_breaker.py
"""
Circuit Breaker pattern implementation for fault tolerance.

Prevents cascading failures by stopping requests to a failing service
and allowing it time to recover. Three states: CLOSED, OPEN, HALF_OPEN.

Usage in SKILL.md:
---
name: resilient-api-caller
description: >
  API caller with circuit breaker pattern for fault tolerance.
  Prevents cascading failures when external services are down.
tools:
  - Bash
  - Read
  - Write
---

## Instructions
Before making API calls, run:
\`\`\`bash
python scripts/circuit_breaker.py --check <service-name>
\`\`\`

If circuit is OPEN, skip the call and return cached data or error.
"""

import time
import json
from pathlib import Path
from enum import IntEnum
from typing import Callable, Any, Dict
from datetime import datetime, timedelta


class CircuitState(IntEnum):
    """Circuit breaker states"""
    CLOSED = 0      # Normal operation, requests allowed
    OPEN = 1        # Failure threshold exceeded, requests blocked
    HALF_OPEN = 2   # Testing if service recovered


class CircuitBreakerOpenError(Exception):
    """Raised when circuit is OPEN and requests are blocked"""
    pass


class CircuitBreaker:
    """
    Circuit Breaker for external service calls.

    States:
    - CLOSED: Normal operation. Failures increment counter.
    - OPEN: Too many failures. All requests blocked for timeout period.
    - HALF_OPEN: Testing recovery. Allow one request to check if service recovered.

    Args:
        service_name: Unique identifier for the service
        failure_threshold: Number of failures before opening circuit (default: 5)
        timeout: Seconds to wait before attempting recovery (default: 60)
        state_file: Path to persist circuit state (default: /tmp/circuit_breaker_state.json)
    """

    def __init__(
        self,
        service_name: str,
        failure_threshold: int = 5,
        timeout: int = 60,
        state_file: str = "/tmp/circuit_breaker_state.json"
    ):
        self.service_name = service_name
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.state_file = Path(state_file)

        # Load persisted state or initialize
        self._load_state()

    def _load_state(self):
        """Load circuit state from disk"""
        if self.state_file.exists():
            with open(self.state_file) as f:
                data = json.load(f)
                service_data = data.get(self.service_name, {})
                self.state = CircuitState(service_data.get('state', CircuitState.CLOSED))
                self.failure_count = service_data.get('failure_count', 0)
                self.last_failure_time = service_data.get('last_failure_time')
        else:
            self.state = CircuitState.CLOSED
            self.failure_count = 0
            self.last_failure_time = None

    def _save_state(self):
        """Persist circuit state to disk"""
        data = {}
        if self.state_file.exists():
            with open(self.state_file) as f:
                data = json.load(f)

        data[self.service_name] = {
            'state': int(self.state),
            'failure_count': self.failure_count,
            'last_failure_time': self.last_failure_time
        }

        with open(self.state_file, 'w') as f:
            json.dump(data, f, indent=2)

    def call(self, func: Callable, *args, **kwargs) -> Any:
        """
        Execute function with circuit breaker protection.

        Args:
            func: Function to execute
            *args, **kwargs: Arguments to pass to func

        Returns:
            Result of func(*args, **kwargs)

        Raises:
            CircuitBreakerOpenError: If circuit is OPEN
            Exception: Any exception raised by func
        """
        if self.state == CircuitState.OPEN:
            # Check if timeout has elapsed
            if self.last_failure_time:
                elapsed = time.time() - self.last_failure_time
                if elapsed > self.timeout:
                    print(f"⚡ Circuit HALF_OPEN: Testing recovery for {self.service_name}")
                    self.state = CircuitState.HALF_OPEN
                    self._save_state()
                else:
                    raise CircuitBreakerOpenError(
                        f"Circuit OPEN for {self.service_name}. "
                        f"Retry in {self.timeout - elapsed:.0f}s"
                    )
            else:
                raise CircuitBreakerOpenError(f"Circuit OPEN for {self.service_name}")

        try:
            result = func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise

    def on_success(self):
        """Handle successful call - reset failure count"""
        if self.state == CircuitState.HALF_OPEN:
            print(f"✅ Circuit CLOSED: {self.service_name} recovered")

        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time = None
        self._save_state()

    def on_failure(self):
        """Handle failed call - increment counter and potentially open circuit"""
        self.failure_count += 1
        self.last_failure_time = time.time()

        if self.failure_count >= self.failure_threshold:
            print(f"🔴 Circuit OPEN: {self.service_name} failed {self.failure_count} times")
            self.state = CircuitState.OPEN
        else:
            print(f"⚠️  Failure {self.failure_count}/{self.failure_threshold} for {self.service_name}")

        self._save_state()

    def get_state(self) -> Dict[str, Any]:
        """Get current circuit state information"""
        return {
            'service': self.service_name,
            'state': self.state.name,
            'failure_count': self.failure_count,
            'failure_threshold': self.failure_threshold,
            'last_failure_time': self.last_failure_time,
            'timeout': self.timeout
        }


# Example usage
if __name__ == '__main__':
    import requests
    import sys

    # Initialize circuit breaker for external API
    cb = CircuitBreaker(
        service_name='external-api',
        failure_threshold=3,
        timeout=30
    )

    def call_external_api():
        """Simulated external API call"""
        response = requests.get('https://api.example.com/data', timeout=5)
        response.raise_for_status()
        return response.json()

    # Make protected call
    try:
        result = cb.call(call_external_api)
        print(f"✅ API call succeeded: {result}")
    except CircuitBreakerOpenError as e:
        print(f"🔴 {e}")
        print("💡 Using fallback: cached data or default response")
        sys.exit(1)
    except requests.RequestException as e:
        print(f"⚠️  API call failed: {e}")
        print(f"Circuit state: {cb.get_state()}")
        sys.exit(1)`,
    },
    {
      title: 'Pattern 7: Retry with Exponential Backoff',
      titleKo: '패턴 7: 지수 백오프 재시도',
      language: 'bash',
      code: `#!/bin/bash
# scripts/retry_with_backoff.sh
#
# Retry with Exponential Backoff pattern for transient failures.
#
# Retries a command with increasing delays between attempts.
# Useful for network calls, rate-limited APIs, and flaky operations.
#
# Usage in SKILL.md:
# ---
# name: resilient-deployment
# description: >
#   Deploy with automatic retry on transient failures.
#   Uses exponential backoff to handle rate limits and network issues.
# tools:
#   - Bash
# ---
#
# ## Instructions
# Wrap deployment commands with retry logic:
# \`\`\`bash
# bash scripts/retry_with_backoff.sh kubectl apply -f deployment.yaml
# \`\`\`

set -euo pipefail

# Retry configuration
MAX_ATTEMPTS="\${MAX_ATTEMPTS:-5}"
INITIAL_TIMEOUT="\${INITIAL_TIMEOUT:-1}"
MAX_TIMEOUT="\${MAX_TIMEOUT:-64}"
BACKOFF_MULTIPLIER="\${BACKOFF_MULTIPLIER:-2}"

# ANSI color codes
RED='\\033[0;31m'
YELLOW='\\033[1;33m'
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

retry_with_backoff() {
    local attempt=1
    local timeout="$INITIAL_TIMEOUT"
    local exit_code=0

    echo -e "\${BLUE}🔄 Retry Configuration:\${NC}"
    echo "   Max Attempts: $MAX_ATTEMPTS"
    echo "   Initial Timeout: \${INITIAL_TIMEOUT}s"
    echo "   Backoff Multiplier: \${BACKOFF_MULTIPLIER}x"
    echo "   Command: $*"
    echo ""

    while [ $attempt -le "$MAX_ATTEMPTS" ]; do
        echo -e "\${BLUE}[Attempt $attempt/$MAX_ATTEMPTS]\${NC} Executing: $*"

        # Execute command and capture exit code
        set +e
        "$@"
        exit_code=$?
        set -e

        # Success - exit immediately
        if [ $exit_code -eq 0 ]; then
            echo -e "\${GREEN}✅ Success on attempt $attempt\${NC}"
            return 0
        fi

        # Failed - check if we should retry
        if [ $attempt -eq "$MAX_ATTEMPTS" ]; then
            echo -e "\${RED}❌ Failed after $MAX_ATTEMPTS attempts\${NC}"
            return $exit_code
        fi

        # Calculate next timeout with exponential backoff
        echo -e "\${YELLOW}⚠️  Attempt $attempt failed (exit code: $exit_code)\${NC}"
        echo -e "\${YELLOW}⏳ Waiting \${timeout}s before retry...\${NC}"
        sleep "$timeout"

        # Increase timeout exponentially, but cap at MAX_TIMEOUT
        timeout=$((timeout * BACKOFF_MULTIPLIER))
        if [ $timeout -gt "$MAX_TIMEOUT" ]; then
            timeout="$MAX_TIMEOUT"
        fi

        attempt=$((attempt + 1))
        echo ""
    done

    return $exit_code
}

# Advanced: Retry with jitter to prevent thundering herd
retry_with_jittered_backoff() {
    local attempt=1
    local timeout="$INITIAL_TIMEOUT"
    local exit_code=0

    while [ $attempt -le "$MAX_ATTEMPTS" ]; do
        echo -e "\${BLUE}[Attempt $attempt/$MAX_ATTEMPTS]\${NC} Executing: $*"

        set +e
        "$@"
        exit_code=$?
        set -e

        if [ $exit_code -eq 0 ]; then
            echo -e "\${GREEN}✅ Success on attempt $attempt\${NC}"
            return 0
        fi

        if [ $attempt -eq "$MAX_ATTEMPTS" ]; then
            echo -e "\${RED}❌ Failed after $MAX_ATTEMPTS attempts\${NC}"
            return $exit_code
        fi

        # Add random jitter (0-50% of timeout) to prevent thundering herd
        local jitter=$((RANDOM % (timeout / 2)))
        local actual_timeout=$((timeout + jitter))

        echo -e "\${YELLOW}⚠️  Attempt $attempt failed (exit code: $exit_code)\${NC}"
        echo -e "\${YELLOW}⏳ Waiting \${actual_timeout}s (\${timeout}s + \${jitter}s jitter)...\${NC}"
        sleep "$actual_timeout"

        timeout=$((timeout * BACKOFF_MULTIPLIER))
        if [ $timeout -gt "$MAX_TIMEOUT" ]; then
            timeout="$MAX_TIMEOUT"
        fi

        attempt=$((attempt + 1))
        echo ""
    done

    return $exit_code
}

# Retry specific to HTTP requests (detects retryable status codes)
retry_http_request() {
    local url="$1"
    local attempt=1
    local timeout="$INITIAL_TIMEOUT"
    local http_code=0

    while [ $attempt -le "$MAX_ATTEMPTS" ]; do
        echo -e "\${BLUE}[Attempt $attempt/$MAX_ATTEMPTS]\${NC} HTTP GET: $url"

        # Make HTTP request and capture status code
        http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")

        # Success (2xx)
        if [[ "$http_code" =~ ^2[0-9][0-9]$ ]]; then
            echo -e "\${GREEN}✅ Success: HTTP $http_code\${NC}"
            return 0
        fi

        # Client error (4xx) - don't retry except for 429 (rate limit)
        if [[ "$http_code" =~ ^4[0-9][0-9]$ ]] && [ "$http_code" != "429" ]; then
            echo -e "\${RED}❌ Client error: HTTP $http_code (not retrying)\${NC}"
            return 1
        fi

        # Server error (5xx) or rate limit (429) - retry
        if [ $attempt -eq "$MAX_ATTEMPTS" ]; then
            echo -e "\${RED}❌ Failed after $MAX_ATTEMPTS attempts (HTTP $http_code)\${NC}"
            return 1
        fi

        echo -e "\${YELLOW}⚠️  HTTP $http_code - retrying...\${NC}"
        sleep "$timeout"

        timeout=$((timeout * BACKOFF_MULTIPLIER))
        if [ $timeout -gt "$MAX_TIMEOUT" ]; then
            timeout="$MAX_TIMEOUT"
        fi

        attempt=$((attempt + 1))
    done

    return 1
}

# Main execution
if [ $# -eq 0 ]; then
    echo "Usage: $0 <command> [args...]"
    echo ""
    echo "Environment variables:"
    echo "  MAX_ATTEMPTS        Number of retry attempts (default: 5)"
    echo "  INITIAL_TIMEOUT     Initial delay in seconds (default: 1)"
    echo "  MAX_TIMEOUT         Maximum delay in seconds (default: 64)"
    echo "  BACKOFF_MULTIPLIER  Delay multiplier (default: 2)"
    echo ""
    echo "Examples:"
    echo "  $0 curl https://api.example.com/health"
    echo "  MAX_ATTEMPTS=3 $0 kubectl apply -f deployment.yaml"
    echo "  $0 npm publish"
    exit 1
fi

# Execute with retry logic
retry_with_backoff "$@"`,
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
    {
      title: 'YAML Validation Script',
      titleKo: 'YAML 검증 스크립트',
      language: 'bash',
      code: `#!/bin/bash
# validate_yaml.sh - YAML 문법 검증 스크립트
# Usage: ./validate_yaml.sh path/to/skill-folder

SKILL_DIR="\${1:-.}"
SKILL_MD="\$SKILL_DIR/SKILL.md"

echo "=== YAML Validation for \$SKILL_MD ==="

# Check if SKILL.md exists
if [ ! -f "\$SKILL_MD" ]; then
    echo "❌ ERROR: SKILL.md not found in \$SKILL_DIR"
    exit 1
fi

# Check for frontmatter delimiters
DELIMITER_COUNT=\$(grep -c "^---$" "\$SKILL_MD")
if [ "\$DELIMITER_COUNT" -lt 2 ]; then
    echo "❌ ERROR: Missing YAML frontmatter delimiters (need at least 2 '---' lines)"
    exit 1
fi

# Extract YAML frontmatter
YAML_CONTENT=\$(sed -n '/^---$/,/^---$/p' "\$SKILL_MD" | sed '1d;$d')

# Check for tabs (common error)
if echo "\$YAML_CONTENT" | grep -q $'\\t'; then
    echo "❌ ERROR: Found TAB characters in YAML (use spaces instead)"
    echo "Lines with tabs:"
    echo "\$YAML_CONTENT" | grep -n $'\\t'
    exit 1
fi

# Validate with Python (if available)
if command -v python3 &> /dev/null; then
    echo "\$YAML_CONTENT" | python3 -c "
import sys
import yaml
try:
    data = yaml.safe_load(sys.stdin.read())
    if 'name' not in data:
        print('❌ ERROR: Missing required field: name')
        sys.exit(1)
    if 'description' not in data:
        print('❌ ERROR: Missing required field: description')
        sys.exit(1)
    print('✅ YAML syntax is valid')
    print(f'   name: {data[\"name\"]}')
    print(f'   description: {data[\"description\"][:50]}...')
except yaml.YAMLError as e:
    print(f'❌ YAML parsing error: {e}')
    sys.exit(1)
"
else
    echo "⚠️  Python not found, skipping detailed validation"
fi

echo "=== Validation complete ==="`,
    },
    {
      title: 'Folder Structure Validation Script',
      titleKo: '폴더 구조 검증 스크립트',
      language: 'bash',
      code: `#!/bin/bash
# validate_structure.sh - 스킬 폴더 구조 검증
# Usage: ./validate_structure.sh path/to/skill-folder

SKILL_DIR="\${1:-.}"
ERRORS=0

echo "=== Skill Structure Validation ==="
echo "Directory: \$SKILL_DIR"
echo ""

# 1. Check directory name (kebab-case)
DIR_NAME=\$(basename "\$SKILL_DIR")
if [[ ! "\$DIR_NAME" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "❌ Directory name must be kebab-case: \$DIR_NAME"
    echo "   Example: my-awesome-skill"
    ((ERRORS++))
else
    echo "✅ Directory name: \$DIR_NAME"
fi

# 2. Check SKILL.md exists (case-sensitive)
if [ -f "\$SKILL_DIR/SKILL.md" ]; then
    echo "✅ SKILL.md exists"
else
    # Check for common case errors
    for f in skill.md Skill.md SKILL.MD; do
        if [ -f "\$SKILL_DIR/\$f" ]; then
            echo "❌ Found \$f but it must be exactly SKILL.md"
            ((ERRORS++))
            break
        fi
    done
    if [ \$ERRORS -eq 0 ]; then
        echo "❌ SKILL.md not found"
        ((ERRORS++))
    fi
fi

# 3. Check YAML name matches directory
if [ -f "\$SKILL_DIR/SKILL.md" ]; then
    YAML_NAME=\$(sed -n '/^---$/,/^---$/p' "\$SKILL_DIR/SKILL.md" | grep "^name:" | sed 's/name: *//')
    if [ "\$YAML_NAME" = "\$DIR_NAME" ]; then
        echo "✅ YAML name matches directory"
    else
        echo "❌ YAML name '\$YAML_NAME' doesn't match directory '\$DIR_NAME'"
        ((ERRORS++))
    fi
fi

# 4. Check for README.md (should NOT exist)
if [ -f "\$SKILL_DIR/README.md" ]; then
    echo "⚠️  WARNING: README.md found - may confuse Claude"
fi

# 5. List optional directories
echo ""
echo "Optional directories:"
[ -d "\$SKILL_DIR/scripts" ] && echo "  ✓ scripts/"
[ -d "\$SKILL_DIR/references" ] && echo "  ✓ references/"
[ -d "\$SKILL_DIR/assets" ] && echo "  ✓ assets/"

# Summary
echo ""
if [ \$ERRORS -eq 0 ]; then
    echo "✅ All checks passed!"
    exit 0
else
    echo "❌ Found \$ERRORS error(s)"
    exit 1
fi`,
    },
    {
      title: 'Token Count Estimation Script',
      titleKo: '토큰 수 추정 스크립트',
      language: 'bash',
      code: `#!/bin/bash
# estimate_tokens.sh - 스킬 토큰 수 추정
# Usage: ./estimate_tokens.sh path/to/skill-folder
#
# Note: Uses approximation of ~4 characters per token for English
#       Actual token count may vary based on content

SKILL_DIR="\${1:-.}"

echo "=== Token Estimation for Skill ==="
echo "Directory: \$SKILL_DIR"
echo ""

# Function to estimate tokens (chars / 4)
estimate_tokens() {
    local file="\$1"
    local chars=\$(wc -c < "\$file" 2>/dev/null || echo 0)
    echo \$((chars / 4))
}

# Function to format number with commas
format_number() {
    printf "%'d" "\$1"
}

TOTAL_TOKENS=0

# 1. SKILL.md (Tier 1 + Tier 2)
if [ -f "\$SKILL_DIR/SKILL.md" ]; then
    SKILL_TOKENS=\$(estimate_tokens "\$SKILL_DIR/SKILL.md")
    TOTAL_TOKENS=\$((TOTAL_TOKENS + SKILL_TOKENS))
    echo "SKILL.md:           ~\$(format_number \$SKILL_TOKENS) tokens"

    # Separate YAML (Tier 1) and Markdown (Tier 2)
    YAML_CHARS=\$(sed -n '/^---$/,/^---$/p' "\$SKILL_DIR/SKILL.md" | wc -c)
    YAML_TOKENS=\$((YAML_CHARS / 4))
    MD_TOKENS=\$((SKILL_TOKENS - YAML_TOKENS))
    echo "  ├── YAML (Tier 1): ~\$(format_number \$YAML_TOKENS) tokens (always loaded)"
    echo "  └── Body (Tier 2): ~\$(format_number \$MD_TOKENS) tokens (loaded when active)"
fi

# 2. references/ (Tier 3)
if [ -d "\$SKILL_DIR/references" ]; then
    REF_TOKENS=0
    echo ""
    echo "references/ (Tier 3 - loaded on demand):"
    for f in "\$SKILL_DIR/references"/*; do
        if [ -f "\$f" ]; then
            T=\$(estimate_tokens "\$f")
            REF_TOKENS=\$((REF_TOKENS + T))
            echo "  - \$(basename \$f): ~\$(format_number \$T) tokens"
        fi
    done
    TOTAL_TOKENS=\$((TOTAL_TOKENS + REF_TOKENS))
    echo "  Total references: ~\$(format_number \$REF_TOKENS) tokens"
fi

# 3. scripts/
if [ -d "\$SKILL_DIR/scripts" ]; then
    SCRIPT_TOKENS=0
    echo ""
    echo "scripts/ (loaded when executed):"
    for f in "\$SKILL_DIR/scripts"/*; do
        if [ -f "\$f" ]; then
            T=\$(estimate_tokens "\$f")
            SCRIPT_TOKENS=\$((SCRIPT_TOKENS + T))
            echo "  - \$(basename \$f): ~\$(format_number \$T) tokens"
        fi
    done
    TOTAL_TOKENS=\$((TOTAL_TOKENS + SCRIPT_TOKENS))
fi

# Summary
echo ""
echo "=================================="
echo "Total estimated tokens: ~\$(format_number \$TOTAL_TOKENS)"
echo ""

# Recommendations
if [ \$TOTAL_TOKENS -gt 10000 ]; then
    echo "⚠️  WARNING: High token count may impact performance"
    echo "   Consider moving details to references/"
elif [ \$TOTAL_TOKENS -gt 5000 ]; then
    echo "💡 TIP: Good size, but consider progressive disclosure"
else
    echo "✅ Token count is optimal"
fi`,
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
      title: 'allowed_tools vs deny_tools Priority Rules',
      titleKo: 'allowed_tools와 deny_tools 우선순위 규칙',
      language: 'yaml',
      code: `---
name: priority-example
description: Demonstrating allowed/deny priority

tools:
  - Bash
  - Read

# PRIORITY RULE: deny_tools ALWAYS takes precedence over allowed_tools
#
# Evaluation order:
# 1. Check deny_tools first → if match, BLOCK
# 2. Check allowed_tools → if match, ALLOW
# 3. If no allowed_tools defined → ALLOW by default
# 4. If allowed_tools defined but no match → BLOCK

# Example: Allow all git commands EXCEPT force push
allowed_tools:
  - Bash(git *)           # Allow: git status, git commit, git push
  - Bash(npm install *)   # Allow: npm install <package>
  - Read(src/*)           # Allow: read any file in src/

deny_tools:
  - Bash(git push --force*)  # Block: even though git * is allowed
  - Bash(git push -f *)      # Block: shorthand force push
  - Bash(git reset --hard*)  # Block: destructive reset
  - Read(src/*.env)          # Block: even though src/* is allowed
---

# EXAMPLE SCENARIOS:
#
# 1. User requests: "git status"
#    → Check deny_tools: no match
#    → Check allowed_tools: matches "Bash(git *)"
#    → ALLOWED ✓
#
# 2. User requests: "git push --force origin main"
#    → Check deny_tools: matches "Bash(git push --force*)"
#    → BLOCKED ✗ (deny takes precedence)
#
# 3. User requests: "rm -rf /"
#    → Check deny_tools: no match
#    → Check allowed_tools: no match (only git/npm/Read allowed)
#    → BLOCKED ✗ (not in whitelist)
#
# 4. User requests: "read src/config.ts"
#    → Check deny_tools: no match
#    → Check allowed_tools: matches "Read(src/*)"
#    → ALLOWED ✓
#
# 5. User requests: "read src/.env"
#    → Check deny_tools: matches "Read(src/*.env)"
#    → BLOCKED ✗ (deny takes precedence)`,
    },
    {
      title: 'compatibility Field Usage',
      titleKo: 'compatibility 필드 사용법',
      language: 'yaml',
      code: `---
name: advanced-skill
description: Skill with compatibility requirements

# OPTIONAL: Define environment compatibility (1-500 characters)
# This field documents the required environment for the skill
# Note: Currently informational only, not auto-validated

compatibility: >
  claude-code >= 1.0.0,
  node >= 18.0.0,
  mcp-server-github >= 0.5.0

# Alternative: Single line format
# compatibility: "claude-code >= 1.0.0, python >= 3.9"

metadata:
  version: 2.0.0
  author: MyTeam
  mcp-server: github
---

# Use Cases for compatibility field:
#
# 1. Claude Code version requirement
#    compatibility: "claude-code >= 1.0.0"
#
# 2. MCP server dependency
#    compatibility: "mcp-server: github >= 0.5.0, mcp-server: slack >= 1.0.0"
#
# 3. Runtime environment
#    compatibility: "node >= 18, npm >= 9"
#    compatibility: "python >= 3.9, pip >= 21.0"
#
# 4. Multiple constraints
#    compatibility: >
#      claude-code >= 1.0.0,
#      mcp-server: github >= 0.5.0,
#      node >= 18.0.0,
#      git >= 2.30.0`,
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

deny_tools:                         # list of denied patterns (higher priority)
  - ToolName(glob-pattern)          # Blacklist specific uses

intercept:                          # list of confirmation rules
  - tool: ToolName                  # Which tool to intercept
    pattern: "regex-pattern"        # When to intercept
    message: "Confirmation prompt"  # What to ask the user

compatibility: >                    # string, 1-500 chars (informational)
  claude-code >= 1.0.0,
  node >= 18.0.0

metadata:
  author: Your Name                 # string
  version: 1.0.0                    # semver string
  category: productivity            # enum: productivity, development, etc.
  tags: [automation, workflow]      # list of strings (max 10)
  mcp-server: github                # string
  documentation: https://...        # URL
  support: email@example.com        # email or URL
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
    {
      title: 'Production Example 1: Security Audit Skill',
      titleKo: '프로덕션 예제 1: 보안 감사 스킬',
      language: 'markdown',
      code: `---
name: security-audit
description: >
  OWASP Top 10 automated security validation and dependency vulnerability
  scanning. Generates detailed reports in Markdown, JSON, and HTML formats.
  Integrates with CI/CD pipelines for continuous security monitoring.
tools:
  - Bash
  - Read
  - Write
  - Grep
  - Glob
deny_tools:
  - Bash(rm -rf*)
  - Bash(sudo*)
  - Write(/etc/*)
metadata:
  version: "1.2.0"
  category: security
  license: MIT
  tags: [security, owasp, audit, vulnerability-scan]
---

# Security Audit Skill

Perform automated security audits based on OWASP Top 10 and dependency vulnerability scans.

## When to Use
- Before deploying to production
- As part of CI/CD security gates
- During security review processes
- For compliance audits

## Prerequisites
- Python 3.8+ with bandit, safety installed
- Node.js 16+ with npm audit
- Ruby 2.7+ with bundle audit (optional)

## Audit Process

### Phase 1: Dependency Vulnerability Scan
\`\`\`bash
# Python dependencies
safety check -r requirements.txt --json > safety-report.json

# Node.js dependencies
npm audit --json > npm-audit.json

# Ruby dependencies (if present)
bundle audit check --format json > bundle-audit.json
\`\`\`

### Phase 2: OWASP Top 10 Validation

#### A01: Broken Access Control
- Check for missing @require_auth decorators
- Validate role-based access control (RBAC)
- Scan for exposed admin endpoints

#### A02: Cryptographic Failures
- Detect hardcoded secrets (API keys, passwords)
- Check for weak encryption algorithms (MD5, SHA1)
- Validate TLS/SSL configuration

#### A03: Injection
- SQL Injection: Scan for raw SQL queries without parameterization
- Command Injection: Check for shell command concatenation
- XSS: Validate HTML escaping in templates

#### A04: Insecure Design
- Check for missing rate limiting
- Validate input validation patterns
- Review error message exposure

#### A05: Security Misconfiguration
- Check for debug=True in production
- Validate CORS policies
- Review security headers (CSP, X-Frame-Options)

### Phase 3: Report Generation

The skill generates three report formats:

**Markdown Report** (human-readable)
\`\`\`markdown
# Security Audit Report
Date: 2025-01-15
Severity Breakdown:
- Critical: 2
- High: 5
- Medium: 12
- Low: 8

## Critical Issues
1. **SQL Injection in login.py:45**
   - Raw SQL query without parameterization
   - Recommendation: Use ORM or prepared statements

2. **Hardcoded AWS Secret in config.py:12**
   - AWS_SECRET_KEY exposed in source code
   - Recommendation: Use environment variables
\`\`\`

**JSON Report** (machine-parseable)
\`\`\`json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "summary": {
    "critical": 2,
    "high": 5,
    "medium": 12,
    "low": 8
  },
  "findings": [
    {
      "id": "SQL-001",
      "severity": "critical",
      "category": "A03-Injection",
      "file": "login.py",
      "line": 45,
      "description": "SQL Injection vulnerability",
      "recommendation": "Use parameterized queries"
    }
  ]
}
\`\`\`

**HTML Report** (for dashboard integration)
- Color-coded severity levels
- Collapsible sections by category
- Export to PDF button

## CI/CD Integration

### GitHub Actions
\`\`\`yaml
- name: Security Audit
  run: |
    claude-code execute security-audit
    if [ \$(jq '.summary.critical' audit-report.json) -gt 0 ]; then
      echo "Critical vulnerabilities found!"
      exit 1
    fi
\`\`\`

## Performance Notes
- Typical scan time: 2-5 minutes for medium-sized projects
- Parallel execution for faster scans
- Incremental scans for changed files only`,
    },
    {
      title: 'Production Example 2: E2E Testing Orchestrator',
      titleKo: '프로덕션 예제 2: E2E 테스팅 오케스트레이터',
      language: 'markdown',
      code: `---
name: e2e-test-orchestrator
description: >
  End-to-End testing automation with Playwright/Cypress. Captures screenshots,
  videos, and traces on failure. Sends Slack notifications with test results
  and failure diagnostics. Supports parallel execution across browsers.
tools:
  - Bash
  - Read
  - Write
  - mcp: slack
deny_tools:
  - Bash(rm -rf test-results/*)
metadata:
  version: "2.1.0"
  category: testing
  license: MIT
  tags: [e2e, playwright, cypress, testing, automation]
---

# E2E Testing Orchestrator

Automate end-to-end testing with intelligent failure diagnostics and notifications.

## When to Use
- Before merging pull requests
- As part of nightly test runs
- After deployments to staging/production
- For regression testing

## Prerequisites
- Playwright 1.40+ OR Cypress 13+
- Slack MCP server configured (for notifications)
- Chrome, Firefox, Safari installed

## Test Execution Flow

### Phase 1: Environment Setup
\`\`\`javascript
// scripts/e2e-orchestrator.js
const { chromium, firefox, webkit } = require('playwright');

const config = {
  browsers: ['chromium', 'firefox', 'webkit'],
  baseURL: process.env.TEST_URL || 'http://localhost:3000',
  retries: 3,
  timeout: 30000,
  parallel: true,
  video: 'on-failure',
  screenshot: 'on-failure',
  trace: 'on-failure'
};
\`\`\`

### Phase 2: Test Discovery & Execution

The orchestrator automatically discovers tests in \`tests/e2e/**/*.spec.{js,ts}\`:

\`\`\`javascript
async function runTests() {
  const testFiles = await glob('tests/e2e/**/*.spec.{js,ts}');

  const results = await Promise.allSettled(
    config.browsers.map(browser =>
      runTestsInBrowser(browser, testFiles)
    )
  );

  return aggregateResults(results);
}
\`\`\`

### Phase 3: Failure Diagnostics

When a test fails, the orchestrator:

1. **Captures Screenshot**
   \`\`\`javascript
   await page.screenshot({
     path: \`failures/\${testName}-\${Date.now()}.png\`,
     fullPage: true
   });
   \`\`\`

2. **Records Video**
   - Last 30 seconds before failure
   - Saved to \`test-results/videos/\`

3. **Collects Trace**
   \`\`\`javascript
   await context.tracing.start({ screenshots: true, snapshots: true });
   // ... test execution
   await context.tracing.stop({ path: 'trace.zip' });
   \`\`\`

4. **Extracts Console Logs**
   \`\`\`javascript
   page.on('console', msg => {
     if (msg.type() === 'error') {
       errors.push({
         time: Date.now(),
         text: msg.text()
       });
     }
   });
   \`\`\`

### Phase 4: Retry Logic (Exponential Backoff)

\`\`\`javascript
async function retryTest(testFn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await testFn();
    } catch (error) {
      if (attempt === maxRetries) throw error;

      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.log(\`Retry \${attempt}/\${maxRetries} in \${delay}ms\`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
\`\`\`

### Phase 5: Slack Notification

\`\`\`javascript
async function sendSlackNotification(results) {
  const message = {
    channel: '#qa-alerts',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: results.failed > 0
            ? ':x: *E2E Tests Failed*'
            : ':white_check_mark: *E2E Tests Passed*'
        }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: \`*Total:* \${results.total}\` },
          { type: 'mrkdwn', text: \`*Passed:* \${results.passed}\` },
          { type: 'mrkdwn', text: \`*Failed:* \${results.failed}\` },
          { type: 'mrkdwn', text: \`*Duration:* \${results.duration}s\` }
        ]
      }
    ],
    attachments: results.failures.map(f => ({
      color: 'danger',
      title: f.testName,
      text: f.error,
      image_url: uploadScreenshot(f.screenshot)
    }))
  };

  await slackMCP.postMessage(message);
}
\`\`\`

## Parallel Execution

Run tests across 3 browsers in parallel:

\`\`\`bash
# Sequential (slow): 90 seconds
playwright test

# Parallel (fast): 35 seconds
playwright test --workers=3
\`\`\`

## Performance Metrics
- Average test execution: 2-4 seconds per test
- Parallel speedup: 3x with 3 workers
- Failure diagnosis overhead: <500ms`,
    },
    {
      title: 'Production Example 3: Documentation Generator',
      titleKo: '프로덕션 예제 3: 문서 생성기',
      language: 'markdown',
      code: `---
name: doc-generator
description: >
  Automatically generates API documentation from OpenAPI specs and TypeScript
  source code. Creates Mermaid diagrams for class hierarchies and sequences.
  Generates code samples in cURL, Python, and TypeScript for all endpoints.
tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
metadata:
  version: "1.5.0"
  category: documentation
  license: MIT
  tags: [documentation, openapi, typescript, mermaid]
---

# Documentation Generator

Generate comprehensive API documentation with diagrams and code samples.

## When to Use
- After adding/modifying API endpoints
- Before releasing new API versions
- For onboarding new developers
- To maintain up-to-date documentation

## Prerequisites
- Python 3.8+ with openapi-spec-validator
- Node.js 16+ with typedoc
- OpenAPI 3.0 spec file (openapi.yaml)
- TypeScript project with tsconfig.json

## Generation Process

### Phase 1: OpenAPI Spec Validation

\`\`\`python
# scripts/doc_generator.py
from openapi_spec_validator import validate_spec
import yaml

def validate_openapi(spec_path):
    with open(spec_path) as f:
        spec = yaml.safe_load(f)

    try:
        validate_spec(spec)
        return spec, None
    except Exception as e:
        return None, str(e)
\`\`\`

### Phase 2: Markdown Generation

For each endpoint, generate:

\`\`\`markdown
## POST /api/v1/users

Create a new user account.

**Request Body**
\`\`\`json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "developer"
}
\`\`\`

**Response (201 Created)**
\`\`\`json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "created_at": "2025-01-15T10:30:00Z"
}
\`\`\`

**Error Responses**
- 400 Bad Request: Invalid email format
- 409 Conflict: Email already exists
- 422 Unprocessable Entity: Missing required fields

**Code Samples**

*cURL*
\`\`\`bash
curl -X POST https://api.example.com/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${API_KEY}" \\
  -d '{"email":"user@example.com","name":"John Doe"}'
\`\`\`

*Python*
\`\`\`python
import requests

response = requests.post(
    'https://api.example.com/v1/users',
    headers={'Authorization': f'Bearer {api_key}'},
    json={'email': 'user@example.com', 'name': 'John Doe'}
)
print(response.json())
\`\`\`

*TypeScript*
\`\`\`typescript
const response = await fetch('https://api.example.com/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe'
  })
});
const data = await response.json();
\`\`\`
\`\`\`

### Phase 3: Mermaid Diagram Generation

**Class Diagram** (from TypeScript interfaces)
\`\`\`mermaid
classDiagram
    class User {
        +String id
        +String email
        +String name
        +UserRole role
        +Date created_at
        +updateProfile()
        +deleteAccount()
    }

    class UserRole {
        <<enumeration>>
        ADMIN
        DEVELOPER
        VIEWER
    }

    User --> UserRole
\`\`\`

**Sequence Diagram** (authentication flow)
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant A as API Gateway
    participant Auth as Auth Service
    participant DB as Database

    C->>A: POST /api/v1/auth/login
    A->>Auth: Validate credentials
    Auth->>DB: Query user
    DB-->>Auth: User data
    Auth->>Auth: Generate JWT
    Auth-->>A: Token + Refresh Token
    A-->>C: 200 OK {access_token, refresh_token}
\`\`\`

### Phase 4: TypeScript API Extraction

\`\`\`typescript
// scripts/extract-types.ts
import * as ts from 'typescript';

function extractInterfaces(sourceFile: ts.SourceFile) {
  const interfaces: InterfaceDoc[] = [];

  ts.forEachChild(sourceFile, node => {
    if (ts.isInterfaceDeclaration(node)) {
      interfaces.push({
        name: node.name.text,
        members: node.members.map(m => ({
          name: m.name?.getText(),
          type: m.type?.getText(),
          optional: !!m.questionToken,
          comment: getJSDocComment(m)
        }))
      });
    }
  });

  return interfaces;
}
\`\`\`

### Phase 5: Version Management

Docs are organized by API version:

\`\`\`
docs/
  v1/
    endpoints/
      users.md
      auth.md
    diagrams/
      architecture.md
    changelog.md
  v2/
    endpoints/
      users.md
    changelog.md
\`\`\`

## Automation

\`\`\`bash
# Generate docs on every commit to main
# .github/workflows/docs.yml
- name: Generate API Docs
  run: |
    claude-code execute doc-generator
    git add docs/
    git commit -m "docs: auto-update API documentation"
\`\`\`

## Output Metrics
- Documentation coverage: 100% of public endpoints
- Diagram generation: <10 seconds
- Code sample accuracy: Validated against live API`,
    },
    {
      title: 'Production Example 4: API Gateway Configuration',
      titleKo: '프로덕션 예제 4: API Gateway 설정',
      language: 'python',
      code: `# scripts/gateway_config.py
"""
API Gateway Configuration Skill
Supports Kong, Nginx, AWS API Gateway
Configures rate limiting, JWT auth, OpenTelemetry tracing
"""
import requests
import json
from typing import Dict, List

class GatewayConfigurator:
    def __init__(self, gateway_type: str, admin_url: str):
        self.gateway_type = gateway_type
        self.admin_url = admin_url

    def configure_rate_limiting(self,
                                service: str,
                                limit: int,
                                window: int = 60):
        """
        Configure rate limiting using Token Bucket algorithm

        Args:
            service: Service/route name
            limit: Requests per window
            window: Time window in seconds

        Example:
            configurator.configure_rate_limiting('api-users', 100, 60)
            # Allows 100 requests per minute
        """
        if self.gateway_type == 'kong':
            return self._kong_rate_limit(service, limit, window)
        elif self.gateway_type == 'nginx':
            return self._nginx_rate_limit(service, limit, window)
        elif self.gateway_type == 'aws':
            return self._aws_rate_limit(service, limit, window)

    def _kong_rate_limit(self, service: str, limit: int, window: int):
        config = {
            "name": "rate-limiting",
            "service": {"name": service},
            "config": {
                "minute": limit if window == 60 else None,
                "second": limit if window == 1 else None,
                "policy": "local",
                "fault_tolerant": True,
                "hide_client_headers": False
            }
        }

        response = requests.post(
            f"{self.admin_url}/plugins",
            json=config,
            headers={"Content-Type": "application/json"}
        )

        if response.status_code == 201:
            print(f"✓ Rate limiting configured: {limit} req/{window}s")
            return response.json()
        else:
            raise Exception(f"Failed: {response.text}")

    def configure_jwt_auth(self,
                          issuer: str,
                          algorithm: str = 'RS256',
                          public_key_path: str = None):
        """
        Configure JWT authentication

        Args:
            issuer: JWT issuer (e.g., 'auth.example.com')
            algorithm: RS256 (RSA) or HS256 (HMAC)
            public_key_path: Path to public key for RS256

        Example JWT payload:
        {
          "iss": "auth.example.com",
          "sub": "user_123",
          "exp": 1735689000,
          "roles": ["admin", "developer"]
        }
        """
        if algorithm == 'RS256' and not public_key_path:
            raise ValueError("RS256 requires public_key_path")

        config = {
            "name": "jwt",
            "config": {
                "uri_param_names": ["jwt"],
                "cookie_names": ["jwt"],
                "header_names": ["Authorization"],
                "claims_to_verify": ["exp"],
                "key_claim_name": "iss",
                "secret_is_base64": False,
                "algorithm": algorithm
            }
        }

        if algorithm == 'RS256':
            with open(public_key_path) as f:
                config["config"]["rsa_public_key"] = f.read()

        response = requests.post(
            f"{self.admin_url}/plugins",
            json=config
        )

        if response.status_code == 201:
            print(f"✓ JWT auth configured: {algorithm}")
            return response.json()
        else:
            raise Exception(f"Failed: {response.text}")

    def configure_opentelemetry(self,
                                endpoint: str,
                                service_name: str):
        """
        Configure OpenTelemetry distributed tracing

        Args:
            endpoint: OTLP collector endpoint (e.g., 'http://jaeger:4317')
            service_name: Service identifier for traces

        Trace propagation:
        - traceparent: 00-<trace-id>-<span-id>-01
        - tracestate: vendor-specific data
        """
        config = {
            "name": "opentelemetry",
            "config": {
                "endpoint": endpoint,
                "resource_attributes": {
                    "service.name": service_name
                },
                "header_type": "w3c",  # W3C Trace Context
                "sampling_rate": 1.0,  # 100% sampling (adjust in production)
                "connect_timeout": 1000,
                "send_timeout": 5000
            }
        }

        response = requests.post(
            f"{self.admin_url}/plugins",
            json=config
        )

        if response.status_code == 201:
            print(f"✓ OpenTelemetry configured: {endpoint}")
            return response.json()
        else:
            raise Exception(f"Failed: {response.text}")

    def configure_cors(self,
                      origins: List[str],
                      methods: List[str] = None,
                      headers: List[str] = None):
        """
        Configure CORS policy

        Args:
            origins: Allowed origins (e.g., ['https://app.example.com'])
            methods: Allowed methods (default: ['GET', 'POST', 'PUT', 'DELETE'])
            headers: Allowed headers (default: ['Content-Type', 'Authorization'])
        """
        methods = methods or ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        headers = headers or ['Content-Type', 'Authorization', 'X-Request-ID']

        config = {
            "name": "cors",
            "config": {
                "origins": origins,
                "methods": methods,
                "headers": headers,
                "exposed_headers": ["X-Auth-Token"],
                "credentials": True,
                "max_age": 3600,
                "preflight_continue": False
            }
        }

        response = requests.post(
            f"{self.admin_url}/plugins",
            json=config
        )

        if response.status_code == 201:
            print(f"✓ CORS configured: {len(origins)} origins")
            return response.json()
        else:
            raise Exception(f"Failed: {response.text}")

    def configure_circuit_breaker(self,
                                  threshold: int = 5,
                                  timeout: int = 60):
        """
        Configure Circuit Breaker pattern

        States:
        - CLOSED: Normal operation, requests pass through
        - OPEN: Failures exceeded threshold, requests blocked
        - HALF_OPEN: Test request allowed after timeout

        Args:
            threshold: Number of consecutive failures before opening
            timeout: Seconds to wait before transitioning to HALF_OPEN
        """
        # This is typically handled by a custom plugin
        # Example using Kong's request-termination for fallback
        fallback_response = {
            "error": "Service temporarily unavailable",
            "retry_after": timeout,
            "status": 503
        }

        print(f"✓ Circuit Breaker: {threshold} failures, {timeout}s timeout")
        print(f"  Fallback response: {json.dumps(fallback_response, indent=2)}")

# Usage Example
if __name__ == "__main__":
    configurator = GatewayConfigurator('kong', 'http://localhost:8001')

    # Rate limiting: 100 requests per minute
    configurator.configure_rate_limiting('user-api', 100, 60)

    # JWT authentication with RS256
    configurator.configure_jwt_auth(
        issuer='auth.example.com',
        algorithm='RS256',
        public_key_path='keys/jwt-public.pem'
    )

    # OpenTelemetry tracing
    configurator.configure_opentelemetry(
        endpoint='http://jaeger:4317',
        service_name='api-gateway'
    )

    # CORS for SPA
    configurator.configure_cors(
        origins=['https://app.example.com', 'https://admin.example.com']
    )

    # Circuit breaker
    configurator.configure_circuit_breaker(threshold=5, timeout=60)`,
    },
    {
      title: 'Production Example 5: Data Pipeline Builder',
      titleKo: '프로덕션 예제 5: 데이터 파이프라인 빌더',
      language: 'python',
      code: `# scripts/pipeline_builder.py
"""
Data Pipeline Builder
Defines ETL workflows, validates with Great Expectations,
generates Airflow/Prefect DAGs
"""
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
import great_expectations as gx
import pandas as pd

class PipelineBuilder:
    def __init__(self, pipeline_name: str):
        self.pipeline_name = pipeline_name
        self.tasks = []

    def add_extract_task(self, source: str, query: str = None):
        """
        Add data extraction task

        Supported sources:
        - PostgreSQL: 'postgres://user:pass@host:5432/db'
        - MySQL: 'mysql://user:pass@host:3306/db'
        - S3: 's3://bucket/path/to/data.csv'
        - API: 'https://api.example.com/data'
        """
        def extract(**context):
            if source.startswith('postgres://'):
                import psycopg2
                conn = psycopg2.connect(source)
                df = pd.read_sql_query(query, conn)
            elif source.startswith('s3://'):
                df = pd.read_csv(source)
            elif source.startswith('https://'):
                import requests
                response = requests.get(source)
                df = pd.DataFrame(response.json())
            else:
                raise ValueError(f"Unsupported source: {source}")

            # Store in XCom for next task
            context['ti'].xcom_push(key='extracted_data', value=df.to_json())
            return f"Extracted {len(df)} rows"

        self.tasks.append({
            'task_id': f'{self.pipeline_name}_extract',
            'python_callable': extract,
            'doc': f'Extract data from {source}'
        })

    def add_transform_task(self, transformations: list):
        """
        Add data transformation task

        Example transformations:
        [
            {'type': 'filter', 'column': 'status', 'value': 'active'},
            {'type': 'rename', 'old': 'user_id', 'new': 'id'},
            {'type': 'aggregate', 'group_by': 'category', 'agg': 'sum'},
            {'type': 'join', 'right': 'users', 'on': 'user_id'}
        ]
        """
        def transform(**context):
            ti = context['ti']
            data_json = ti.xcom_pull(key='extracted_data', task_ids=f'{self.pipeline_name}_extract')
            df = pd.read_json(data_json)

            for t in transformations:
                if t['type'] == 'filter':
                    df = df[df[t['column']] == t['value']]
                elif t['type'] == 'rename':
                    df = df.rename(columns={t['old']: t['new']})
                elif t['type'] == 'aggregate':
                    df = df.groupby(t['group_by']).agg(t['agg'])
                elif t['type'] == 'join':
                    right_df = pd.read_csv(t['right'])
                    df = df.merge(right_df, on=t['on'])

            ti.xcom_push(key='transformed_data', value=df.to_json())
            return f"Transformed to {len(df)} rows"

        self.tasks.append({
            'task_id': f'{self.pipeline_name}_transform',
            'python_callable': transform,
            'doc': f'Apply {len(transformations)} transformations'
        })

    def add_validation_task(self, expectations_suite: str):
        """
        Add Great Expectations validation

        Example expectations suite:
        {
          "expectations": [
            {
              "expectation_type": "expect_column_values_to_not_be_null",
              "kwargs": {"column": "id"}
            },
            {
              "expectation_type": "expect_column_values_to_be_between",
              "kwargs": {"column": "age", "min_value": 0, "max_value": 120}
            },
            {
              "expectation_type": "expect_column_values_to_match_regex",
              "kwargs": {"column": "email", "regex": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"}
            }
          ]
        }
        """
        def validate(**context):
            ti = context['ti']
            data_json = ti.xcom_pull(key='transformed_data', task_ids=f'{self.pipeline_name}_transform')
            df = pd.read_json(data_json)

            # Create Great Expectations context
            ge_context = gx.get_context()
            batch = ge_context.sources.pandas_default.read_dataframe(df)

            # Load expectations suite
            suite = ge_context.get_expectation_suite(expectations_suite)

            # Validate
            results = batch.validate(suite)

            if not results['success']:
                failed_expectations = [
                    e for e in results['results']
                    if not e['success']
                ]
                raise ValueError(f"Validation failed: {len(failed_expectations)} expectations")

            print(f"✓ Validation passed: {results['statistics']['successful_expectations']} expectations")
            ti.xcom_push(key='validated_data', value=df.to_json())

        self.tasks.append({
            'task_id': f'{self.pipeline_name}_validate',
            'python_callable': validate,
            'doc': f'Validate with Great Expectations suite: {expectations_suite}'
        })

    def add_load_task(self, destination: str):
        """
        Add data loading task

        Supported destinations:
        - PostgreSQL: 'postgres://user:pass@host:5432/db/table'
        - S3: 's3://bucket/path/output.parquet'
        - BigQuery: 'bigquery://project/dataset/table'
        """
        def load(**context):
            ti = context['ti']
            data_json = ti.xcom_pull(key='validated_data', task_ids=f'{self.pipeline_name}_validate')
            df = pd.read_json(data_json)

            if destination.startswith('postgres://'):
                from sqlalchemy import create_engine
                engine = create_engine(destination.rsplit('/', 1)[0])
                table_name = destination.rsplit('/', 1)[1]
                df.to_sql(table_name, engine, if_exists='append', index=False)
            elif destination.startswith('s3://'):
                df.to_parquet(destination, engine='pyarrow')
            elif destination.startswith('bigquery://'):
                df.to_gbq(destination.replace('bigquery://', ''), if_exists='append')

            return f"Loaded {len(df)} rows to {destination}"

        self.tasks.append({
            'task_id': f'{self.pipeline_name}_load',
            'python_callable': load,
            'doc': f'Load data to {destination}'
        })

    def generate_airflow_dag(self, schedule: str = '0 0 * * *'):
        """
        Generate Airflow DAG

        Args:
            schedule: Cron expression (default: daily at midnight)

        Returns:
            DAG object ready to be placed in dags/ folder
        """
        default_args = {
            'owner': 'data-team',
            'depends_on_past': False,
            'email_on_failure': True,
            'email_on_retry': False,
            'email': ['data-alerts@example.com'],
            'retries': 3,
            'retry_delay': timedelta(minutes=5),
            'retry_exponential_backoff': True,
            'max_retry_delay': timedelta(minutes=30)
        }

        dag = DAG(
            self.pipeline_name,
            default_args=default_args,
            description=f'ETL pipeline: {self.pipeline_name}',
            schedule_interval=schedule,
            start_date=datetime(2025, 1, 1),
            catchup=False,
            tags=['etl', 'auto-generated']
        )

        previous_task = None
        for task_spec in self.tasks:
            task = PythonOperator(
                task_id=task_spec['task_id'],
                python_callable=task_spec['python_callable'],
                dag=dag,
                doc_md=task_spec['doc']
            )

            if previous_task:
                previous_task >> task  # Set dependency
            previous_task = task

        return dag

# Usage Example
if __name__ == "__main__":
    builder = PipelineBuilder('user_analytics_pipeline')

    # Extract
    builder.add_extract_task(
        source='postgres://user:pass@db:5432/prod',
        query='SELECT * FROM users WHERE created_at > NOW() - INTERVAL \\'1 day\\''
    )

    # Transform
    builder.add_transform_task([
        {'type': 'filter', 'column': 'status', 'value': 'active'},
        {'type': 'rename', 'old': 'user_id', 'new': 'id'},
        {'type': 'aggregate', 'group_by': 'country', 'agg': 'count'}
    ])

    # Validate
    builder.add_validation_task('user_analytics_suite')

    # Load
    builder.add_load_task('s3://analytics-data/users/daily.parquet')

    # Generate DAG
    dag = builder.generate_airflow_dag(schedule='0 2 * * *')  # Daily at 2 AM

    print(f"Generated DAG with {len(builder.tasks)} tasks")`,
    },
    {
      title: 'Production Example 6: Compliance Checker',
      titleKo: '프로덕션 예제 6: 컴플라이언스 체커',
      language: 'python',
      code: `# scripts/compliance_checker.py
"""
Compliance Checker
GDPR, CCPA validation and PII detection
Generates audit reports in PDF and HTML
"""
import re
import os
from pathlib import Path
from typing import List, Dict
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ComplianceFinding:
    severity: str  # 'critical', 'high', 'medium', 'low'
    category: str
    file_path: str
    line_number: int
    description: str
    recommendation: str
    regulation: str  # 'GDPR', 'CCPA', 'HIPAA'

class ComplianceChecker:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.findings: List[ComplianceFinding] = []

        # PII detection patterns
        self.pii_patterns = {
            'email': r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
            'ssn': r'\\b\\d{3}-\\d{2}-\\d{4}\\b',
            'phone': r'\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b',
            'credit_card': r'\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b',
            'ip_address': r'\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b',
        }

    def scan_pii_in_code(self) -> int:
        """
        Scan source code, logs, and config files for PII

        Returns:
            Number of PII instances found
        """
        extensions = ['.py', '.js', '.ts', '.java', '.log', '.txt', '.env', '.yaml', '.json']
        exclude_dirs = {'node_modules', '.git', 'venv', '__pycache__', 'build', 'dist'}

        for file_path in self.project_root.rglob('*'):
            if file_path.is_file() and file_path.suffix in extensions:
                if any(ex in file_path.parts for ex in exclude_dirs):
                    continue

                self._scan_file_for_pii(file_path)

        return len([f for f in self.findings if 'PII' in f.category])

    def _scan_file_for_pii(self, file_path: Path):
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()

            for line_num, line in enumerate(lines, 1):
                for pii_type, pattern in self.pii_patterns.items():
                    matches = re.findall(pattern, line)
                    if matches:
                        self.findings.append(ComplianceFinding(
                            severity='critical' if pii_type in ['ssn', 'credit_card'] else 'high',
                            category=f'PII Exposure - {pii_type}',
                            file_path=str(file_path.relative_to(self.project_root)),
                            line_number=line_num,
                            description=f'{pii_type.upper()} found in plaintext: {matches[0][:20]}...',
                            recommendation='Remove hardcoded PII, use environment variables or secure vault',
                            regulation='GDPR Art. 32, CCPA 1798.150'
                        ))
        except Exception as e:
            print(f"Error scanning {file_path}: {e}")

    def check_gdpr_compliance(self) -> Dict[str, bool]:
        """
        Check GDPR compliance requirements

        Returns:
            Dictionary of compliance checks and their status
        """
        checks = {
            'consent_mechanism': False,
            'data_portability': False,
            'right_to_erasure': False,
            'privacy_policy': False,
            'data_breach_notification': False,
            'dpo_contact': False  # Data Protection Officer
        }

        # Check for consent implementation
        if self._file_contains_pattern('**/consent*.py', r'def (get|check)_consent'):
            checks['consent_mechanism'] = True
        else:
            self.findings.append(ComplianceFinding(
                severity='critical',
                category='GDPR - Consent',
                file_path='N/A',
                line_number=0,
                description='No consent mechanism implementation found',
                recommendation='Implement explicit user consent for data processing (GDPR Art. 7)',
                regulation='GDPR Art. 7'
            ))

        # Check for data portability (export feature)
        if self._file_contains_pattern('**/*export*.py', r'def export_user_data'):
            checks['data_portability'] = True
        else:
            self.findings.append(ComplianceFinding(
                severity='high',
                category='GDPR - Data Portability',
                file_path='N/A',
                line_number=0,
                description='No data export functionality found',
                recommendation='Implement user data export in machine-readable format (GDPR Art. 20)',
                regulation='GDPR Art. 20'
            ))

        # Check for data deletion (right to be forgotten)
        if self._file_contains_pattern('**/*delete*.py', r'def (delete|remove)_user_data'):
            checks['right_to_erasure'] = True
        else:
            self.findings.append(ComplianceFinding(
                severity='critical',
                category='GDPR - Right to Erasure',
                file_path='N/A',
                line_number=0,
                description='No user data deletion functionality found',
                recommendation='Implement complete user data deletion (GDPR Art. 17)',
                regulation='GDPR Art. 17'
            ))

        # Check for privacy policy
        privacy_files = list(self.project_root.glob('**/privacy*.{md,html,txt}'))
        if privacy_files:
            checks['privacy_policy'] = True
        else:
            self.findings.append(ComplianceFinding(
                severity='high',
                category='GDPR - Transparency',
                file_path='N/A',
                line_number=0,
                description='No privacy policy document found',
                recommendation='Create privacy policy explaining data processing (GDPR Art. 13-14)',
                regulation='GDPR Art. 13-14'
            ))

        return checks

    def check_ccpa_compliance(self) -> Dict[str, bool]:
        """
        Check California Consumer Privacy Act compliance

        Returns:
            Dictionary of CCPA compliance checks
        """
        checks = {
            'do_not_sell_option': False,
            'data_disclosure': False,
            'opt_out_mechanism': False,
            'deletion_request': False
        }

        # Check for "Do Not Sell My Personal Information" link
        if self._file_contains_pattern('**/*.html', r'do.?not.?sell', ignore_case=True):
            checks['do_not_sell_option'] = True
        else:
            self.findings.append(ComplianceFinding(
                severity='critical',
                category='CCPA - Do Not Sell',
                file_path='N/A',
                line_number=0,
                description='No "Do Not Sell" option found for California users',
                recommendation='Add "Do Not Sell My Personal Information" link (CCPA 1798.135)',
                regulation='CCPA 1798.135'
            ))

        # Check for data disclosure
        if self._file_contains_pattern('**/privacy*.{md,html}', r'categories.{1,50}personal.{1,50}information', ignore_case=True):
            checks['data_disclosure'] = True
        else:
            self.findings.append(ComplianceFinding(
                severity='high',
                category='CCPA - Disclosure',
                file_path='N/A',
                line_number=0,
                description='Privacy policy does not disclose categories of personal information',
                recommendation='List categories of collected personal information (CCPA 1798.100)',
                regulation='CCPA 1798.100'
            ))

        return checks

    def check_cookie_compliance(self) -> bool:
        """
        Check cookie consent banner implementation

        Required elements:
        - Cookie consent banner
        - Cookie policy page
        - Granular consent options (necessary, functional, analytics, advertising)
        """
        html_files = list(self.project_root.glob('**/*.html'))
        has_cookie_banner = False

        for file_path in html_files:
            content = file_path.read_text(errors='ignore')
            if re.search(r'cookie.?consent|cookie.?banner', content, re.IGNORECASE):
                has_cookie_banner = True
                break

        if not has_cookie_banner:
            self.findings.append(ComplianceFinding(
                severity='medium',
                category='Cookie Compliance',
                file_path='N/A',
                line_number=0,
                description='No cookie consent banner implementation found',
                recommendation='Implement cookie consent banner with granular options',
                regulation='GDPR ePrivacy Directive'
            ))

        return has_cookie_banner

    def _file_contains_pattern(self, glob_pattern: str, regex: str, ignore_case: bool = False) -> bool:
        flags = re.IGNORECASE if ignore_case else 0
        for file_path in self.project_root.glob(glob_pattern):
            if file_path.is_file():
                content = file_path.read_text(errors='ignore')
                if re.search(regex, content, flags):
                    return True
        return False

    def generate_report(self, format: str = 'markdown') -> str:
        """
        Generate compliance audit report

        Args:
            format: 'markdown', 'json', or 'html'

        Returns:
            Report content as string
        """
        summary = {
            'critical': len([f for f in self.findings if f.severity == 'critical']),
            'high': len([f for f in self.findings if f.severity == 'high']),
            'medium': len([f for f in self.findings if f.severity == 'medium']),
            'low': len([f for f in self.findings if f.severity == 'low'])
        }

        if format == 'markdown':
            report = f"""# Compliance Audit Report

**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Project**: {self.project_root}

## Summary
- Critical: {summary['critical']}
- High: {summary['high']}
- Medium: {summary['medium']}
- Low: {summary['low']}

## Findings

"""
            for finding in sorted(self.findings, key=lambda x: ('critical', 'high', 'medium', 'low').index(x.severity)):
                report += f"""### {finding.severity.upper()}: {finding.category}
**Regulation**: {finding.regulation}
**File**: {finding.file_path}:{finding.line_number}
**Description**: {finding.description}
**Recommendation**: {finding.recommendation}

"""
            return report

        elif format == 'json':
            import json
            return json.dumps({
                'timestamp': datetime.now().isoformat(),
                'summary': summary,
                'findings': [
                    {
                        'severity': f.severity,
                        'category': f.category,
                        'file': f.file_path,
                        'line': f.line_number,
                        'description': f.description,
                        'recommendation': f.recommendation,
                        'regulation': f.regulation
                    }
                    for f in self.findings
                ]
            }, indent=2)

# Usage Example
if __name__ == "__main__":
    checker = ComplianceChecker('/path/to/project')

    print("Scanning for PII...")
    pii_count = checker.scan_pii_in_code()
    print(f"Found {pii_count} PII instances")

    print("\\nChecking GDPR compliance...")
    gdpr = checker.check_gdpr_compliance()
    print(f"GDPR compliance: {sum(gdpr.values())}/{len(gdpr)} checks passed")

    print("\\nChecking CCPA compliance...")
    ccpa = checker.check_ccpa_compliance()
    print(f"CCPA compliance: {sum(ccpa.values())}/{len(ccpa)} checks passed")

    print("\\nChecking cookie compliance...")
    cookies = checker.check_cookie_compliance()

    # Generate report
    report = checker.generate_report(format='markdown')
    with open('compliance-report.md', 'w') as f:
        f.write(report)
    print("\\n✓ Report saved to compliance-report.md")`,
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
