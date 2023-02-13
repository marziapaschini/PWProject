const { MongoClient } = require("mongodb");
const url = "mongodb://mongosrv";
const client = new MongoClient(url);

let _db;

module.exports = {
  connect: async () => {
    await client.connect();
    _db = client.db("MessaglyDB");
  },
  getDb: () => _db,
};
