// TODO redo tests using supertest.

import axios from "axios";
import { getAllData } from "../src/helpers.js";
import { clearDB } from "./helpers.js";

const databasePath = "./database/itemsDB.json";

test("Should receive a response containing an array two objects", async () => {
  let response = await axios.get("http://localhost:3011/items");

  const result = getAllData(databasePath);
  expect(response.data).toEqual(expect.arrayContaining(result));
});

describe("Adding data", () => {
  afterEach(() => {
    //delete last element added by a test.
    clearDB(databasePath);
  });

  test("Should accept POST request and return modified JSON data", async () => {
    let newData = { name: "popsicle5", price: 1.43335 };
    let response = await axios.post(
      "http://localhost:3011/items/add",
      newData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.data).toEqual(expect.objectContaining({ added: newData }));
  });
});

test("Should receive a single item's name and price", async () => {
  const result = getAllData(databasePath);
  const randomItem = result[Math.floor(Math.random() * result.length)];
  let response = await axios.get(
    `http://localhost:3011/items/${randomItem.name}`
  );
  expect(response.data).toEqual(expect.objectContaining(randomItem));
});

describe("Updating data", () => {
  test("Should update a single item's name and/or price", async () => {
    let newData = {
      name: "cheerios",
      price: 3.35,
    };
    let response = await axios.patch(
      `http://localhost:3011/items/${newData.name}`,
      newData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.data).toEqual(
      expect.objectContaining({ updated: newData })
    );
  });
});
