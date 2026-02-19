import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { getMethodology } from '@/lib/methodology'
import { ProjectProvider } from '@/context/ProjectContext'
import { ManifestProvider } from '@/context/ManifestContext'
import { NotesProvider } from '@/context/NotesContext'
import { ChecklistProvider } from '@/context/ChecklistContext'
import { Nav } from '@/components/Nav'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
})
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Android Bug Bounty Methodology',
  description: 'Modular methodology for APK assessment based on OWASP WSTG standards',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let methodology = null
  try {
    methodology = await getMethodology()
  } catch {
    // Allow app to render; methodology will load on client or show error
  }

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ProjectProvider>
          <ManifestProvider initialMethodology={methodology}>
            <NotesProvider>
              <ChecklistProvider>
                <Nav />
                <main className="mx-auto max-w-5xl px-4 py-10 pb-16">{children}</main>
              </ChecklistProvider>
            </NotesProvider>
          </ManifestProvider>
        </ProjectProvider>
      </body>
    </html>
  )
}
