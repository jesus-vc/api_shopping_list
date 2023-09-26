// import { global } from "../database/fakeDB.js";

// TODO try to do test without supertest.

import axios from "axios";
import "../database/fakeDB.js";

const reqInstance = axios.create({
  headers: {
    // Accept: "application/json",
  },
});

test("Should render an empty array", () => {
  const response = [];

  expect(response.length).toBe(0);
});

test("Should receive a response containing an array two objects", async () => {
  let response = await reqInstance.get("http://localhost:3011/items");

  //expect to equal data in current fakeDB.js
  // let data = [
  //   { name: "popsicle", price: 1.45 },
  //   { name: "cheerios", price: 3.4 },
  // ];

  let data = global.items;
  expect(response.data).toEqual(expect.arrayContaining(data));
});

test("Should accept POST request and return modified JSON data", async () => {
  let data = { name: "popsicle3", price: 1.45 };

  let response = await axios.post("http://localhost:3011/items", data);
  expect(response.data).toEqual(expect.objectContaining({ added: data }));
  //TODO clarify how global variables work
  //TODO change to json file?
  //TODO capture axios request data. read documentation.
});
