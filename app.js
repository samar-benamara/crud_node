import express from "express";
const app = express();
app.use(express.json());
import mongoose, { model } from "mongoose";
import routerBook from "./routes/book.js";

mongoose
  .connect("mongodb://localhost:27017/bookDB")
  .then(function () {
    console.log("connected to database");
  })
  .catch(function () {
    console.log("not connected ");
  });

app.use("/api/books", routerBook);
export default app;
