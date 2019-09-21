class TaskController {
  store(req, res) {
    const { title } = req.body;
    const { project } = req;

    project.tasks.push(title);

    return res.json(project);
  }
}

export default new TaskController();
