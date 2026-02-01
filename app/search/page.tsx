import { Suspense } from 'react'
import { SearchForm } from '@/components/search-form'
import { SearchFilters } from '@/components/search-filters'
import { ImageGrid } from '@/components/image-grid'
import { Header } from '@/components/header'
import { searchPhotos } from '@/app/actions'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; orientation?: string; color?: string }
}) {
  const query = searchParams.q || ''
  const filters = {
    orientation: searchParams.orientation,
    color: searchParams.color,
  }

  const { data: images, error } = query ? await searchPhotos(query, filters) : { data: null, error: null }

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto">
          <div className="pt-8 pb-6 px-4 border-b border-border">
            <div className="mb-6">
              <SearchForm initialQuery={query} />
            </div>

            {query && !error && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Results for <span className="text-secondary">"{query}"</span>
                  </h1>
                  {images?.total && <p className="text-sm text-muted-foreground mt-1">{images.total} results found</p>}
                </div>
              </div>
            )}
          </div>

          {query && (
            <div className="px-4 py-4 border-b border-border bg-card/50">
              <SearchFilters />
            </div>
          )}

          <Suspense fallback={<LoadingGrid />}>
            {error ? <ErrorMessage message={error} /> : images?.results && <ImageGrid initialImages={images.results} query={query} filters={filters} />}
          </Suspense>
        </div>
      </main>
    </>
  )
}

function LoadingGrid() {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 px-4 py-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="break-inside-avoid mb-6 aspect-video rounded-2xl bg-muted animate-pulse" />
      ))}
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-lg font-bold text-foreground mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        {message.includes('Invalid Unsplash API key') && (
          <p className="text-xs text-muted-foreground italic">
            Please check your Unsplash API key in the environment variables.
          </p>
        )}
      </div>
    </div>
  )
}
