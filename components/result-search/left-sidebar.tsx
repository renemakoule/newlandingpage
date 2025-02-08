"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronDown,
  Video,
  Package,
  Film,
  Filter,
  X,
  Menu,
  Image,
  Send,
  PhoneCallIcon,
  Radio,
  History,
  Cloud, // Importez l'icône CloneAI
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useSearchStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import LogoMinato from "../logoMinato";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import HistoryCard from "./History";

const categories = ["Category 1", "Category 2", "Category 3"];
const aiClones = ["Clone 1", "Clone 2", "Clone 3"]; // Liste des clones AI

export function LeftSidebar({
  onContentTypeChange,
  onHomeClick,
  activeContentType,
}: {
  onContentTypeChange: (
    type:
      | "products"
      | "videos"
      | "webSeries"
      | "images"
      | "calls"
      | "lives"
      | "history"
  ) => void;
  onHomeClick: () => void;
  activeContentType:
    | "products"
    | "videos"
    | "webSeries"
    | "images"
    | "calls"
    | "lives"
    | "history";
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Previous search 1",
    "Previous search 2",
    "Previous search 3",
  ]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { selectedCategory, setSelectedCategory, setCurrentView } =
    useSearchStore();
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchHistory((prev) => [searchQuery, ...prev.slice(0, 4)]);
      // Implement search logic here
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const handleSort = (type: "name" | "price") => {
    setSortBy(type);
    // Implement sorting logic here
  };

  const removeSearchHistoryItem = (item: string) => {
    setSearchHistory((prev) => prev.filter((i) => i !== item));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleContentTypeChange = (
    type:
      | "products"
      | "videos"
      | "webSeries"
      | "images"
      | "calls"
      | "lives"
      | "history"
  ) => {
    onContentTypeChange(type);
    setCurrentView(type);
    router.push(`/search?view=${type}`);
  };

  const SidebarContent = () => (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <div className="space-y-8">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={onHomeClick}
          >
            <LogoMinato />
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={onHomeClick}
                >
                  <Home className="mr-2 h-5 w-5" /> Home
                </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to the homepage</p>
            </TooltipContent>
          </Tooltip>

          {/* Bouton CloneAI */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Cloud className="mr-2 h-5 w-5" /> CloneAI
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>AI Clones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {aiClones.map((clone) => (
                    <DropdownMenuItem key={clone}>
                      {clone}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>View all AI Clones</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator />

        <form onSubmit={handleSearch} className="relative">
          <Textarea placeholder="Search..." />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search for content</p>
            </TooltipContent>
          </Tooltip>
        </form>

        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Content Types</h3>

          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={
                      activeContentType === "history" ? "default" : "outline"
                    }
                    className={`w-full justify-start ${
                      activeContentType === "history"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    <History className="mr-2 h-5 w-5" /> History
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto hide-scrollbar">
                  <HistoryCard onClose={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>View all Histories</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={
                  activeContentType === "products" ? "default" : "outline"
                }
                className={`w-full justify-start ${
                  activeContentType === "products"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleContentTypeChange("products")}
              >
                <Package className="mr-2 h-5 w-5" /> Products
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View all products</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeContentType === "videos" ? "default" : "outline"}
                className={`w-full justify-start ${
                  activeContentType === "videos"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleContentTypeChange("videos")}
              >
                <Video className="mr-2 h-5 w-5" /> Videos
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse video content</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={
                  activeContentType === "webSeries" ? "default" : "outline"
                }
                className={`w-full justify-start ${
                  activeContentType === "webSeries"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleContentTypeChange("webSeries")}
              >
                <Film className="mr-2 h-5 w-5" /> Web Series
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Explore web series</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeContentType === "images" ? "default" : "outline"}
                className={`w-full justify-start ${
                  activeContentType === "images"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleContentTypeChange("images")}
              >
                <Image className="mr-2 h-5 w-5" /> Images
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse all images</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeContentType === "calls" ? "default" : "outline"}
                className={`w-full justify-start ${
                  activeContentType === "calls"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleContentTypeChange("calls")}
              >
                <PhoneCallIcon className="mr-2 h-5 w-5" /> Calls
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Videos Calls</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeContentType === "lives" ? "default" : "outline"}
                className={`w-full justify-start ${
                  activeContentType === "lives"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleContentTypeChange("lives")}
              >
                <Radio className="mr-2 h-5 w-5" /> Live
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Lives Streaming</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="relative">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setShowCategories(!showCategories)}
            >
              {selectedCategory || "Select Category"}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <AnimatePresence>
              {showCategories && (
                <motion.ul
                  className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {categories.map((category) => (
                    <li key={category}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </Button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">Filter & Sort</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-5 w-5" />{" "}
                {sortBy === "name" ? "Sort by Name" : "Sort by Price"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort("name")}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("price")}>
                Price
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Search History</h3>
          <ul className="space-y-2">
            <AnimatePresence>
              {searchHistory.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="truncate">{item}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSearchHistoryItem(item)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <TooltipProvider>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <motion.div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border ${
          isMobile ? "z-40" : ""
        }`}
        initial={isMobile ? { x: "-100%" } : { x: 0 }}
        animate={{ x: isMobile && !isMobileMenuOpen ? "-100%" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <SidebarContent />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-muted-foreground bg-background border-t border-border">
          Powered by Minato.ai
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
function onClose(): void {
  throw new Error("Function not implemented.");
}

function setIsDialogOpen(arg0: boolean): void {
  throw new Error("Function not implemented.");
}
