import { db } from "./firebase_config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { RangeProps } from "@/utils/toggleDateSelection"
import dayjs, {Dayjs} from "dayjs"

export interface PassDataProps {
  name: string,
  email: string,
  womenPass: number,
  menPass: number,
  phone: string,
}

export const mergeRanges = (range1: any, range2: RangeProps) => {
  const start1 = range1.start.toDate()
  const end1 = range1.end.toDate()
  const start2 = range2.start
  const end2 = range2.end

  const start = dayjs(start1).isBefore(dayjs(start2)) ? start1 : start2
  const end = dayjs(end1).isAfter(dayjs(end2)) ? end1 : end2
  return {start, end}
}


export async function addPasses(dateRange: RangeProps[], passData: PassDataProps) {
  const passRef = doc(db, "passes", passData.email)
  const passSnap = await getDoc(passRef)
  //merge overlapping data ranges, passDataRange is a list of objects with start: and end:
  const passDataRange = passSnap.data()?.dateRange
  let modifiedRange: RangeProps[] = []
  if (passDataRange) {
    let newRange = [...passDataRange]

    let p1 = 0
    let p2 = 0

    //make sure ranges are sorted

    newRange.sort((a: RangeProps, b: RangeProps) => {
      return dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1
    })

    dateRange.sort((a: RangeProps, b: RangeProps) => {
      return dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1
    })

    while (p1 < newRange.length && p2 < dateRange.length) {
      const range1 = newRange[p1]
      const range2 = dateRange[p2]
      const mergedRange = mergeRanges(range1, range2)
      if (mergedRange) {
        newRange[p1] = mergedRange
       p2++
      }
      else {
        p1++
      }
      //add the rest of the range of dateRange to newRange
      if (p2 === dateRange.length && p1 < newRange.length) {
        newRange.splice(p1, 0, ...dateRange.slice(p2))
      }
      modifiedRange = newRange
    }
  }

  else {
    console.log('passDataRange does not exist')
    modifiedRange = dateRange
  }

  try {
      await setDoc(passRef, {
        name: passData.name,
      email: passData.email,
      womenPass: passData.womenPass as number,
      menPass: passData.menPass as number,
      dateRange: [
        ...modifiedRange
      ],
      phone: passData.phone,
      timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
    })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
