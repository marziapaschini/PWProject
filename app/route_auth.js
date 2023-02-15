const express = require("express");
const session = require("express-session");
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
      res.status(409).json({ message: "Already existing user, please Login" });
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
      res.json({ message: "New user added" });
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
      res.status(401).json({ message: "Username not found" });
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
/*
router.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Not authenticated" });
    } else {
      const decoded = jwt.verify(token, "secret_key");
      res.json({ message: "Authenticated", username: decoded.id });
    }
  } catch (err) {
    res.status(401).json({ message: "Not authenticated" });
  }
});
*/

router.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ isAuthenticated: false });
    } else {
      const decoded = jwt.verify(token, "secret_key");
      res.json({ isAuthenticated: true, username: decoded.id });
    }
  } catch (err) {
    res.status(401).json({ isAuthenticated: false });
  }
});

router.post("/signout", (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Not authenticated" });
    } else {
      const decoded = jwt.verify(token, "secret_key");
      const userId = decoded.id;
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Failed log out" });
        } else {
          res.clearCookie("jwt");
          res.status(200).json({ message: "Successfully logged out" });
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to log out" });
  }
});

module.exports = router;
