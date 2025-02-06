import type { Product, Video, WebSeries } from "@/types/product"

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: "$199.99",
    image: "/placeholder.svg",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$299.99",
    image: "/placeholder.svg",
    category: "Electronics",
    description: "Feature-rich smartwatch with health tracking",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: "$79.99",
    image: "/placeholder.svg",
    category: "Accessories",
    description: "Durable laptop backpack with multiple compartments",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: "$49.99",
    image: "/placeholder.svg",
    category: "Electronics",
    description: "Ergonomic wireless mouse with precision tracking",
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: "$129.99",
    image: "/placeholder.svg",
    category: "Appliances",
    description: "Programmable coffee maker with thermal carafe",
  },
  {
    id: 6,
    name: "Yoga Mat",
    price: "$39.99",
    image: "/placeholder.svg",
    category: "Fitness",
    description: "Non-slip yoga mat with carrying strap",
  },
  {
    id: 7,
    name: "Desk Lamp",
    price: "$59.99",
    image: "/placeholder.svg",
    category: "Home",
    description: "LED desk lamp with adjustable brightness",
  },
  {
    id: 8,
    name: "Water Bottle",
    price: "$24.99",
    image: "/placeholder.svg",
    category: "Accessories",
    description: "Insulated stainless steel water bottle",
  },
]

export const videos: Video[] = [
  {
    id: 1,
    title: "Beginner's Guide to Photography",
    creator: "Photo Pro",
    thumbnail: "/placeholder.svg",
    price: "$14.99",
    duration: "2h 30min",
  },
  {
    id: 2,
    title: "Advanced Cooking Techniques",
    creator: "Chef Master",
    thumbnail: "/placeholder.svg",
    price: "$19.99",
    duration: "3h 15min",
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    creator: "Marketing Expert",
    thumbnail: "/placeholder.svg",
    price: "$24.99",
    duration: "4h 45min",
  },
  {
    id: 4,
    title: "Yoga for Beginners",
    creator: "Yoga Instructor",
    thumbnail: "/placeholder.svg",
    price: "$9.99",
    duration: "1h 45min",
  },
]

export const webSeries: WebSeries[] = [
  {
    id: 1,
    title: "The Art of Programming",
    creator: "Code Master",
    thumbnail: "/placeholder.svg",
    price: "$49.99",
    episodes: 12,
  },
  {
    id: 2,
    title: "Business Strategy",
    creator: "Business Pro",
    thumbnail: "/placeholder.svg",
    price: "$39.99",
    episodes: 8,
  },
  {
    id: 3,
    title: "Creative Writing",
    creator: "Writing Expert",
    thumbnail: "/placeholder.svg",
    price: "$29.99",
    episodes: 10,
  },
  {
    id: 4,
    title: "Web Development",
    creator: "Dev Guru",
    thumbnail: "/placeholder.svg",
    price: "$59.99",
    episodes: 15,
  },
]

