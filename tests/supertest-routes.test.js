import request from "supertest";
import { app } from "../src/app.js";
import { getAllData } from "../src/helpers.js";

const databasePath = "./database/itemsDB.json";
const data = getAllData(databasePath);

describe("GET /items", function () {
  test("Get a list of all items", async function () {
    const response = await request(app).get("/items");
    expect(response.body).toEqual(data);
  });
});

describe("POST /items/add", function () {
  test("Creating a new item", async function () {
    const newData = { name: "watermellon3", price: 1.432 };
    const response = await request(app).post("/items/add").send(newData);
    expect(response.body).toEqual({ added: newData });
  });
});

describe("PATCH /items/:name", function () {
  test("Creating a new item", async function () {
    let newData = {
      name: "cake",
      price: 3.75,
    };
    const response = await request(app)
      .patch(`/items/${newData.name}`)
      .send(newData);
    expect(response.body).toEqual({ updated: newData });
    debugger;
  });
});
