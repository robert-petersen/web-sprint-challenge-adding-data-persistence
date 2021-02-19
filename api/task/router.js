// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model.js');
const router = express.Router();

// - [ ] `[POST] /api/tasks`
//   - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}`

// - [ ] `[GET] /api/tasks`
//   - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Each task must include `project_name` and `project_description`
//   - Example of response body: `[{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]`

router.get("/", (req, res) => {
  Tasks.find()
    .then(projects => {
      const updatedProjects = projects.map( project => {
        if ( project.project_completed === 0 ) {
          return ({
            ...project,
            project_completed: false
          });
        } else {
          return ({
            ...project,
            project_completed: true
          });
        }
      })
      res.status(200).json(updatedProjects);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects", error: err.message });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  Tasks.add(newProject)
    .then(project => {
      let translatedProject = project;
      if ( project.project_completed === 0 ) {
        translatedProject = {
          ...project,
          project_completed: false
        };
      } else {
        translatedProject = {
          ...project,
          project_completed: true
        };
      }
      res.status(201).json(translatedProject);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to add project", error: err.message });
    });
});

module.exports = router;