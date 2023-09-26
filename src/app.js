import express from "express";
import { router } from "./appRouter.js";

const app = express();

app.use("/items", router);

app.listen(3011);
