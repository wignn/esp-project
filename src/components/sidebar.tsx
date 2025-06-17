"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Users, FileText } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className = "" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Reports", href: "/dashboard/reports", icon: FileText }
  ]


  return (
    <>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isMobile ? "w-[280px]" : isOpen ? "w-[280px]" : "w-[80px]"}
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
                CM
              </div>
              {(isOpen || !isMobile) && (
                <span
                  className={`ml-3 font-semibold text-white text-lg transition-opacity duration-200 ${!isOpen && !isMobile ? "opacity-0 hidden" : "opacity-100"}`}
                >
                  Client Manager
                </span>
              )}
            </div>
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="ml-auto p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                <ChevronLeft
                  size={18}
                  className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
                />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-3 py-2.5 rounded-md text-sm font-medium
                        group transition-colors
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `}
                    >
                      <Icon
                        size={20}
                        className={`flex-shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
                      />
                      {(isOpen || !isMobile) && (
                        <span
                          className={`ml-3 transition-opacity duration-200 ${!isOpen && !isMobile ? "opacity-0 hidden" : "opacity-100"}`}
                        >
                          {item.name}
                        </span>
                      )}
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

          </nav>

        </div>
      </aside>
    </>
  )
}

const ChevronLeft = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)

