const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/search", async (req, res) => {
  const mongo = db.getDb();
  let query = req.query.q;
  if (!query) {
    return res.status(400).send({
      error: "Bad Request",
      message: "The query is required",
    });
  }
  try {
    let users = await mongo
      .collection("users")
      .find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
          { surname: { $regex: query, $options: "i" } },
        ],
      })
      .toArray();
    return res.status(200).send({
      users: users,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
