const db = require('../../data/dbConfig');

async function get() {
  return db('resources'); // Make sure this returns an array
}

async function insert(resource) {
  const [id] = await db('resources').insert(resource); // returns inserted id
  return db('resources').where({ resource_id: id }).first(); // return the new resource
}

module.exports = { get, insert };
