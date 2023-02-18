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
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const mongo = db.getDb();
    const userWhoFollows = await mongo
      .collection("users")
      .findOne({ username: decoded.id });
    const userWhoFollowsUsername = userWhoFollows.username;
    const userId = !isNaN(parseInt(req.params.userId))
      ? parseInt(req.params.userId)
      : null;
    if (!userId) {
      return res.status(404).send({ error: "Invalid user ID" });
    }
    const userToFollow = await mongo
      .collection("users")
      .findOne({ _id: userId });
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
    let followers = await mongo.collection("followers").insertOne(newFollower);
    res.json(followers);
  } catch (error) {
    return res.status(500).json({ error: "HTTP internal server error" });
  }
});

router.delete("/followers/:id", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const mongo = db.getDb();
    const userWhoFollows = await mongo
      .collection("users")
      .findOne({ username: decoded.id });
    console.log(userWhoFollows.username);
    const userId = !isNaN(parseInt(req.params.id))
      ? parseInt(req.params.id)
      : null;
    if (!userId) {
      return res.status(404).send({ error: "Invalid user ID" });
    }
    let followers = await mongo
      .collection("followers")
      .deleteOne({ follows: userWhoFollows.username });
    res.json(followers);
  } catch (error) {
    return res.status(500).json({ error: "HTTP internal server error" });
  }
});

/* Additional API to check if the authenticated user follows the user by his ID */
router.get("/checkFollowing/:id", async (req, res) => {
  try {
    const mongo = db.getDb();
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const currentUser = await mongo
      .collection("users")
      .findOne({ username: decoded.id });
    if (!currentUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userToFollowId = !isNaN(parseInt(req.params.id))
      ? parseInt(req.params.id)
      : null;
    if (!userToFollowId) {
      return res.status(404).send({ error: "Invalid user ID" });
    }
    const userToFollow = await mongo
      .collection("users")
      .findOne({ _id: userToFollowId });
    const isFollowing = await mongo.collection("followers").findOne({
      follows: currentUser.username,
      isFollowed: userToFollow.username,
    });
    if (!isFollowing) {
      res.json({ following: false });
    } else {
      res.json({ following: true });
    }
  } catch (err) {
    res.json({ message: "HTTP internal server error" });
  }
});

module.exports = router;
