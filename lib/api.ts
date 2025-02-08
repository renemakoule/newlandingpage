import type { Product } from "@/types/product"

// This is a mock function. In a real application, you would fetch data from an API or database.
export async function getAllProducts(): Promise<Product[]> {
  return [
    { id: 1, name: "Product 1", price: "$19.99", image: "/placeholder.svg", category: "Category 1" },
    { id: 2, name: "Product 2", price: "$29.99", image: "/placeholder.svg", category: "Category 2" },
    { id: 3, name: "Product 3", price: "$39.99", image: "/placeholder.svg", category: "Category 1" },
    { id: 4, name: "Product 4", price: "$49.99", image: "/placeholder.svg", category: "Category 3" },
    // Add more products as needed
  ]
}

