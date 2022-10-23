const { mongoClient, MongoClient } = require("mongodb");
const DB =
  "mongodb+srv://stanlymathai:OP3L9exw0fIXStmB@daytona-blog-dev.gcda1mf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db_connect;

module.exports = {
  connect: (cb) => {
    client.connect((err, res) => {
      if (err || !res) return cb(err);
      db_connect = res.db("daytona_blog");
      console.log("db connected");
      return cb();
    });
  },
  getDB: () => db_connect,
};
