'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Tool' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/arsenal', label: 'Arsenal' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 border-b border-border-muted/80 bg-surface-900/90 shadow-card backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-slate-100 transition hover:text-accent-cyan"
        >
          Android BBM
        </Link>
        <div className="flex gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-accent-cyan/10 text-accent-cyan'
                    : 'text-slate-400 hover:bg-surface-800 hover:text-slate-200'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
