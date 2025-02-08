"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RecentItems } from "./recent-items"
import { SuggestedItems } from "./suggested-items"
import type { Item } from "@/lib/types"
import { Button } from "../ui/button"

const recentItems: Item[] = [
  { id: "1", type: "image", title: "Image 1", thumbnail: "/lv.webp" },
  { id: "2", type: "video", title: "Video 1", thumbnail: "/1.mp4" },
  { id: "3", type: "webSeries", title: "Web Series 1", thumbnail: "/2.mp4" },
  { id: "4", type: "image", title: "Image 2", thumbnail: "/lv1.webp" },
  { id: "5", type: "video", title: "Video 2", thumbnail: "/3.mp4" },
  { id: "6", type: "webSeries", title: "Web Series 2", thumbnail: "/4.mp4" },
]

const suggestedItems: Item[] = [
  { id: "7", type: "image", title: "Suggested Image 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "8", type: "video", title: "Suggested Video 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "9", type: "webSeries", title: "Suggested Web Series 1", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "10", type: "image", title: "Suggested Image 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "11", type: "video", title: "Suggested Video 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "12", type: "webSeries", title: "Suggested Web Series 2", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "13", type: "image", title: "Suggested Image 3", thumbnail: "/placeholder.svg?height=200&width=300" },
  { id: "14", type: "video", title: "Suggested Video 3", thumbnail: "/placeholder.svg?height=200&width=300" },
]

interface HistoryCardProps {
    onClose?: () => void;
  }
  
  export default function HistoryCard({ onClose }: HistoryCardProps) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <RecentItems items={recentItems} />
            <SuggestedItems items={suggestedItems} />
            <Button onClick={onClose} className="mt-4">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
