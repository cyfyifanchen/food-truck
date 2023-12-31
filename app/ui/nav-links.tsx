'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { MousePointerSquare, Shuffle } from 'lucide-react'

const links = [
  {
    name: 'Select truckee',
    href: '/dashboard',
    icon: MousePointerSquare,
  },
  { name: 'Shuffle truckee', href: '/dashboard/shuffle', icon: Shuffle },
]

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-fresh-cardColor p-3 text-sm font-medium hover:bg-fresh-subTextColor hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-fresh-textColor text-white': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
