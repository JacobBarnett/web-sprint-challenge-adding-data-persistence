const express = require('express');
const router = express.Router();
const Resources = require('./model.js');

// [GET] /api/resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resources.get();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get resources' });
  }
});

// [POST] /api/resources
router.post('/', async (req, res) => {
  const { resource_name, resource_description } = req.body;

  if (!resource_name) {
    return res.status(400).json({ message: 'resource_name is required' });
  }

  try {
    const newResource = await Resources.insert({ resource_name, resource_description });
    res.status(201).json(newResource);
  } catch (err) {
    // Likely a UNIQUE constraint violation
    res.status(500).json({ message: 'Failed to create resource' });
  }
});

module.exports = router;
