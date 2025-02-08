"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { NavBar } from "@/components/nav-bar";
import { ProductShowcase } from "@/components/product-showcase";
import { ImageShowcase } from "@/components/image-showcase";
import { VideoCallShowcase } from "@/components/video-call-showcase";
import { LiveStreamingShowcase } from "@/components/live-streaming-showcase";
import { VideoShowcase } from "@/components/video-showcase";
import { WebSeriesShowcase } from "@/components/web-series-showcase";
import { ResultSearch } from "@/components/result-search/index";
import type { Product } from "@/types/product";
import { getAllProducts } from "@/lib/api";
import Image from "next/image";
import CanvasCursor from "@/components/CursorCanvas/canvas-cursor";

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "search">("home");
  const [contentType, setContentType] = useState<
    "products" | "videos" | "webSeries" | "images" | null
  >(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    fetchProducts();
  }, []);

  const handleSearchClick = () => {
    setCurrentView("search");
    setContentType("products");
  };

  const handleViewAll = (
    type: "products" | "videos" | "webSeries" | "images"
  ) => {
    setCurrentView("search");
    setContentType(type);
  };

  const handleHomeClick = () => {
    setCurrentView("home");
    setContentType(null);
  };

  return (
    <main className="relative min-h-screen gradient-bg text-foreground overflow-hidden">
      <NavBar onSearchClick={handleSearchClick} onHomeClick={handleHomeClick} />
      {currentView === "search" ? (
        <ResultSearch />
      ) : (
        <>
        
        
          <Image
            className="absolute top-0 z-0 -translate-y-1/2"
            src={"/bg-back.png"}
            width={1500}
            height={1000}
            alt="back bg"
          />
          <HeroSection />
          <ProductShowcase onViewAll={() => handleViewAll("products")} />
          <ImageShowcase onViewAll={() => handleViewAll("images")} />
          <VideoCallShowcase />
          <LiveStreamingShowcase />
          <VideoShowcase onViewAll={() => handleViewAll("videos")} />
          <WebSeriesShowcase onViewAll={() => handleViewAll("webSeries")} />
        </>
      )}
    </main>
  );
}
