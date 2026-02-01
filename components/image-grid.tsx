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
    return <div className="text-center p-8 text-gray-500">No images found. Try another search term.</div>
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid mb-4 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative group rounded-lg overflow-hidden">
              <Image
                src={image.urls.regular || "/placeholder.svg"}
                alt={image.alt_description || image.description || "Unsplash image"}
                width={image.width}
                height={image.height}
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${image.width} ${image.height}'><rect width='100%' height='100%' fill='${image.color}'/></svg>`}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                Photo by{" "}
                <a
                  href={`https://unsplash.com/@${image.user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {image.user.name}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}

      <div ref={ref} className="h-10" />

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  )
}

