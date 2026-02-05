import type { IAgentType, ISkillInfo } from '@/types.ts'
import * as fs from 'node:fs/promises'
import { basename, dirname } from 'node:path'
import * as process from 'node:process'
import { cancel, intro, isCancel, log, multiselect, outro } from '@clack/prompts'
import { defineCommand, runMain } from 'citty'
import { glob } from 'glob'
import pc from 'picocolors'
import { resolveConfig } from '@/config.ts'
import { formattingSkills } from '@/skills.ts'
import { getSkillPath, isDirEmpty, shouldDeleteEmptyAgentDirs, shouldDeleteEmptySkillsDirs } from '@/utils.ts'
import { description, name, version } from '../package.json'

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
            if (config.global && !agentDir) {
                continue
            }
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

        log.info(`Found ${pc.green(skillsMap.size)} skills`)

        if (!skillsMap.size) {
            outro(`No ${config.global ? 'global' : 'project'} skills found.`)
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

        // Delete selected skills
        for (const skillKey of selectedSkill) {
            for (const skill of skills[skillKey] as ISkillInfo[]) {
                try {
                    await fs.rm(skill.dirname, {
                        force: true,
                        recursive: true,
                    })
                    log.success(`Deleted ${pc.cyan(skillKey)} from ${skill.agent}`)
                }
                catch (error) {
                    log.error(`Failed to delete ${skillKey} from ${skill.agent}: ${error}`)
                }
            }
        }

        // Check for empty skills directories
        const emptySkillsDirs: string[] = []
        const processedAgents = new Set<IAgentType>()

        for (const skillKey of selectedSkill) {
            for (const skill of skills[skillKey] as ISkillInfo[]) {
                const agentType = skill.agent as IAgentType
                if (processedAgents.has(agentType)) {
                    continue
                }
                processedAgents.add(agentType)

                const skillsDir = skill.skillDir
                if (await isDirEmpty(skillsDir)) {
                    emptySkillsDirs.push(skillsDir)
                }
            }
        }

        // Ask user if they want to delete empty skills directories
        const skillsDirsToDelete = await shouldDeleteEmptySkillsDirs(emptySkillsDirs)
        for (const dir of skillsDirsToDelete) {
            try {
                await fs.rm(dir, { force: true, recursive: true })
                log.success(`Deleted empty skills directory: ${dir}`)
            }
            catch (error) {
                log.error(`Failed to delete ${dir}: ${error}`)
            }
        }

        // Check for empty agent directories (after skills dirs are deleted)
        const emptyAgentDirs: string[] = []
        const checkedAgents = new Set<IAgentType>()

        for (const skillKey of selectedSkill) {
            for (const skill of skills[skillKey] as ISkillInfo[]) {
                const agentType = skill.agent as IAgentType
                if (checkedAgents.has(agentType)) {
                    continue
                }
                checkedAgents.add(agentType)

                const agentDir = skill.agentPath
                if (await isDirEmpty(agentDir)) {
                    emptyAgentDirs.push(agentDir)
                }
            }
        }

        // Ask user if they want to delete empty agent directories
        const agentDirsToDelete = await shouldDeleteEmptyAgentDirs(emptyAgentDirs)
        for (const dir of agentDirsToDelete) {
            try {
                await fs.rm(dir, { force: true, recursive: true })
                log.success(`Deleted empty agent directory: ${dir}`)
            }
            catch (error) {
                log.error(`Failed to delete ${dir}: ${error}`)
            }
        }

        outro(pc.green('Done!'))
    },
})

await runMain(main)
