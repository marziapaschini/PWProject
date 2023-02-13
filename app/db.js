const { MongoClient } = require("mongodb");
const url = "mongodb://mongosrv";
const client = new MongoClient(url);

let _db; // specie di campo privato

// esportiamo un oggetto con 2 metodi
module.exports = {
  connect: async () => {
    await client.connect();
    _db = client.db("MessaglyDB");
  },
  getDb: () => _db, // sarebbe {return _db}
};
