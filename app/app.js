const express = require("express");
const db = require("./db.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const feed = require("./route_feed.js");
const followers = require("./route_followers.js");
const like = require("./route_like.js");
const messages = require("./route_messages.js");
const users = require("./route_users.js");
const auth = require("./route_auth.js");
const whoami = require("./route_whoami.js");
const search = require("./route_search.js");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/social", users);
app.use("/api/auth", auth);
app.use("/api/social", feed);
app.use("/api/social", messages);
app.use("/api/social", whoami);
app.use("/api/social", followers);
app.use("/api/social", search);
app.use("/api/social", like);

app.listen(3000, async () => {
  console.log("Server listening on 3000");
  await db.connect();
  console.log("Connected to MongoDB");
});
