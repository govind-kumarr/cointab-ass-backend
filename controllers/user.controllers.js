import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.Model.js";
import { compareDates } from "../utils/functions.js";

export const getUsers = async (req, res) => res.send(await UserModel.find());

export const makeSignup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.send({ message: "Please enter full credentials" });
  try {
    const user = await UserModel.exists({ email });

    if (user != null)
      return res.send({
        message: "User already exists Please Login",
        email,
        success: true,
      });

    await UserModel.insertMany([{ email, password }]);

    res.send({ message: "Signed Up Successfully!", success: true });
  } catch (error) {
    console.log("Error while signing up: \n", error);
    res.send({ message: "Something went wrong", success: false });
  }
};

export const makeLogin = async (req, res) => {
  const { email, password } = req.body;

  //* if anything is missing then terminate the request
  if (!email || !password)
    return res.send({ message: "Please enter full credentials" });

  try {
    //* Does user exist
    const doesExist = await UserModel.exists({ email });
    if (doesExist == null) return res.send({ message: "No such user found" });
    const user = await UserModel.findOne({ email });
    const id = user._id;

    //* Check if user is blocked
    let now = new Date();
    let to = new Date(user.blocked.to);
    now = now.getTime();
    to = to.getTime();

    if (user.blocked.status && !compareDates(now, to)) {
      //* blocked status is true and blocked duration is not over
      let diff = to - now;
      let hours = 60 * 60 * 1000;
      let duration = Math.round(diff / hours);
      return res.send({
        message: `Please try again after ${duration}hours`,
        success: false,
      });
    } else if (compareDates(now, to)) {
      //* else if blocked duration is over then reset
      user.blocked.status = false;
      user.blocked.from = "";
      user.blocked.to = "";
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
        success: true,
      });
    } else {
      user.failedAttempts++;
      res.send({
        message: `Wrong Password! ${5 - user.failedAttempts} attempts left`,
        success: false,
      });
      if (user.failedAttempts === 5) {
        let from = new Date();
        let to = new Date();
        to.setDate(to.getDate() + 1);
        user.blocked.status = true;
        user.blocked.from = from;
        user.blocked.to = to;
      }
    }
    await UserModel.findByIdAndUpdate(id, user);
  } catch (error) {
    console.log("Error Logging in\n", error);
    res.send({ message: "Something went wrong!", success: false });
  }
};
