const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/users/:id", async (req, res) => {
  const mongo = db.getDb();
  const id = !isNaN(parseInt(req.params.id)) ? parseInt(req.params.id) : null;
  if (!id) {
    return res.status(404).send({ error: "Invalid user ID" });
  }
  const user = await mongo.collection("users").findOne({ _id: id });
  res.json(user);
});

/* Additional API to get user data from his username */
router.get("/users/", async (req, res) => {
  try {
    const mongo = db.getDb();
    const queryUsername = req.query.q;
    console.log(queryUsername);
    const users = await mongo
      .collection("users")
      .find({
        username: queryUsername,
      })
      .toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "HTTP internal server error" });
  }
});

module.exports = router;
