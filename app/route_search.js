const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/search", async (req, res) => {
  try {
    const mongo = db.getDb();
    const query = req.query.q;
    console.log(query);
    const regexQuery = new RegExp(query, "i");
    const users = await mongo
      .collection("users")
      .find(
        {
          $or: [
            { name: regexQuery },
            { surname: regexQuery },
            { username: regexQuery },
          ],
        },
        {
          projection: {
            _id: 1,
            name: 1,
            surname: 1,
            username: 1,
          },
        }
      )
      .toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "HTTP internal server error" });
  }
});

module.exports = router;
