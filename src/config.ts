import type { AgentsType, IConfig, IOptions } from '@/types.ts'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { agents } from '@/agents.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const resolveConfig = (options: IOptions): IConfig => {
    return {
        cwd: join(__dirname, '..'),
        global: options?.global ?? false,
        agents: Object.fromEntries(Object.entries(agents).map(([agent, config]) => [agent, {
            ...config,
            agentDir: resolve(config.skillsDir, '../'),
        }])) as AgentsType,
    }
}
