import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-[280px] p-6 transition-all duration-300">{children}</main>
        </div>
  )
}
