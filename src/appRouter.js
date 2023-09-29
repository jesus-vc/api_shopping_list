import express from "express";
import { addData, getAllData, patchData } from "./helpers.js";

//PEER Is the pattern below preferable where I created a third exportFakeDB.js file simply to export a global var?
// import { globalItems } from "../database/exportfakeDB.js";
// const globalItems = global.items;

export const router = express.Router();

router.get("/", (req, res) => {
  const result = getAllData("./database/itemsDB.json");
  res.send(result);
});

router.use("/:name", express.json());

router.get("/:name", (req, res) => {
  const itemName = req.params.name;

  const result = getAllData("./database/itemsDB.json");

  // find first matching item.
  const itemData = result.find((element) => element.name == itemName);
  res.send(itemData);
});

router.patch("/:name", (req, res) => {
  const result = patchData("./database/itemsDB.json", req.body);

  if (result) {
    res.status(400).send(result);
  } else {
    res.send({ updated: req.body });
  }
});

router.use("/add", express.json());

router.post("/add", (req, res) => {
  const result = addData("./database/itemsDB.json", req.body);
  // console.log("req.body from 47");
  // console.log(typeof req.body);
  const lastAddition = result[result.length - 1];
  res.send({ added: lastAddition });
});
