import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import { siteConfig } from '@/config/site'
import './globals.css'

const roboto = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/food-truck-logo.svg',
      href: '/food-truck-logo.svg',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
