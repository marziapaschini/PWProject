const express = require("express");
const session = require("express-session");
const db = require("./db.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const auth = require("./route_auth.js");
const feed = require("./route_feed.js");
const followers = require("./route_followers.js");
const like = require("./route_like.js");
const messages = require("./route_messages.js");
const search = require("./route_search.js");
const users = require("./route_users.js");
const whoami = require("./route_whoami.js");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/social", feed);
app.use("/api/social", followers);
app.use("/api/social", like);
app.use("/api/social", messages);
app.use("/api/social", search);
app.use("/api/social", users);
app.use("/api/social", whoami);

app.listen(3000, async () => {
  console.log("Server listening on 3000");
  await db.connect();
  console.log("Connected to MongoDB");
});
