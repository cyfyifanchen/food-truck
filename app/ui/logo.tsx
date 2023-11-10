import Image from 'next/image'

export const Logo = () => {
  return (
    <Image
      height={200}
      width={200}
      alt="logo"
      src="/food-truck-logo.svg"
      priority
    />
  )
}
