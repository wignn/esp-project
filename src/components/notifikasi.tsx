"use client"

import { useEffect } from "react"
import { XCircle, CheckCircle, X } from "lucide-react"

interface NotificationProps {
  type: "success" | "error"
  message: string
  onClose: () => void
  duration?: number
}

export function Notification({ type, message, onClose, duration = 5000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`mb-4 p-4 rounded-lg flex items-start justify-between shadow-md animate-in slide-in-from-top-5 duration-300 ${
        type === "success"
          ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border border-green-100 dark:border-green-800"
          : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border border-red-100 dark:border-red-800"
      }`}
    >
      <div className="flex items-start">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 mr-3 text-green-500 dark:text-green-400 flex-shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 mr-3 text-red-500 dark:text-red-400 flex-shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
