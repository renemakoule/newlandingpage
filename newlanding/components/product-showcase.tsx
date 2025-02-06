"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import  Image  from 'next/image';

const products = [
  { id: 1, name: "Product 1", price: "$19.99", image: "/7.jpg" },
  { id: 2, name: "Product 2", price: "$29.99", image: "/8.jpg" },
  { id: 3, name: "Product 3", price: "$39.99", image: "/9.jpg" },
  { id: 4, name: "Product 4", price: "$49.99", image: "/10.jpg" },
  { id: 5, name: "Product 5", price: "$59.99", image: "/11.jpg" },
  { id: 6, name: "Product 6", price: "$69.99", image: "/12.webp" },
  { id: 7, name: "Product 7", price: "$79.99", image: "/13.jpg" },
  { id: 8, name: "Product 8", price: "$89.99", image: "/14.jpg" },
];

export function ProductShowcase({ onViewAll }: { onViewAll: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const nextProducts = () => {
    const newIndex = (currentIndex + 1) % products.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevProducts = () => {
    const newIndex = (currentIndex - 1 + products.length) % products.length;
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-16 mx-2 sm:mx-0">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white mb-8 shadow-lg mx-auto">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Boost Your Revenue</h2>
            <p className="text-lg mb-6">
              Sell your products effortlessly and increase your income with just
              a few clicks!
            </p>
            <Button
              variant="secondary"
              className="flex items-center"
              onClick={onViewAll}
            >
              <Eye className="mr-2 h-4 w-4" /> View All Products
            </Button>
          </div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 w-full h-full"
            style={{ backgroundImage: "url('/bag.jpg')" }}
          >
            <Image src="/bag.webp" alt="alt" width={200} height={500} />
          </div>
        </div>

        <div className="relative">
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={prevProducts}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={nextProducts}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
          <div
            ref={containerRef}
            className="relative overflow-x-auto hide-scrollbar"
          >
            <div className="flex">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="w-1/2 sm:w-1/4 flex-shrink-0 p-2"
                >
                  <motion.div
                    className="rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className="relative h-48 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          product.image || "/placeholder.svg"
                        })`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xs">{product.name}</h3>
                      <p className="text-xs">{product.price}</p>
                      <Button variant="outline" className="mt-2 w-full text-xs">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy
                      </Button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={onViewAll}
          >
            <Eye className="mr-2 h-4 w-4" /> View All
          </Button>
        </div>
      </div>
    </div>
  );
}
