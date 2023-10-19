'use client'

import React, { useState, useEffect } from 'react';
import Calendar from "@/components/seller_calendar"
import { ModalForm } from "@/components/modal_form"
import Link from 'next/link'
import Image from 'next/image'
import snowflake from '@/public/snowflake.svg'
import { ModalInfo } from '@/components/modal_info'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { auth } from "@/firebase/firebase_config.js";
import { useRouter } from 'next/navigation'
import { getPassesByEmail } from '@/firebase/get_pass';

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  const [dateRange, setDateRange] = useState([] as any) 
  const [ showInfo, setShowInfo ] = useState(false)
  const [ submitted, setSubmitted ] = useState("")
  const [ user, setUser ] = useState(null as any)
  const [ passMap, setPassMap ] = useState({} as any)

  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user) => { 
      if (!user) {
        router.push("/seller-login")
      }
      else {
        setUser(user)
      }
    })
  }, [])
  console.log('seller')
  console.log(passMap)

  useEffect(() => {
    if (user) {
      getPassesByEmail(user.email).then((passes) => {
        setPassMap(passes)
      })
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push("/seller-login")
    }
    catch (error: any) {
      console.log(error)
      alert(error.message);
    }
  }

  useEffect(() => {
      if (submitted) {
        setTimeout(() => {
          setSubmitted("")
        }, 3000)
      }
  }, [submitted])

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      {user && 
      <>
        <Link href="/" className='top-5 md:h-40 md:w-40 absolute h-10 w-10 md:top-20'>
          <Image src={snowflake} alt="snowflake" /> 
        </Link>
        <Button variant="contained" onClick={handleLogout}
          sx={{
            backgroundColor: "rgb(59, 130, 246) !important",
            color: "white !important",
            position: 'absolute',
            top: '10px',
            right: '10px',
            '&:hover': {
              bgcolor: "rgb(30, 64, 175) !important",
              color: "white !important",
            }
          }}
        >Logout</Button>

        <Calendar passMap={passMap} setShowModal={setShowModal} setDateRange={setDateRange}/>
        <ModalForm open={showModal} dateRange={dateRange} onClose={() => {
          setShowModal(false)
          }} 
          submitType="seller"
          setSubmitted={setSubmitted}
        />
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
        {submitted &&
          <Alert severity="success" sx={{ position: 'absolute', bottom: '10px' }}>Successfully submitted request!</Alert>
        }
      </>
      }
    </div>
  ); 
}
