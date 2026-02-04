import type { IAgentType, IConfig, ISkillInfo } from '@/types.ts'
import { basename, dirname, join } from 'node:path'
import * as process from 'node:process'
import { cancel, intro, isCancel, log, multiselect, outro } from '@clack/prompts'
import { defineCommand, runMain } from 'citty'
import { glob } from 'glob'
import pc from 'picocolors'
import { resolveConfig } from '@/config.ts'
import { formattingSkills } from '@/skills.ts'
import { description, name, version } from '../package.json'

const getSkillPath = (config: IConfig, agentType: IAgentType): string => {
    const agent = config.agents[agentType]

    return config.global
        ? agent.globalSkillsDir
        : join(config.cwd, agent.skillsDir)
}

const main = defineCommand({
    meta: {
        name,
        version,
        description,
    },
    args: {
        global: {
            type: 'boolean',
            description: 'Global option',
            alias: 'g',
            default: false,
        },
    },
    setup() {
        intro(pc.bgCyan(` Clear Skills [v${version}]`))
    },
    async run({ args }) {
        const config = resolveConfig(args)

        const skillsMap = new Map<string, Set<string>>()

        for (const agent of Object.keys(config.agents) as IAgentType[]) {
            const agentDir = getSkillPath(config, agent)
            const skillsPaths = await glob(`${agentDir}/**/SKILL.md`)
            if (skillsPaths.length) {
                skillsPaths.forEach((p) => {
                    const skillName = basename(dirname(p))

                    if (!skillsMap.has(skillName)) {
                        skillsMap.set(skillName, new Set())
                    }

                    skillsMap.get(skillName)!.add(p)
                })
            }
        }

        const skills = formattingSkills(skillsMap)
        // console.log(skills)

        log.info(`Found ${pc.green(skillsMap.size)} skills`)

        if (!skillsMap.size) {
            outro('No project skills found.')
            process.exit(0)
        }

        const selectOptions = Object.entries(skills).map(([skillKey, items]) => ({
            value: skillKey,
            label: skillKey,
            hint: items.map(item => item.agent).join(', '),
        }))

        const selectedSkill = await multiselect({
            message: 'Select one or more skills to delete:',
            options: selectOptions,
            initialValues: selectOptions.map(option => option.value),
            required: true,
        }) as string[]

        if (isCancel(selectedSkill)) {
            cancel('Operation cancelled')
            process.exit(0)
        }

        for (const skillKey of selectedSkill) {
            for (const skill of skills[skillKey] as ISkillInfo[]) {
                await import('node:fs/promises').then(fs => fs.rm(skill.skillDir, {
                    force: true,
                    recursive: true,
                }))
            }
        }

        outro(pc.green('Done!'))
    },
})

await runMain(main)
