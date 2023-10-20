import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery, useTheme } from '@mui/material';
import { warn } from 'console';

interface ModalInfoProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalInfo: React.FC<ModalInfoProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <div className="p-10">
        <AiOutlineClose className="right-5 top-5 absolute cursor-pointer" onClick={onClose} />
        <h1 className="mt-5 mb-5">Price Info</h1>
        <li>
          $80/day 1 day
        </li>
        <li>
          $70/day 2 days
        </li>
        <li>
          $60/day 3 days
        </li>
        <li>
          $50/day 4 days or more
        </li>
        <span className='text-xs text-slate-500 block mt-10'>
          **$10/day deposit will go to operational costs and site admins
        </span>
      </div>
    </Dialog>

  )
}
