import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./product-card";
import { VideoCard } from "./video-card";
import { WebSeriesCard } from "./web-series-card";
import { ImageCard } from "./image-card";
import type {
  Product,
  Image,
  Video,
  WebSeries,
  Calls,
  Lives,
  History,
} from "@/lib/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LivesList } from "./scheduled-stream";
import { useSearchStore } from "@/lib/store";
import { ScheduledCalls } from "./scheduled-calls";


const webSeries = [
  {
    id: 1,
    title: "Web Series 1",
    creator: "Creator 1",
    thumbnail: "/placeholder.svg",
    price: "$9.99",
  },
  {
    id: 2,
    title: "Web Series 2",
    creator: "Creator 2",
    thumbnail: "/placeholder.svg",
    price: "$14.99",
  },
];

export function MainContent({
  contentType,
  products,
  images,
  videos,
  webSeries,
  currentView,
}: {
  contentType:
    | "products"
    | "videos"
    | "webSeries"
    | "images"
    | "calls"
    | "lives"
    | "history";
  products: Product[];
  images: Image[];
  videos: Video[];
  webSeries: WebSeries[];
  calls: Calls[];
  lives: Lives[];
  history: History[];
  histry: History[];
  currentView:
    | "products"
    | "images"
    | "videos"
    | "webSeries"
    | "calls"
    | "lives"
    | "history";
}) {
  const calls = useSearchStore((state) => state.calls); // 🔥 Récupérer les calls depuis le store

  console.log("currentView:", currentView);
  console.log("calls:", calls);

  const lives = useSearchStore((state) => state.lives); // 🔥 Récupérer les lives depuis le store

  console.log("currentView:", currentView);
  console.log("lives:", lives);

  return (
    <motion.div
      className="ml-[17%] mr-[20%] p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {currentView === "images" && (
          <motion.div
            key="images-alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Viewing All Images</AlertTitle>
              <AlertDescription>
                You are currently viewing all available images.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        {currentView === "videos" && (
          <motion.div
            key="videos-alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Viewing All Videos</AlertTitle>
              <AlertDescription>
                You are currently viewing all available videos.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        {currentView === "webSeries" && (
          <motion.div
            key="web-series-alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Viewing All Web Series</AlertTitle>
              <AlertDescription>
                You are currently viewing all available web series.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {currentView === "calls" && (
          <motion.div
            key="video-call-alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Viewing All Video Calls</AlertTitle>
              <AlertDescription>
                You are currently viewing all available web series.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {currentView === "lives" && (
          <motion.div
            key="live-alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Viewing All Lives Streams</AlertTitle>
              <AlertDescription>
                You are currently viewing all available web series.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="wait">
          {currentView === "products" &&
            contentType === "products" &&
            (products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={`product-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="no-products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="col-span-3 text-center py-8"
              >
                <p>Aucun produit trouvé dans cette catégorie.</p>
              </motion.div>
            ))}
          {currentView === "videos" &&
            videos.map((video, index) => (
              <motion.div
                key={`video-${video.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          {currentView === "products" &&
            contentType === "webSeries" &&
            webSeries.map((series, index) => (
              <motion.div
                key={`series-${series.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <WebSeriesCard series={series} />
              </motion.div>
            ))}
          {currentView === "images" &&
            images.map((image, index) => (
              <motion.div
                key={`image-${image.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ImageCard image={image} />
              </motion.div>
            ))}
          {currentView === "webSeries" &&
            webSeries.map((series, index) => (
              <motion.div
                key={`series-${series.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <WebSeriesCard series={series} />
              </motion.div>
            ))}

          {currentView === "calls" && calls.length > 0 ? (
            calls.map((calls, index) => (
              <motion.div key={`calls-${calls.id}`}>
                <ScheduledCalls calls={calls} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500"></p>
          )}

          {currentView === "lives" && lives.length > 0 ? (
            lives.map((lives, index) => (
              <motion.div key={`live-${lives.id}`}>
                <LivesList lives={lives} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500"></p>
          )}
          {/* 
          {currentView === "history" &&  (
              <div className="container mx-auto px-4 py-8">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <RecentItems items={recentItems} />
                  <SuggestedItems items={suggestedItems} />
                </CardContent>
              </Card>
            </div>
          )} */}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
