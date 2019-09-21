const projects = [];

class ProjectController {
  index(req, res) {
    return res.json(projects);
  }

  store(req, res) {
    const { id, title } = req.body;
    const projectExists = projects.find(proj => proj.id === id);

    if (projectExists) {
      return res.status(400).json({ error: 'Project already exists' });
    }

    const project = {
      id,
      title,
      tasks: [],
    };

    projects.push(project);

    return res.json(project);
  }

  update(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(proj => proj.id === id);

    if (!project) {
      return res.status(400).json({ error: 'Project does not exists' });
    }

    project.title = title;

    return res.json(project);
  }

  delete(req, res) {
    const { id } = req.params;
    const project = projects.find(proj => proj.id === id);

    if (!project) {
      return res.status(400).json({ error: 'Project does not exists' });
    }

    const indexOfProject = projects.indexOf(project);

    projects.splice(indexOfProject, 1);

    return res.send();
  }
}

export default new ProjectController();
