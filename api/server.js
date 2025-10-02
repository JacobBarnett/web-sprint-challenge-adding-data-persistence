const express = require('express');
const projectsRouter = require('./project/router');
const resourcesRouter = require('./resource/router');
const tasksRouter = require('./task/router');
console.log('projectsRouter:', projectsRouter);
console.log('resourcesRouter:', resourcesRouter);
console.log('tasksRouter:', tasksRouter);

const server = express();
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);

server.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

module.exports = server;
