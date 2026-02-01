import { SearchForm } from "@/components/search-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8 w-full">
        <h1 className="text-4xl font-bold mb-8">PhotoSearch</h1>
        <SearchForm />
        <p className="mt-4 text-gray-600">Search for high-quality photos from Unsplash</p>
      </div>
    </main>
  )
}

