'use client'

import Link from 'next/link'
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  {
    name: 'Select truckee',
    href: '/dashboard',
    icon: HomeIcon,
  },
  { name: 'Shuffle truckee', href: '/dashboard/shuffle', icon: ArrowPathIcon },
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
                'bg-fresh-subTextColor text-white': pathname === link.href,
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
