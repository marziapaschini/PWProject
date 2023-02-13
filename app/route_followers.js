const express = require("express");
const router = express.Router();
const db = require("./db.js");
const jwt = require("jsonwebtoken");

router.get("/followers/:id", async (req, res) => {
  const mongo = db.getDb();
  const id = !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null;
  if (!id) {
    return res.status(404).send({ error: "Invalid user ID" });
  }
  const user = await mongo.collection("users").findOne({ _id: id });
  const userFollowers = await mongo
    .collection("followers")
    .find({ isFollowed: user.username })
    .toArray();
  res.json(userFollowers);
});

router.post("/followers/:userId", async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, "secret_key");
  const mongo = db.getDb();
  const userWhoFollows = await mongo
    .collection("users")
    .findOne({ "_id.username": decoded.id.username });
  const userWhoFollowsUsername = userWhoFollows.username;
  const userId = !isNaN(parseInt(req.params.userId))
    ? parseInt(req.params.userId)
    : null;
  if (!userId) {
    return res.status(404).send({ error: "Invalid user ID" });
  }
  const userToFollow = await mongo.collection("users").findOne({ _id: userId });
  if (!userToFollow) {
    return res.status(404).send({ error: "Non-existing user" });
  }
  const userToFollowUsername = userToFollow.username;
  const last = await mongo
    .collection("followers")
    .findOne({}, { sort: { _id: -1 } });
  let lastId = last?._id !== undefined ? last._id : 0;
  lastId++;
  const newFollower = {
    _id: lastId,
    follows: userWhoFollowsUsername,
    isFollowed: userToFollowUsername,
  };
  await mongo.collection("followers").insertOne(newFollower);
  console.log(newFollower);
  res.json(newFollower);
});
/*
router.delete("/followers/:id", async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, "secret_key");
  const mongo = db.getDb();
  const userWhoFollows = await mongo
    .collection("users")
    .findOne({ "_id.username": decoded.id.username });
  const userWhoFollowsUsername = userWhoFollows.username;
  const userId = !isNaN(parseInt(req.params.userId))
    ? parseInt(req.params.userId)
    : null;
  if (!userId) {
    return res.status(404).send({ error: "Invalid user ID" });
  }
  const userToUnfollow = await mongo
    .collection("users")
    .findOne({ _id: userId });
  if (!userToUnfollow) {
    return res.status(404).send({ error: "Non-existing user" });
  }
  const userToUnfollowUsername = userToUnfollow.username;
  await mongo
    .collection("followers")
    .deleteOne({ username: userToUnfollowUsername });
  res.json(newFollower);
});
*/
module.exports = router;
