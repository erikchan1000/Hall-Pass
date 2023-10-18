'use client'

import React, { useState } from 'react';
import Calendar from "@/components/seller_calendar"
import { ModalForm } from "@/components/modal_form"

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  const [dateRange, setDateRange] = useState([] as any) 
  return (
    <div className="flex h-screen items-center ">
      <Calendar setShowModal={setShowModal} setDateRange={setDateRange}/>
      <ModalForm open={showModal} dateRange={dateRange} onClose={() => setShowModal(false)} submitType="seller"/>
    </div>
  ); 
}
