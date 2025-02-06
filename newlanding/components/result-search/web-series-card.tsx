import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WebSeriesCard({
  series,
}: {
  series: { id: number; title: string; creator: string; thumbnail: string; price: string };
}) {
  const [unlocked, setUnlocked] = useState(false); // Par défaut, la série est verrouillée

  const handlePayment = () => {
    // Simuler un paiement réussi
    setUnlocked(true);
  };

  return (
    <motion.div
      className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Afficher la vidéo en preview (sans contrôles ni son) */}
        <video
          src={series.thumbnail || "/placeholder.svg"}
          className="w-full h-80 object-cover"
          muted // Désactiver le son
          loop // Boucler la vidéo
          playsInline // Lire en ligne (pour les mobiles)
          controls={unlocked} // Activer les contrôles uniquement si débloqué
          autoPlay={unlocked} // Lire automatiquement uniquement si débloqué
        />
        {/* Superposition avec le cadenas si la série est verrouillée */}
        {!unlocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Lock className="text-white h-8 w-8" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{series.title}</h3>
        <p className="text-sm text-muted-foreground">{series.creator}</p>
        {!unlocked && (
          // Bouton de paiement pour les séries verrouillées
          <Button className="mt-2 w-full" onClick={handlePayment}>
            Buy {series.price}
          </Button>
        )}
      </div>
    </motion.div>
  );
}