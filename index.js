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

/**********
 * Routes *
 **********/

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  res.json({
    message: `Projeto de id ${id}, título ${title} cadastrado com sucesso!`
  });
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { project } = req;

  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { project } = req;

  const indexOfProject = projects.indexOf(project);

  projects.splice(indexOfProject, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { project } = req;

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
