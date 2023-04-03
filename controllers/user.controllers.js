import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.Model.js";
import { add1Day } from "../utils/functions.js";

export const getUsers = async (req, res) => res.send(await UserModel.find());

export const makeSignup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("Please enter full credentials");
  try {
    await UserModel.insertMany([{ email, password }]);
    res.send("Signed Up Successfully!");
  } catch (error) {
    console.log("Error while signing up: \n", error);
    res.send("Something went wrong");
  }
};

export const makeLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("Please enter full credentials");

  try {
    //* Does user exist
    const doesExist = await UserModel.exists({ email });
    if (doesExist == null) return res.send("No such user found");
    const user = await UserModel.findOne({ email });
    const id = user._id;

    //* Check if user is blocked
    if (user.blocked.status) {
      let from = new Date(user.blocked.from);
      let to = new Date(user.blocked.to);
      from = from.getTime();
      to = to.getTime();

      let diff = to - from;
      let hours = 60 * 60 * 1000;
      let duration = Math.round(diff / hours);
      return res.send(`Please try again after ${duration}hours`);
    }

    //* Check if password matches or not
    if (password === user.password) {
      //* reset failed login attempts to 0
      user.failedAttempts = 0;
      user.blocked.status = false;
      user.blocked.from = "";
      user.blocked.to = "";

      const token = jwt.sign({ email, password }, "passed");
      res.send({
        message: "Login successful",
        token,
      });
    } else {
      if (user.failedAttempts === 5) {
        let from = new Date();
        let to = new Date();
        to.setDate(to.getDate() + 1);
        user.blocked.status = true;
        user.blocked.from = from;
        user.blocked.to = to;
      } else user.failedAttempts++;
      res.send("Wrong Password!");
    }
    await UserModel.findByIdAndUpdate(id, user);
  } catch (error) {
    console.log("Error Logging in\n", error);
    res.send("Something went wrong!");
  }
};
