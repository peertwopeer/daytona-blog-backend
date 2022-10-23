const express = require("express");
const blogRoutes = express.Router();

const db_connect = require("../config/db");
const objectId = require("mongodb").ObjectId;

blogRoutes.route("/blogs").get(async (req, res) => {
  let db = db_connect.getDB();
  db.collection("blogs")
    .find({})
    .toArray((error, result) => {
      if (error) {
        res.status(400).send("Error fetching blogs!");
      } else res.json(result);
    });
});
blogRoutes.route("/blog/:id").get(async (req, res) => {
  let db = db_connect.getDB();
  let findQuery = { _id: objectId(req.params.id) };
  db.collection("blogs").findOne(findQuery, (error, result) => {
    if (error) {
      res.status(400).send("Error finding blog!");
    } else res.json(result);
  });
});
blogRoutes.route("/blog/add").post(async (req, res) => {
  let db = db_connect.getDB();
  let payload = {
    tittle: req.body.tittle,
    description: req.body.description,
    createdAt: new Date(),
  };
  db.collection("blogs").insertOne(payload, (error, result) => {
    if (error) {
      res.status(400).send("Error adding blog!");
    } else res.json(result);
  });
});
blogRoutes.route("/update/:id").post(async (req, res) => {
  let db = db_connect.getDB();
  let findQuery = { _id: objectId(req.params.id) };
  let payload = {
    tittle: req.body.tittle,
    description: req.body.description,
    updatedAt: new Date(),
  };

  db.collection("blogs").updateOne(
    findQuery,
    { $set: payload },
    (error, result) => {
      if (error) {
        res.status(400).send("Error updating blog!");
      } else res.json(result);
    }
  );
});
blogRoutes.route("/delete-blog/:id").delete(async (req, res) => {
  let db = db_connect.getDB();
  let findQuery = { _id: objectId(req.params.id) };

  db.collection("blogs").deleteOne(findQuery, (error, result) => {
    if (error) {
      res.status(400).send("Error deleting blog!");
    } else res.json(result);
  });
});
module.exports = blogRoutes;
