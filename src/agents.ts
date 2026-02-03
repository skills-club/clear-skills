import type { IAgentConfig, IAgentType } from '@/types.ts'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { xdgConfig } from 'xdg-basedir'

const home = homedir()
// Use xdg-basedir (not env-paths) to match OpenCode/Amp/Goose behavior on all platforms.
const configHome = xdgConfig ?? join(home, '.config')
const codexHome = process.env.CODEX_HOME?.trim() || join(home, '.codex')
const claudeHome = process.env.CLAUDE_CONFIG_DIR?.trim() || join(home, '.claude')

export const agents: Record<IAgentType, IAgentConfig> = {
    'amp': {
        name: 'amp',
        displayName: 'Amp',
        skillsDir: '.agents/skills',
        globalSkillsDir: join(configHome, 'agents/skills'),
    },
    'antigravity': {
        name: 'antigravity',
        displayName: 'Antigravity',
        skillsDir: '.agent/skills',
        globalSkillsDir: join(home, '.gemini/antigravity/skills'),
    },
    'augment': {
        name: 'augment',
        displayName: 'Augment',
        skillsDir: '.augment/rules',
        globalSkillsDir: join(home, '.augment/rules'),
    },
    'claude-code': {
        name: 'claude-code',
        displayName: 'Claude Code',
        skillsDir: '.claude/skills',
        globalSkillsDir: join(claudeHome, 'skills'),
    },
    'openclaw': {
        name: 'openclaw',
        displayName: 'OpenClaw',
        skillsDir: 'skills',
        globalSkillsDir: existsSync(join(home, '.openclaw'))
            ? join(home, '.openclaw/skills')
            : existsSync(join(home, '.clawdbot'))
                ? join(home, '.clawdbot/skills')
                : join(home, '.moltbot/skills'),
    },
    'cline': {
        name: 'cline',
        displayName: 'Cline',
        skillsDir: '.cline/skills',
        globalSkillsDir: join(home, '.cline/skills'),
    },
    'codebuddy': {
        name: 'codebuddy',
        displayName: 'CodeBuddy',
        skillsDir: '.codebuddy/skills',
        globalSkillsDir: join(home, '.codebuddy/skills'),
    },
    'codex': {
        name: 'codex',
        displayName: 'Codex',
        skillsDir: '.codex/skills',
        globalSkillsDir: join(codexHome, 'skills'),
    },
    'command-code': {
        name: 'command-code',
        displayName: 'Command Code',
        skillsDir: '.commandcode/skills',
        globalSkillsDir: join(home, '.commandcode/skills'),
    },
    'continue': {
        name: 'continue',
        displayName: 'Continue',
        skillsDir: '.continue/skills',
        globalSkillsDir: join(home, '.continue/skills'),
    },
    'crush': {
        name: 'crush',
        displayName: 'Crush',
        skillsDir: '.crush/skills',
        globalSkillsDir: join(home, '.config/crush/skills'),
    },
    'cursor': {
        name: 'cursor',
        displayName: 'Cursor',
        skillsDir: '.cursor/skills',
        globalSkillsDir: join(home, '.cursor/skills'),
    },
    'droid': {
        name: 'droid',
        displayName: 'Droid',
        skillsDir: '.factory/skills',
        globalSkillsDir: join(home, '.factory/skills'),
    },
    'gemini-cli': {
        name: 'gemini-cli',
        displayName: 'Gemini CLI',
        skillsDir: '.gemini/skills',
        globalSkillsDir: join(home, '.gemini/skills'),
    },
    'github-copilot': {
        name: 'github-copilot',
        displayName: 'GitHub Copilot',
        skillsDir: '.github/skills',
        globalSkillsDir: join(home, '.copilot/skills'),
    },
    'goose': {
        name: 'goose',
        displayName: 'Goose',
        skillsDir: '.goose/skills',
        globalSkillsDir: join(configHome, 'goose/skills'),
    },
    'junie': {
        name: 'junie',
        displayName: 'Junie',
        skillsDir: '.junie/skills',
        globalSkillsDir: join(home, '.junie/skills'),
    },
    'iflow-cli': {
        name: 'iflow-cli',
        displayName: 'iFlow CLI',
        skillsDir: '.iflow/skills',
        globalSkillsDir: join(home, '.iflow/skills'),
    },
    'kilo': {
        name: 'kilo',
        displayName: 'Kilo Code',
        skillsDir: '.kilocode/skills',
        globalSkillsDir: join(home, '.kilocode/skills'),
    },
    'kimi-cli': {
        name: 'kimi-cli',
        displayName: 'Kimi Code CLI',
        skillsDir: '.agents/skills',
        globalSkillsDir: join(home, '.config/agents/skills'),
    },
    'kiro-cli': {
        name: 'kiro-cli',
        displayName: 'Kiro CLI',
        skillsDir: '.kiro/skills',
        globalSkillsDir: join(home, '.kiro/skills'),
    },
    'kode': {
        name: 'kode',
        displayName: 'Kode',
        skillsDir: '.kode/skills',
        globalSkillsDir: join(home, '.kode/skills'),
    },
    'mcpjam': {
        name: 'mcpjam',
        displayName: 'MCPJam',
        skillsDir: '.mcpjam/skills',
        globalSkillsDir: join(home, '.mcpjam/skills'),
    },
    'mistral-vibe': {
        name: 'mistral-vibe',
        displayName: 'Mistral Vibe',
        skillsDir: '.vibe/skills',
        globalSkillsDir: join(home, '.vibe/skills'),
    },
    'mux': {
        name: 'mux',
        displayName: 'Mux',
        skillsDir: '.mux/skills',
        globalSkillsDir: join(home, '.mux/skills'),
    },
    'opencode': {
        name: 'opencode',
        displayName: 'OpenCode',
        skillsDir: '.opencode/skills',
        globalSkillsDir: join(configHome, 'opencode/skills'),
    },
    'openhands': {
        name: 'openhands',
        displayName: 'OpenHands',
        skillsDir: '.openhands/skills',
        globalSkillsDir: join(home, '.openhands/skills'),
    },
    'pi': {
        name: 'pi',
        displayName: 'Pi',
        skillsDir: '.pi/skills',
        globalSkillsDir: join(home, '.pi/agent/skills'),
    },
    'qoder': {
        name: 'qoder',
        displayName: 'Qoder',
        skillsDir: '.qoder/skills',
        globalSkillsDir: join(home, '.qoder/skills'),
    },
    'qwen-code': {
        name: 'qwen-code',
        displayName: 'Qwen Code',
        skillsDir: '.qwen/skills',
        globalSkillsDir: join(home, '.qwen/skills'),
    },
    'replit': {
        name: 'replit',
        displayName: 'Replit',
        skillsDir: '.agent/skills',
        globalSkillsDir: undefined,
    },
    'roo': {
        name: 'roo',
        displayName: 'Roo Code',
        skillsDir: '.roo/skills',
        globalSkillsDir: join(home, '.roo/skills'),
    },
    'trae': {
        name: 'trae',
        displayName: 'Trae',
        skillsDir: '.trae/skills',
        globalSkillsDir: join(home, '.trae/skills'),
    },
    'trae-cn': {
        name: 'trae-cn',
        displayName: 'Trae CN',
        skillsDir: '.trae/skills',
        globalSkillsDir: join(home, '.trae-cn/skills'),
    },
    'windsurf': {
        name: 'windsurf',
        displayName: 'Windsurf',
        skillsDir: '.windsurf/skills',
        globalSkillsDir: join(home, '.codeium/windsurf/skills'),
    },
    'zencoder': {
        name: 'zencoder',
        displayName: 'Zencoder',
        skillsDir: '.zencoder/skills',
        globalSkillsDir: join(home, '.zencoder/skills'),
    },
    'neovate': {
        name: 'neovate',
        displayName: 'Neovate',
        skillsDir: '.neovate/skills',
        globalSkillsDir: join(home, '.neovate/skills'),
    },
    'pochi': {
        name: 'pochi',
        displayName: 'Pochi',
        skillsDir: '.pochi/skills',
        globalSkillsDir: join(home, '.pochi/skills'),
    },
    'adal': {
        name: 'adal',
        displayName: 'AdaL',
        skillsDir: '.adal/skills',
        globalSkillsDir: join(home, '.adal/skills'),
    },
}
