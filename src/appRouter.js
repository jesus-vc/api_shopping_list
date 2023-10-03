import express from "express";
import { addData, getAllData, patchData, deleteData } from "./helpers.js";

//PEER
// This assignment required me to use global variables, but I ended up using JSON file.
// Still, one question I have is whether the pattern below is acceptable where I created a third exportFakeDB.js file simply to export a global var.
// I don't like this option since I feel this creates unecesary code and files,
// and I sense that this is a mute point given I'll be using databases moving forward rather than global variables.
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

router.delete("/:name", (req, res) => {
  const result = deleteData("./database/itemsDB.json", req.params.name);

  if (result) {
    res.status(400).send(result);
  } else {
    res.send({ deleted: req.params.name });
  }
});

router.use("/add", express.json());

router.post("/add", (req, res) => {
  const result = addData("./database/itemsDB.json", req.body);
  const lastAddition = result[result.length - 1];
  res.send({ added: lastAddition });
});
