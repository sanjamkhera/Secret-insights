import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import dynamic from 'next/dynamic'

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] })

// Dynamically import the StarryGalaxyBackground component with SSR disabled
// This is useful for components that rely on browser APIs or have large bundle sizes
const StarryGalaxyBackground = dynamic(() => import('@/components/StarryGalaxyBackground'), { ssr: false })

// Metadata for the application, used by Next.js for SEO
export const metadata = {
  title: 'Celestial Insights',
  description: 'Your Daily Cosmic Guidance',
}

// RootLayout component: This is the main layout wrapper for the entire application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="w-full">
      <body className={`${inter.className} max-w-[100vw] overflow-x-hidden mx-auto`}>
        {/* Render the dynamically imported StarryGalaxyBackground */}
        <StarryGalaxyBackground />
        {/* Main content wrapper with z-index to appear above the background */}
        <div className="relative z-10 min-h-screen pt-0 bg-black bg-opacity-40 pb-6 mx-auto">
          {/* Main content area where child components will be rendered */}
          <main className="overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}