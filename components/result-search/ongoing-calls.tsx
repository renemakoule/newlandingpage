"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone } from "lucide-react"
import { motion } from "framer-motion"
import { useStore } from "@/lib/store"

export default function OngoingCalls() {
  const ongoingCalls = useStore((state) => state.ongoingCalls)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Appels en Cours</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.ul className="space-y-4">
          {ongoingCalls.map((call) => (
            <motion.li
              key={call.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-500" />
                  <h3 className="font-semibold">{call.creator}</h3>
                </div>
                <Badge variant="secondary" className="text-sm">
                  En cours
                </Badge>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  )
}

