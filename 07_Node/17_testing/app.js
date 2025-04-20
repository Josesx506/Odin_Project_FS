import express from "express";
import { router as indexRouter } from "./routes/index.js";


const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(3000, () => (
    console.log("running testing server on port 3000")
))