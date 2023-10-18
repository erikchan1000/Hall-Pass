import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { generateDate, months } from "@/utils/calendar";
import cn from "@/utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { getAllPassesByDate } from "@/firebase/get_pass"
import { Button } from "@mui/material";

import { Button } from "@mui/material";


interface CalendarProps {
  setShowModal: (showModal: boolean) => void,
  setDateRange: (dateRange: any) => void
  setShowModal: (showModal: boolean) => void,
  setDateRange: (dateRange: any) => void
}

const fetchDataAndUpdateCalendar = async (setPassMap: any) => {
const fetchDataAndUpdateCalendar = async (setPassMap: any) => {
  try {
      const passMap = await getAllPassesByDate()
      console.log(passMap)
      setPassMap(passMap)
      return passMap
      setPassMap(passMap)
      return passMap
  }
  catch (e) {
    console.log("Error Fetching Data")
    console.log(e)
  }
}

export default function Calendar({setShowModal, setDateRange}: CalendarProps) {


	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
  const [ selectedDates, setSelectedDates ] = useState<string[]>([])
  const [ selectDate, setSelectDate ] = useState(null as any)
  const [ passMap, setPassMap ] = useState(null as any)
  console.log("From Calendar")
  console.log(passMap)
  useEffect(() => {
    fetchDataAndUpdateCalendar(setPassMap)
  }, [])
  console.log(selectedDates)
  useEffect(() => {
    if (!passMap) return
    console.log(passMap.get('Wed Nov 01 2023'))

  }, [passMap])

  useEffect(() => {
        setDateRange(selectedDates)
  }, [selectedDates, setDateRange])

  const toggleDateSelection = (date: any) => {
  const dateStr = date.toDate().toDateString()
  //if date is already selected and new date is selected where new date is greater than old date
  //then select all dates in between
  //
  if (selectDate && date.isAfter(selectDate)) {
    let current = dayjs(selectDate) 
    let dates = selectedDates

    while (current.isBefore(date)) {
      current = current.add(1, 'day')
      dates.push(current.toDate().toDateString())
    }
    setSelectedDates(dates)
    setSelectDate(date)



  } else if (selectDate && date.isBefore(selectDate)) {
    //reset
    const singleDate = [dateStr]
    setSelectedDates(singleDate)
    setSelectDate(date)
    }

    else {
      setSelectedDates([dateStr])
      setSelectDate(date)
    }
  }

	return (
		<div className="flex mt-5 md:mt-0 w-5/6 gap-10 md:divide-x md:w-1/2 mx-auto bg-white p-4 h-fit md:flex-row flex-col rounded-3xl">

			<div>
				<div className="flex justify-between items-center">
					<h1 className="select-none font-semibold">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="flex gap-10 items-center ">
						<GrFormPrevious
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className=" cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(currentDate);
							}}
						>
							Today
						</h1>
						<GrFormNext
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7 ">
					{days.map((day, index) => {
						return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
						);
					})}
				</div>

				<div className=" grid grid-cols-7 ">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className="p-2 text-center h-14 grid place-content-center text-sm border-t"
								>
									<h1
										className={cn(
											currentMonth ? "" : "text-gray-400",
											today
												? "bg-blue-300 text-white"
												: "",
                        selectedDates.includes(date.toDate().toDateString())
												? "bg-blue-600 text-white"
												: "",
											"h-10 w-10 rounded-full grid place-content-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer select-none"
										)}
										onClick={() => {
                      if (!date) {
                        return
                      }
                      setSelectDate(date)
                      toggleDateSelection(date)
										}}
									>
										{date.date()}
                    
                    <div className={cn(
                      selectedDates.includes(date.toDate().toDateString()) 
                      ? "text-white text-xs"
                      : "text-gray-400 text-xs",
                        )}>
                      {
                        passMap && passMap.get(date.toDate().toDateString()) ? 
                          parseInt(passMap.get(date.toDate().toDateString())["womenPass"]) + parseInt(passMap.get(date.toDate().toDateString())["menPass"]) :
                          0
                      }
                    </div>
									</h1>
								</div>
							);
						}
					)}
				</div>
			</div>
			<div className="md:h-96 md:w-96 md:px-5 flex flex-col">
        {selectDate && 
         <>
          <h1 className=" font-semibold">
            Hall passes for {selectDate.toDate().toDateString()}
          </h1>
          <div className="flex flex-col mb-10 md:mb-0">
            <h1>
              Women Pass: {passMap && passMap.get(selectDate.toDate().toDateString()) ?
                passMap.get(selectDate.toDate().toDateString())["womenPass"] :
                0
              }
            </h1>
            <h1>
              Men Pass: {passMap && passMap.get(selectDate.toDate().toDateString()) ?
                passMap.get(selectDate.toDate().toDateString())["menPass"] :
                0
              }
            </h1>
          </div>
            
         </>
        }

       <Button variant="contained" onClick={() => { 
         setShowModal(true)
        }}
        sx={{
          backgroundColor: "rgb(59, 130, 246) !important",
          marginTop: "auto !important",
          color: "white",
          width: "100%",
          "&:hover": {
            bgcolor: "rgb(30, 64, 175) !important",
            color:"white"
          }
        }}
        >Request Pass</Button>

			</div>
		</div>
	);
}
