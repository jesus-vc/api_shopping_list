import express from "express";
import { router } from "./appRouter.js";

export const app = express();

app.use("/items", router);
