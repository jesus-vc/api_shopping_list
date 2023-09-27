import fs from "fs";

export const getAllData = (file) => {
  try {
    const data = fs.readFileSync(file); //PEER Should i use readFile here instead?
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};
