// build your `Task` model here
const knex = require('knex');
const config = require('../../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db("tasks").select("task_id", "task_name", "task_description", "task_completed", "project_id").orderBy("resource_id");
}

function findById(id) {
  return db("tasks").where("task_id", id ).first();
}

async function add(resource) {
  const [id] = await db("tasks").insert(resource, "task_id");
  return findById(id);
}