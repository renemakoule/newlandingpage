export type Product = {
  id: number
  name: string
  price: string
  image: string
  category: string
  description?: string
}

export type Video = {
  id: number
  title: string
  creator: string
  thumbnail: string
  price: string
  duration?: string
}

export type WebSeries = {
  id: number
  title: string
  creator: string
  thumbnail: string
  price: string
  episodes?: number
}

