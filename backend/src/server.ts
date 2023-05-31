import express, { Express } from "express";
import { json, urlencoded } from "express";
import taskRoutes from "./routes/taskRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

const dbString: string = process.env.URI!;

mongoose
  .connect(dbString)
  .then((con: typeof mongoose) => {
    // console.log(con.connections);
    console.log("DB connection completed");
  })
  .catch((e: Error) => console.log(e));

const port: number = parseInt(process.env.PORT || "5000", 10);

app.listen(port, () => {
  console.log("server started");
  taskRoutes(app);
});
