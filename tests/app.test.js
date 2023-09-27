// TODO redo tests using supertest.

import axios from "axios";
import { getAllData } from "../src/helpers.js";

const reqInstance = axios.create({
  headers: {
    // Accept: "application/json",
  },
});

test("Should receive a response containing an array two objects", async () => {
  let response = await reqInstance.get("http://localhost:3011/items");

  const result = getAllData("./database/itemsDB.json");
  expect(response.data).toEqual(expect.arrayContaining(result));
});

test("Should accept POST request and return modified JSON data", async () => {
  let newData = { name: "popsicle3", price: 1.43335 };

  let response = await axios.post("http://localhost:3011/items/add", newData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.data).toEqual(expect.objectContaining({ added: newData }));
});
