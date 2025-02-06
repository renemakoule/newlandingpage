"use client"

import { Button } from "@/components/ui/button"
import { Home, Menu, Search, Sun, Moon, LogIn, User2Icon } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type React from "react" // Added import for React

export function NavBar({ onSearchClick, onHomeClick }: { onSearchClick: () => void; onHomeClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const NavItem = ({
    href,
    icon: Icon,
    label,
    onClick,
  }: {
    href: string
    icon: React.ElementType
    label: string
    onClick?: () => void
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-full md:w-auto"
            onClick={(e) => {
              if (onClick) {
                e.preventDefault()
                onClick()
              }
              setIsOpen(false)
            }}
          >
            <Icon className="h-4 w-4 md:mr-2" />
            <span className="md:hidden">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="hidden md:block">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`
        fixed top-0 right-0 bottom-0 z-50
        w-64 md:w-auto md:max-w-fit
        md:left-0 md:right-0 md:mx-auto
        md:top-4 md:bottom-auto
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        ${isVisible ? "md:translate-y-0" : "md:-translate-y-24"}
        bg-background/80 backdrop-blur-lg border-l border-border/50 md:border md:border-border/50 rounded-md
      `}
      >
        <div className="flex flex-col h-full md:flex-row items-start md:items-center gap-8 p-4 md:p-2">
          <NavItem href="/" icon={Home} label="Home" onClick={onHomeClick} />
          <NavItem href="#" icon={Search} label="Search" onClick={onSearchClick} />
          <NavItem href="/login" icon={User2Icon} label="Login" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full ml-auto md:ml-0"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="hidden md:block">
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </>
  )
}

