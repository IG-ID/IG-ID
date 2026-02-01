import { SearchForm } from '@/components/search-form'
import { Header } from '@/components/header'
import { Sparkles, Download, Zap } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background via-background to-muted flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-sm font-semibold text-secondary">
              <Sparkles size={16} />
              Discover Beautiful Photography
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-balance text-foreground">
              Find Your Perfect
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent ml-3">
                Image
              </span>
            </h1>

            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Access millions of stunning, free photos from Unsplash. Perfect for your projects, social media, and creative work.
            </p>

            <SearchForm />

            <div className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-border">
              <div className="space-y-2">
                <Zap className="w-6 h-6 text-secondary mx-auto" />
                <p className="text-sm font-semibold text-foreground">Lightning Fast</p>
                <p className="text-xs text-muted-foreground">Instant search results</p>
              </div>
              <div className="space-y-2">
                <Download className="w-6 h-6 text-secondary mx-auto" />
                <p className="text-sm font-semibold text-foreground">High Quality</p>
                <p className="text-xs text-muted-foreground">Download for free</p>
              </div>
              <div className="space-y-2">
                <Sparkles className="w-6 h-6 text-secondary mx-auto" />
                <p className="text-sm font-semibold text-foreground">Curated</p>
                <p className="text-xs text-muted-foreground">Hand-picked collections</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
