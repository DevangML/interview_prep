/**
 * Skill Executor for BMad Skills
 * Loads and executes skills for domain decomposition
 */

/**
 * The 76 SKILL.md files are read at BUILD time, not from the filesystem.
 *
 * This loader previously used `fs.readdirSync`, which cannot work here for two
 * separate reasons: `fs` has no browser implementation, so the whole read threw
 * and was swallowed by the catch — meaning zero skills ever loaded in the
 * deployed app — and the bare 'fs' specifier needs @types/node, which is not a
 * declared dependency, so a clean install fails to typecheck.
 *
 * `import.meta.glob` resolves the same files during the build and inlines their
 * contents, so the behaviour is identical in Node and in the browser with no
 * runtime filesystem access at all.
 */
const SKILL_FILES = import.meta.glob('../../skills/bmad-skills/*/SKILL.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/** `../../skills/bmad-skills/bmad-agent-dev/SKILL.md` -> `bmad-agent-dev` */
function skillIdFromPath(filePath: string): string {
  const parts = filePath.split('/');
  return parts[parts.length - 2] ?? filePath;
}

export interface SkillMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  domain: string; // which domain this skill belongs to
  inputFields: string[];
  outputFormat: string;
  estimatedLatencyMs: number;
}

export interface SkillInvocation {
  skillId: string;
  skillName: string;
  parameters: Record<string, any>;
  context?: string;
}

export interface SkillResult {
  skillId: string;
  skillName: string;
  output: string;
  findings: string[];
  confidence: number;
  executionTimeMs: number;
  error?: string;
}

/**
 * Skill Loader — Discovers and catalogs BMad skills
 */
export class SkillLoader {
  private skillCache: Map<string, SkillMetadata> = new Map();
  private loaded = false;

  /**
   * Load all BMad skills from the skills directory
   */
  async loadSkills(): Promise<Map<string, SkillMetadata>> {
    if (this.loaded) return this.skillCache;

    try {
      for (const [filePath, content] of Object.entries(SKILL_FILES)) {
        const skillId = skillIdFromPath(filePath);
        const metadata = this.parseSkillMetadata(skillId, content);
        if (metadata) this.skillCache.set(skillId, metadata);
      }

      this.loaded = true;
      console.log(`[SkillLoader] Loaded ${this.skillCache.size} skills`);
    } catch (error) {
      console.error('[SkillLoader] Error loading skills:', error);
    }

    return this.skillCache;
  }

  /**
   * Parse SKILL.md frontmatter and description to extract metadata
   */
  private parseSkillMetadata(skillId: string, content: string): SkillMetadata | null {
    try {
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;

      const frontmatter = frontmatterMatch[1];
      const nameMatch = frontmatter.match(/name:\s*(.+)/);
      const descMatch = frontmatter.match(/description:\s*(.+)/);

      const name = nameMatch ? nameMatch[1].trim() : skillId;
      const description = descMatch ? descMatch[1].trim() : '';

      // Categorize skill based on name patterns
      const category = this.categorizeSkill(skillId);
      const domain = this.mapSkillToDomain(skillId, category);

      return {
        id: skillId,
        name,
        description,
        category,
        domain,
        inputFields: [],
        outputFormat: 'text',
        estimatedLatencyMs: 2000
      };
    } catch (error) {
      console.error(`[SkillLoader] Error parsing ${skillId}:`, error);
      return null;
    }
  }

  /**
   * Categorize skill based on naming conventions
   */
  private categorizeSkill(skillId: string): string {
    if (skillId.includes('brainstorm') || skillId.includes('ideate')) return 'ideation';
    if (skillId.includes('architecture') || skillId.includes('design')) return 'design';
    if (skillId.includes('review') || skillId.includes('audit')) return 'review';
    if (skillId.includes('research') || skillId.includes('analyze')) return 'research';
    if (skillId.includes('test') || skillId.includes('verify')) return 'testing';
    if (skillId.includes('document') || skillId.includes('write')) return 'documentation';
    if (skillId.includes('coach') || skillId.includes('teach')) return 'teaching';
    if (skillId.includes('strategy') || skillId.includes('plan')) return 'strategy';
    return 'general';
  }

  /**
   * Map skill to a domain (for domain decomposition)
   */
  private mapSkillToDomain(skillId: string, category: string): string {
    if (skillId.includes('architecture') || category === 'design') return 'architecture';
    if (category === 'review') return 'implementation';
    if (skillId.includes('security') || skillId.includes('vulnerability')) return 'security';
    if (skillId.includes('performance') || skillId.includes('optimization')) return 'performance';
    if (skillId.includes('test')) return 'testing';
    if (skillId.includes('cost') || skillId.includes('budget')) return 'cost';
    if (skillId.includes('compare') || skillId.includes('tradeoff')) return 'comparison';
    if (category === 'teaching' || category === 'research') return 'learning';
    if (category === 'strategy' || skillId.includes('career')) return 'strategy';
    return 'research'; // default
  }

  /**
   * Get skills for a specific domain
   */
  getSkillsForDomain(domain: string): SkillMetadata[] {
    return Array.from(this.skillCache.values()).filter(s => s.domain === domain);
  }

  /**
   * Get a skill by ID
   */
  getSkill(skillId: string): SkillMetadata | null {
    return this.skillCache.get(skillId) || null;
  }

  /**
   * Get all loaded skills
   */
  getAllSkills(): SkillMetadata[] {
    return Array.from(this.skillCache.values());
  }
}

