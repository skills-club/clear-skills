export interface IOptions {
    global?: boolean
    g?: boolean
}

export type IAgentType
    = 'aider-desk'
        | 'amp'
        | 'antigravity'
        | 'augment'
        | 'claude-code'
        | 'openclaw'
        | 'cline'
        | 'codearts-agent'
        | 'codebuddy'
        | 'codemaker'
        | 'codestudio'
        | 'codex'
        | 'command-code'
        | 'continue'
        | 'cortex'
        | 'crush'
        | 'cursor'
        | 'deepagents'
        | 'devin'
        | 'dexto'
        | 'droid'
        | 'firebender'
        | 'forgecode'
        | 'gemini-cli'
        | 'github-copilot'
        | 'goose'
        | 'hermes-agent'
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
        | 'rovodev'
        | 'roo'
        | 'tabnine-cli'
        | 'trae'
        | 'trae-cn'
        | 'warp'
        | 'windsurf'
        | 'zencoder'
        | 'pochi'
        | 'adal'
        | 'universal'
        | 'bob'

export interface IAgentConfig {
    name: string
    displayName: string
    skillsDir: string
    /** Global skills directory. Set to undefined if the agent doesn't support global installation. */
    globalSkillsDir: string
    detectInstalled: () => Promise<boolean>
    /** Whether to show this agent in the universal agents list. Defaults to true. */
    showInUniversalList?: boolean
}

export type AgentsType = Record<IAgentType, IAgentConfig & { agentDir: string }>

export interface IConfig {
    cwd: string
    global: boolean
    agents: AgentsType
}

export interface ISkillInfo {
    agent: string
    agentPath: string
    dirname: string
    skillDir: string
    skillMdPath: string
}

export type ISkillsMap = Record<string, ISkillInfo[]>
