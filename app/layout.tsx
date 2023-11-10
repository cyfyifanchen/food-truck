import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Truckee - food truck service',
  description: 'Your friendly food truck service based in Bay Area.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <div className="w-full flex-none md:w-64"></div>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
