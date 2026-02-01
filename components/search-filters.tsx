"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="flex gap-4 flex-wrap">
      <Select
        defaultValue={searchParams.get("orientation") || "Any orientation"}
        onValueChange={(value) => updateFilters("orientation", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Orientation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any orientation</SelectItem>
          <SelectItem value="landscape">Landscape</SelectItem>
          <SelectItem value="portrait">Portrait</SelectItem>
          <SelectItem value="squarish">Square</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={searchParams.get("color") || "Any color"}
        onValueChange={(value) => updateFilters("color", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any color</SelectItem>
          <SelectItem value="black_and_white">Black & White</SelectItem>
          <SelectItem value="black">Black</SelectItem>
          <SelectItem value="white">White</SelectItem>
          <SelectItem value="yellow">Yellow</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="purple">Purple</SelectItem>
          <SelectItem value="magenta">Magenta</SelectItem>
          <SelectItem value="green">Green</SelectItem>
          <SelectItem value="teal">Teal</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
