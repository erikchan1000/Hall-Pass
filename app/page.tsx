import React from 'react';
import { Snow } from '@/components/snow';
import Image from 'next/image'
import SnowMountain from "@/public/SnowMountain.jpg"
import Link from 'next/link'
import Snowflake from '@/public/snowflake.svg'

export default function Page() {
  return (
    <div className='h-screen w-screen bg-black absolute flex justify-evenly items-center'
      style={{
        backgroundImage: `url(${SnowMountain.src})`,
        backgroundSize: 'cover',
      }}
    >
      <h1 className='text-xl top-20 font-bold text-black text-white z-10 absolute flex items-center'>
        <Image src={Snowflake} alt='Snowflake' width={50} height={50} className='mr-2'/>
        Snowflake
      </h1>

      <Link href='/seller-login' className='text-xl z-10 rounded-2xl bg-blue-200 p-2 w-24 flex justify-center hover:bg-blue-500 transition-all'>
        Renter
      </Link>
      <Link href='/seller' className='text-xl z-10 rounded-2xl bg-blue-200 p-2 w-24 flex hover:bg-blue-500 transition-all justify-center'>
        Seller
      </Link>
      <Snow />
    </div>
  )
}

