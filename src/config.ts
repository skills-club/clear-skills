import type { IConfig, IOptions } from '@/types.ts'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { agents } from '@/agents.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const resolveConfig = (options: IOptions): IConfig => {
    return {
        cwd: join(__dirname, '..'),
        global: options?.global ?? false,
        agents,
    }
}
