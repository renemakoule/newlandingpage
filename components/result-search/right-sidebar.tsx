import { motion } from "framer-motion"
import { ScrollArea } from "../ui/scroll-area"
import VideoAds from "./VideoAds"

// const videos = [
//   { id: 1, title: "Video 1", creator: "Creator 1", thumbnail: "/2.mp4", price: "" },
//   { id: 2, title: "Video 2", creator: "Creator 2", thumbnail: "/3.mp4", price: "" },
//   { id: 3, title: "Video 3", creator: "Creator 3", thumbnail: "/4.mp4", price: "" },
//   { id: 4, title: "Video 4", creator: "Creator 4", thumbnail: "/1.mp4", price: "" },
//   { id: 5, title: "Video 5", creator: "Creator 5", thumbnail: "/b.mp4", price: "" },
//   { id: 6, title: "Video 6", creator: "Creator 6", thumbnail: "/j.mp4", price: "" },
//   // ... more videos
// ]
const videos = [
  '/1.mp4',
  '/2.mp4',
  '/3.mp4',
];

export function RightSidebar() {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
    <motion.div
      className="fixed right-0 top-0 bottom-0 w-[22%] bg-background border-l border-border overflow-y-auto hide-scrollbar"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Featured Videos</h2>
          <VideoAds videos={videos} />
      </div>
    </motion.div>
    </div>
    </ScrollArea>
  )
}

