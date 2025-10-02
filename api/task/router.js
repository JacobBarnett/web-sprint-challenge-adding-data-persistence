const express = require('express');
const router = express.Router();
const Task = require('./model.js');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.get();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { task_description, project_id } = req.body;
    if (!task_description || !project_id) {
      return res.status(400).json({ message: 'task_description and project_id required' });
    }
    const task = await Task.insert(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

module.exports = router;
