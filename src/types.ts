export interface IOptions {
    global?: boolean
    g?: boolean
}

export type IAgentType
    = | 'amp'
        | 'antigravity'
        | 'augment'
        | 'claude-code'
        | 'openclaw'
        | 'cline'
        | 'codebuddy'
        | 'codex'
        | 'command-code'
        | 'continue'
        | 'crush'
        | 'cursor'
        | 'droid'
        | 'gemini-cli'
        | 'github-copilot'
        | 'goose'
        | 'iflow-cli'
        | 'junie'
        | 'kilo'
        | 'kimi-cli'
        | 'kiro-cli'
        | 'kode'
        | 'mcpjam'
        | 'mistral-vibe'
        | 'mux'
        | 'neovate'
        | 'opencode'
        | 'openhands'
        | 'pi'
        | 'qoder'
        | 'qwen-code'
        | 'replit'
        | 'roo'
        | 'trae'
        | 'trae-cn'
        | 'windsurf'
        | 'zencoder'
        | 'pochi'
        | 'adal'

export interface IAgentConfig {
    name: string
    displayName: string
    skillsDir: string
    /** Global skills directory. Set to undefined if the agent doesn't support global installation. */
    globalSkillsDir: string
}

export type AgentsType = Record<IAgentType, IAgentConfig & { agentDir: string }>

export interface IConfig {
    cwd: string
    global: boolean
    agents: AgentsType
}

export interface ISkillInfo {
    agent: string
    path: string
    skillDir: string
    skillMdPath: string
}

export type ISkillsMap = Record<string, ISkillInfo[]>
