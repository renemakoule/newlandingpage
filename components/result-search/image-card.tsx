import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Image } from "@/lib/store";

interface ImageCardProps {
  image: Image;
}

export function ImageCard({ image }: ImageCardProps) {
  const [unlocked, setUnlocked] = useState(false); // Par défaut, l'image est verrouillée

  const handlePayment = () => {
    // Simuler un paiement réussi
    setUnlocked(true);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <div className="rounded-lg shadow-md overflow-hidden">
        <div className="relative aspect-square">
          {/* Afficher l'image avec un effet flou si elle est verrouillée */}
          <img
            src={image.image || "/placeholder.svg"}
            alt={image.title}
            className={`w-full h-full object-cover transition-transform hover:scale-105 ${
              !unlocked ? "filter blur-md" : ""
            }`}
          />
          {/* Superposition pour indiquer que l'image est verrouillée */}
          {!unlocked && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Buy to Unlock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs">{image.title}</h3>
          </div>
          {!unlocked && (
            // Bouton "Buy" pour débloquer l'image
            <Button className="w-full mt-2" variant="default" onClick={handlePayment}>
              Buy {image.price}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}