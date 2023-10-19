'use client'

import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { addPasses } from "@/firebase/add_pass"
import { requestPasses } from "@/firebase/request_pass"
import { RangeProps } from "@/utils/toggleDateSelection";
import { auth } from "@/firebase/firebase_config.js";

interface ModalFormProps {
  open: boolean;
  onClose?: () => void;
  submitType: "seller" | "buyer";
  dateRange: RangeProps[] | string[];
  setSubmitted: (submitted: string) => void;
}

async function submitForm(setSubmitted: (submitted: string) => void, dateRange: RangeProps[] | string[], formData: any, submitType: "seller" | "buyer") {
  if (submitType === "seller") {
    console.log("adding passes")
    console.log(dateRange)
    try {
      await addPasses(dateRange as RangeProps[], formData)
      setSubmitted("Success")
    }
    catch (error: any) {
      console.log(error)
      setSubmitted("Error")
    }
  } else {
    try {
      await requestPasses(dateRange as string[], formData)
      setSubmitted("Success")
    }
    catch (error: any) {
      console.log(error)
      setSubmitted("Error")
    }
  }
}

export const ModalForm: React.FC<ModalFormProps> = ({open, onClose, setSubmitted, dateRange, submitType}) => {
  const textFieldStyle = {
    marginBottom: "20px"
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState(null as any)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
      setFormData({
        ...formData,
        email: user?.email as string,
        }
      )
    })
  }, [])

  console.log(user)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    womenPass: 0,
    menPass: 0,
  })
  console.log(formData)
  console.log(dateRange)
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e: any, dateRange: RangeProps[] | string[]) => {
    e.preventDefault()
    submitForm(setSubmitted, dateRange, formData, submitType)

    onClose && onClose()
  }
  
  console.log(formData)
  return (
    <Dialog open={open} fullScreen={fullScreen}
    >
      <AiOutlineClose className="top-5 right-5 cursor-pointer ml-auto mt-5 mr-5 bg-gray-200 rounded-full w-4 h-4 p-2 box-content" 
        onClick={() => {
          onClose && onClose()
        }}
      />
      <form className='flex flex-col bg-white rounded-3xl p-4 my-auto'
        onSubmit={(e) => {
          submit(e, dateRange)
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          style={textFieldStyle}
          required
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          name="phone"
          variant="outlined"
          style={textFieldStyle}
          required
          onChange={handleChange}
        />

        <TextField
          label="Women pass"
          type="number"
          name="womenPass"
          style={textFieldStyle}
          required
          defaultValue={0}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <TextField
          label="Men pass"
          name="menPass"
          type="number"
          style={textFieldStyle}
          required
          defaultValue={0}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" sx={{
          backgroundColor: "rgb(59, 130, 246) !important",
          color: "white",
          width: "100%",

          "&:hover": {
            bgcolor: "rgb(30, 64, 175) !important",
            color: "white",
          },
        }}
        >
          Submit
        </Button>
      </form>
    </Dialog>
  )
}
