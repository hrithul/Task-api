import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json({ token: generateToken(user._id) });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: "Invalid credentials" });

    res.json({ token: generateToken(user._id) });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
