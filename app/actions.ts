"use server"

import type { SearchResponse, SearchFilters } from "@/types/unsplash"

export async function searchPhotos(
  query: string,
  filters: SearchFilters = {},
): Promise<{ data?: SearchResponse; error?: string }> {
  if (!query) return { data: { total: 0, total_pages: 0, results: [] } }

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    return { error: "Unsplash API key is not configured" }
  }

  try {
    const params = new URLSearchParams({
      query: query,
      per_page: "12",
      page: (filters.page || "1").toString(),
      ...(filters.orientation && { orientation: filters.orientation }),
      ...(filters.color && { color: filters.color }),
    })

    const response = await fetch(`https://api.unsplash.com/search/photos?${params.toString()}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Unsplash API error:", errorData)

      if (errorData.errors && errorData.errors[0].includes("OAuth error: The access token is invalid")) {
        return { error: "Invalid Unsplash API key. Please check your environment variables." }
      }

      return { error: `API error: ${response.status}. ${errorData.errors?.[0] || ""}` }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error fetching photos:", error)
    return { error: "Failed to fetch images. Please try again later." }
  }
}

