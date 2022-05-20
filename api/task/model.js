// build your `Task` model here
const db = require("../../data/dbConfig.js");
const { taskToBody } = require("../../data/mappers/mappers");

module.exports = {
  list,
  insert,
};

async function list(id) {
  const tasks = await db("tasks").join(
    "projects",
    "projects.project_id",
    "=",
    "tasks.project_id"
  );
  return tasks.map((p) => taskToBody(p));
}

function insert(task) {
  return db("tasks")
    .insert(task)
    .then(([id]) => get(id));
}

async function get(id) {
  const task = await db("tasks")
    .where("tasks.task_id", id)
    .join("projects", "projects.project_id", "=", "tasks.project_id")
    .first();
  return taskToBody(task);
}
