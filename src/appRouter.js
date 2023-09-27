import express from "express";
import { updateData, getAllData } from "./helpers.js";

//PEER Is the pattern below preferable where I created a third exportFakeDB.js file simply to export a global var?
// import { globalItems } from "../database/exportfakeDB.js";
// const globalItems = global.items;

export const router = express.Router();

router.get("/", (req, res) => {
  const result = getAllData("./database/itemsDB.json");
  res.send(result);
});

router.use("/add", express.json());

router.post("/add", (req, res) => {
  const result = updateData("./database/itemsDB.json", req.body);
  const lastAddition = result[result.length - 1];
  res.send({ added: lastAddition });
});

//TODO add another method where I use streams.
// router.use("/addStream", express.json());

// router.post("/add", (req, res) => {
//   const result = updateData("./database/itemsDB.json", req.body);
//   // console.log(req.body);
//   res.send(result);
// });
