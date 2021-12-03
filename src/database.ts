import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const dataBase = admin.firestore();
const rtdb = admin.database();

export { dataBase, rtdb };
