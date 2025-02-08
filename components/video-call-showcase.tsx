"use client"

import { motion } from "framer-motion"
import { Video, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Tableau de vos images
const images = [
  { src: "/vc7.webp", alt: "Video Call 9" },
  { src: "/vc.webp", alt: "Video Call 2" },
  { src: "/vc1.png", alt: "Video Call 3" },
  { src: "/vc2.webp", alt: "Video Call 4" },
  { src: "/vc3.webp", alt: "Video Call 5" },
  { src: "/vc4.webp", alt: "Video Call 6" },
  { src: "/vc5.webp", alt: "Video Call 7" },
  { src: "/vc6.webp", alt: "Video Call 8" },
];

export function VideoCallShowcase() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-16 mx-2 sm:mx-0">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white shadow-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Monetize Your Video Calls</h2>
            <p className="text-lg mb-6">
              Start offering paid video consultations and boost your income. Share your expertise one-on-one!
            </p>
            <Button variant="secondary" className="flex items-center">
              <PhoneCall className="mr-2 h-4 w-4" /> Start a Call
            </Button>
          </div>
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/ap1.avif')" }}
          >
            <Image src="/ap1.avif" alt="alt" width={320} height={500} />
          </div>
          <Video className="absolute bottom-4 right-4 h-16 w-16 text-white/30" />
        </motion.div>

        {/* Swiper Carousel */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={320}
                    height={500}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" className="flex items-center">
                      <Video className="mr-2 h-4 w-4" /> Watch Video
                    </Button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        </div>
        </div>
  )
}