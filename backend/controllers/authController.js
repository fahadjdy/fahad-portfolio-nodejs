const db = require("../models");
const UserModel = require('../models/UserModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // console.log("Registering user:", req);
  const {  email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    await UserModel.create({  email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
   const user = await UserModel.findOne(email );
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token, user: { id: user.id, email: user.email } });
};
