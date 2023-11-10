import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Logo } from './ui/logo'

import Link from 'next/link'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-fresh-textColor p-4 md:h-52">
        <div className="-mb-10">
          <Logo />
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-fresh-cardColor px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Truckee.</strong> A local food truck service.{' '}
            <a
              href="https://cyfyifanchen.com"
              className="text-xl text-fresh-textColor hover:underline"
            >
              Designed by Elliott Chen
            </a>
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-fresh-textColor px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-fresh-subTextColor md:text-base"
          >
            <span>Discover</span> <ArrowRightIcon className="w-3 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
      </div>
    </main>
  )
}
