const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

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

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id === id);

  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const project = projects.find(project => project.id === id);
  const indexOfProject = projects.indexOf(project);

  projects.splice(indexOfProject, 1);

  return res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
