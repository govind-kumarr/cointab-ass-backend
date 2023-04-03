import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.Model.js";

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
  if (!email || !password)
    return res.send({ message: "Please enter full credentials" });

  try {
    //* Does user exist
    const doesExist = await UserModel.exists({ email });
    if (doesExist == null) return res.send({ message: "No such user found" });
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
      return res.send({
        message: `Please try again after ${duration}hours`,
        success: false,
      });
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
      if (user.failedAttempts === 5) {
        let from = new Date();
        let to = new Date();
        to.setDate(to.getDate() + 1);
        user.blocked.status = true;
        user.blocked.from = from;
        user.blocked.to = to;
        res.send({ message: "Wrong Password!", success: false });
      } else {
        user.failedAttempts++;
        res.send({
          message: `Wrong Password! ${5 - user.failedAttempts} attempts left`,
          success: false,
        });
      }
    }
    await UserModel.findByIdAndUpdate(id, user);
  } catch (error) {
    console.log("Error Logging in\n", error);
    res.send({ message: "Something went wrong!", success: false });
  }
};
