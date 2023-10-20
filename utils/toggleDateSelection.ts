import dayjs, { Dayjs } from 'dayjs';

export interface RangeProps {
  start: Date,
  end: Date
}
export const isBetween = (date: Dayjs, start: Dayjs, end: Dayjs) => {
  return (date.isAfter(start) && date.isBefore(end)) || date.isSame(start) || date.isSame(end);
}

const minDate = (date1: Dayjs, date2: Dayjs) => {
  return date1.isBefore(date2) ? date1 : date2;
}

const maxDate = (date1: Dayjs, date2: Dayjs) => {
  return date1.isAfter(date2) ? date1 : date2;
}

export const toggleDateSelection = (date: Date, selectedRanges: RangeProps[], setSelectedRanges: (ranges: RangeProps[]) => void) => {
    let updatedSelectedRanges = [...selectedRanges];
    if (updatedSelectedRanges.length === 0) {
      updatedSelectedRanges.push({ start: date, end: date });
      setSelectedRanges(updatedSelectedRanges);
      return;
    }

    const rangeToDeleteIndex = updatedSelectedRanges.findIndex((range) =>
      {
        const start = dayjs(minDate(dayjs(range.start), dayjs(range.end)));
        const end = dayjs(maxDate(dayjs(range.start), dayjs(range.end)));

        return isBetween(dayjs(date), start, end)
      }
    );

    if ( rangeToDeleteIndex !== -1) {
      updatedSelectedRanges.splice(rangeToDeleteIndex, 1);
    } else {
      const findSameStartEndRange = updatedSelectedRanges.find((range) =>
        dayjs(range.start).isSame(dayjs(range.end))
      );

      if (findSameStartEndRange) {
        updatedSelectedRanges = updatedSelectedRanges.filter(
          (range) => !dayjs(range.start).isSame(dayjs(range.end))
        );

        updatedSelectedRanges.push({
          start: minDate(dayjs(findSameStartEndRange.start), dayjs(date)).toDate(),
          end: maxDate(dayjs(findSameStartEndRange.start), dayjs(date)).toDate(), 
        });
      } else {
        updatedSelectedRanges.push({ start: date, end: date });
      }
    }

    updatedSelectedRanges.sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

    setSelectedRanges(updatedSelectedRanges); 
}

