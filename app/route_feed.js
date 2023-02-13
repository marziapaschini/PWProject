const express = require("express");
const router = express.Router();
const db = require("./db.js");
const jwt = require("jsonwebtoken");

router.get("/feed", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const mongo = db.getDb();
    const user = await mongo
      .collection("users")
      .findOne({ "_id.username": decoded.id.username });
    const followed = await mongo
      .collection("followers")
      .find({ follows: user.username })
      .toArray();
    let followedMessages = [];
    for (i of followed) {
      let followedMessage = await mongo
        .collection("messages")
        .find({ author: i.isFollowed })
        .toArray();
      followedMessages = followedMessages.concat(followedMessage);
    }
    res.json(followedMessages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "HTTP internal server error" });
  }
});

module.exports = router;
