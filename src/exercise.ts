import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

//Inicializamos la base de datos
const dataBase = admin.firestore();

//Hacemos una reference de la collection users y la alojamos en un variable
const usersCollection = dataBase.collection("users");

//Nos traemos un snap, usando el metodo get(). Y lo mostramos por consola
usersCollection.get().then((snap) => {
  let docs = snap.docs;
  for (const doc of docs) {
    console.log(doc.data());
  }
});

//************* traemos un doc en particular y mostramos el snap
const ottoDoc = usersCollection.doc("0icMQXG0EH0NBVFYaqNg");
ottoDoc.get().then((snap) => {
  console.log(snap.data());
});

ottoDoc
  .update({
    apellido: "Murillo",
  })
  .then((snap) => {
    console.log(snap);
  });

// Creamos en nuestra base de datos una collectio llamada test, con un doc llamado nicole
// dataBase
//   .doc("test/nicole")
//   .set({
//     prueba: false,
//   })
//   .then((res) => console.log(res));
