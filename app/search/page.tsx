import { Suspense } from "react"
import { SearchForm } from "@/components/search-form"
import { SearchFilters } from "@/components/search-filters"
import { ImageGrid } from "@/components/image-grid"
import { searchPhotos } from "@/app/actions"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; orientation?: string; color?: string }
}) {
  const query = searchParams.q || ""
  const filters = {
    orientation: searchParams.orientation,
    color: searchParams.color,
  }

  const { data: images, error } = query ? await searchPhotos(query, filters) : { data: null, error: null }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-8">PhotoSearch</h1>
          <SearchForm initialQuery={query} />
        </div>

        {query && !error && (
          <div className="mb-6 space-y-4">
            <h2 className="text-xl text-gray-600">Showing Results for &quot;{query}&quot;</h2>
            <SearchFilters />
          </div>
        )}

        <Suspense fallback={<LoadingGrid />}>
          {error ? (
            <ErrorMessage message={error} />
          ) : (
            images?.results && <ImageGrid initialImages={images.results} query={query} filters={filters} />
          )}
        </Suspense>
      </div>
    </main>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
      ))}
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center p-8">
      <div className="inline-block px-6 py-3 rounded-lg bg-red-50 text-red-600 max-w-md">
        <h3 className="font-semibold mb-2">Error</h3>
        <p>{message}</p>
        {message.includes("Invalid Unsplash API key") && (
          <p className="mt-2 text-sm">
            If you're the developer, please check your Unsplash API key in the project's environment variables.
          </p>
        )}
      </div>
    </div>
  )
}

