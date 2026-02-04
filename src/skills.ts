import type { ISkillsMap } from '@/types.ts'
import { basename, dirname, resolve } from 'node:path'
import { sanitizeName } from '@/utils.ts'

export const formattingSkills = (skills: Map<string, Set<string>>): ISkillsMap => {
    const skillsArray = Array.from(skills.entries())
        .map(([skill, path]) => [
            skill,
            Array.from(path, (p) => {
                const agent = basename(resolve(dirname(p), '../../'))
                return {
                    agent: sanitizeName(agent),
                    path: resolve(dirname(p), '../../'),
                    skillDir: dirname(p),
                    skillMdPath: p,
                }
            }),
        ])

    return Object.fromEntries(skillsArray)
}
