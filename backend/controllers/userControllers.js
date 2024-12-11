const mongoose = require("mongoose");
const usersModel = require("../models/userModel");

const getUser = async (req, res, next) => {
  let userEmail = req.body;
  try {
    const user = await usersModel.findOne(userEmail[0]);
    if (user) {
      res.status(200).json(user);
      console.log("User found:", user);
    } else {
      res.status(200).json({ email: "notFound" });
      console.log("No user found with this email.");
    }
  } catch (err) {
    console.error("Error fetching user:", err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const email = req.body;
    // await ordersModel.create({ email });
    await usersModel.insertMany(email)
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createUser,
  getUser,
};
