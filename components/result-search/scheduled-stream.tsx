"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BellIcon, BellRingIcon } from "lucide-react"
import { Lives } from "@/lib/store"

interface LivesCardProps {
    lives: Lives;
  }

export function LivesList({ lives }: LivesCardProps) {
  const [isNotified, setIsNotified] = useState(false)

  const toggleNotification = () => {
    setIsNotified(!isNotified)
    // Ici, vous pouvez ajouter la logique pour programmer réellement une notification
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48">
        <Image
          src={lives.image || "/placeholder.svg"}
          alt={`Aperçu de ${lives.title}`}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xs font-semibold mb-2 text-gray-800 dark:text-white">{lives.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Par {lives.creator}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{lives.date}</p>
        <Button
          onClick={toggleNotification}
          variant={isNotified ? "secondary" : "default"}
          className="w-full transition-all duration-300"
        >
          {isNotified ? (
            <>
              <BellRingIcon className="mr-2 h-4 w-4" />
              Notifié
            </>
          ) : (
            <>
              <BellIcon className="mr-2 h-4 w-4" />
              Me notifier
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

