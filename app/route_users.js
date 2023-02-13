const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/users/:id", async (req, res) => {
  const mongo = db.getDb();
  const id = !isNaN(parseInt(req.params.id))
    ? parseInt(req.params.id)
    : null;
  if (!id) {
    return res.status(404).send({ error: "Invalid user ID" });
  }
  const user = await mongo.collection("users").findOne({ _id: id });
  res.json(user);
});

module.exports = router;