/**
 * Skill Executor — Invokes skills and captures results
 */
export class SkillExecutor {
  private loader: SkillLoader;

  constructor() {
    // The skill set is fixed at build time by the glob above, so there is
    // nothing left to configure here — a directory argument would be ignored.
    this.loader = new SkillLoader();
  }

  /**
   * Initialize the executor (load all skills)
   */
  async init(): Promise<void> {
    await this.loader.loadSkills();
  }

  /**
   * Execute a single skill with given parameters
   */
  async executeSkill(
    skillId: string,
    parameters: Record<string, any>,
    context?: string
  ): Promise<SkillResult> {
    const startTime = Date.now();
    const skill = this.loader.getSkill(skillId);

    if (!skill) {
      return {
        skillId,
        skillName: skillId,
        output: '',
        findings: [],
        confidence: 0,
        executionTimeMs: Date.now() - startTime,
        error: `Skill not found: ${skillId}`
      };
    }

    try {
      // Stub: In production, this would actually invoke the skill
      // For now, generate mock findings based on skill description
      const findings = this.generateMockFindings(skill, parameters, context);

      const executionTimeMs = Date.now() - startTime;

      return {
        skillId,
        skillName: skill.name,
        output: findings.join('\n'),
        findings,
        confidence: 0.85,
        executionTimeMs
      };
    } catch (error) {
      return {
        skillId,
        skillName: skill.name,
        output: '',
        findings: [],
        confidence: 0,
        executionTimeMs: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Execute multiple skills in parallel
   */
  async executeSkillsInParallel(invocations: SkillInvocation[]): Promise<SkillResult[]> {
    const promises = invocations.map(inv =>
      this.executeSkill(inv.skillId, inv.parameters, inv.context)
    );
    return Promise.all(promises);
  }

  /**
   * Execute all skills for a domain
   */
  async executeSkillsForDomain(
    domain: string,
    context: string,
    parameters?: Record<string, any>
  ): Promise<SkillResult[]> {
    const skills = this.loader.getSkillsForDomain(domain);

    if (skills.length === 0) {
      console.log(`[SkillExecutor] No skills found for domain: ${domain}`);
      return [];
    }

    console.log(`[SkillExecutor] Executing ${skills.length} skills for domain: ${domain}`);

    const invocations: SkillInvocation[] = skills.map((skill) => ({
      skillId: skill.id,
      skillName: skill.name,
      parameters: parameters || { query: context },
      context,
    }));

    return this.executeSkillsInParallel(invocations);
  }

  /**
   * Generate mock findings based on skill type
   * In production, this would be replaced with actual skill output
   */
  private generateMockFindings(
    skill: SkillMetadata,
    parameters: Record<string, any>,
    context?: string
  ): string[] {
    const findings: string[] = [];

    // Generate findings based on skill category and context
    switch (skill.domain) {
      case 'architecture':
        findings.push(`Architectural analysis using ${skill.name}`);
        findings.push('Pattern recommendation: Consider scalable, modular design');
        findings.push('Tradeoff identified: Complexity vs. Maintainability');
        break;

      case 'performance':
        findings.push(`Performance review via ${skill.name}`);
        findings.push('Bottleneck identified in query execution layer');
        findings.push('Latency impact: ~200ms per operation at scale');
        break;

      case 'security':
        findings.push(`Security assessment using ${skill.name}`);
        findings.push('Vulnerability: Input validation missing on user fields');
        findings.push('Compliance note: OWASP Top 10 risk mitigation recommended');
        break;

      case 'implementation':
        findings.push(`Implementation complexity analysis via ${skill.name}`);
        findings.push('Effort estimate: 2-3 weeks for baseline implementation');
        findings.push('Risk: Third-party dependencies may introduce delays');
        break;

      case 'testing':
        findings.push(`Test strategy from ${skill.name}`);
        findings.push('Coverage gap: Edge cases in error handling');
        findings.push('Recommendation: Add 5-10 integration tests');
        break;

      case 'learning':
        findings.push(`Educational breakdown via ${skill.name}`);
        findings.push('Key concept: This pattern is used in [related domain]');
        findings.push('Analogy: Similar to [known pattern] but with variations');
        break;

      case 'comparison':
        findings.push(`Comparative analysis from ${skill.name}`);
        findings.push('Alternative A: Pros (+speed), Cons (-complexity)');
        findings.push('Alternative B: Pros (+simplicity), Cons (-performance)');
        break;

      case 'cost':
        findings.push(`Cost analysis via ${skill.name}`);
        findings.push('Infrastructure cost: ~$500/month at 100k QPS');
        findings.push('ROI: Positive within 6 months for this scale');
        break;

      case 'strategy':
        findings.push(`Strategic assessment from ${skill.name}`);
        findings.push('Market fit: Strong alignment with current trends');
        findings.push('Career impact: Demonstrates system design expertise');
        break;

      default:
        findings.push(`Analysis from ${skill.name}`);
        findings.push('Key finding: Relevant insight from skill');
        findings.push('Recommendation: Consider best practices');
    }

    return findings;
  }

  /**
   * List all available skills
   */
  listSkills(): SkillMetadata[] {
    return this.loader.getAllSkills();
  }

  /**
   * Get skills by domain
   */
  getSkillsForDomain(domain: string): SkillMetadata[] {
    return this.loader.getSkillsForDomain(domain);
  }
}
