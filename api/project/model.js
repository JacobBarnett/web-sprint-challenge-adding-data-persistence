// build your `Project` model here
const db = require("../../data/dbConfig.js");
const { projectToBody } = require("../../data/mappers/mappers");
module.exports = {
  list,
  insert,
  get,
};

async function list(id) {
  const projects = await db("projects");
  return projects.map((p) => projectToBody(p));
}

function insert(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => get(id));
}

async function get(id) {
  const project = await db("projects").where("projects.project_id", id).first();
  if (!project) {
    return;
  }
  return projectToBody(project);
}
