const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.post("/messages/", async (req, res) => {
  const mongo = db.getDb();
  const message = req.body;
  let currentDate = new Date();
  const last = await mongo
    .collection("messages")
    .findOne({}, { sort: { id: -1 } });
  let lastId = last?.id !== undefined ? last.id : 0;
  lastId++;
  await mongo.collection("messages").insertOne(message);
  res.json(message);
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

router.get("/messages/", async (req, res) => {
  const mongo = db.getDb();
  let allMessages = await mongo.collection("messages").find({}).toArray();
  res.json(allMessages);
});

module.exports = router;
