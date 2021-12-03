import * as express from "express";
import { dataBase, rtdb } from "./database";
import { json } from "body-parser";
import * as cors from "cors";
import { v4 as uuidv4 } from "uuid";

const port = 3000;
const usersCollection = dataBase.collection("users");

const app = express();
app.use(json());
//app.use(cors);

app.get("/", function (req, res) {
  res.send("Hola Pimpollos");
});

app.get("/users", function (req, res) {
  usersCollection.get().then((snap) => {
    const docs = snap.docs;
    for (const doc of docs) {
      res.json(doc.data());
    }
  });

  console.log(req.body);
});

app.get("/users/:id", function (req, res) {
  const userID = req.params.id;
  const userDoc = usersCollection.doc(userID);

  userDoc.get().then((snap) => {
    console.log(snap.data());
    const userData = snap.data();
    res.json(userData);
  });
});

app.post("/chatroom", function (req, res) {
  const newUserDoc = usersCollection.doc();
  newUserDoc.create(req.body).then(() => {
    console.log(newUserDoc.id);
    res.json("yes");
  });
});

app.patch("/users/:id", function (req, res) {
  const userID = req.params.id;
  const userDoc = usersCollection.doc(userID);
  const updateObject = req.body;
  updateObject.updatedAt = new Date();

  userDoc.update(updateObject).then((snap) => {
    console.log(snap);

    res.json({ message: "ok" });
  });
});

app.listen(port);
