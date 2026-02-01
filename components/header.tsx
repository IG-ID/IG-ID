'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg transition-shadow">
              <Search size={20} />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">PhotoSearch</span>
          </Link>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
