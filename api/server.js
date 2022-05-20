// build your server here and require it from index.js
const express = require("express");
const projectsRouter = require("./project/router");
const server = express();
const resourcesRouter = require("./resource/router");
const tasksRouter = require("./task/router");

server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/tasks", tasksRouter);

module.exports = server;
