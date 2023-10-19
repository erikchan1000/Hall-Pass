'use client'

import React, { useState } from 'react';
import Calendar from "@/components/seller_calendar"
import { ModalForm } from "@/components/modal_form"
import Link from 'next/link'
import Image from 'next/image'
import snowflake from '@/public/snowflake.svg'
import { ModalInfo } from '@/components/modal_info'
import Button from '@mui/material/Button';

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  const [dateRange, setDateRange] = useState([] as any) 
  const [ showInfo, setShowInfo ] = useState(false)
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Link href="/" className='top-5 md:h-40 md:w-40 absolute h-10 w-10 md:top-20'>
        <Image src={snowflake} alt="snowflake" /> 
      </Link>

      <Calendar setShowModal={setShowModal} setDateRange={setDateRange}/>
      <ModalForm open={showModal} dateRange={dateRange} onClose={() => setShowModal(false)} submitType="seller"/>
      <Button variant="contained" onClick={() => setShowInfo(true)}
        sx={{
          backgroundColor: "rgb(59, 130, 246) !important",
          color: "white !important",
          marginTop: '20px',
          '&:hover': {
            bgcolor: "rgb(30, 64, 175) !important",
            color: "white !important",
          }
        }}
      >Price Info</Button>
      <ModalInfo open={showInfo} onClose={() => setShowInfo(false)} />

    </div>
  ); 
}
