"use client"

import type { Product } from "@/types/product"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs">{product.name}</h3>
            <span className="text-xs">{product.price}</span>
          </div>
          <div className="mt-2">
            <span className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs">
              {product.category}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" variant="default">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

