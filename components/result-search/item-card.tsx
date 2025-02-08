"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import type { Item } from "@/lib/types";

// Fonction pour vérifier si l'URL est une vidéo
const isVideo = (url: string) => {
  const videoExtensions = [".mp4", ".webm", ".ogg"];
  return videoExtensions.some((ext) => url.endsWith(ext));
};

export const ItemCard = ({ item }: { item: Item }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="overflow-hidden w-full">
      <CardContent className="p-0">
        {/* Afficher une vidéo si l'URL est une vidéo */}
        {isVideo(item.thumbnail) ? (
          <video
            src={item.thumbnail}
            controls
            className="w-full h-auto object-cover"
          >
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        ) : (
          // Afficher une image si l'URL est une image
          <Image
            src={item.thumbnail || "/placeholder.svg"}
            alt={item.title}
            width={300}
            height={200}
            className="w-full h-auto object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.type}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);