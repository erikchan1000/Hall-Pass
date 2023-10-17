'use client'

import React, { useState } from 'react';
import Calendar from "@/components/seller_calendar"
import { ModalForm } from "@/components/modal_form"

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex h-screen items-center ">
      <Calendar setShowModal={setShowModal} />
      <ModalForm open={showModal} onClose={() => setShowModal(false)} />
    </div>
  ); 
}
