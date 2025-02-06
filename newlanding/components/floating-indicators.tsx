"use client"

import { motion } from "framer-motion"

const indicators = [
  { name: "Clone", value: "AI", position: { top: "20%", left: "15%" } },
  { name: "Search", value: "Product", position: { top: "20%", right: "15%" } },
]

export function FloatingIndicators() {
  return (
    <>
      {indicators.map((indicator, index) => (
        <motion.div
          key={indicator.name}
          className="absolute flex float"
          style={indicator.position}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.2 + 1.4,
            y: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <div className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary/50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="text-sm font-medium">{indicator.name}</span>
            <span className="text-sm text-muted-foreground">{indicator.value}</span>
          </div>
        </motion.div>
      ))}
    </>
  )
}

