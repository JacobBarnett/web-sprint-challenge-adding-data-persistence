// build your `Project` model here
// api/project/model.js
const db = require('../../data/dbConfig');

// helper to convert integer to boolean
function mapProjectRow(row) {
  if (!row) return row;
  return {
    ...row,
    project_completed: !!row.project_completed, // ensure boolean
  };
}

// get all projects
async function get() {
  const rows = await db('projects');
  return rows.map(mapProjectRow);
}

// get project by id
async function getById(id) {
  const row = await db('projects').where({ project_id: id }).first();
  return mapProjectRow(row);
}

// insert a new project
async function insert(project) {
  const payload = {
    project_name: project.project_name,
    project_description: project.project_description || null,
    project_completed: project.project_completed ? 1 : 0, // default false
  };

  const [id] = await db('projects').insert(payload);
  return getById(id);
}

module.exports = { get, getById, insert };
