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
      .findOne({ username: decoded.id });
    const followed = await mongo
      .collection("followers")
      .find({ follows: user.username })
      .toArray();
    const followedMessages = await mongo
      .collection("messages")
      .aggregate([
        {
          $match: {
            author: { $in: followed.map((flw) => flw.isFollowed) },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "username",
            as: "authorInfo",
          },
        },
        {
          $project: {
            _id: 1,
            date: 1,
            text: 1,
            author: 1,
            authorId: "$authorInfo._id",
          },
        },
      ])
      .toArray();
    res.json(followedMessages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "HTTP internal server error" });
  }
});

module.exports = router;
