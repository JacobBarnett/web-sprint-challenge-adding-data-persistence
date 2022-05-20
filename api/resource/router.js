// build your `/api/resources` router here
const { Router } = require("express");
const { list, insert } = require("./model");
const router = new Router();

router.get("/", async (req, res) => {
  const resources = await list();
  res.send(resources);
});

router.post("/", async (req, res) => {
  if (!req.body.resource_name) {
    res.sendStatus(400);
    return;
  }
  try {
    const resource = await insert(req.body);
    res.send(resource);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
