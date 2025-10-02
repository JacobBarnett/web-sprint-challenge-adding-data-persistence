const db = require('../../data/dbConfig');

async function get() {
  const tasks = await db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      't.project_id',
      'p.project_name',
      'p.project_description'
    );

  // convert task_completed from 0/1 to false/true
  return tasks.map(task => ({
    ...task,
    task_completed: Boolean(task.task_completed),
  }));
}

async function insert(task) {
  const [id] = await db('tasks').insert(task);
  const newTask = await db('tasks')
    .where({ task_id: id })
    .first();

  // convert task_completed to boolean
  return {
    ...newTask,
    task_completed: Boolean(newTask.task_completed),
  };
}

module.exports = { get, insert };
