const express = require("express");
const router = express.Router();
const db = require("./db.js");
const jwt = require("jsonwebtoken");
const { message } = require("statuses");

router.post("/like/:idMessage", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const mongo = db.getDb();
    const idMsg = !isNaN(parseInt(req.params.idMessage))
      ? parseInt(req.params.idMessage)
      : null;
    if (!idMsg) {
      return res.status(404).send({ error: "Invalid message ID" });
    }
    const userWhoLikes = await mongo
      .collection("users")
      .findOne({ username: decoded.id });
    const existingLike = await mongo
      .collection("like")
      .findOne({ username_user: userWhoLikes.username, id_message: idMsg });
    if (existingLike) {
      // User has already liked this message
      return res
        .status(400)
        .send({ error: "User has already liked this message" });
    }
    const like = await mongo
      .collection("like")
      .findOne({}, { sort: { _id: -1 } });
    const last = await mongo
      .collection("like")
      .findOne({}, { sort: { _id: -1 } });
    let lastLikeId = last?._id !== undefined ? last._id : 0;
    lastLikeId++;
    const newLike = {
      _id: lastLikeId,
      username_user: userWhoLikes.username,
      id_message: idMsg,
    };
    await mongo.collection("like").insertOne(newLike);
    console.log(newLike);
    res.json(newLike);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "HTTP internal server error" });
  }
});

router.delete("/like/:idMessage", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const mongo = db.getDb();
    const idMsg = !isNaN(parseInt(req.params.idMessage))
      ? parseInt(req.params.idMessage)
      : null;
    if (!idMsg) {
      return res.status(404).send({ error: "Invalid message ID" });
    }
    const userWhoDislikes = await mongo
      .collection("users")
      .findOne({ username: decoded.id });
    const likeToRemove = await mongo
      .collection("like")
      .findOne({ username_user: userWhoDislikes.username, id_message: idMsg });
    if (!likeToRemove) {
      return res.status(404).send({ error: "Non-existing like" });
    }
    let newLikes = await mongo.collection("like").deleteOne(likeToRemove);
    res.json(newLikes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "HTTP internal server error" });
  }
});

/* Additional API to get the message's number of likes */
router.get("/like/:idMessage", async (req, res) => {
  const mongo = db.getDb();
  const idMsg = !isNaN(parseInt(req.params.idMessage))
    ? parseInt(req.params.idMessage)
    : null;
  if (!idMsg) {
    return res.status(404).send({ error: "Invalid message ID" });
  }
  const countLikes = async (idMsg) => {
    const likes = await mongo
      .collection("like")
      .countDocuments({ id_message: idMsg });
    return likes;
  };
  const result = await countLikes(idMsg);
  res.json({ count: result });
});

/* Additional API to check if the authenticated user has alread liked a message */
router.get("/didUserLike/:idMessage", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, "secret_key");
    const mongo = db.getDb();
    const idMsg = !isNaN(parseInt(req.params.idMessage))
      ? parseInt(req.params.idMessage)
      : null;
    if (!idMsg) {
      return res.status(404).send({ error: "Invalid message ID" });
    }
    const user = await mongo
      .collection("users")
      .findOne({ username: decoded.id });
    const userLike = await mongo
      .collection("like")
      .findOne({ username_user: user.username, id_message: idMsg });
    if (!userLike) {
      res.json({ hasLiked: false });
    } else {
      res.json({ hasLiked: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "HTTP internal server error" });
  }
});

module.exports = router;
