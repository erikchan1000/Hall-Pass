import React, { useState, useEffect } from "react";
import dayjs, {Dayjs} from "dayjs";
import { generateDate, months } from "@/utils/calendar";
import cn from "@/utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Button } from "@mui/material";
import { isBetween, toggleDateSelection } from "@/utils/toggleDateSelection";


interface CalendarProps {
  setShowModal: (showModal: boolean) => void;
}

const Calendar: React.FC<CalendarProps> = ({ setShowModal }) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedRanges, setSelectedRanges] = useState<
    { start: dayjs.Dayjs; end: dayjs.Dayjs }[]
  >([]);

  const [selectDate, setSelectDate] = useState(null as any);

  const fetchDataAndUpdateCalendar = async () => {
    try {
      // Fetch data here and update selectedRanges as needed
      // const passMap = await getAllPassesByDate();
      // Update selectedRanges based on the fetched data
      // For example:
      // setSelectedRanges([
      //   { start: dayjs("2023-10-10"), end: dayjs("2023-10-12") },
      //   { start: dayjs("2023-10-20"), end: dayjs("2023-10-22") },
      // ]);
    } catch (e) {
      console.log("Error Fetching Data");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateCalendar();
  }, []);
  
  return (
    <div className="flex gap-10 sm:divide-x sm:w-1/2 mx-auto bg-white p-4 h-fit sm:flex-row flex-col rounded-3xl">
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
                        isBetween(date, range.start, range.end)
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
                      toggleDateSelection(date, selectedRanges, setSelectedRanges);
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
      <div className="h-200 w-96 sm:px-5 flex flex-col">
        {selectDate && (
          <>
            <h1 className="font-semibold">
              Hall passes for {selectDate.toDate().toDateString()}
            </h1>
            <p className="text-gray-400">List Passes</p>
            <Button
              variant="contained"
              type="submit"
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

