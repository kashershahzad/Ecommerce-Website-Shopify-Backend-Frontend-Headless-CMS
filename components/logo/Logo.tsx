import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface LogoProps {
  title?: string;
  imageUrl?: string;
}

const Logo: React.FC<LogoProps> = ({ title = 'TechBazer', imageUrl = '/logo.svg' }) => {
  return (
    <Link href={'/'} className='flex items-center gap-2 mr-3 md:mr-0'>
        <Image src={imageUrl} width={40} height={40} alt='brand'/>
        <p className='text-2xl font-bold'>{title}</p>
    </Link>
  )
}

export default Logo