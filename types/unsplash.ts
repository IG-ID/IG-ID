export interface UnsplashImage {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  description: string
  user: {
    name: string
    username: string
  }
  width: number
  height: number
  color: string
}

export interface SearchResponse {
  total: number
  total_pages: number
  results: UnsplashImage[]
}

export interface SearchFilters {
  orientation?: "landscape" | "portrait" | "squarish"
  color?:
    | "black_and_white"
    | "black"
    | "white"
    | "yellow"
    | "orange"
    | "red"
    | "purple"
    | "magenta"
    | "green"
    | "teal"
    | "blue"
  page?: number
}
