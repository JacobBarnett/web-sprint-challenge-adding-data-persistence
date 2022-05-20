// build your `Resource` model here
const db = require("../../data/dbConfig.js");

module.exports = {
  list,
  insert,
};

function list() {
  return db("resources");
}

function insert(resources) {
  return db("resources")
    .insert(resources)
    .then(([id]) => get(id));
}

function get(id) {
  return db("resources").where("resources.resource_id", id).first();
}
