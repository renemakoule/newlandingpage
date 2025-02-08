"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, VideotapeIcon,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const webSeries = [
  { id: 1, title: "Web Series 1", thumbnail: "/placeholder.svg" },
  { id: 2, title: "Web Series 2", thumbnail: "/placeholder.svg" },
  { id: 3, title: "Web Series 3", thumbnail: "/placeholder.svg" },
];

const episodes = [
  { id: 1, title: "Episode 1", thumbnail: "/1.mp4" },
  { id: 2, title: "Episode 2", thumbnail: "/2.mp4" },
  { id: 3, title: "Episode 3", thumbnail: "/3.mp4" },
  { id: 4, title: "Episode 4", thumbnail: "/4.mp4" },
  { id: 5, title: "Episode 5", thumbnail: "/5.mp4" },
  { id: 6, title: "Episode 6", thumbnail: "/6.mp4" },
  { id: 7, title: "Episode 7", thumbnail: "/7.mp4" },
  { id: 8, title: "Episode 8", thumbnail: "/8.mp4" },
];

export function WebSeriesShowcase({ onViewAll }: { onViewAll: () => void }) {
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { setCurrentView } = useSearchStore();
  const router = useRouter();

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const itemWidth =
        containerRef.current.offsetWidth / (window.innerWidth >= 640 ? 4 : 2);
      containerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const nextSeries = () => {
    setCurrentSeriesIndex((prevIndex) => (prevIndex + 1) % webSeries.length);
  };

  const prevSeries = () => {
    setCurrentSeriesIndex(
      (prevIndex) => (prevIndex - 1 + webSeries.length) % webSeries.length
    );
  };

  const nextEpisodes = () => {
    const newIndex = (currentEpisodeIndex + 1) % episodes.length;
    setCurrentEpisodeIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevEpisodes = () => {
    const newIndex =
      (currentEpisodeIndex - 1 + episodes.length) % episodes.length;
    setCurrentEpisodeIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const itemWidth =
          container.offsetWidth / (window.innerWidth >= 640 ? 4 : 2);
        const newIndex = Math.round(container.scrollLeft / itemWidth);
        setCurrentEpisodeIndex(newIndex);
      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleViewAll = () => {
    setCurrentView("webSeries");
    router.push("/search?view=webSeries");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="my-16 mx-2 sm:mx-0">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500 to-red-500 p-8 text-white mb-8 shadow-lg mx-auto">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Showcase Your Web Series
            </h2>
            <p className="text-lg mb-6">
              Create, publish, and monetize your web series to maximize your
              earnings!
            </p>
            <Button
              variant="secondary"
              className="flex items-center"
              onClick={handleViewAll}
            >
              <Eye className="mr-2 h-4 w-4" /> View All Web Series
            </Button>
          </div>
          <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            >
              <source src="/0717.mp4" type="video/mp4" />
            </video>
            <VideotapeIcon className="absolute bottom-4 right-4 h-16 w-16 text-white/30" />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {webSeries.map((series, index) => (
              <button
                key={series.id}
                className={`w-2 h-2 rounded-full ${
                  index === currentSeriesIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentSeriesIndex(index)}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            className="absolute bottom-4 left-4 rounded-full"
            onClick={prevSeries}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            className="absolute bottom-4 right-4 rounded-full"
            onClick={nextSeries}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="relative">
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={prevEpisodes}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={nextEpisodes}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
          <div
            ref={containerRef}
            className="relative overflow-x-auto hide-scrollbar"
          >
            <div className="flex">
              {episodes.map((episode, index) => (
                <div
                  key={episode.id}
                  className="w-1/2 sm:w-1/4 flex-shrink-0 p-2"
                >
                  <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative">
                      <video
                        src={episode.thumbnail || "/placeholder.svg"}
                        className="w-full h-80 object-cover"
                        controls
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{episode.title}</h3>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={handleViewAll}
          >
            <Eye className="mr-2 h-4 w-4" /> View All
          </Button>
        </div>
      </div>
    </div>
  );
}
