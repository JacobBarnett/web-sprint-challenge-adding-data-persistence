// api/project/router.js
const express = require('express');
const Project = require('./model');

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.get(); // already mapped
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get projects' });
  }
});


// POST a new project
router.post('/', async (req, res) => {
  try {
    const { project_name, project_description, project_completed } = req.body;

    if (!project_name) {
      return res.status(400).json({ message: 'Missing required field: project_name' });
    }

    const created = await Project.insert({
      project_name,
      project_description,
      project_completed: project_completed ? 1 : 0, // store as integer
    });

    // return project_completed as boolean
    res.status(201).json({
      ...created,
      project_completed: !!created.project_completed,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project' });
  }
});

module.exports = router;
