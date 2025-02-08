"use client"

import { motion } from "framer-motion"
import type { Item } from "@/lib/types"
import { ItemCard } from "./item-card"

export const ItemGrid = ({ items, columns }: { items: Item[]; columns: number }) => (
  <motion.div
    className={`w-full grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
  >
    {items.map((item) => (
      <ItemCard key={item.id} item={item} />
    ))}
  </motion.div>
)

