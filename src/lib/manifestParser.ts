/**
 * Parses manifest text and checks which methodology triggers are present.
 * Trigger strings are matched case-insensitively against the raw manifest content.
 * Handles both exact strings (e.g. android:allowBackup="true") and tag/attr hints (e.g. <provider, android:scheme).
 */
export function getTriggerMatches(manifestText: string, triggers: string[]): boolean[] {
  const normalized = manifestText.trim()
  if (!normalized) return triggers.map(() => false)

  const lower = normalized.toLowerCase()
  return triggers.map((trigger) => {
    const t = trigger.toLowerCase().trim()
    // Exact substring match (covers attributes, tags, values)
    if (lower.includes(t)) return true
    // Tag-style: e.g. "<provider" -> also match <provider ...>
    const tag = t.startsWith('<') ? t : `<${t}`
    if (lower.includes(tag)) return true
    // Attribute-style without angle bracket: "android:scheme" etc.
    if (t.includes('android:') && lower.includes(t)) return true
    return false
  })
}

export function subsectionTriggersMatched(
  manifestText: string,
  triggers: string[]
): boolean {
  const matches = getTriggerMatches(manifestText, triggers)
  return matches.some(Boolean)
}

/**
 * Build a map of subsection id -> whether any of its triggers are present in the manifest.
 */
export function buildTriggerMatchMap(
  manifestText: string,
  subsections: { id: string; triggers: string[] }[]
): Record<string, boolean> {
  const map: Record<string, boolean> = {}
  for (const sub of subsections) {
    map[sub.id] = subsectionTriggersMatched(manifestText, sub.triggers)
  }
  return map
}
