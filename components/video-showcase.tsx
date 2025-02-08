"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

const videos = [
  { id: 1, title: "Video 1", thumbnail: "/1.mp4" },
  { id: 2, title: "Video 2", thumbnail: "/2.mp4" },
  { id: 3, title: "Video 3", thumbnail: "/3.mp4" },
  { id: 4, title: "Video 4", thumbnail: "/4.mp4" },
  { id: 5, title: "Video 5", thumbnail: "/5.mp4" },
  { id: 6, title: "Video 6", thumbnail: "/6.mp4" },
  { id: 7, title: "Video 7", thumbnail: "/7.mp4" },
  { id: 8, title: "Video 8", thumbnail: "/8.mp4" },
];

export function VideoShowcase({ onViewAll }: { onViewAll: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextVideos = () => {
    const newIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevVideos = () => {
    const newIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentIndex(newIndex);
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
        setCurrentIndex(newIndex);
      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleViewAll = () => {
    setCurrentView("videos");
    router.push("/search?view=videos");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="my-16 mx-2 sm:mx-0">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-green-500 p-8 text-white mb-8 shadow-lg mx-auto">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Monetize Your Videos</h2>
            <p className="text-lg mb-6">
              Turn your video content into a profitable venture and boost your
              revenue!
            </p>
            <Button
              variant="secondary"
              className="flex items-center"
              onClick={handleViewAll}
            >
              <Eye className="mr-2 h-4 w-4" /> View All Videos
            </Button>
          </div>
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            >
              <source src="/9.mp4" type="video/mp4" />
            </video>
            <Video className="absolute bottom-4 right-4 h-16 w-16 text-white/30" />
        </div>
        <div className="relative">
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={prevVideos}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={nextVideos}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
          <div
            ref={containerRef}
            className="relative overflow-x-auto hide-scrollbar"
          >
            <div className="flex">
              {videos.map((video, index) => (
                <div
                  key={video.id}
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
                        src={video.thumbnail || "/placeholder.svg"}
                        className="w-full h-80 object-cover"
                        controls
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{video.title}</h3>
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
