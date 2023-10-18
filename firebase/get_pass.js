import { db } from "./firebase_config.js";
import { setDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";
import dayjs from "dayjs";

export async function getAllPassesByDate() {
  const passMap = new Map();
  const docSnap = await getDocs(collection(db, "passes"))
  
  docSnap.forEach((doc) => {
    const pass = doc.data();

    if ("dateRange" in pass) {
      //conver from timestamp to date
      
      console.log(pass.dateRange)

      pass.dateRange.forEach((date) => {
        let start = date.start.toDate()
        const end = date.end.toDate()
        console.log('start', start)
        console.log('end', end)
        while (start <= end) {
          const data = {
            womenPass: pass.womenPass,
            menPass: pass.menPass,
          }
          passMap.set(start.toDateString(), data);

        start = dayjs(start).add(1, "day").toDate();
      }

      })

         }
  })
  console.log('test')
  console.log(passMap)
  return passMap
}


