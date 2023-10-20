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
      
      pass.dateRange.forEach((date) => {
        let start = date.start.toDate()
        const end = date.end.toDate()
        while (start <= end) {
          const data = {
            womenPass: pass.womenPass,
            menPass: pass.menPass,
          }
          passMap.set(start.toDateString(), passMap.get(start.toDateString()) ? {
            womenPass: parseInt(passMap.get(start.toDateString()).womenPass) + parseInt(data.womenPass),
            menPass: parseInt(passMap.get(start.toDateString()).menPass) + parseInt(data.menPass),
          } : data);

        start = dayjs(start).add(1, "day").toDate();
      }

      })

         }
  })

  return passMap
}

export async function getPassesByEmail(email) {
  const docRef = doc(db, "passes", email);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  const passMap = new Map();
  if (docSnap.exists()) {
    docData.dateRange.forEach((date) => {
      let start = date.start.toDate()
      const end = date.end.toDate()
      while (start <= end) {
        const data = {
          womenPass: parseInt(docData.womenPass),
          menPass: docData.menPass,
        }

        passMap.set(start.toDateString(), data);
        start = dayjs(start).add(1, "day").toDate();
      }
    })
  }

  return passMap
}
