import { initializeApp ,cert,getApps} from "firebase-admin/app";
import { getFirestore} from "firebase-admin/firestore";
if (!getApps()?. length) {
  initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY as string))
});
}

export const admin_db=getFirestore()