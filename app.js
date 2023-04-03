import { config } from "dotenv";
import express from "express";
import { makeConnection } from "./config/db.js";
import { UserRouter } from "./routes/user.routes.js";

config();
const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("App is running at");
});

app.use("/user", UserRouter);

const startApp = () =>
  app.listen(process.env.PORT, () =>
    console.log("listening on port " + process.env.PORT)
  );

makeConnection(startApp);
