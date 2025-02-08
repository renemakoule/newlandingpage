
import { create } from "zustand"

export type Product = {
  id: number
  name: string
  price: string
  image: string
  category: string
  description: string
}

export type Image = {
  id: number
  title: string
  price: string
  image: string
}

export type Video = {
  id: number
  title: string
  creator: string
  thumbnail: string
  price: string
}

export type WebSeries = {
  id: number
  title: string
  creator: string
  thumbnail: string
  price: string
}

export type Calls = {
  id: number
  image: string
  title: string
  date: string
  time: string
  creator: string
  status: "pending" | "confirmed" | "cancelled"
}

export type Lives = {
  id: number
  title: string
  creator: string
  image: string
  date: string
}

export type History = {
  id: string
  type: "image" | "video" | "webSeries"
  title: string
  thumbnail: string
}


type SearchState = {
  searchResults: Product[]
  isLoading: boolean
  hasSearched: boolean
  currentView: "products" | "images" | "videos" | "webSeries" | "calls" | "lives" | "history"
  images: Image[]
  videos: Video[]
  webSeries: WebSeries[]
  calls: Calls[]
  lives: Lives[]
  history: History[]
  setSearchResults: (results: Product[]) => void
  setIsLoading: (isLoading: boolean) => void
  setHasSearched: (hasSearched: boolean) => void
  setCurrentView: (view: "products" | "images" | "videos" | "webSeries" | "calls" | "lives" | "history") => void
  setImages: (images: Image[]) => void
  setVideos: (videos: Video[]) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  setWebSeries: (webSeries: WebSeries[]) => void
  setCalls: (calls: Calls[]) => void
  setLives: (lives: Lives[]) => void
  setHistory: (history: History[]) => void
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: "$19.99",
    image: "/1.jpg",
    category: "Category 1",
    description: "",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$29.99",
    image: "/2.png",
    category: "Category 2",
    description: "",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$39.99",
    image: "/3.png",
    category: "Category 1",
    description: "",
  },
  {
    id: 4,
    name: "Product 4",
    price: "$49.99",
    image: "/4.png",
    category: "Category 3",
    description: "",
  },
  {
    id: 5,
    name: "Product 5",
    price: "$59.99",
    image: "/5.png",
    category: "Category 2",
    description: "",
  },
  {
    id: 6,
    name: "Product 6",
    price: "$59.99",
    image: "/6.webp",
    category: "Category 2",
    description: "",
  },
]

const mockImages: Image[] = [
  { id: 1, title: "Image 1", price: "$25.95", image: "/im.webp" },
  { id: 2, title: "Image 2", price: "$10.00", image: "/im1.webp" },
  { id: 3, title: "Image 3", price: "$19.99", image: "/im2.webp" },
  { id: 4, title: "Image 4", price: "$24.99", image: "/im3.webp" },
  { id: 5, title: "Image 5", price: "$29.99", image: "/im4.webp" },
  { id: 6, title: "Image 6", price: "$34.99", image: "/im5.webp" },
  { id: 7, title: "Image 7", price: "$39.99", image: "/im6.webp" },
  { id: 8, title: "Image 8", price: "$44.99", image: "/im7.webp" },
]

const mockVideos: Video[] = [
  { id: 1, title: "Video 1", creator: "Creator 1", thumbnail: "/1.mp4", price: "$4.99" },
  { id: 2, title: "Video 2", creator: "Creator 2", thumbnail: "/2.mp4", price: "$5.99" },
  { id: 3, title: "Video 3", creator: "Creator 3", thumbnail: "/5.mp4", price: "$6.99" },
  { id: 4, title: "Video 4", creator: "Creator 4", thumbnail: "/4.mp4", price: "$7.99" },
  { id: 5, title: "Video 5", creator: "Creator 5", thumbnail: "/8.mp4", price: "$8.99" },
]

