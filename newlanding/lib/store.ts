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

type SearchState = {
  searchResults: Product[]
  isLoading: boolean
  hasSearched: boolean
  currentView: "products" | "images" | "videos" | "webSeries"
  images: Image[]
  videos: Video[]
  webSeries: WebSeries[]
  setSearchResults: (results: Product[]) => void
  setIsLoading: (isLoading: boolean) => void
  setHasSearched: (hasSearched: boolean) => void
  setCurrentView: (view: "products" | "images" | "videos" | "webSeries") => void
  setImages: (images: Image[]) => void
  setVideos: (videos: Video[]) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  setWebSeries: (webSeries: WebSeries[]) => void
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

export const useSearchStore = create<SearchState>((set) => ({
  searchResults: [],
  isLoading: false,
  hasSearched: false,
  currentView: "products",
  images: mockImages,
  videos: mockVideos,
  webSeries: mockWebSeries,
  setSearchResults: (results) => set({ searchResults: results, hasSearched: true }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  setCurrentView: (view) => set({ currentView: view }),
  setImages: (images) => set({ images }),
  setVideos: (videos) => set({ videos }),
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setWebSeries: (webSeries) => set({ webSeries }),
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

