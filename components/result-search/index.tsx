"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { LeftSidebar } from "./left-sidebar"
import { RightSidebar } from "./right-sidebar"
import { MainContent } from "./main-content"
import { useSearchStore, simulateSearch } from "@/lib/store"
import { Loader2 } from "lucide-react"

export function ResultSearch() {
  const {
    searchResults,
    isLoading,
    hasSearched,
    setSearchResults,
    setIsLoading,
    setHasSearched,
    currentView,
    images,
    videos,
    webSeries,
    selectedCategory,
    setCurrentView,
  } = useSearchStore()
  const [contentType, setContentType] = useState<"products" | "videos" | "webSeries" | "images" | "calls" | "lives" | "history">("products")
  const searchParams = useSearchParams()
  const isSearchingRef = useRef(false)

  const query = useMemo(() => searchParams.get("q") || "", [searchParams])
  const view = useMemo(
    () => searchParams.get("view") as "products" | "images" | "videos" | "webSeries" | "calls" | "lives" | "history" |null,
    [searchParams],
  )

  useEffect(() => {
    if (!isSearchingRef.current) {
      performSearch(query)
    }
  }, [query])

  useEffect(() => {
    if (view) {
      setCurrentView(view)
      setContentType(view)
    } else {
      setCurrentView("products")
      setContentType("products")
    }
  }, [view, setCurrentView])

  const performSearch = async (query: string) => {
    if (isSearchingRef.current) return
    isSearchingRef.current = true
    setIsLoading(true)
    try {
      const results = await simulateSearch(query)
      setSearchResults(results)
      setHasSearched(true)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
      isSearchingRef.current = false
    }
  }

  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return searchResults.filter((product) => product.category === selectedCategory)
    }
    return searchResults
  }, [searchResults, selectedCategory])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background/30 text-foreground">
      <LeftSidebar onContentTypeChange={setContentType} onHomeClick={() => {}} activeContentType={contentType} />
      {hasSearched || currentView !== "products" ? (
        <MainContent
          contentType={contentType}
          products={filteredProducts}
          images={images}
          videos={videos}
          webSeries={webSeries}
          currentView={currentView} calls={[]} lives={[]} history={[]} histry={[]}        />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p>Effectuez une recherche pour voir les résultats.</p>
        </div>
      )}
      <RightSidebar />
    </div>
  )
}

