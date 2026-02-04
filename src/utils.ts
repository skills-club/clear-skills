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
