"use client";

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  Search,
  Grid,
  Send,
  Loader2,
  ArrowRightIcon as PointRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FloatingIndicators } from "./floating-indicators";
import { FaTiktok, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useSearchStore, simulateSearch } from "@/lib/store";
import { useRouter } from "next/navigation";
import LogoMinato from "./logoMinato";
import CanvasCursor from "./CursorCanvas/canvas-cursor";

export function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setIsLoading, setSearchResults, isLoading } = useSearchStore();
  const router = useRouter();

  const suggestions = [
    {
      text: "Search Products",
      icon: <Search className="h-3.5 w-3.5" />,
    },
    {
      text: "Search by categorie product",
      icon: <Grid className="h-3.5 w-3.5" />,
    },
  ];

  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(120, scrollHeight)}px`;
    }
  }, [textareaRef]); //Fixed useEffect dependency

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim() || true) {
      // Toujours effectuer une recherche, même si le champ est vide
      setIsLoading(true);
      try {
        const results = await simulateSearch(inputValue.trim());
        setSearchResults(results);
        router.push("/search?q=" + encodeURIComponent(inputValue.trim()));
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSubmit();
  };

  //Generated text
  const [displayText, setDisplayText] = useState("");
  const texts = [
    "Minato.ai is here to help you boost your income",
    "Clone your store",
    "Quickly search for your products",
    "Scale your business effortlessly",
    "Automate your workflows",
    "Powered by Minato.ai",
  ];
  const typingSpeed = 100; // Vitesse d'écriture (en ms)
  const erasingSpeed = 50; // Vitesse d'effacement (en ms)
  const pauseDuration = 1000; // Temps d'attente après l'écriture (en ms)
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let isMounted = true; // Pour éviter les erreurs de mise à jour après démontage

    const typeText = async () => {
      const fullText = texts[currentTextIndex];

      // Écriture du texte
      for (let i = 0; i <= fullText.length; i++) {
        if (!isMounted) return;
        setDisplayText(fullText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      }

      // Pause après l'écriture
      await new Promise((resolve) => setTimeout(resolve, pauseDuration));

      // Effacement du texte
      for (let i = fullText.length; i >= 0; i--) {
        if (!isMounted) return;
        setDisplayText(fullText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, erasingSpeed));
      }

      // Pause après l'effacement
      await new Promise((resolve) => setTimeout(resolve, pauseDuration));

      // Passer au texte suivant
      if (isMounted) {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    typeText();

    // Nettoyage
    return () => {
      isMounted = false;
    };
  }, [currentTextIndex, typingSpeed, erasingSpeed, pauseDuration]);

  const fingerVariants: Variants = {
    initial: {
      x: 0,
      opacity: 0.8,
    },
    animate: {
      x: [0, 10, 0],
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const, // Spécifier le type exact
      },
    },
  };

  //animate
  const text = "Clone Yourself.";

  // Configuration de l'animation pour chaque lettre
  const letterVariants = {
    initial: {
      color: "currentColor",
      textShadow: "none",
    },
    animate: {
      color: ["currentColor", "#00ff88", "#4499ff", "currentColor"],
      textShadow: [
        "none",
        "0 0 8px #00ff88, 0 0 12px #00ff88",
        "0 0 8px #4499ff, 0 0 12px #4499ff",
        "none",
      ],
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
      <CanvasCursor />
      <div className="fixed top-4 left-4 z-30">
        <LogoMinato />
      </div>
      <motion.div
        className="network-lines"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="glow top-1/4 left-1/4 w-96 h-96"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className="glow top-1/3 right-1/4 w-96 h-96"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-4xl md:mt-10 lg:mt-10"
      >
        <motion.h1
          className="text-4xl md:text-7xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="inline-block">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                  delay: index * 0.1,
                  times: [0, 0.4, 0.6, 1], // Contrôle le timing des couleurs
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>{" "}
          <span className="text-primary/60">Minato.ai</span>
        </motion.h1>

        {/* <motion.h1
          className="text-4xl md:text-7xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Clone Yourself. <span className="text-primary/60">Minato.ai</span>
        </motion.h1> */}
        <motion.p
          className="text-base md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          "Build the digital version of you, to scale your products and
          contents, infinitely."
        </motion.p>

        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative">
            {/* Champ de saisie avec suggestions intégrées */}
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Do a direct search for your products."
                className="pr-10 pt-3 pb-16 min-h-[120px] max-h-[200px] w-full bg-background/50 backdrop-blur-sm border border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-lg text-lg resize-none overflow-hidden"
                style={{
                  boxShadow: isFocused
                    ? "0 0 0 3px rgba(59, 130, 246, 0.2)"
                    : "none",
                }}
              />

              {/* Suggestions toujours visibles */}
              <motion.div
                className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-3 w-full"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1.5 rounded-full px-3 py-1 h-8 bg-background/95 backdrop-blur-sm border-gray-200 hover:border-gray-300 hover:bg-background transition-all duration-200 text-xs shadow-sm"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      {suggestion.icon}
                      <span className="font-medium truncate max-w-[100px] sm:max-w-none">
                        {suggestion.text}
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2 hover:bg-primary/10 rounded-lg"
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : (
                  <Send className="h-5 w-5 text-primary" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
        <Button className="relative px-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-md mt-5">
          <span className="text-sm mr-2">Join Now</span>
          <motion.div
            variants={fingerVariants}
            initial="initial"
            animate="animate"
            className="inline-block"
          >
            <PointRight className="w-5 h-5" />
          </motion.div>
        </Button>
      </motion.div>

      <FloatingIndicators />

      <motion.div
        className="fixed bottom-8 left-8 text-sm text-muted-foreground z-20 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {/* Texte généré */}
        <div className="flex items-center">
          {displayText}
          {/* Curseur clignotant */}
          <span className="ml-1 inline-block h-4 w-1 bg-muted-foreground animate-blink" />
        </div>
      </motion.div>

      <div className="text-sm text-muted-foreground z-20 fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center">
        <p>Powered By Minato.ai</p>
      </div>

      {/* Icônes des réseaux sociaux */}
      <div className="fixed bottom-8 right-8 text-sm text-muted-foreground z-20 flex items-center gap-2">
        {/* Tiktok */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative group"
        >
          <FaTiktok className="h-4 w-4 text-muted-foreground hover:text-[#69C9D0] transition-colors cursor-pointer" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-black to-[#c414c4] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Tiktok
          </div>
        </motion.div>

        {/* Facebook */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative group"
        >
          <FaFacebook className="h-4 w-4 text-muted-foreground hover:text-[#1877F2] transition-colors cursor-pointer" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1877F2] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Facebook
          </div>
        </motion.div>

        {/* Instagram */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative group"
        >
          <FaInstagram className="h-4 w-4 text-muted-foreground hover:text-[#E4405F] transition-colors cursor-pointer" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E4405F] to-[#fc422a] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Instagram
          </div>
        </motion.div>

        {/* X (Twitter) */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative group"
        >
          <FaTwitter className="h-4 w-4 text-muted-foreground hover:text-[#1DA1F2] transition-colors cursor-pointer" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1DA1F2] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            X(Twitter)
          </div>
        </motion.div>
      </div>
    </div>
  );
}
