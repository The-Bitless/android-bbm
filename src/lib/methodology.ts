import type { MethodologyData } from '@/types/methodology'

export async function getMethodology(): Promise<MethodologyData> {
  if (typeof window === 'undefined') {
    const fs = await import('fs/promises')
    const path = await import('path')
    const filePath = path.join(process.cwd(), 'public', 'methodology.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as MethodologyData
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const res = await fetch(`${base}/methodology.json`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to load methodology')
  return res.json() as Promise<MethodologyData>
}
