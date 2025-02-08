import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoCard({
  video,
}: {
  video: { id: number; title: string; creator: string; price: string; thumbnail: string };
}) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const [unlocked, setUnlocked] = useState(false); // État pour gérer le déblocage de la vidéo

  const handlePayment = () => {
    // Simuler un paiement réussi
    setUnlocked(true);
  };

  return (
    <motion.div
      ref={ref}
      className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Afficher la vidéo en preview (sans contrôles ni son) */}
        <video
          src={video.thumbnail}
          className="w-full h-80 object-cover"
          muted // Désactiver le son
          loop // Boucler la vidéo
          playsInline // Lire en ligne (pour les mobiles)
          controls={unlocked} // Activer les contrôles uniquement si débloqué
          autoPlay={unlocked} // Lire automatiquement uniquement si débloqué
        />
        {/* Superposition avec le cadenas si la vidéo est verrouillée */}
        {!unlocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Lock className="text-white h-8 w-8" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm">{video.title}</h3>
        <p className="text-xs text-muted-foreground">{video.creator}</p>
        {!unlocked && (
          // Bouton de paiement pour les vidéos verrouillées
          <Button className="mt-2 w-full" onClick={handlePayment}>
            Buy {video.price}
          </Button>
        )}
      </div>
    </motion.div>
  );
}