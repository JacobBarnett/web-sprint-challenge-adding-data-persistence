// build your `/api/projects` router here
const { Router } = require("express");
const { list, insert } = require("./model");
const router = new Router();

router.get("/", async (req, res) => {
  const projects = await list();
  res.send(projects);
});

router.post("/", async (req, res) => {
  if (!req.body.project_name) {
    res.sendStatus(400);
    return;
  }

  const project = await insert(req.body);
  res.send(project);
});

module.exports = router;
