'use client'

import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

interface ModalFormProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalForm: React.FC<ModalFormProps> = ({open, onClose}) => {
  const textFieldStyle = {
    marginBottom: "20px"
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dialogStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    womenPass: 0,
    menPass: 0,
  })
  console.log(formData)

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e: any) => {
    e.preventDefault()
    console.log(formData)
    onClose && onClose()
  }
  
  return (
    <Dialog open={open} fullScreen={fullScreen}
    >
      <AiOutlineClose className="top-5 right-5 cursor-pointer ml-auto mt-5 mr-5 bg-gray-200 rounded-full w-4 h-4 p-2 box-content" 
        onClick={() => {
          onClose && onClose()
        }}
      />
      <form className='flex flex-col bg-white rounded-3xl p-4 my-auto'
        onSubmit={submit}
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
          label="Email"
          name="email"
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
        }}>
          Submit
        </Button>
      </form>
    </Dialog>
  )
}
