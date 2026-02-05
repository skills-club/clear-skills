import type { IAgentType, IConfig } from '@/types.ts'
import fs from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { confirm, isCancel } from '@clack/prompts'
import pc from 'picocolors'

export const sanitizeName = (name: string) => {
    const sanitized = name
        .toLowerCase()
        // Replace any sequence of characters that are NOT lowercase letters (a-z),
        // digits (0-9), dots (.), or underscores (_) with a single hyphen.
        // This converts spaces, special chars, and path traversal attempts (../) into hyphens.
        .replace(/[^a-z0-9._]+/g, '-')
        // Remove leading/trailing dots and hyphens to prevent hidden files (.) and
        // ensure clean directory names. The pattern matches:
        // - ^[.\-]+ : one or more dots or hyphens at the start
        // - [.\-]+$ : one or more dots or hyphens at the end
        .replace(/^[.\-]+|[.\-]+$/g, '')

    // Limit to 255 chars (common filesystem limit), fallback to 'unnamed-skill' if empty
    return sanitized.substring(0, 255) || 'unnamed-skill'
}

export const getSkillPath = (config: IConfig, agentType: IAgentType): string => {
    const agent = config.agents[agentType]

    return config.global
        ? agent.globalSkillsDir
        : join(config.cwd, agent.skillsDir)
}

export const isDirEmpty = async (dirPath: string): Promise<boolean> => {
    try {
        const files = await fs.readdir(dirPath)
        const visibleFiles = files.filter(file => !file.startsWith('.'))
        return visibleFiles.length === 0
    }
    catch {
        return false
    }
}

export const shouldDeleteEmptySkillsDirs = async (emptySkillsDirs: string[]): Promise<string[]> => {
    if (emptySkillsDirs.length === 0) {
        return []
    }

    const agent = emptySkillsDirs.map(p => sanitizeName(basename(resolve(p, '../'))))

    const confirmed = await confirm({
        message: `${pc.yellow(`Empty 'skill' directories found under agent types: ${pc.blue(agent.join(','))}`)}. Delete them?`,
        initialValue: true,
    })

    if (isCancel(confirmed) || !confirmed) {
        return []
    }

    return emptySkillsDirs
}

export const shouldDeleteEmptyAgentDirs = async (emptyAgentDirs: string[]): Promise<string[]> => {
    if (emptyAgentDirs.length === 0) {
        return []
    }
    const agent = emptyAgentDirs.map(p => sanitizeName(basename(p)))

    const confirmed = await confirm({
        message: `${pc.yellow(`Found empty directories: ${pc.blue(agent.join(','))}`)}. Delete them?`,
        initialValue: true,
    })

    if (isCancel(confirmed) || !confirmed) {
        return []
    }

    return emptyAgentDirs
}
