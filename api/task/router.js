// build your `/api/tasks` router here
const { Router } = require("express");
const { list, insert } = require("./model");
const router = new Router();
const { get } = require("../project/model");

router.get("/", async (req, res) => {
  const tasks = await list();
  res.send(tasks);
});

router.post("/", async (req, res) => {
  if (!req.body.task_description || !req.body.project_id) {
    res.sendStatus(400);
    return;
  }
  const project = await get(req.body.project_id);
  if (!project) {
    res.sendStatus(400);
    return;
  }

  const task = await insert(req.body);
  res.send(task);
});

module.exports = router;
