import dayjs, { Dayjs } from 'dayjs';

export interface RangeProps {
  start: Date,
  end: Date
}
export const isBetween = (date: Dayjs, start: Dayjs, end: Dayjs) => {
  return (date.isAfter(start) && date.isBefore(end)) || date.isSame(start) || date.isSame(end);
}

export const toggleDateSelection = (date: Date, selectedRanges: RangeProps[], setSelectedRanges: (ranges: RangeProps[]) => void) => {
      let updatedSelectedRanges = [...selectedRanges];
    if (updatedSelectedRanges.length === 0) {
      updatedSelectedRanges.push({ start: date, end: date });
      setSelectedRanges(updatedSelectedRanges);
      return;
    }

    const rangeToDeleteIndex = updatedSelectedRanges.findIndex((range) =>
      isBetween(dayjs(date), dayjs(range.start), dayjs(range.end))
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
          start: findSameStartEndRange.start,
          end: date
        });
      } else {
        updatedSelectedRanges.push({ start: date, end: date });
      }
    }

    updatedSelectedRanges.sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

    setSelectedRanges(updatedSelectedRanges); 
}

