import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase_config.js";
import { PassDataProps, mergeRanges } from "./add_pass";
import dayjs from "dayjs";
import { RangeProps } from "@/utils/toggleDateSelection"


export async function requestPasses(dateRange: string[], passData: PassDataProps) {
  const passRef = doc(db, "requests", passData.email)
  const passSnap = await getDoc(passRef)
  const passDataRange = passSnap.data()?.dateRange

  const modDate = [
    {
      start: dayjs(dateRange[0]).toDate(),
      end: dayjs(dateRange[dateRange.length - 1]).toDate()
    }
  ]

  let modifiedRange: RangeProps[] = []
  if (passDataRange) {
    let newRange = [...passDataRange]

    let p1 = 0
    let p2 = 0

    //make sure ranges are sorted

    newRange.sort((a: RangeProps, b: RangeProps) => {
      return dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1
    })

    while (p1 < newRange.length && p2 < modDate.length) {
      const range1 = newRange[p1]
      const range2 = modDate[p2]
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
    modifiedRange = modDate
  }

  try {
    await setDoc(passRef, {
      email: passData.email,
      dateRange: modifiedRange,
      name: passData.name,
      phone: passData.phone,
      status: 'pending',
      menPass: passData.menPass as number,
      womenPass: passData.womenPass as number,
    })
    console.log('pass added')
  }
  catch (e) {
    console.log(e)
  }

}


