const TOOLS = [
  {
    phase: 'Static analysis & manifest',
    tools: [
      { name: 'JADX', description: 'APK to Java decompiler; inspect Manifest and DEX.', url: 'https://github.com/skylot/jadx' },
      { name: 'apktool', description: 'Disassemble/rebuild APKs; edit resources and smali.', url: 'https://ibotpeaches.github.io/Apktool/' },
      { name: 'MobSF', description: 'Mobile Security Framework; static and dynamic analysis.', url: 'https://github.com/MobSF/Mobile-Security-Framework-MobSF' },
    ],
  },
  {
    phase: 'Dynamic analysis',
    tools: [
      { name: 'Frida', description: 'Dynamic instrumentation; hook methods and trace execution.', url: 'https://frida.re/' },
      { name: 'Objection', description: 'Runtime mobile exploration on top of Frida.', url: 'https://github.com/sensepost/objection' },
      { name: 'Burp Suite', description: 'Intercept and modify HTTP/HTTPS traffic (proxy).', url: 'https://portswigger.net/burp' },
    ],
  },
  {
    phase: 'Exploitation & IPC',
    tools: [
      { name: 'ADB', description: 'Android Debug Bridge; backup, shell, am start, content query.', url: 'https://developer.android.com/studio/command-line/adb' },
      { name: 'Drozer', description: 'Assess IPC and exported components.', url: 'https://github.com/WithSecureLabs/drozer' },
    ],
  },
]

export default function ArsenalPage() {
  return (
    <div className="space-y-10">
      <header className="rounded-xl border border-border-muted/80 bg-surface-800/60 px-6 py-5 shadow-card">
        <h1 className="font-mono text-2xl font-semibold tracking-tight text-slate-100">Arsenal</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Recommended tools per phase. Use them to support the methodology steps (static, dynamic, exploitation).
        </p>
      </header>

      <div className="space-y-6">
        {TOOLS.map((group) => (
          <section
            key={group.phase}
            className="card p-6 shadow-card-lg"
          >
            <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">
              {group.phase}
            </h2>
            <ul className="space-y-4">
              {group.tools.map((tool) => (
                <li key={tool.name} className="border-l-2 border-accent-cyan/20 pl-4">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-200 underline decoration-accent-cyan/40 underline-offset-2 transition hover:text-accent-cyan hover:decoration-accent-cyan"
                  >
                    {tool.name}
                  </a>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{tool.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
