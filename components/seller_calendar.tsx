import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { generateDate, months } from "@/utils/calendar";
import cn from "@/utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Button } from "@mui/material";
import { isBetween, toggleDateSelection } from "@/utils/toggleDateSelection";

interface CalendarProps {
  setShowModal: (showModal: boolean) => void;
  setDateRange: (dateRange: any) => void;
}

const Calendar: React.FC<CalendarProps> = ({ setShowModal, setDateRange }) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedRanges, setSelectedRanges] = useState<
    { start: Date; end: Date}[]
  >([]);

  const [selectDate, setSelectDate] = useState(null as any);

  console.log("Selected Ranges: ", selectedRanges);

  useEffect(() => {
    setDateRange(selectedRanges);
  }
  , [selectedRanges, setDateRange]);


  return (
    <div className="flex mt-5 md:mt-0 w-5/6 gap-10 md:divide-x md:w-1/2 mx-auto bg-white p-4 h-fit md:flex-row flex-col rounded-3xl">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
                setSelectedRanges([]);
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
        <div className="grid grid-cols-7">
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

        <div className="grid grid-cols-7">
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
                      selectedRanges.some((range) =>
                        isBetween(date, dayjs(range.start), dayjs(range.end))
                      )
                        ? "bg-blue-600 text-white"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      if (!date) {
                        return;
                      }
                      setSelectDate(date);
                      toggleDateSelection(date.toDate(), selectedRanges, setSelectedRanges);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="md:h-96 md:w-96 h-200 w-full md:px-5 flex flex-col">
        {selectDate && (
          <>
            <h1 className="font-semibold">
              Hall passes for {selectDate.toDate().toDateString()}
            </h1>
            <p className="text-gray-400 mb-10 md:mb-0">List Passes</p>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(59, 130, 246) !important",
                color: "white",
                width: "100%",
                marginTop: "auto !important",
                "&:hover": {
                  bgcolor: "rgb(30, 64, 175) !important",
                  color: "white",
                },
              }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              List Pass
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;

