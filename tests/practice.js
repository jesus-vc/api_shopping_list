import { getAllData } from "../src/helpers.js";

// const reqInstance = axios.create({
//   headers: {
//     // Accept: "application/json",
//   },
// });
//   let response = await reqInstance.get("http://localhost:3011/items");

const result = getAllData("./database/itemsDB.json");

console.log(typeof result);
console.log(result[0].price);
//   expect(response.data).toEqual(expect.arrayContaining(result));
// });
