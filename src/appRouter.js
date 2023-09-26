import express from "express";
import "../database/fakeDB.js";
//PEER Is the pattern below preferable where I created a third exportFakeDB.js file simply to export a global var?
// import { globalItems } from "../database/exportfakeDB.js";
// const globalItems = global.items;

export const router = express.Router();

router.get("/", (req, res) => {
  res.send(global.items);
});

router.post("/", (req, res) => {
  console.log("req1");
  console.log(req);
  console.log("req1.data");
  console.log(req.data);
  //   global.items.push(req.data);
  global.items.push({ 1: "testing" });
  res.send(global.items);
});
