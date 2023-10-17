import { db } from "./firebase_config.js";
import { setDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";


export async function addPass(pass) {
  await setDoc(doc(db, "passes", pass.email), pass)
}

export async function getAllPassesByDate() {
  const passMap = new Map();
  const docSnap = await getDocs(collection(db, "passes"))

  docSnap.forEach((doc) => {
    passMap.set(doc.data().date, doc.data().passes);
  });

  return passMap;
}


