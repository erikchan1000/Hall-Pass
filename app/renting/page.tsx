'use client'
import React, { useState, useEffect } from "react";
import Calendar from '@/components/calendar'
import Image from 'next/image'
import snowflake from '@/public/snowflake.svg'
import { ModalForm } from '@/components/modal_form'
import { ModalInfo } from '@/components/modal_info'
import Button from '@mui/material/Button';
import Link from 'next/link'
import { Alert } from "@mui/material";

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [dateRange, setDateRange] = useState([] as any)
  const [showInfo, setShowInfo] = useState(false)
  const [ submitted,setSubmitted ] =useState("")
  const onClose = () => {
    setShowModal(false)
  }

  const onInfoClose = () => {
    setShowInfo(false)
  }
  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted("")
      }, 3000)
    }

  }, [submitted])

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col w-full">
      <Link href="/" className='top-5 md:h-24 md:w-24 h-10 w-10 md:top-20 mb-10'>
        <Image src={snowflake} alt="snowflake" /> 
      </Link>
      <Calendar setShowModal={setShowModal} setDateRange={setDateRange}/>
      <ModalForm open={showModal} onClose={onClose} dateRange={dateRange} submitType="buyer" setSubmitted={setSubmitted} />
      <ModalInfo open={showInfo} onClose={onInfoClose} />
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
      {submitted !== "" &&
        <Alert severity="success" sx={{position: 'absolute', bottom: '10px'}}>{submitted}</Alert>
      }
    </div>
  )
}
