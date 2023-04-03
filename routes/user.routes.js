import { Router } from "express";
import {
  getUsers,
  makeLogin,
  makeSignup,
} from "../controllers/user.controllers.js";

export const UserRouter = Router();

UserRouter.get("/", getUsers);

UserRouter.post("/signup", makeSignup);

UserRouter.post("/login", makeLogin);