const mockWebSeries: WebSeries[] = [
  { id: 1, title: "Web Series 1", creator: "Creator 1", thumbnail: "/3.mp4", price: "$9.99" },
  { id: 2, title: "Web Series 2", creator: "Creator 2", thumbnail: "/6.mp4", price: "$14.99" },
  { id: 3, title: "Web Series 3", creator: "Creator 3", thumbnail: "/7.mp4", price: "$19.99" },
  { id: 4, title: "Web Series 4", creator: "Creator 4", thumbnail: "/8.mp4", price: "$24.99" },
  { id: 5, title: "Web Series 5", creator: "Creator 5", thumbnail: "/1.mp4", price: "$29.99" },
  { id: 6, title: "Web Series 6", creator: "Creator 6", thumbnail: "/j.mp4", price: "$9.99" },
]

const mockCalls: Calls[] = [
  { id: 1, image: "/vc.webp", title: 'Comment creer son compte dans Minato.ai', date: "2023-07-15", time: "17:00", creator: "Marvel", status: "confirmed" },
  { id: 2, image: "/vc5.webp", title: 'Comment vendre ses calecons', date: "2023-07-16", time: "10:30", creator: "Sophie", status: "pending" },
  { id: 3, image: "/vc6.webp", title: 'Comment vivre plus longtemps', date: "2023-07-17", time: "16:45", creator: "Sublime", status: "cancelled" },
]

const mockLives: Lives[] = [
  { id: 1, title: "Workshop : Construire une API avec Node.js", date: "2024-07-15", creator: 'Alice', image: "/lv.webp" },
  { id: 2, title: "Deep Dive : TypeScript avancé", date: "2024-08-16", creator: 'Sublime', image: "/lv1.webp" },
  { id: 3, title: "Exploration des nouveautés React 18", date: "2024-09-17", creator: 'Marvel', image: "/lv2.webp" },
  { id: 4, title: "Next.js  TypeScript", date: "2024-10-15", creator: 'Alice', image: "/lv3.webp" },
  { id: 5, title: "React Native", date: "2024-12-16", creator: 'Sublime', image: "/lv4.webp" },
  { id: 6, title: "Minato.ai", date: "2025-02-11", creator: 'Marvel', image: "/lv5.webp" },
]

const mockHistory: History[] = [
  { id: "1", type: "image", title: "Image 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "2", type: "video", title: "Video 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "3", type: "webSeries", title: "Web Series 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "4", type: "image", title: "Image 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "5", type: "video", title: "Video 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "6", type: "webSeries", title: "Web Series 2", thumbnail: "/placeholder.svg?height=200&width=300" },
]

const suggestedItems: History[] = [
  { id: "7", type: "image", title: "Suggested Image 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "8", type: "video", title: "Suggested Video 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "9", type: "webSeries", title: "Suggested Web Series 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "10", type: "image", title: "Suggested Image 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "11", type: "video", title: "Suggested Video 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "12", type: "webSeries", title: "Suggested Web Series 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "13", type: "image", title: "Suggested Image 3", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "14", type: "video", title: "Suggested Video 3", thumbnail: "/placeholder.svg?height=200&width=300" },
]

export const useSearchStore = create<SearchState>((set) => ({
  searchResults: [],
  isLoading: false,
  hasSearched: false,
  currentView: "products",
  images: mockImages,
  videos: mockVideos,
  webSeries: mockWebSeries,
  calls: mockCalls,
  lives: mockLives,
  history: mockHistory,
  setSearchResults: (results) => set({ searchResults: results, hasSearched: true }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  setCurrentView: (view) => set({ currentView: view }),
  setImages: (images) => set({ images }),
  setVideos: (videos) => set({ videos }),
  setLives: (lives) => set({ lives }),
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setWebSeries: (webSeries) => set({ webSeries }),
  setCalls: (calls) => set({ calls }),
  setHistory: (history) => set({ history }),
}))

export const simulateSearch = async (query = "") => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )
}


