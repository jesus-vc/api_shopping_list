import { getAllData } from "../src/helpers.js";
import fs from "fs";

export const clearDB = (databasePath) => {
  try {
    const result = getAllData(databasePath);

    //delete last element added by a test
    result.pop();

    const clearedData = JSON.stringify(result, null, 2);
    fs.writeFileSync(databasePath, clearedData, "utf8");
  } catch (err) {
    console.error(err);
  }
};
