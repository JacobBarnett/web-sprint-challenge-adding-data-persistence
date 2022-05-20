module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  taskToBody,
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    project_completed: intToBoolean(project.project_completed),
  };

  return result;
}

function taskToBody(task) {
  return {
    ...task,
    task_completed: intToBoolean(task.task_completed),
  };
}
