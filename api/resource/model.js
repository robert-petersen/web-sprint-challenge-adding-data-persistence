// build your `Resource` model here
const knex = require('knex');
const config = require('../../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db("resources").select("resource_id", "resource_name", "resource_description").orderBy("resource_id");
}

function findById(id) {
  return db("resources").where("resource_id", id ).first();
}

async function add(resource) {
  const [id] = await db("resources").insert(resource, "resource_id");
  return findById(id);
}