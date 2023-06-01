import express, { Express } from "express";
import { json, urlencoded } from "express";
import taskRoutes from "./routes/taskRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

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

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  console.log(path.join(__dirname, "frontend", "dist"));
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  taskRoutes(app);
}
app.listen(port, () => {
  console.log("server started");
  taskRoutes(app);
});
