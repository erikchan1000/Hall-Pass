'use client'
import React, { useState } from "react";
import Calendar from '@/components/calendar'
import Image from 'next/image'
import snowflake from '@/public/snowflake.svg'
import { ModalForm } from '@/components/modal_form'


export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const onClose = () => {
    setShowModal(false)
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Image src={snowflake} alt="snowflake" className='h-40 w-40 absolute top-20'/> 
      <Calendar setShowModal={setShowModal}/>
      <ModalForm open={showModal} onClose={onClose}/>
    </div>
  )
}
