'use client'

import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { auth } from "@/firebase/firebase_config.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: any) => {
    e.preventDefault();
  };
  
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Registration Success");
      router.push("/seller-login")
    }
    catch (error: any) {
      console.log(error)
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 flex flex-col rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold mb-4">Seller Registration</h1>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          style={{ marginBottom: "20px" }}
          required
          onChange={handleChange}
        />
        <FormControl sx={{ marginBottom: "20px" }} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        
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
    </div>
  );
};

export default RegistrationPage;
