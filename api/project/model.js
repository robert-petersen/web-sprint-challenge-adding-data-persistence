// build your `Project` model here
const knex = require('knex');
const config = require('../../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db("projects").select("project_id", "project_name", "project_description", "project_completed").orderBy("project_id");
}

function findById(id) {
  return db("projects").where("project_id", id ).first();
}

async function add(project) {
  const [id] = await db("projects").insert(project, "project_id");
  return findById(id);
}