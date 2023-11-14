'use client'

import React, { useEffect, useState } from 'react';
import { getAllPassesByEmail } from '@/firebase/get_pass'

export default function Page() {
  const [ sellers, setSellers ] = useState(undefined as any)
  useEffect(() => {
    getAllPassesByEmail().then((res) => {
      setSellers(res)
    })
  },  [])

  console.log(sellers)

  return (
      <>
        <h1>Page</h1>
      </>
  )
}
