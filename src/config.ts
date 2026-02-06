import type { AgentsType, IConfig, IOptions } from '@/types.ts'
import { resolve } from 'node:path'
import process from 'node:process'
import { agents } from '@/agents.ts'

export const resolveConfig = (options: IOptions): IConfig => {
    return {
        cwd: process.cwd(),
        global: options?.global ?? false,
        agents: Object.fromEntries(Object.entries(agents).map(([agent, config]) => [agent, {
            ...config,
            agentDir: resolve(config.skillsDir, '../'),
        }])) as AgentsType,
    }
}
