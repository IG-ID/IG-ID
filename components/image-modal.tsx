"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import type { UnsplashImage } from "@/types/unsplash"

interface ImageModalProps {
  image: UnsplashImage | null
  onClose: () => void
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  if (!image) return null

  return (
    <Dialog open={!!image} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[80vh] p-0">
        <div className="relative w-full h-full">
          <Image
            src={image.urls.full || "/placeholder.svg"}
            alt={image.alt_description || image.description || "Unsplash image"}
            fill
            className="object-contain"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <p>
              Photo by{" "}
              <a
                href={`https://unsplash.com/@${image.user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {image.user.name}
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

