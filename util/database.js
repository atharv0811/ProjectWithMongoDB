const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
let db;

const mongoConnect = (callback) => {
  mongoClient
    .connect(process.env.MONGOURL)
    .then((client) => {
      console.log("Connected");
      db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (db) {
    return db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
