const express = require("express");

const router = express.Router();
const { getUser, createUser,getSingleUser } = require("../controllers/userControllers");

router.get("/", getUser);
router.get("/:email", getSingleUser);
router.post("/", createUser);

module.exports = router;
