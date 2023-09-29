import fs from "fs";

export const getAllData = (file) => {
  try {
    const data = fs.readFileSync(file); //PEER Should i use readFile here instead?
    // return data;
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

//PEER
//I think reading and writing to the itemsDB.json file does not scale well, once the file grows to be large.
//So what are alternatives? Streams? DBs?

export const addData = (file, newData) => {
  try {
    // fs.appendFileSync(file, JSON.stringify(newData));
    // const data = fs.readFileSync("./database/itemsDB.json");
    const data = fs.readFileSync(file, "utf8");
    const jsonArray = JSON.parse(data);
    jsonArray.push(newData);

    const updatedJsonData = JSON.stringify(jsonArray, null, 2);

    fs.writeFileSync(file, updatedJsonData, "utf8");

    return getAllData(file);
  } catch (err) {
    console.error(err);
  }
};

export const patchData = (file, newData) => {
  try {
    const jsonData = getAllData(file);
    // find first matching item.
    const index = jsonData.findIndex((item) => item.name == newData.name);

    // modify original array
    if (index !== -1) {
      jsonData[index] = newData;
      const updatedJsonData = JSON.stringify(jsonData, null, 2);
      fs.writeFileSync(file, updatedJsonData, "utf8");
    } else {
      return "The item you chose is not in the current database.";
    }
  } catch (err) {
    throw new Error(err);
  }
};

// export const someData = () => {
//   try {
//     const data = fs.readFileSync("./database/itemsDB.json");
//     return JSON.parse(data);
//     // console.log(typeof JSON.parse(data));
//     // console.log(JSON.parse(data)[0].price);
//   } catch (err) {
//     console.error(err);
//   }
// };
