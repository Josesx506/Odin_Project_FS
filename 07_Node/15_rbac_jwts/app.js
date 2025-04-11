import express from "express";
import "dotenv/config";
import { router as authRoute } from "./routes/auth.js";
import { router as apiRoute } from "./routes/api.js";


const app = express();



// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/v1/auth", authRoute)
app.use("/v1/rbac", apiRoute);



// Listen
app.listen(process.env.PORT, ()=>{
    console.log(`Launched RBAC JWT app, listening on Port: ${process.env.PORT}`)
})