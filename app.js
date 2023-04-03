import { config } from "dotenv";
import express from "express";
import { makeConnection } from "./config/db.js";
import { UserRouter } from "./routes/user.routes.js";

config();
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use("/", (req, res) => res.status(200).send("App is running at", port));

app.use("/user", UserRouter);

const startApp = () =>
  app.listen(port, () => console.log("listening on port " + port));

makeConnection(startApp);
