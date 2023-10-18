'use client'
import React, { useState } from "react";
import Calendar from '@/components/calendar'
import Image from 'next/image'
import snowflake from '@/public/snowflake.svg'
import { ModalForm } from '@/components/modal_form'


export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [dateRange, setDateRange] = useState([] as any)
  const onClose = () => {
    setShowModal(false)
  }
  console.log('home')
  console.log(dateRange)
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col w-full">
      <Image src={snowflake} alt="snowflake" className='top-5 md:h-40 md:w-40 absolute h-20 w-20 md:top-20' /> 
      <Calendar setShowModal={setShowModal} setDateRange={setDateRange}/>
      <ModalForm open={showModal} onClose={onClose} dateRange={dateRange} submitType="buyer" />
    </div>
  )
}
