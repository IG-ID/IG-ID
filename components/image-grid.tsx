"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import type { UnsplashImage } from "@/types/unsplash"
import { ImageModal } from "./image-modal"
import { searchPhotos } from "@/app/actions"

interface ImageGridProps {
  initialImages: UnsplashImage[]
  query: string
  filters: {
    orientation?: string
    color?: string
  }
}

export function ImageGrid({ initialImages, query, filters }: ImageGridProps) {
  const [images, setImages] = useState(initialImages)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null)
  const { ref, inView } = useInView()

  useEffect(() => {
    const loadMore = async () => {
      if (inView && !loading && hasMore) {
        setLoading(true)
        const nextPage = page + 1
        const { data, error } = await searchPhotos(query, { ...filters, page: nextPage })

        if (error) {
          console.error(error)
          setHasMore(false)
        } else if (data) {
          setImages((prev) => [...prev, ...data.results])
          setHasMore(data.results.length > 0)
          setPage(nextPage)
        }

        setLoading(false)
      }
    }

    loadMore()
  }, [inView, loading, hasMore, query, filters, page])

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="text-5xl mb-4">📸</div>
        <p className="text-lg text-muted-foreground font-medium">No images found</p>
        <p className="text-sm text-muted-foreground mt-2">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 px-4 pb-8">
        {images.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid mb-6 cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
              <Image
                src={image.urls.regular || '/placeholder.svg'}
                alt={image.alt_description || image.description || 'Unsplash image'}
                width={image.width}
                height={image.height}
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${image.width} ${image.height}'><rect width='100%' height='100%' fill='${image.color}'/></svg>`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {image.user.profile_image?.small && (
                      <Image
                        src={image.user.profile_image.small || "/placeholder.svg"}
                        alt={image.user.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    )}
                    <a
                      href={`https://unsplash.com/@${image.user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {image.user.name}
                    </a>
                  </div>
                  <a
                    href={image.links.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-3 bg-white text-black rounded-lg text-sm font-semibold hover:bg-secondary transition-colors text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-secondary border-t-transparent" />
        </div>
      )}

      <div ref={ref} className="h-10" />

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  )
}
