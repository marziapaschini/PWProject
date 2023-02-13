const express = require("express");
const router = express.Router();
const db = require("./db.js");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const mongo = db.getDb();
    const userData = req.body;
    const username = req.body.username;
    const user = await mongo
      .collection("users")
      .findOne({ username: username });
    console.log(userData);
    if (user) {
      res.status(409).json({ message: "User Already Exists. Please Login" });
    } else if (user.username === "" || user.password === "") {
      res.status(401)({ message: "Missing credentials" });
    } else {
      const last = await mongo
        .collection("users")
        .findOne({}, { sort: { _id: -1 } });
      let lastId = last?._id === undefined ? 0 : last._id;
      lastId++;
      console.log(lastId);
      userData._id = lastId;
      await mongo.collection("users").insertOne(userData);
      res.json({ message: "New user added." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log(req.body);
    const mongo = db.getDb();
    const username = req.body.username;
    const password = req.body.password;
    const user = await mongo
      .collection("users")
      .findOne({ username: username });
    console.log(user);
    if (!user) {
      res.status(401).json({ message: "No such username was found." });
    } else if (user.username !== username || user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ id: user.username }, "secret_key", {
        expiresIn: 86400,
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.json({ message: "Authenticated" });
    }
  } catch (err) {
    res.status(500).json({ error: "HTTP internal server error" });
  }
});

module.exports = router;
