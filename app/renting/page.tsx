'use client'
import React, { useState } from "react";
import Calendar from '@/components/calendar'
import Image from 'next/image'
import snowflake from '@/public/snowflake.svg'
import { ModalForm } from '@/components/modal_form'
import { ModalInfo } from '@/components/modal_info'
import Button from '@mui/material/Button';
export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [dateRange, setDateRange] = useState([] as any)
  const [showInfo, setShowInfo] = useState(false)

  const onClose = () => {
    setShowModal(false)
  }

  const onInfoClose = () => {
    setShowInfo(false)
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col w-full">
      <Image src={snowflake} alt="snowflake" className='top-5 md:h-40 md:w-40 absolute h-10 w-10 md:top-20' /> 
      <Calendar setShowModal={setShowModal} setDateRange={setDateRange}/>
      <ModalForm open={showModal} onClose={onClose} dateRange={dateRange} submitType="buyer" />
      <ModalInfo open={showInfo} onClose={onInfoClose} />
      <Button className='mt-20' variant="contained" onClick={() => setShowInfo(true)}
        sx={{
          backgroundColor: "rgb(59, 130, 246) !important",
          color: "white !important",
          '&:hover': {
            bgcolor: "rgb(30, 64, 175) !important",
            color: "white !important",
          }
        }}
      >Price Info</Button>
    </div>
  )
}
