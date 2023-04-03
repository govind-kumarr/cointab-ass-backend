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
    console.log(user);

    //* Check if user is blocked
    if (user.blocked.status) return res.send("Please try again after 24hours");

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
      let from = new Date();
      let to = add1Day(from);
      console.log(from, "\n", to);
      res.send("Login failed");
      if (user.failedAttempts === 5) {
      }
    }
  } catch (error) {}
};
