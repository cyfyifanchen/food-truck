import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideNav from '@/app/ui/sidenav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Food Truck App',
  description: 'This is your lovely Food Truck App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
