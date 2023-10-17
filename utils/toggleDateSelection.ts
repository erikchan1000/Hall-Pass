import { Dayjs } from 'dayjs';

export interface RangeProps {
  start: Dayjs,
  end: Dayjs
}
export const isBetween = (date: Dayjs, start: Dayjs, end: Dayjs) => {
  return (date.isAfter(start) && date.isBefore(end)) || date.isSame(start) || date.isSame(end);
}

export const toggleDateSelection = (date: Dayjs, selectedRanges: RangeProps[], setSelectedRanges: (ranges: RangeProps[]) => void) => {
      let updatedSelectedRanges = [...selectedRanges];
    if (updatedSelectedRanges.length === 0) {
      updatedSelectedRanges.push({ start: date, end: date });
      setSelectedRanges(updatedSelectedRanges);
      return;
    }

    const rangeToDeleteIndex = updatedSelectedRanges.findIndex((range) =>
      isBetween(date, range.start, range.end)
    );

    if ( rangeToDeleteIndex !== -1) {
      updatedSelectedRanges.splice(rangeToDeleteIndex, 1);
    } else {
      const findSameStartEndRange = updatedSelectedRanges.find((range) =>
        range.start.isSame(range.end) 
      );
      if (findSameStartEndRange) {
        updatedSelectedRanges = updatedSelectedRanges.filter(
          (range) => !range.start.isSame(range.end)
        );

        updatedSelectedRanges.push({
          start: findSameStartEndRange.start,
          end: date
        });
      } else {
        updatedSelectedRanges.push({ start: date, end: date });
      }
    }

    updatedSelectedRanges.sort((a, b) => a.start.diff(b.start));

    setSelectedRanges(updatedSelectedRanges); 

}
