const express = require("express");
const router = express.Router();
const db = require("./db.js");
const jwt = require("jsonwebtoken");

/* Simple get-all-messages API
router.get("/messages/", async (req, res) => {
  const mongo = db.getDb();
  let allMessages = await mongo.collection("messages").find({}).toArray();
  res.json(allMessages);
});*/

/* API to get all messages and the relative user ID for each message
   in order to make vue.js work in the single message visualization  */
router.get("/messages", async (req, res) => {
  const mongo = db.getDb();
  const allMessages = await mongo
    .collection("messages")
    .aggregate([
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
  res.json(allMessages);
});

router.get("/messages/:userId", async (req, res) => {
  const mongo = db.getDb();
  const id = !isNaN(parseInt(req.params.userId))
    ? parseInt(req.params.userId)
    : null;
  if (!id) {
    return res.status(404).send({ error: "Invalid user ID" });
  }
  const user = await mongo.collection("users").findOne({ _id: id });
  const userMessages = await mongo
    .collection("messages")
    .find({ author: user.username })
    .toArray();
  res.json(userMessages);
});

router.post("/messages/", async (req, res) => {
  try {
    const mongo = db.getDb();
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const userWhoPosts = await mongo
      .collection("users")
      .findOne({ username: decoded.id });
    if (!userWhoPosts) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const message = req.body.text;
    let currentDate = new Date();
    const last = await mongo
      .collection("messages")
      .findOne({}, { sort: { _id: -1 } });
    let lastId = last?._id !== undefined ? last._id : 0;
    lastId++;
    const newMessage = {
      _id: lastId,
      date: currentDate,
      text: message,
      author: userWhoPosts.username,
    };
    await mongo.collection("messages").insertOne(newMessage);
    res.json(newMessage);
  } catch (err) {
    return res.status(500).json({ error: "HTTP internal server error" });
  }
});

router.get("/messages/:userId/:idMsg", async (req, res) => {
  const mongo = db.getDb();
  const userId = !isNaN(parseInt(req.params.userId))
    ? parseInt(req.params.userId)
    : null;
  const msgId = !isNaN(parseInt(req.params.idMsg))
    ? parseInt(req.params.idMsg)
    : null;
  if (!userId || !msgId) {
    return res.status(404).send({ error: "Invalid user ID" });
  }
  const user = await mongo.collection("users").findOne({ _id: userId });
  let message = await mongo
    .collection("messages")
    .findOne({ _id: msgId, author: user.username });
  console.log(message);
  res.json(message);
});

module.exports = router;
