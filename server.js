const express = require("express");
const projectsRouter = require("./router/projectsRouter");
const actionsRouter = require("./router/actionsRouter");

const server = express();

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("hello world!");
});

module.exports = server;
