"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import  Image  from 'next/image';

const images = [
  { id: 1, title: "Image 1", price: "$9.99", image: "/im.webp" },
  { id: 2, title: "Image 2", price: "$14.99", image: "/im1.webp" },
  { id: 3, title: "Image 3", price: "$19.99", image: "/im2.webp" },
  { id: 4, title: "Image 4", price: "$24.99", image: "/im3.webp" },
  { id: 5, title: "Image 5", price: "$29.99", image: "/im4.webp" },
  { id: 6, title: "Image 6", price: "$34.99", image: "/im5.webp" },
  { id: 7, title: "Image 7", price: "$39.99", image: "/im6.webp" },
  { id: 8, title: "Image 8", price: "$44.99", image: "/im7.webp" },
]

export function ImageShowcase({ onViewAll }: { onViewAll: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setCurrentView, setImages } = useSearchStore()
  const router = useRouter()

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.offsetWidth / (window.innerWidth >= 640 ? 4 : 2)
      containerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      })
    }
  }

  const nextImages = () => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const prevImages = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const itemWidth = container.offsetWidth / (window.innerWidth >= 640 ? 4 : 2)
        const newIndex = Math.round(container.scrollLeft / itemWidth)
        setCurrentIndex(newIndex)
      }, 100)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const handleViewAll = () => {
    setCurrentView("images")
    setImages(images)
    router.push("/search?view=images")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-16 mx-2 sm:mx-0">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-8 text-white mb-8 shadow-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Sell Your Images</h2>
            <p className="text-lg mb-6">
              Turn your creativity into profit! Sell your images and boost your income with just a few clicks.
            </p>
            <Button variant="secondary" className="flex items-center" onClick={handleViewAll}>
              <Eye className="mr-2 h-4 w-4" /> View All Images
            </Button>
          </div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/ap.jpg')" }}
          >
            <Image src="/ap.jpg" alt="alt" width={300} height={500} />
          </div>
        </motion.div>

        <div className="relative">
          <Button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full" onClick={prevImages}>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full" onClick={nextImages}>
            <ChevronRight className="h-3 w-3" />
          </Button>
          <div ref={containerRef} className="relative overflow-x-auto hide-scrollbar">
            <div className="flex">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="w-1/2 sm:w-1/4 flex-shrink-0 p-2"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="rounded-lg shadow-md overflow-hidden">
                      <div
                        className="relative h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image.image})` }}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xs">{image.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <Button variant="ghost" className="absolute top-2 right-2" onClick={handleViewAll}>
            <Eye className="mr-2 h-4 w-4" /> View All
          </Button>
        </div>
      </div>
    </div>
  )
}

