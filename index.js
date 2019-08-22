const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let numberOfRequests = 0;

/***************
 * Middlewares *
 ***************/

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(proj => proj.id === id);

  if (!project) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  req.project = project;

  return next();
}

function logRequests(req, res, next) {
  console.log(
    `Number of requests: ${++numberOfRequests}; Method: ${req.method}; URL: ${
      req.url
    }`
  );

  return next();
}

server.use(logRequests);

/************
 * Projects *
 ************/

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  res.json(project);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { project } = req;

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { project } = req;
  const indexOfProject = projects.indexOf(project);

  projects.splice(indexOfProject, 1);

  return res.send();
});

/*********
 * Tasks *
 *********/
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { project } = req;

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
