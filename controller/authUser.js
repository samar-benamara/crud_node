import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "ISAMM_SECRET";

export const loginUser = async (req, res) => {
  try {
    //TODO find the user by email
    const user = await User.findOne({ email: req.body.email });

    //TODO if not found return error
    if (!user) {
      return res
        .status(401)
        .json({ model: newUser, message: "login or password incorrect" });
    }
    //TODO else compare password
    const valid = await bcrypt.compare(req.body.password, user.password);
    //TODO if not match return error
    if (!valid) {
      return res
        .status(401)
        .json({ model: newUser, message: "login or password incorrect" });
    }
    res.status(200).json({
      token: jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      }),
    });
    //TODO else create token and return it
  } catch (error) {
    res.status(400).json({ error: error.message, message: "error" });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const hashedPWD = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPWD,
    });
    await user.save();
    const { password, ...newUser } = user.toObject();
    res.status(200).json({ model: newUser, message: " Success " });
  } catch (error) {
    res.status(400).json({ error: error.message, message: "error" });
  }
};
