import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { corsOptions } from "./config/options.js";
import { refreshJWT } from "./controller/authController.js";
import { router as apiRoute } from "./routes/api.js";
import { router as authRoute } from "./routes/auth.js";
import { credentials } from "./middleware/credentials.js";
import cors from "cors";


const app = express();



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(credentials);
app.use(cors(corsOptions));


// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/refresh", refreshJWT);
app.use("/v1/rbac", apiRoute);



// Listen
app.listen(process.env.PORT, ()=>{
    console.log(`Launched RBAC JWT app, listening on Port: ${process.env.PORT}`)
})